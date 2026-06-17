import type {
  CreateTodoInput,
  ListTodosInput,
  ShareTodoInput,
} from "./todo-schema";
import type { createTodoRepository } from "./todo-repository";
import type { createJobQueue } from "@/platform/jobs/job-queue";
import type { SendNotificationJob } from "@/module/notification/notification-schema";

type TodoRepository = ReturnType<typeof createTodoRepository>;
type JobQueue = ReturnType<typeof createJobQueue>;

export function createTodoService(repo: TodoRepository, jobs: JobQueue) {
  return {
    list(input: ListTodosInput & { orgId: string }) {
      return repo.list(input);
    },

    create(input: {
      actorUserId: string;
      orgId: string;
      payload: CreateTodoInput;
    }) {
      return repo.create({
        ...input,
        payload: { ...input.payload, title: input.payload.title.trim() },
      });
    },

    async share(input: {
      actorUserId: string;
      orgId: string;
      payload: ShareTodoInput;
    }) {
      const todo = await repo.share(input);
      const notification: SendNotificationJob = {
        body: input.payload.message ?? "A todo was shared with you",
        notificationId: generateId("notification"),
        recipientUserIds: [input.payload.userId],
        sourceId: input.payload.todoId,
        title: "Todo shared",
      };
      await jobs.enqueue({
        idempotencyKey:
          "todo-share-notification:" +
          input.orgId +
          ":" +
          input.payload.todoId +
          ":" +
          input.payload.userId,
        orgId: input.orgId,
        payload: notification,
        queue: "notification.send",
      });
      return todo;
    },
  };
}
