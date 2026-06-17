import { RpcClient } from "effect/RpcClient";
import { TodoRpcs } from "@acme/effect-api/todo/todo.rpc.interface";

export const TodoRpcClient = RpcClient.make(TodoRpcs, { url: "/rpc/todo" });
