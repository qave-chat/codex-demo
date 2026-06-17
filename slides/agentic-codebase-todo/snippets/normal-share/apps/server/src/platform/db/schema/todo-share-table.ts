import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { todos } from "./todo-table";

export const todoShares = pgTable(
  "todo_shares",
  {
    createdAt: timestamp("created_at", { mode: "string", withTimezone: true })
      .defaultNow()
      .notNull(),
    createdBy: text("created_by").notNull(),
    id: text("id").primaryKey(),
    message: text("message"),
    orgId: text("org_id").notNull(),
    todoId: text("todo_id")
      .notNull()
      .references(() => todos.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull(),
  },
  (table) => [
    uniqueIndex("todo_shares_unique_idx").on(
      table.orgId,
      table.todoId,
      table.userId,
    ),
  ],
);
