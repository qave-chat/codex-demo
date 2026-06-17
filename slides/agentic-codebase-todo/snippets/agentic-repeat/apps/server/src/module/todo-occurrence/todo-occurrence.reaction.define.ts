import { TodoCreated, TodoRecurrenceScheduled } from "@/module/todo/todo.event.define";
import { Duration, Schedule } from "effect";
import { Reaction } from "@/platform/flow/flow";

export const GenerateTodoOccurrence = Reaction.define({
  emits: [TodoCreated, TodoRecurrenceScheduled],
  on: [TodoRecurrenceScheduled],
  policy: {
    idempotencyKey: (payload) =>
      "todo-occurrence." + payload.recurrenceId + "." + payload.nextRunAt,
    retry: Schedule.exponential(Duration.seconds(1)).pipe(
      Schedule.jittered,
      Schedule.compose(Schedule.recurs(5)),
    ),
    ttl: Duration.minutes(10),
  },
  schema: TodoRecurrenceScheduled.payload,
  type: "Reaction.V1.GenerateTodoOccurrence",
});
