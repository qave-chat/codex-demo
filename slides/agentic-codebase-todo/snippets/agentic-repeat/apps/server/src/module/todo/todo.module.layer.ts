import { Effect, Layer } from "effect";
import { NotificationEventLayers } from "@/module/notification/notification.event.live";
import { NotificationReactionLayers } from "@/module/notification/notification.reaction.live";
import { TodoOccurrenceReactionLayers } from "@/module/todo-occurrence/todo-occurrence.reaction.live";
import { FlowRuntime } from "@/platform/flow/flow-runtime";
import { TodoEventLayers } from "./todo.event.live";
import { TodoIntentLayers } from "./todo.intent.live";
import { TodoReactionLayers } from "./todo.reaction.live";
import { ListTodosLive } from "./todo.rpc.live";

const TodoFlowRegistrationLive = Layer.effectDiscard(
  Effect.gen(function* () {
    const runtime = yield* FlowRuntime;
    yield* runtime.register({
      events: [...TodoEventLayers, ...NotificationEventLayers],
      intents: TodoIntentLayers,
      reactions: [
        ...TodoReactionLayers,
        ...NotificationReactionLayers,
        ...TodoOccurrenceReactionLayers,
      ],
    });
  }),
);

export const TodoModuleLive = Layer.mergeAll(
  TodoFlowRegistrationLive,
  ListTodosLive,
);
