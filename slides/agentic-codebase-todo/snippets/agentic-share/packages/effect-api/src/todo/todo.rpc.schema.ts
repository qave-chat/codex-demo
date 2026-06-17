export const TodoStatusSchema = Schema.Literals(
  "open",
  "in_progress",
  "done",
  "backlog",
);
export const TodoPrioritySchema = Schema.Literals(
  "no_priority",
  "urgent",
  "high",
  "medium",
  "low",
);

export const TodoSchema = Schema.Struct({
  assigneeUserId: Schema.NullOr(Schema.String),
  createdAt: Schema.String,
  id: Schema.String,
  number: Schema.Number,
  orgId: Schema.String,
  priority: TodoPrioritySchema,
  status: TodoStatusSchema,
  title: Schema.String,
  updatedAt: Schema.String,
});

export const ListTodosInputSchema = Schema.Struct({
  limit: Schema.Number,
  q: Schema.optional(Schema.String),
  status: Schema.optional(TodoStatusSchema),
});

export const ListTodosResultSchema = Schema.Array(TodoSchema);

export const CreateTodoIntentPayloadSchema = Schema.Struct({
  assigneeUserId: Schema.optional(Schema.NullOr(Schema.String)),
  description: Schema.optional(Schema.NullOr(Schema.String)),
  dueAt: Schema.optional(Schema.NullOr(Schema.String)),
  priority: Schema.optional(TodoPrioritySchema),
  todoId: Schema.String,
  title: Schema.String,
});

export const ShareTodoIntentPayloadSchema = Schema.Struct({
  message: Schema.optional(Schema.String),
  todoId: Schema.String,
  userId: Schema.String,
});
