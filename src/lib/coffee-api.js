import { authClient } from "./auth.js";

export const COFFEE_PUBLIC_KEY = "/api/coffees";
export const COFFEE_ADMIN_KEY = "/api/coffees?includeInactive=true";

async function readResponse(response) {
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.error || "No fue posible cargar el catálogo.");
  }
  return payload;
}

function normalizeCoffee(coffee, index = 0) {
  return {
    ...coffee,
    id: coffee.id ?? `initial-${index + 1}`,
    image: coffee.imageUrl || coffee.image || "",
    rating: Number(coffee.rating ?? 0),
  };
}

export async function getPublicCoffees() {
  const products = await readResponse(await fetch(COFFEE_PUBLIC_KEY));
  return products.map(normalizeCoffee);
}

async function getBearerToken() {
  const { data, error } = await authClient.token();
  const token = data?.token;
  if (error || !token) throw new Error("Inicia sesión para continuar.");
  return token;
}

async function adminRequest(method, body) {
  const token = await getBearerToken();
  const response = await fetch(COFFEE_PUBLIC_KEY + (method === "GET" ? "?includeInactive=true" : ""), {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  return readResponse(response);
}

export async function getAdminCoffees() {
  const products = await adminRequest("GET");
  return products.map(normalizeCoffee);
}

export function createCoffee(product) {
  return adminRequest("POST", product);
}

export function updateCoffee(id, product) {
  return adminRequest("PUT", { id, ...product });
}

export function deleteCoffee(id) {
  return adminRequest("DELETE", { id });
}
