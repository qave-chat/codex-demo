import { z } from "zod";

export const sendNotificationJob = z.object({
  body: z.string(),
  notificationId: z.string(),
  recipientUserIds: z.array(z.string()).min(1),
  sourceId: z.string(),
  title: z.string(),
});

export type SendNotificationJob = z.infer<typeof sendNotificationJob>;
