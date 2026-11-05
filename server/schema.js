import { pgSchema, pgTable, uuid, text, numeric, jsonb, boolean, timestamp } from "drizzle-orm/pg-core";

export const coffeeProducts = pgTable("coffee_products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  origin: text("origin").notNull(),
  imageUrl: text("image_url").notNull(),
  price: text("price").notNull(),
  rating: numeric("rating", { precision: 2, scale: 1 }).notNull(),
  altitude: text("altitude").notNull(),
  process: text("process").notNull(),
  variety: text("variety").notNull(),
  roastLevel: text("roast_level").notNull(),
  description: text("description").notNull(),
  cupping: jsonb("cupping").notNull(),
  tastingNotes: jsonb("tasting_notes").notNull(),
  brewingTips: jsonb("brewing_tips").notNull(),
  certifications: jsonb("certifications").notNull(),
  isActive: boolean("is_active").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
});

const neonAuth = pgSchema("neon_auth");

export const neonAuthUsers = neonAuth.table("user", {
  id: uuid("id").primaryKey(),
  role: text("role"),
});
