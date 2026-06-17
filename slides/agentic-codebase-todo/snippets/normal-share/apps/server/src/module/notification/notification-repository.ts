import { notifications } from "@/platform/db/schema/notification-table";
import type { Database } from "@/platform/db/client";
import type { SendNotificationJob } from "./notification-schema";

export function createNotificationRepository(db: Database) {
  return {
    create(input: SendNotificationJob & { orgId: string }) {
      return db.insert(notifications).values({
        body: input.body,
        id: input.notificationId,
        orgId: input.orgId,
        recipientUserIds: input.recipientUserIds,
        sourceId: input.sourceId,
        status: "created",
        title: input.title,
      });
    },
    markFailed(input: SendNotificationJob & { orgId: string; reason: string }) {
      return db.insert(notifications).values({
        body: input.body,
        failureReason: input.reason,
        id: input.notificationId,
        orgId: input.orgId,
        recipientUserIds: input.recipientUserIds,
        sourceId: input.sourceId,
        status: "failed",
        title: input.title,
      });
    },
  };
}
