import { Buffer } from "node:buffer";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { requireAdmin, ApiError } from "../server/auth.js";
import { getDb } from "../server/db.js";
import { coffeeProducts } from "../server/schema.js";

const imageUrlSchema = z
  .string()
  .trim()
  .max(2048)
  .refine((value) => {
    if (!value) return true;
    if (value.startsWith("/") && !value.startsWith("//")) return true;
    try {
      return new URL(value).protocol === "https:";
    } catch {
      return false;
    }
  }, "Usa una ruta local o una URL segura HTTPS.");

const listSchema = z.array(z.string().trim().min(1).max(80)).max(16);
const scoreSchema = z.coerce.number().min(0).max(10);
const coffeeInputSchema = z.object({
  name: z.string().trim().min(1).max(120),
  origin: z.string().trim().min(1).max(120),
  imageUrl: imageUrlSchema,
  price: z.string().trim().max(80),
  rating: z.coerce.number().min(0).max(5),
  altitude: z.string().trim().max(120),
  process: z.string().trim().max(80),
  variety: z.string().trim().max(80),
  roastLevel: z.string().trim().max(80),
  description: z.string().trim().max(2400),
  cupping: z.object({
    aroma: scoreSchema,
    flavor: scoreSchema,
    acidity: scoreSchema,
    body: scoreSchema,
    balance: scoreSchema,
  }),
  tastingNotes: listSchema,
  brewingTips: listSchema,
  certifications: listSchema,
  isActive: z.boolean(),
});

const idSchema = z.string().uuid();

function sendJson(response, status, payload) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(payload));
}

async function readJsonBody(request) {
  if (request.body && typeof request.body === "object" && !Buffer.isBuffer(request.body)) {
    return request.body;
  }

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
    let rejected = false;

    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > 100_000) {
        rejected = true;
        reject(new ApiError(413, "La solicitud es demasiado grande."));
        request.resume();
        return;
      }
      chunks.push(chunk);
    });

    request.on("end", () => {
      if (rejected) return;
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

function serializeCoffee(coffee) {
  return { ...coffee, rating: Number(coffee.rating) };
}

export default async function handler(request, response) {
  const method = request.method?.toUpperCase() ?? "GET";

  try {
    const db = getDb();
    const requestUrl = new URL(request.url ?? "/", "http://localhost");

    if (method === "GET") {
      const includeInactive = requestUrl.searchParams.get("includeInactive") === "true";
      if (includeInactive) await requireAdmin(request);

      const products = includeInactive
        ? await db.select().from(coffeeProducts).orderBy(desc(coffeeProducts.createdAt))
        : await db
            .select()
            .from(coffeeProducts)
            .where(eq(coffeeProducts.isActive, true))
            .orderBy(desc(coffeeProducts.createdAt));

      return sendJson(response, 200, products.map(serializeCoffee));
    }

    if (method === "POST") {
      await requireAdmin(request);
      const product = coffeeInputSchema.parse(await readJsonBody(request));
      const [created] = await db.insert(coffeeProducts).values(product).returning();
      return sendJson(response, 201, serializeCoffee(created));
    }

    if (method === "PUT") {
      await requireAdmin(request);
      const body = await readJsonBody(request);
      const id = idSchema.parse(body.id);
      const product = coffeeInputSchema.parse(body);
      const [updated] = await db
        .update(coffeeProducts)
        .set({ ...product, updatedAt: new Date() })
        .where(eq(coffeeProducts.id, id))
        .returning();

      if (!updated) return sendJson(response, 404, { error: "No se encontró ese café." });
      return sendJson(response, 200, serializeCoffee(updated));
    }

    if (method === "DELETE") {
      await requireAdmin(request);
      const { id } = z.object({ id: idSchema }).parse(await readJsonBody(request));
      const [deleted] = await db
        .delete(coffeeProducts)
        .where(eq(coffeeProducts.id, id))
        .returning({ id: coffeeProducts.id });

      if (!deleted) return sendJson(response, 404, { error: "No se encontró ese café." });
      return sendJson(response, 200, { id: deleted.id });
    }

    response.setHeader("Allow", "GET, POST, PUT, DELETE");
    return sendJson(response, 405, { error: "Método no permitido." });
  } catch (error) {
    if (error instanceof ApiError) return sendJson(response, error.status, { error: error.message });
    if (error instanceof z.ZodError) return sendJson(response, 400, { error: "Revisa los datos del café e inténtalo de nuevo." });

    console.error("[api/coffees] Request failed.");
    return sendJson(response, 500, { error: "No fue posible completar la operación." });
  }
}
