import { Context, Effect } from "effect";

export type SendNotificationInput = {
  body: string;
  notificationId: string;
  recipientUserIds: string[];
  title: string;
};

export type SendNotificationResult = {
  providerMessageId: string;
};

export class NotificationGateway extends Context.Tag("NotificationGateway")<
  NotificationGateway,
  {
    send(
      input: SendNotificationInput,
    ): Effect.Effect<SendNotificationResult, Error>;
  }
>() {}
