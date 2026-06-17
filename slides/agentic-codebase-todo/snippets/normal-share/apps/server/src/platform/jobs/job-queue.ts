import { and, eq, lte } from "drizzle-orm";
import { jobs } from "@/platform/db/schema/job-table";
import type { Database } from "@/platform/db/client";

export function createJobQueue(db: Database) {
  return {
    enqueue(input: {
      idempotencyKey: string;
      orgId: string;
      payload: Record<string, unknown>;
      queue: string;
      runAt?: string;
    }) {
      return db
        .insert(jobs)
        .values({
          id: generateId("job"),
          availableAt: input.runAt ?? new Date().toISOString(),
          idempotencyKey: input.idempotencyKey,
          orgId: input.orgId,
          payload: input.payload,
          queue: input.queue,
        })
        .onConflictDoNothing();
    },
    claim(queue: string, limit = 25) {
      return db
        .select()
        .from(jobs)
        .where(
          and(
            eq(jobs.queue, queue),
            eq(jobs.status, "pending"),
            lte(jobs.availableAt, new Date().toISOString()),
          ),
        )
        .limit(limit)
        .for("update", { skipLocked: true });
    },
  };
}
