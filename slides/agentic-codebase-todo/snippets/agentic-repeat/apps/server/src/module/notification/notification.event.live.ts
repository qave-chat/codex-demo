import { Effect } from "effect";
import { eq } from "drizzle-orm";
import { notifications } from "@/platform/db/schema/notification-table";
import { Event } from "@/platform/flow/flow";
import {
  NotificationCreated,
  NotificationDelivered,
  NotificationFailed,
} from "./notification.event.define";

export const NotificationCreatedLive = Event.layer(
  NotificationCreated,
  Effect.fn("NotificationCreatedLive")(function* ({ context, event }) {
    yield* context.tx.insert(notifications).values({
      body: event.payload.body,
      id: event.payload.notificationId,
      orgId: context.orgId,
      recipientUserIds: event.payload.recipientUserIds,
      sourceId: event.payload.sourceId,
      status: "created",
      title: event.payload.title,
    });
  }),
);

export const NotificationFailedLive = Event.layer(
  NotificationFailed,
  Effect.fn("NotificationFailedLive")(function* ({ context, event }) {
    yield* context.tx
      .insert(notifications)
      .values({
        body: event.payload.reason,
        failureReason: event.payload.reason,
        id: event.payload.notificationId,
        orgId: context.orgId,
        recipientUserIds: event.payload.recipientUserIds,
        sourceId: event.payload.sourceId,
        status: "failed",
        title: "Notification failed",
      })
      .onConflictDoUpdate({
        target: notifications.id,
        set: { failureReason: event.payload.reason, status: "failed" },
      });
  }),
);

export const NotificationDeliveredLive = Event.layer(
  NotificationDelivered,
  Effect.fn("NotificationDeliveredLive")(function* ({ context, event }) {
    yield* context.tx
      .update(notifications)
      .set({
        providerMessageId: event.payload.providerMessageId,
        status: "delivered",
      })
      .where(eq(notifications.id, event.payload.notificationId));
  }),
);

export const NotificationEventLayers = [
  NotificationCreatedLive,
  NotificationFailedLive,
  NotificationDeliveredLive,
] as const;
