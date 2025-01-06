import {
  pgTable,
  serial,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { users as usersTable } from "./user";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  contactId: integer("contact_id")
    .notNull()
    .references(() => usersTable.id),
  confirmed: boolean("confirmed").default(false).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});
