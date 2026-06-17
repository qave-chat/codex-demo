import { Event } from "@/platform/flow/flow";
import {
  CreateTodoIntentPayloadSchema,
  ShareTodoIntentPayloadSchema,
} from "@acme/effect-api/todo/todo.rpc.schema";

export const TodoCreated = Event.define({
  payload: CreateTodoIntentPayloadSchema,
  type: "Event.V1.TodoCreated",
});
export const TodoShared = Event.define({
  payload: ShareTodoIntentPayloadSchema,
  type: "Event.V1.TodoShared",
});
