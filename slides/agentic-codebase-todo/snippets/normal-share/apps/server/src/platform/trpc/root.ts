import { router } from "./trpc";
import { todoRouter } from "@/module/todo/todo-router";

export const appRouter = router({ todo: todoRouter });
export type AppRouter = typeof appRouter;
