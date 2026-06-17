import { Effect } from "effect";
import { NotificationGateway } from "@/platform/notification/notification-gateway";
import { Reaction } from "@/platform/flow/flow";
import { NotificationDelivered, NotificationFailed } from "./notification.event.define";
import { DeliverNotification } from "./notification.reaction.define";

export const DeliverNotificationLive = Reaction.layer(
  DeliverNotification,
  Effect.fn("DeliverNotificationLive")(function* ({ reaction }) {
    const gateway = yield* NotificationGateway;
    const result = yield* gateway
      .send({
        body: reaction.payload.body,
        notificationId: reaction.payload.notificationId,
        recipientUserIds: reaction.payload.recipientUserIds,
        title: reaction.payload.title,
      })
      .pipe(Effect.either);

    if (result._tag === "Left") {
      return [
        NotificationFailed({
          notificationId: reaction.payload.notificationId,
          reason: result.left.message,
          recipientUserIds: reaction.payload.recipientUserIds,
          sourceId: reaction.payload.sourceId,
        }),
      ];
    }

    return [
      NotificationDelivered({
        notificationId: reaction.payload.notificationId,
        providerMessageId: result.right.providerMessageId,
      }),
    ];
  }),
);
