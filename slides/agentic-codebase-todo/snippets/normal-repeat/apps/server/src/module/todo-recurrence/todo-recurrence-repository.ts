import { and, eq, lte } from "drizzle-orm";
import { todoRecurrences } from "@/platform/db/schema/todo-recurrence-table";
import { todos } from "@/platform/db/schema/todo-table";
import type { Database } from "@/platform/db/client";
import type { ScheduleTodoRecurrenceInput } from "./todo-recurrence-schema";

const weekInMs = 7 * 24 * 60 * 60 * 1000;

export function createTodoRecurrenceRepository(db: Database) {
  return {
    async schedule(input: {
      orgId: string;
      payload: ScheduleTodoRecurrenceInput;
    }) {
      const nextRunAt = new Date(Date.now() + weekInMs).toISOString();

      return db
        .insert(todoRecurrences)
        .values({
          id: generateId("recurrence"),
          interval: input.payload.interval,
          nextRunAt,
          orgId: input.orgId,
          sourceTodoId: input.payload.sourceTodoId,
          timezone: input.payload.timezone,
        })
        .onConflictDoNothing();
    },

    async createDueOccurrence(recurrenceId: string) {
      return db.transaction(async (tx) => {
        const now = new Date().toISOString();
        const [recurrence] = await tx
          .select()
          .from(todoRecurrences)
          .where(
            and(
              eq(todoRecurrences.id, recurrenceId),
              lte(todoRecurrences.nextRunAt, now),
            ),
          )
          .limit(1)
          .for("update");

        if (!recurrence) return null;

        const [source] = await tx
          .select()
          .from(todos)
          .where(eq(todos.id, recurrence.sourceTodoId))
          .limit(1);

        if (!source) return null;

        return tx
          .insert(todos)
          .values({
            id: generateId("todo"),
            assigneeUserId: source.assigneeUserId,
            createdBy: source.createdBy,
            dueAt: recurrence.nextRunAt,
            number: 1,
            orgId: recurrence.orgId,
            priority: source.priority,
            status: "open",
            title: source.title,
          })
          .returning();
      });
    },
  };
}
