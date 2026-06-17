import { db } from "@/platform/db/client";
import { createJobQueue } from "@/platform/jobs/job-queue";
import { createTodoRecurrenceRepository } from "./todo-recurrence-repository";
import { createTodoRecurrenceService } from "./todo-recurrence-service";

const jobs = createJobQueue(db);
const recurrences = createTodoRecurrenceService(
  createTodoRecurrenceRepository(db),
  jobs,
);

export async function runTodoRecurrenceWorker(signal: AbortSignal) {
  while (!signal.aborted) {
    const claimed = await jobs.claim("todo-recurrence", 50);

    for (const job of claimed) {
      const payload = job.payload as { recurrenceId: string };
      await recurrences.createDueOccurrence(payload.recurrenceId);
    }

    await new Promise((resolve) => setTimeout(resolve, 10_000));
  }
}
