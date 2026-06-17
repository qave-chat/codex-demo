import { Schema } from "effect";
import { Event } from "@/platform/flow/flow";
import {
  CreateTodoIntentPayloadSchema,
  DeleteTodoIntentPayloadSchema,
  UpdateTodoIntentPayloadSchema,
} from "@acme/effect-api/todo/todo.rpc.schema";

export const TodoCreated = Event.define({
  payload: CreateTodoIntentPayloadSchema,
  type: "Event.V1.TodoCreated",
});

export const TodoUpdated = Event.define({
  payload: UpdateTodoIntentPayloadSchema,
  type: "Event.V1.TodoUpdated",
});

export const TodoDeleted = Event.define({
  payload: DeleteTodoIntentPayloadSchema,
  type: "Event.V1.TodoDeleted",
});
