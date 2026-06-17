import { type FormEvent, useMemo, useState } from "react";
import { trpc } from "./todo-api";
import { TodoShareDialog } from "./todo-share-dialog";

export function TodoList() {
  const [shareTodoId, setShareTodoId] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState("");
  const [userId, setUserId] = useState("");
  const utils = trpc.useUtils();

  const todos = trpc.todo.list.useQuery({ limit: 50 });
  const shareTodo = trpc.todo.share.useMutation({
    onSuccess: async () => {
      setShareMessage("");
      setShareTodoId(null);
      setUserId("");
      await utils.todo.list.invalidate();
    },
  });

  const selectedTodo = useMemo(
    () => todos.data?.find((todo) => todo.id === shareTodoId) ?? null,
    [shareTodoId, todos.data],
  );

  const canSubmitShare =
    Boolean(shareTodoId && userId.trim()) && !shareTodo.isPending;

  function submitShare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!shareTodoId || !canSubmitShare) return;

    shareTodo.mutate({
      message: shareMessage.trim() || undefined,
      todoId: shareTodoId,
      userId: userId.trim(),
    });
  }

  return (
    <section className="todo-panel">
      <header>
        <p>Open todos</p>
        <strong>{todos.data?.length ?? 0}</strong>
      </header>

      {todos.isLoading ? <p>Loading...</p> : null}
      {todos.error ? <p role="alert">Could not load todos.</p> : null}

      <ul>
        {(todos.data ?? []).map((todo) => (
          <li key={todo.id}>
            <span>
              #{todo.number} {todo.title}
            </span>
            <button onClick={() => setShareTodoId(todo.id)} type="button">
              Share
            </button>
          </li>
        ))}
      </ul>

      {selectedTodo ? (
        <TodoShareDialog
          canSubmit={canSubmitShare}
          error={shareTodo.error?.message ?? null}
          isSubmitting={shareTodo.isPending}
          message={shareMessage}
          onCancel={() => setShareTodoId(null)}
          onMessageChange={setShareMessage}
          onSubmit={submitShare}
          onUserIdChange={setUserId}
          todoTitle={selectedTodo.title}
          userId={userId}
        />
      ) : null}
    </section>
  );
}
