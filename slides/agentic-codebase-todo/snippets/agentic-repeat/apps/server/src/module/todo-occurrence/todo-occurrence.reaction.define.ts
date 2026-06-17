import { TodoCreated, TodoRecurrenceScheduled } from "@/module/todo/todo.event.define";
import { Reaction } from "@/platform/flow/flow";

export const GenerateTodoOccurrence = Reaction.define({
  emits: [TodoCreated, TodoRecurrenceScheduled],
  on: [TodoRecurrenceScheduled],
  policy: {
    retryCount: 5,
    idempotencyKey: (payload) =>
      "todo-occurrence." + payload.recurrenceId + "." + payload.nextRunAt,
  },
  payload: TodoRecurrenceScheduled.payload,
  type: "Reaction.V1.GenerateTodoOccurrence",
});
