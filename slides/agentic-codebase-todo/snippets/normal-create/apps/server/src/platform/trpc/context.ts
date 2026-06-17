import type { inferAsyncReturnType } from "@trpc/server";
import { db } from "@/platform/db/client";
import { getSession } from "@/platform/auth/session";
import { createTodoRepository } from "@/module/todo/todo-repository";
import { createTodoService } from "@/module/todo/todo-service";

export async function createTRPCContext({ req }: { req: Request }) {
  const session = await getSession(req);
  const todoRepository = createTodoRepository(db);

  return {
    db,
    org: session.currentOrg,
    services: { todos: createTodoService(todoRepository) },
    user: session.user,
  };
}

export type TRPCContext = inferAsyncReturnType<typeof createTRPCContext>;
