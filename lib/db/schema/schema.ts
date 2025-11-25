import { integer, text, pgTable, varchar } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";


export const tasks = pgTable("tasks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255}).notNull(),
  date: varchar({ length: 255}).notNull(),
  status: varchar({ length: 50}).notNull().default("pending"),
  userId: text().notNull().references(() => user.id)
})