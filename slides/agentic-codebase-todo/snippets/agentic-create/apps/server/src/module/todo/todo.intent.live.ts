import { Effect, Schema } from "effect";
import {
  CreateTodoIntent,
  DeleteTodoIntent,
  UpdateTodoIntent,
} from "@acme/effect-api/todo/todo.rpc.interface";
import {
  CreateTodoIntentPayloadSchema,
  DeleteTodoIntentPayloadSchema,
  UpdateTodoIntentPayloadSchema,
} from "@acme/effect-api/todo/todo.rpc.schema";
import { Intent } from "@/platform/flow/flow";
import { TodoCreated, TodoDeleted, TodoUpdated } from "./todo.event.define";

export const CreateTodoLive = Intent.layer(
  CreateTodoIntent,
  Effect.fn("CreateTodoLive")(function* ({ intent }) {
    const payload = yield* Schema.decodeUnknown(CreateTodoIntentPayloadSchema)(
      intent.payload,
    );
    return [TodoCreated({ ...payload, title: payload.title.trim() })];
  }),
);

export const UpdateTodoLive = Intent.layer(
  UpdateTodoIntent,
  Effect.fn("UpdateTodoLive")(function* ({ intent }) {
    const payload = yield* Schema.decodeUnknown(UpdateTodoIntentPayloadSchema)(
      intent.payload,
    );
    return [TodoUpdated({ ...payload, title: payload.title?.trim() })];
  }),
);

export const DeleteTodoLive = Intent.layer(
  DeleteTodoIntent,
  Effect.fn("DeleteTodoLive")(function* ({ intent }) {
    const payload = yield* Schema.decodeUnknown(DeleteTodoIntentPayloadSchema)(
      intent.payload,
    );
    return [TodoDeleted(payload)];
  }),
);
