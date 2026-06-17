import { Event } from "@/platform/flow/flow";
import {
  CreateTodoIntentPayloadSchema,
  ShareTodoIntentPayloadSchema,
} from "@acme/effect-api/todo/todo.rpc.schema";

const TodoRecurrenceScheduledPayloadSchema = Schema.Struct({
  interval: Schema.Literals("daily", "weekly", "monthly"),
  nextRunAt: Schema.String,
  recurrenceId: Schema.String,
  sourceTodoId: Schema.String,
  timezone: Schema.String,
});

export const TodoCreated = Event.define({
  payload: CreateTodoIntentPayloadSchema,
  type: "Event.V1.TodoCreated",
});
export const TodoShared = Event.define({
  payload: ShareTodoIntentPayloadSchema,
  type: "Event.V1.TodoShared",
});
export const TodoRecurrenceScheduled = Event.define({
  payload: TodoRecurrenceScheduledPayloadSchema,
  type: "Event.V1.TodoRecurrenceScheduled",
});
