import type { inferAsyncReturnType } from "@trpc/server";
import { db } from "@/platform/db/client";
import { getSession } from "@/platform/auth/session";
import { createJobQueue } from "@/platform/jobs/job-queue";
import { createTodoRepository } from "@/module/todo/todo-repository";
import { createTodoService } from "@/module/todo/todo-service";
import { createTodoRecurrenceRepository } from "@/module/todo-recurrence/todo-recurrence-repository";
import { createTodoRecurrenceService } from "@/module/todo-recurrence/todo-recurrence-service";

export async function createTRPCContext({ req }: { req: Request }) {
  const session = await getSession(req);
  const jobs = createJobQueue(db);

  return {
    db,
    org: session.currentOrg,
    services: {
      todos: createTodoService(createTodoRepository(db), jobs),
      todoRecurrences: createTodoRecurrenceService(
        createTodoRecurrenceRepository(db),
        jobs,
      ),
    },
    user: session.user,
  };
}

export type TRPCContext = inferAsyncReturnType<typeof createTRPCContext>;
