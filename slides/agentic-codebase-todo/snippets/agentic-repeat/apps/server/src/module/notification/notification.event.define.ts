import { Schema } from "effect";
import { Event } from "@/platform/flow/flow";

export const NotificationCreated = Event.define({
  payload: Schema.Struct({
    body: Schema.String,
    notificationId: Schema.String,
    recipientUserIds: Schema.Array(Schema.String),
    sourceId: Schema.String,
    title: Schema.String,
  }),
  type: "Event.V1.NotificationCreated",
});

export const NotificationFailed = Event.define({
  payload: Schema.Struct({
    notificationId: Schema.String,
    reason: Schema.String,
    recipientUserIds: Schema.Array(Schema.String),
    sourceId: Schema.String,
  }),
  type: "Event.V1.NotificationFailed",
});

export const NotificationDelivered = Event.define({
  payload: Schema.Struct({
    notificationId: Schema.String,
    providerMessageId: Schema.String,
  }),
  type: "Event.V1.NotificationDelivered",
});
