import { Layer } from "effect";
import { TodoModuleLive } from "@/module/todo/todo.module.layer";
import { FlowRegistry } from "@/platform/flow/flow-registry";
import { FlowRuntime } from "@/platform/flow/flow-runtime";
import { SqsNotificationGatewayLive } from "@/platform/notification/sqs-notification-gateway";

export const ServerLive = Layer.mergeAll(TodoModuleLive).pipe(
  Layer.provide(FlowRuntime.Default),
  Layer.provide(FlowRegistry.Default),
  Layer.provide(SqsNotificationGatewayLive),
);
