import { orgProcedure, router } from "@/platform/trpc/trpc";
import { createTodoInput, listTodosInput, shareTodoInput } from "./todo-schema";

export const todoRouter = router({
  list: orgProcedure
    .input(listTodosInput)
    .query(({ ctx, input }) =>
      ctx.services.todos.list({ ...input, orgId: ctx.org.id }),
    ),
  create: orgProcedure.input(createTodoInput).mutation(({ ctx, input }) =>
    ctx.services.todos.create({
      actorUserId: ctx.user.id,
      orgId: ctx.org.id,
      payload: input,
    }),
  ),
  share: orgProcedure.input(shareTodoInput).mutation(({ ctx, input }) =>
    ctx.services.todos.share({
      actorUserId: ctx.user.id,
      orgId: ctx.org.id,
      payload: input,
    }),
  ),
});
