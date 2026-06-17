import * as Rpc from "effect/Rpc";
import * as RpcGroup from "effect/RpcGroup";
import { Intent } from "@acme/effect-api/flow/flow.rpc.interface";
import {
  CreateTodoIntentPayloadSchema,
  ListTodosInputSchema,
  ListTodosResultSchema,
  ScheduleTodoRecurrenceIntentPayloadSchema,
  ShareTodoIntentPayloadSchema,
} from "./todo.rpc.schema";

export const IntentType = {
  CreateTodo: "Intent.V1.CreateTodo",
  ScheduleTodoRecurrence: "Intent.V1.ScheduleTodoRecurrence",
  ShareTodo: "Intent.V1.ShareTodo",
} as const;

export const CreateTodoIntent = Intent.define({
  payload: CreateTodoIntentPayloadSchema,
  type: IntentType.CreateTodo,
});

export const ShareTodoIntent = Intent.define({
  payload: ShareTodoIntentPayloadSchema,
  type: IntentType.ShareTodo,
});

export const ScheduleTodoRecurrenceIntent = Intent.define({
  payload: ScheduleTodoRecurrenceIntentPayloadSchema,
  type: IntentType.ScheduleTodoRecurrence,
});

export type TodoIntentInstance =
  | ReturnType<typeof CreateTodoIntent.make>
  | ReturnType<typeof ScheduleTodoRecurrenceIntent.make>
  | ReturnType<typeof ShareTodoIntent.make>;

export type TodoIntentInput =
  | ReturnType<typeof CreateTodoIntent.input>
  | ReturnType<typeof ScheduleTodoRecurrenceIntent.input>
  | ReturnType<typeof ShareTodoIntent.input>;

export class ListTodosRpc extends Rpc.make("Todo/List", {
  payload: ListTodosInputSchema,
  success: ListTodosResultSchema,
}) {}

export const TodoRpcs = RpcGroup.make(ListTodosRpc);
