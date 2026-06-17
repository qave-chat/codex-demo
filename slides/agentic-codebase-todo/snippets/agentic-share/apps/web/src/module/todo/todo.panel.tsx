import { useMachine } from "@xstate/react";
import { todoMachine } from "./todo.machine";
import { TodoUi } from "./todo.ui";

export function TodoPanel() {
  const [state, send] = useMachine(todoMachine);

  return (
    <TodoUi
      error={state.context.error}
      isSharing={state.matches("sharing")}
      onShareCancel={() => send({ type: "shareCancelled" })}
      onShareClick={(todoId) => send({ type: "shareClicked", todoId })}
      onShareMessageChange={(value) =>
        send({ type: "shareMessageChanged", value })
      }
      onShareSubmit={() => send({ type: "shareSubmitted" })}
      onUserChange={(value) => send({ type: "userChanged", value })}
      shareMessage={state.context.shareMessage}
      shareTodoId={state.context.shareTodoId}
      todos={state.context.todos}
      userId={state.context.userId}
    />
  );
}
