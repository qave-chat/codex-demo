import { assign, fromPromise, setup } from "xstate";
import {
  CreateTodoIntent,
  DeleteTodoIntent,
  UpdateTodoIntent,
} from "@acme/effect-api/todo/todo.rpc.interface";
import { FlowRpcClient } from "./flow.rpc-client";
import { TodoRpcClient } from "./todo.rpc-client";

export const todoMachine = setup({
  actors: {
    listTodos: fromPromise(() => TodoRpcClient.ListTodos({ limit: 50 })),
    createTodo: fromPromise(({ input }: { input: { title: string } }) =>
      FlowRpcClient.SubmitIntent(
        CreateTodoIntent.input({
          clientIntentKey: "todo.create." + crypto.randomUUID(),
          payload: { ...input, todoId: generateId("todo") },
        }),
      ),
    ),
    updateTodo: fromPromise(({ input }: { input: { id: string } }) =>
      FlowRpcClient.SubmitIntent(
        UpdateTodoIntent.input({
          clientIntentKey: "todo.update." + input.id,
          payload: { todoId: input.id, status: "done" },
        }),
      ),
    ),
    deleteTodo: fromPromise(({ input }: { input: { id: string } }) =>
      FlowRpcClient.SubmitIntent(
        DeleteTodoIntent.input({
          clientIntentKey: "todo.delete." + input.id,
          payload: { todoId: input.id },
        }),
      ),
    ),
  },
}).createMachine({
  id: "todo",
  initial: "loading",
  context: {
    error: null as string | null,
    selectedTodoId: null as string | null,
    title: "",
    todos: [],
  },
  states: {
    loading: {
      invoke: {
        src: "listTodos",
        onDone: {
          target: "ready",
          actions: assign({ todos: ({ event }) => event.output }),
        },
        onError: "failed",
      },
    },
    ready: {
      on: {
        titleChanged: {
          actions: assign({ title: ({ event }) => event.value }),
        },
        deleted: {
          actions: assign({ selectedTodoId: ({ event }) => event.id }),
          target: "deleting",
        },
        submitted: "creating",
        updated: {
          actions: assign({ selectedTodoId: ({ event }) => event.id }),
          target: "updating",
        },
      },
    },
    creating: {
      invoke: {
        src: "createTodo",
        input: ({ context }) => ({ title: context.title }),
        onDone: "loading",
        onError: {
          target: "ready",
          actions: assign({ error: () => "Could not create todo" }),
        },
      },
    },
    updating: {
      invoke: {
        src: "updateTodo",
        input: ({ context }) => ({ id: context.selectedTodoId! }),
        onDone: "loading",
        onError: {
          target: "ready",
          actions: assign({ error: () => "Could not update todo" }),
        },
      },
    },
    deleting: {
      invoke: {
        src: "deleteTodo",
        input: ({ context }) => ({ id: context.selectedTodoId! }),
        onDone: "loading",
        onError: {
          target: "ready",
          actions: assign({ error: () => "Could not delete todo" }),
        },
      },
    },
    failed: { on: { retried: "loading" } },
  },
});
