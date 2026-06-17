import { createNotificationRepository } from "./notification-repository";
import { createNotificationService } from "./notification-service";
import { createJobQueue } from "@/platform/jobs/job-queue";
import type { Database } from "@/platform/db/client";

export async function runNotificationWorker(db: Database) {
  const jobs = createJobQueue(db);
  const notifications = createNotificationService(
    createNotificationRepository(db),
  );

  for (const job of await jobs.claim("notification.send")) {
    await notifications.send({ orgId: job.orgId, payload: job.payload });
  }
}
