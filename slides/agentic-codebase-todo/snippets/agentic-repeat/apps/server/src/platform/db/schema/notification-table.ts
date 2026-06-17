import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const notifications = pgTable("notifications", {
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: true })
    .defaultNow()
    .notNull(),
  failureReason: text("failure_reason"),
  id: text("id").primaryKey(),
  orgId: text("org_id").notNull(),
  providerMessageId: text("provider_message_id"),
  recipientUserIds: jsonb("recipient_user_ids").$type<string[]>().notNull(),
  sourceId: text("source_id").notNull(),
  status: text("status", {
    enum: ["created", "delivered", "failed"],
  }).notNull(),
  title: text("title").notNull(),
});
