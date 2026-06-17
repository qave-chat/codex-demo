import type { inferAsyncReturnType } from "@trpc/server";
import { db } from "@/platform/db/client";
import { getSession } from "@/platform/auth/session";
import { createJobQueue } from "@/platform/jobs/job-queue";
import { createTodoRepository } from "@/module/todo/todo-repository";
import { createTodoService } from "@/module/todo/todo-service";

export async function createTRPCContext({ req }: { req: Request }) {
  const session = await getSession(req);
  return {
    db,
    org: session.currentOrg,
    services: {
      todos: createTodoService(createTodoRepository(db), createJobQueue(db)),
    },
    user: session.user,
  };
}

export type TRPCContext = inferAsyncReturnType<typeof createTRPCContext>;
