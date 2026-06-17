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
  assigneeUserId: z.string().nullable(),
  completedAt: z.string().nullable(),
  createdAt: z.string(),
  createdBy: z.string(),
  description: z.string().nullable(),
  dueAt: z.string().nullable(),
  id: z.string(),
  number: z.number(),
  orgId: z.string(),
  priority: todoPriority,
  status: todoStatus,
  title: z.string(),
  updatedAt: z.string(),
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

export const updateTodoInput = z.object({
  id: z.string(),
  priority: todoPriority.optional(),
  status: todoStatus.optional(),
  title: z.string().trim().min(1).max(180).optional(),
});

export const deleteTodoInput = z.object({ id: z.string() });

export type Todo = z.infer<typeof todo>;
export type ListTodosInput = z.infer<typeof listTodosInput>;
export type CreateTodoInput = z.infer<typeof createTodoInput>;
export type UpdateTodoInput = z.infer<typeof updateTodoInput>;
export type DeleteTodoInput = z.infer<typeof deleteTodoInput>;
