import { and, eq } from "drizzle-orm";
import { todos } from "@/platform/db/schema/todo-table";
import { todoShares } from "@/platform/db/schema/todo-share-table";
import type { Database } from "@/platform/db/client";
import { todo, type ShareTodoInput } from "./todo-schema";

export function createTodoRepository(db: Database) {
  return {
    async list(input) {
      const rows = await db
        .select()
        .from(todos)
        .where(eq(todos.orgId, input.orgId))
        .limit(input.limit);
      return rows.map((row) => todo.parse(row));
    },
    async create(input) {
      const [row] = await db
        .insert(todos)
        .values({
          id: generateId("todo"),
          orgId: input.orgId,
          createdBy: input.actorUserId,
          number: 1,
          title: input.payload.title,
        })
        .returning();
      return todo.parse(row);
    },
    async share(input: {
      actorUserId: string;
      orgId: string;
      payload: ShareTodoInput;
    }) {
      return db.transaction(async (tx) => {
        const [row] = await tx
          .select()
          .from(todos)
          .where(
            and(
              eq(todos.id, input.payload.todoId),
              eq(todos.orgId, input.orgId),
            ),
          )
          .limit(1)
          .for("update");
        if (!row) throw new Error("Todo not found");
        await tx
          .insert(todoShares)
          .values({
            id: generateId("share"),
            createdBy: input.actorUserId,
            message: input.payload.message ?? null,
            orgId: input.orgId,
            todoId: input.payload.todoId,
            userId: input.payload.userId,
          })
          .onConflictDoNothing();
        return todo.parse(row);
      });
    },
  };
}
