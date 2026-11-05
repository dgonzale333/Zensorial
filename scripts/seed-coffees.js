import { getDb } from "../server/db.js";
import { coffeeProducts } from "../server/schema.js";
import { initialCoffeeProducts } from "../src/data/coffee-products.js";

const db = getDb();
const existing = await db.select({ id: coffeeProducts.id }).from(coffeeProducts).limit(1);

if (existing.length > 0) {
  console.info("El catálogo ya tiene registros; no se modificó.");
} else {
  const inserted = await db.insert(coffeeProducts).values(initialCoffeeProducts).returning({ id: coffeeProducts.id });
  console.info(`Se importaron ${inserted.length} cafés iniciales.`);
}
