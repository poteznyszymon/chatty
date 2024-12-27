import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  secondName: varchar("second_name", { length: 50 }).notNull(),
  username: varchar("username", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  imageUrl: varchar("image_url").default(""),
  lastActive: timestamp("last_active", { mode: "date" }).defaultNow().notNull(),
});
