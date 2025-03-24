import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: doublePrecision("price").notNull(),
  imageUrl: text("image_url").notNull(),
  celebrityName: text("celebrity_name").notNull(),
  isAuction: boolean("is_auction").default(false),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bids = pgTable("bids", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id),
  userId: integer("user_id").notNull().references(() => users.id),
  amount: doublePrecision("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  total: doublePrecision("total").notNull(),
  paymentReference: text("payment_reference"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id),
  productId: integer("product_id").notNull().references(() => products.id),
  price: doublePrecision("price").notNull(),
  quantity: integer("quantity").notNull().default(1),
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  fullName: true,
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
  imageUrl: true,
  celebrityName: true,
  isAuction: true,
  endDate: true,
});

export const insertBidSchema = createInsertSchema(bids).pick({
  productId: true,
  userId: true,
  amount: true,
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  userId: true,
  total: true,
  paymentReference: true,
  status: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItems).pick({
  orderId: true,
  productId: true,
  price: true,
  quantity: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertBid = z.infer<typeof insertBidSchema>;
export type Bid = typeof bids.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

// Login Type
export type LoginData = {
  username: string;
  password: string;
};
