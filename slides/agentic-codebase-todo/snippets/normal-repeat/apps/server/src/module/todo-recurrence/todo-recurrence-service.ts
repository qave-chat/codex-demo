import type { createJobQueue } from "@/platform/jobs/job-queue";
import type { createTodoRecurrenceRepository } from "./todo-recurrence-repository";
import type { ScheduleTodoRecurrenceInput } from "./todo-recurrence-schema";

type JobQueue = ReturnType<typeof createJobQueue>;
type TodoRecurrenceRepository = ReturnType<
  typeof createTodoRecurrenceRepository
>;

export function createTodoRecurrenceService(
  repo: TodoRecurrenceRepository,
  jobs: JobQueue,
) {
  return {
    async schedule(input: {
      orgId: string;
      payload: ScheduleTodoRecurrenceInput;
    }) {
      await repo.schedule(input);

      return jobs.enqueue({
        idempotencyKey:
          "todo-recurrence:" + input.orgId + ":" + input.payload.sourceTodoId,
        orgId: input.orgId,
        payload: { sourceTodoId: input.payload.sourceTodoId },
        queue: "todo-recurrence",
      });
    },

    createDueOccurrence(recurrenceId: string) {
      return repo.createDueOccurrence(recurrenceId);
    },
  };
}
