import { orgProcedure, router } from "@/platform/trpc/trpc";
import {
  createTodoInput,
  deleteTodoInput,
  listTodosInput,
  updateTodoInput,
} from "./todo-schema";

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

  update: orgProcedure
    .input(updateTodoInput)
    .mutation(({ ctx, input }) =>
      ctx.services.todos.update({ orgId: ctx.org.id, payload: input }),
    ),

  delete: orgProcedure
    .input(deleteTodoInput)
    .mutation(({ ctx, input }) =>
      ctx.services.todos.delete({ orgId: ctx.org.id, payload: input }),
    ),
});
