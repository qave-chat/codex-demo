import { router } from "./trpc";
import { todoRouter } from "@/module/todo/todo-router";
import { todoRecurrenceRouter } from "@/module/todo-recurrence/todo-recurrence-router";

export const appRouter = router({
  todo: todoRouter,
  todoRecurrence: todoRecurrenceRouter,
});
export type AppRouter = typeof appRouter;
