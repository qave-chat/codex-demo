import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { organization, user } from "@/platform/auth/auth-table";

export const todos = pgTable(
  "todos",
  {
    assigneeUserId: text("assignee_user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    completedAt: timestamp("completed_at", {
      mode: "string",
      withTimezone: true,
    }),
    createdAt: timestamp("created_at", { mode: "string", withTimezone: true })
      .defaultNow()
      .notNull(),
    createdBy: text("created_by")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    description: text("description"),
    dueAt: timestamp("due_at", { mode: "string", withTimezone: true }),
    id: text("id").primaryKey(),
    number: integer("number").notNull(),
    orgId: text("org_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    priority: text("priority", {
      enum: ["no_priority", "urgent", "high", "medium", "low"],
    })
      .notNull()
      .default("no_priority"),
    status: text("status", { enum: ["open", "in_progress", "done", "backlog"] })
      .notNull()
      .default("open"),
    title: text("title").notNull(),
    updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("todos_assignee_idx").on(table.orgId, table.assigneeUserId),
    index("todos_status_idx").on(table.orgId, table.status),
    uniqueIndex("todos_org_number_idx").on(table.orgId, table.number),
  ],
);
