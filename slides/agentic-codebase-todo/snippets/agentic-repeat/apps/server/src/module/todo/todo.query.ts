import { eq } from "drizzle-orm";
import { Effect, Schema } from "effect";
import { Database } from "@/platform/db/client";
import { todos } from "@/platform/db/schema/todo-table";
import { TodoSchema } from "@acme/effect-api/todo/todo.rpc.schema";

export const listTodos = (input: { limit: number; orgId: string }) =>
  Effect.gen(function* () {
    const db = yield* Database;
    const rows = yield* db
      .select()
      .from(todos)
      .where(eq(todos.orgId, input.orgId))
      .limit(input.limit);
    return yield* Schema.decodeUnknown(Schema.Array(TodoSchema))(rows);
  });
