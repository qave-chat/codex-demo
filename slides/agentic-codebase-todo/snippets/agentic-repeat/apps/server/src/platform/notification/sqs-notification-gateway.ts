import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { Effect, Layer } from "effect";
import { NotificationGateway } from "./notification-gateway";

const sqs = new SQSClient({});

export const SqsNotificationGatewayLive = Layer.succeed(
  NotificationGateway,
  {
    send: (input) =>
      Effect.tryPromise({
        try: async () => {
          const message = {
            MessageBody: JSON.stringify({
              body: input.body,
              notificationId: input.notificationId,
              recipientUserIds: input.recipientUserIds,
              title: input.title,
            }),
            QueueUrl: process.env.NOTIFICATION_QUEUE_URL,
          };
          const result = await sqs.send(new SendMessageCommand(message));
          return { providerMessageId: result.MessageId ?? input.notificationId };
        },
        catch: (error) =>
          error instanceof Error ? error : new Error("SQS delivery failed"),
      }),
  },
);
