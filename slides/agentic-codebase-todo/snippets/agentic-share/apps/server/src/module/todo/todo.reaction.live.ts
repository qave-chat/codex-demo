import { Effect } from "effect";
import {
  NotificationCreated,
  NotificationFailed,
} from "@/module/notification/notification.event.define";
import { Reaction } from "@/platform/flow/flow";
import { NotifyTodoShare } from "./todo.reaction.define";

export const NotifyTodoShareLive = Reaction.layer(
  NotifyTodoShare,
  Effect.fn("NotifyTodoShareLive")(function* ({ context, reaction }) {
    const notificationId = generateId("notification");
    if (reaction.payload.userId === context.actorUserId) {
      return [
        NotificationFailed({
          notificationId,
          reason: "recipient is the actor",
          recipientUserIds: [reaction.payload.userId],
          sourceId: reaction.payload.todoId,
        }),
      ];
    }
    return [
      NotificationCreated({
        notificationId,
        recipientUserIds: [reaction.payload.userId],
        sourceId: reaction.payload.todoId,
        title: "Todo shared",
        body: reaction.payload.message ?? "A todo was shared with you",
      }),
    ];
  }),
);
