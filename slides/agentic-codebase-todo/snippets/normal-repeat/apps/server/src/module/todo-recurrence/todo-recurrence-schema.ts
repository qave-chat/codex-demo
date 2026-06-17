import { z } from "zod";

export const recurrenceInterval = z.enum(["daily", "weekly", "monthly"]);

export const scheduleTodoRecurrenceInput = z.object({
  interval: recurrenceInterval,
  sourceTodoId: z.string(),
  timezone: z.string().default("UTC"),
});

export type ScheduleTodoRecurrenceInput = z.infer<
  typeof scheduleTodoRecurrenceInput
>;
