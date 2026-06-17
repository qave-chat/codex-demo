import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const jobs = pgTable(
  "jobs",
  {
    attempts: integer("attempts").notNull().default(0),
    availableAt: timestamp("available_at", {
      mode: "string",
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    id: text("id").primaryKey(),
    idempotencyKey: text("idempotency_key").notNull(),
    orgId: text("org_id").notNull(),
    payload: jsonb("payload").notNull().$type<Record<string, unknown>>(),
    queue: text("queue").notNull(),
    status: text("status", {
      enum: ["pending", "processing", "completed", "failed"],
    })
      .notNull()
      .default("pending"),
  },
  (table) => [uniqueIndex("jobs_idempotency_idx").on(table.idempotencyKey)],
);
