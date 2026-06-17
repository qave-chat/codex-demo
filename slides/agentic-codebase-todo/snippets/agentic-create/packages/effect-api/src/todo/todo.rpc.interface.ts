import * as Rpc from "effect/Rpc";
import * as RpcGroup from "effect/RpcGroup";
import { Intent } from "@acme/effect-api/flow/flow.rpc.interface";
import {
  CreateTodoIntentPayloadSchema,
  DeleteTodoIntentPayloadSchema,
  ListTodosInputSchema,
  ListTodosResultSchema,
  UpdateTodoIntentPayloadSchema,
} from "./todo.rpc.schema";

export const IntentType = {
  CreateTodo: "Intent.V1.CreateTodo",
  DeleteTodo: "Intent.V1.DeleteTodo",
  UpdateTodo: "Intent.V1.UpdateTodo",
} as const;

export const CreateTodoIntent = Intent.define({
  payload: CreateTodoIntentPayloadSchema,
  type: IntentType.CreateTodo,
});

export const UpdateTodoIntent = Intent.define({
  payload: UpdateTodoIntentPayloadSchema,
  type: IntentType.UpdateTodo,
});

export const DeleteTodoIntent = Intent.define({
  payload: DeleteTodoIntentPayloadSchema,
  type: IntentType.DeleteTodo,
});

export type TodoIntentInstance =
  | ReturnType<typeof CreateTodoIntent.make>
  | ReturnType<typeof UpdateTodoIntent.make>
  | ReturnType<typeof DeleteTodoIntent.make>;
export type TodoIntentInput =
  | ReturnType<typeof CreateTodoIntent.input>
  | ReturnType<typeof UpdateTodoIntent.input>
  | ReturnType<typeof DeleteTodoIntent.input>;

export class ListTodosRpc extends Rpc.make("Todo/List", {
  payload: ListTodosInputSchema,
  success: ListTodosResultSchema,
}) {}

export const TodoRpcs = RpcGroup.make(ListTodosRpc);
