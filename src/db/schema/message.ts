import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { users as usersTable } from "./user";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id")
    .references(() => usersTable.id)
    .notNull(),
  receiverId: integer("receiver_id")
    .references(() => usersTable.id)
    .notNull(),
  content: text("content").notNull(),
  image: text("image"),
  sentAt: timestamp("sent_at", { mode: "date" }).defaultNow().notNull(),
});
