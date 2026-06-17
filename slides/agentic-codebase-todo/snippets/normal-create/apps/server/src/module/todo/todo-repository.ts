import { and, asc, eq, gt, ilike, sql, type SQL } from "drizzle-orm";
import { todos } from "@/platform/db/schema/todo-table";
import type { Database } from "@/platform/db/client";
import {
  todo,
  type CreateTodoInput,
  type DeleteTodoInput,
  type ListTodosInput,
  type UpdateTodoInput,
} from "./todo-schema";

const whereTodos = (
  input: ListTodosInput & { orgId: string },
): SQL | undefined =>
  and(
    eq(todos.orgId, input.orgId),
    input.assigneeUserId
      ? eq(todos.assigneeUserId, input.assigneeUserId)
      : undefined,
    input.status ? eq(todos.status, input.status) : undefined,
    input.q ? ilike(todos.title, "%" + input.q + "%") : undefined,
  );

export function createTodoRepository(db: Database) {
  return {
    async list(input: ListTodosInput & { orgId: string }) {
      const rows = await db
        .select()
        .from(todos)
        .where(
          and(
            whereTodos(input),
            input.cursor ? gt(todos.createdAt, input.cursor) : undefined,
          ),
        )
        .orderBy(asc(todos.createdAt), asc(todos.id))
        .limit(input.limit);

      return rows.map((row) => todo.parse(row));
    },

    async create(input: {
      actorUserId: string;
      orgId: string;
      payload: CreateTodoInput;
    }) {
      const [row] = await db
        .insert(todos)
        .values({
          assigneeUserId: input.payload.assigneeUserId ?? null,
          createdBy: input.actorUserId,
          description: input.payload.description ?? null,
          dueAt: input.payload.dueAt ?? null,
          id: generateId("todo"),
          number: sql.raw("next_todo_number()"),
          orgId: input.orgId,
          priority: input.payload.priority ?? "no_priority",
          status: "open",
          title: input.payload.title,
        })
        .returning();

      return todo.parse(row);
    },

    async update(input: { orgId: string; payload: UpdateTodoInput }) {
      const [row] = await db
        .update(todos)
        .set({
          priority: input.payload.priority,
          status: input.payload.status,
          title: input.payload.title,
          updatedAt: new Date().toISOString(),
        })
        .where(
          and(eq(todos.orgId, input.orgId), eq(todos.id, input.payload.id)),
        )
        .returning();

      return todo.parse(row);
    },

    async delete(input: { orgId: string; payload: DeleteTodoInput }) {
      await db
        .delete(todos)
        .where(
          and(eq(todos.orgId, input.orgId), eq(todos.id, input.payload.id)),
        );
      return { id: input.payload.id };
    },
  };
}
