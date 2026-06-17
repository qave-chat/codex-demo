import { assign, fromPromise, setup } from "xstate";
import { ShareTodoIntent } from "@acme/effect-api/todo/todo.rpc.interface";
import { FlowRpcClient } from "./flow.rpc-client";
import { TodoRpcClient } from "./todo.rpc-client";

type ShareInput = {
  readonly message?: string;
  readonly todoId: string;
  readonly userId: string;
};

export const todoMachine = setup({
  actors: {
    listTodos: fromPromise(() => TodoRpcClient.ListTodos({ limit: 50 })),
    shareTodo: fromPromise(({ input }: { input: ShareInput }) =>
      FlowRpcClient.SubmitIntent(
        ShareTodoIntent.input({
          clientIntentKey: "todo.share." + input.todoId + "." + input.userId,
          payload: input,
        }),
      ),
    ),
  },
}).createMachine({
  id: "todo",
  initial: "loading",
  context: {
    error: null as string | null,
    shareMessage: "",
    shareTodoId: null as string | null,
    todos: [],
    userId: "",
  },
  states: {
    loading: {
      invoke: {
        src: "listTodos",
        onDone: {
          target: "ready",
          actions: assign({ todos: ({ event }) => event.output }),
        },
        onError: {
          target: "ready",
          actions: assign({ error: () => "Could not load todos" }),
        },
      },
    },
    ready: {
      on: {
        shareCancelled: {
          actions: assign({ shareMessage: "", shareTodoId: null, userId: "" }),
        },
        shareClicked: {
          actions: assign({
            error: null,
            shareTodoId: ({ event }) => event.todoId,
          }),
        },
        shareMessageChanged: {
          actions: assign({ shareMessage: ({ event }) => event.value }),
        },
        shareSubmitted: "sharing",
        userChanged: {
          actions: assign({ userId: ({ event }) => event.value }),
        },
      },
    },
    sharing: {
      invoke: {
        src: "shareTodo",
        input: ({ context }) => ({
          message: context.shareMessage.trim() || undefined,
          todoId: context.shareTodoId!,
          userId: context.userId.trim(),
        }),
        onDone: {
          target: "loading",
          actions: assign({ shareMessage: "", shareTodoId: null, userId: "" }),
        },
        onError: {
          target: "ready",
          actions: assign({ error: () => "Could not share todo" }),
        },
      },
    },
  },
});
