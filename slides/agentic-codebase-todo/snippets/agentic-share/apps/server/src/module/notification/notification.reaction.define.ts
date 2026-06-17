import { Duration, Schedule } from "effect";
import {
  NotificationCreated,
  NotificationDelivered,
  NotificationFailed,
} from "./notification.event.define";
import { Reaction } from "@/platform/flow/flow";

export const DeliverNotification = Reaction.define({
  emits: [NotificationDelivered, NotificationFailed],
  on: [NotificationCreated],
  schema: NotificationCreated.payload,
  policy: {
    attemptTimeout: Duration.seconds(10),
    idempotencyKey: (payload) => "notification.deliver." + payload.notificationId,
    retry: Schedule.exponential(Duration.seconds(1)).pipe(
      Schedule.jittered,
      Schedule.compose(Schedule.recurs(5)),
    ),
    ttl: Duration.minutes(10),
  },
  type: "Reaction.V1.DeliverNotification",
});
