import { Schema } from "effect";
import {
  NotificationCreated,
  NotificationFailed,
} from "@/module/notification/notification.event.define";
import { Reaction } from "@/platform/flow/flow";
import { TodoShared } from "./todo.event.define";

export const NotifyTodoShare = Reaction.define({
  emits: [NotificationCreated, NotificationFailed],
  on: [TodoShared],
  schema: Schema.Struct({
    message: Schema.optional(Schema.String),
    todoId: Schema.String,
    userId: Schema.String,
  }),
  type: "Reaction.V1.NotifyTodoShare",
});
