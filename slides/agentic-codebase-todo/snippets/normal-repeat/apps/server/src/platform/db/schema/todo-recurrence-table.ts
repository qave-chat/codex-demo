import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { todos } from "./todo-table";

export const todoRecurrences = pgTable(
  "todo_recurrences",
  {
    id: text("id").primaryKey(),
    interval: text("interval", {
      enum: ["daily", "weekly", "monthly"],
    }).notNull(),
    nextRunAt: timestamp("next_run_at", {
      mode: "string",
      withTimezone: true,
    }).notNull(),
    orgId: text("org_id").notNull(),
    sourceTodoId: text("source_todo_id")
      .notNull()
      .references(() => todos.id, { onDelete: "cascade" }),
    status: text("status", { enum: ["active", "paused", "cancelled"] })
      .notNull()
      .default("active"),
    timezone: text("timezone").notNull().default("UTC"),
  },
  (table) => [
    uniqueIndex("todo_rec_source_idx").on(table.orgId, table.sourceTodoId),
  ],
);
