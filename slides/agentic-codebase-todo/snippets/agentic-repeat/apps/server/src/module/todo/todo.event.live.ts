import { Effect } from "effect";
import { todos } from "@/platform/db/schema/todo-table";
import { Event } from "@/platform/flow/flow";
import { TodoCreated } from "./todo.event.define";

export const TodoCreatedLive = Event.layer(
  TodoCreated,
  Effect.fn("TodoCreatedLive")(function* ({ context, event }) {
    yield* context.tx
      .insert(todos)
      .values({
        id: event.payload.todoId,
        title: event.payload.title,
        orgId: context.orgId,
        createdBy: context.actorUserId,
        number: 1,
        assigneeUserId: event.payload.assigneeUserId ?? null,
        priority: event.payload.priority ?? "no_priority",
        status: "open",
      })
      .onConflictDoNothing();
  }),
);

export const TodoEventLayers = [TodoCreatedLive] as const;
