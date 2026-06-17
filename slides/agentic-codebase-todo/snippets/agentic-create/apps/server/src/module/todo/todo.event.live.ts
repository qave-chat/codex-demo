import { Effect } from "effect";
import { and, eq } from "drizzle-orm";
import { todos } from "@/platform/db/schema/todo-table";
import { Event } from "@/platform/flow/flow";
import { TodoCreated, TodoDeleted, TodoUpdated } from "./todo.event.define";

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

export const TodoUpdatedLive = Event.layer(
  TodoUpdated,
  Effect.fn("TodoUpdatedLive")(function* ({ context, event }) {
    yield* context.tx
      .update(todos)
      .set({
        priority: event.payload.priority,
        status: event.payload.status,
        title: event.payload.title,
        updatedAt: new Date().toISOString(),
      })
      .where(
        and(eq(todos.orgId, context.orgId), eq(todos.id, event.payload.todoId)),
      );
  }),
);

export const TodoDeletedLive = Event.layer(
  TodoDeleted,
  Effect.fn("TodoDeletedLive")(function* ({ context, event }) {
    yield* context.tx
      .delete(todos)
      .where(
        and(eq(todos.orgId, context.orgId), eq(todos.id, event.payload.todoId)),
      );
  }),
);
