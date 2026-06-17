import { orgProcedure, router } from "@/platform/trpc/trpc";
import { scheduleTodoRecurrenceInput } from "./todo-recurrence-schema";

export const todoRecurrenceRouter = router({
  schedule: orgProcedure
    .input(scheduleTodoRecurrenceInput)
    .mutation(({ ctx, input }) =>
      ctx.services.todoRecurrences.schedule({
        orgId: ctx.org.id,
        payload: input,
      }),
    ),
});
