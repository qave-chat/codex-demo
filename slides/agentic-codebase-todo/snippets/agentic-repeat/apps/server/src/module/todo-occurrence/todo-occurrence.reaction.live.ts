import { TodoCreated, TodoRecurrenceScheduled } from "@/module/todo/todo.event.define";
import { Reaction } from "@/platform/flow/flow";
import { GenerateTodoOccurrence } from "./todo-occurrence.reaction.define";

export const GenerateTodoOccurrenceLive = Reaction.layer(
  GenerateTodoOccurrence,
  Effect.fn("GenerateTodoOccurrenceLive")(function* ({ reaction }) {
    return [
      TodoCreated({
        todoId: generateId("todo"),
        title: "Recurring todo",
        priority: "no_priority",
      }),
      TodoRecurrenceScheduled({
        ...reaction.payload,
        nextRunAt: nextRun(
          reaction.payload.interval,
          reaction.payload.nextRunAt,
        ),
      }),
    ];
  }),
);
