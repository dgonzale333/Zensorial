import { Buffer } from "node:buffer";
import { inArray } from "drizzle-orm";
import { z } from "zod";
import { ApiError } from "../server/auth.js";
import { getDb } from "../server/db.js";
import { getStripe } from "../server/stripe.js";
import { coffeeProducts } from "../server/schema.js";

const checkoutInputSchema = z.object({
  idempotencyKey: z.string().uuid(),
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().min(1).max(10),
  }).strict()).min(1).max(30),
}).strict();

function sendJson(response, status, payload) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(payload));
}

async function readJsonBody(request) {
  if (request.body && typeof request.body === "object" && !Buffer.isBuffer(request.body)) return request.body;
  if (typeof request.body === "string") {
    try {
      return JSON.parse(request.body);
    } catch {
      throw new ApiError(400, "El formato de la solicitud no es válido.");
    }
  }

  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    let tooLarge = false;

    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > 100_000) {
        tooLarge = true;
        reject(new ApiError(413, "La solicitud es demasiado grande."));
        request.resume();
        return;
      }
      chunks.push(chunk);
    });

    request.on("end", () => {
      if (tooLarge) return;
      try {
        const body = Buffer.concat(chunks).toString("utf8");
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new ApiError(400, "El formato de la solicitud no es válido."));
      }
    });

    request.on("error", () => reject(new ApiError(400, "No fue posible leer la solicitud.")));
  });
}

function parseCopPrice(value) {
  const normalized = String(value ?? "").trim();
  if (!/^\d+$/.test(normalized)) return null;
  const amountInCop = Number(normalized);
  if (!Number.isSafeInteger(amountInCop) || amountInCop < 1 || amountInCop > 99_999_999) return null;
  return amountInCop;
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendJson(response, 405, { error: "Método no permitido." });
  }

  try {
    const body = checkoutInputSchema.parse(await readJsonBody(request));
    const quantityByProduct = new Map();
    let totalQuantity = 0;

    for (const item of body.items) {
      totalQuantity += item.quantity;
      if (totalQuantity > 30) throw new ApiError(400, "El carrito supera el máximo de 30 unidades.");

      const nextQuantity = (quantityByProduct.get(item.productId) ?? 0) + item.quantity;
      if (nextQuantity > 10) throw new ApiError(400, "El máximo permitido por café es de 10 unidades.");
      quantityByProduct.set(item.productId, nextQuantity);
    }

    const productIds = [...quantityByProduct.keys()];
    const products = await getDb()
      .select({
        id: coffeeProducts.id,
        name: coffeeProducts.name,
        description: coffeeProducts.description,
        price: coffeeProducts.price,
        isActive: coffeeProducts.isActive,
      })
      .from(coffeeProducts)
      .where(inArray(coffeeProducts.id, productIds));
    const productById = new Map(products.map((product) => [product.id, product]));

    if (productById.size !== productIds.length) {
      throw new ApiError(409, "Uno o más cafés ya no están disponibles.");
    }

    const lineItems = [];
    let totalInMinorUnits = 0;

    for (const [productId, quantity] of quantityByProduct) {
      const product = productById.get(productId);
      if (!product?.isActive) throw new ApiError(409, "Uno o más cafés ya no están disponibles.");

      const priceInCop = parseCopPrice(product.price);
      if (priceInCop === null) {
        throw new ApiError(409, `Falta definir el precio de ${product.name}.`);
      }

      const unitAmount = priceInCop * 100;
      const lineAmount = unitAmount * quantity;
      if (!Number.isSafeInteger(unitAmount) || !Number.isSafeInteger(lineAmount)) {
        throw new ApiError(400, "El importe de un café no es válido.");
      }

      totalInMinorUnits += lineAmount;
      if (!Number.isSafeInteger(totalInMinorUnits) || totalInMinorUnits > 9_999_999_999) {
        throw new ApiError(400, "El total del pedido supera el límite permitido.");
      }

      lineItems.push({
        price_data: {
          currency: "cop",
          product_data: {
            name: product.name,
            description: product.description.slice(0, 500),
          },
          unit_amount: unitAmount,
        },
        quantity,
      });
    }

    const session = await getStripe().checkout.sessions.create({
      ui_mode: "embedded_page",
      redirect_on_completion: "never",
      mode: "payment",
      line_items: lineItems,
      metadata: {
        currency: "cop",
        item_count: String(totalQuantity),
        total_minor_units: String(totalInMinorUnits),
      },
    }, { idempotencyKey: body.idempotencyKey });

    if (!session.client_secret) throw new ApiError(502, "Stripe no devolvió una sesión de pago válida.");
    return sendJson(response, 200, { clientSecret: session.client_secret });
  } catch (error) {
    if (error instanceof ApiError) return sendJson(response, error.status, { error: error.message });
    if (error instanceof z.ZodError) return sendJson(response, 400, { error: "Revisa los productos y cantidades del carrito." });

    console.error("[api/checkout] Checkout session creation failed.");
    return sendJson(response, 502, { error: "No fue posible iniciar el pago con Stripe." });
  }
}
