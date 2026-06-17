import { z } from "zod";

export const todoStatus = z.enum(["open", "in_progress", "done", "backlog"]);
export const todoPriority = z.enum([
  "no_priority",
  "urgent",
  "high",
  "medium",
  "low",
]);
export const todo = z.object({
  id: z.string(),
  title: z.string(),
  number: z.number(),
  orgId: z.string(),
  assigneeUserId: z.string().nullable(),
  status: todoStatus,
  priority: todoPriority,
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  completedAt: z.string().nullable(),
  description: z.string().nullable(),
  dueAt: z.string().nullable(),
});
export const listTodosInput = z.object({
  assigneeUserId: z.string().optional(),
  cursor: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(50),
  q: z.string().trim().optional(),
  status: todoStatus.optional(),
});
export const createTodoInput = z.object({
  assigneeUserId: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  dueAt: z.string().datetime().nullable().optional(),
  priority: todoPriority.optional(),
  title: z.string().trim().min(1).max(180),
});
export const shareTodoInput = z.object({
  message: z.string().max(500).optional(),
  todoId: z.string(),
  userId: z.string(),
});
export type ListTodosInput = z.infer<typeof listTodosInput>;
export type CreateTodoInput = z.infer<typeof createTodoInput>;
export type ShareTodoInput = z.infer<typeof shareTodoInput>;
