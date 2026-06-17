import { useMachine } from "@xstate/react";
import { todoMachine } from "./todo.machine";
import { TodoUi } from "./todo.ui";

export function TodoPanel() {
  const [state, send] = useMachine(todoMachine);
  return (
    <TodoUi
      error={state.context.error}
      isCreating={state.matches("creating")}
      isLoading={state.matches("loading")}
      onCreateSubmit={() => send({ type: "submitted" })}
      onDelete={(id) => send({ type: "deleted", id })}
      onRetry={() => send({ type: "retried" })}
      onTitleChange={(value) => send({ type: "titleChanged", value })}
      onUpdate={(id) => send({ type: "updated", id })}
      title={state.context.title}
      todos={state.context.todos}
    />
  );
}
