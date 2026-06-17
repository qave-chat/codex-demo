import { sendNotificationJob } from "./notification-schema";
import type { createNotificationRepository } from "./notification-repository";

type NotificationRepository = ReturnType<typeof createNotificationRepository>;

export function createNotificationService(repo: NotificationRepository) {
  return {
    async send(input: { orgId: string; payload: unknown }) {
      const payload = sendNotificationJob.parse(input.payload);
      try {
        await repo.create({ ...payload, orgId: input.orgId });
      } catch (error) {
        await repo.markFailed({
          ...payload,
          orgId: input.orgId,
          notificationId: payload.notificationId,
          reason: error instanceof Error ? error.message : "unknown failure",
        });
      }
    },
  };
}
