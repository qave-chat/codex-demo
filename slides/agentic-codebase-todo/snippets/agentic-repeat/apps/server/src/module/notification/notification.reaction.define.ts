import {
  NotificationCreated,
  NotificationDelivered,
  NotificationFailed,
} from "./notification.event.define";
import { Reaction } from "@/platform/flow/flow";

export const DeliverNotification = Reaction.define({
  emits: [NotificationDelivered, NotificationFailed],
  on: [NotificationCreated],
  payload: NotificationCreated.payload,
  policy: {
    attemptTimeout: "10 seconds",
    idempotencyKey: (payload) => "notification.deliver." + payload.notificationId,
    retryCount: 5,
  },
  type: "Reaction.V1.DeliverNotification",
});
