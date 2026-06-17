import { Effect, Schema } from "effect";
import {
  CreateTodoIntent,
  ShareTodoIntent,
} from "@acme/effect-api/todo/todo.rpc.interface";
import {
  CreateTodoIntentPayloadSchema,
  ShareTodoIntentPayloadSchema,
} from "@acme/effect-api/todo/todo.rpc.schema";
import { Intent } from "@/platform/flow/flow";
import { TodoCreated, TodoShared } from "./todo.event.define";

export const CreateTodoLive = Intent.layer(
  CreateTodoIntent,
  Effect.fn("CreateTodoLive")(function* ({ intent }) {
    const payload = yield* Schema.decodeUnknown(CreateTodoIntentPayloadSchema)(
      intent.payload,
    );
    return [TodoCreated({ ...payload, title: payload.title.trim() })];
  }),
);

export const ShareTodoLive = Intent.layer(
  ShareTodoIntent,
  Effect.fn("ShareTodoLive")(function* ({ intent }) {
    const payload = yield* Schema.decodeUnknown(ShareTodoIntentPayloadSchema)(
      intent.payload,
    );
    return [TodoShared(payload)];
  }),
);
