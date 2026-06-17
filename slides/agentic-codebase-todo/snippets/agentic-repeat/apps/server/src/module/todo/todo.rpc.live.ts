import { Effect } from "effect";
import { ListTodosRpc } from "@acme/effect-api/todo/todo.rpc.interface";
import { listTodos } from "./todo.query";

export const ListTodosLive = ListTodosRpc.toHandler(({ payload, context }) =>
  listTodos({ ...payload, orgId: context.orgId }),
);
