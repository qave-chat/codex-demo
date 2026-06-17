import type * as React from "react";

interface TodoListItem {
  readonly id: string;
  readonly number: number;
  readonly title: string;
}

interface TodoUiProps extends React.ComponentProps<"section"> {
  readonly error: string | null;
  readonly isSharing: boolean;
  readonly onShareCancel: () => void;
  readonly onShareClick: (todoId: string) => void;
  readonly onShareMessageChange: (value: string) => void;
  readonly onShareSubmit: () => void;
  readonly onUserChange: (value: string) => void;
  readonly shareMessage: string;
  readonly shareTodoId: string | null;
  readonly todos: readonly TodoListItem[];
  readonly userId: string;
}

const TodoUi = ({
  error,
  isSharing,
  onShareCancel,
  onShareClick,
  onShareMessageChange,
  onShareSubmit,
  onUserChange,
  shareMessage,
  shareTodoId,
  todos,
  userId,
  ...props
}: TodoUiProps) => {
  const selectedTodo = todos.find((todo) => todo.id === shareTodoId) ?? null;

  return (
    <section {...props}>
      <header>
        <p>Shared workspace todos</p>
        <strong>{todos.length}</strong>
      </header>

      {error ? <p role="alert">{error}</p> : null}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>
              #{todo.number} {todo.title}
            </span>
            <button onClick={() => onShareClick(todo.id)} type="button">
              Share
            </button>
          </li>
        ))}
      </ul>

      {selectedTodo ? (
        <form
          aria-label="Share todo"
          onSubmit={(event) => {
            event.preventDefault();
            onShareSubmit();
          }}
        >
          <header>
            <strong>Share #{selectedTodo.number}</strong>
            <span>{selectedTodo.title}</span>
          </header>

          <label>
            User id
            <input
              autoFocus
              onChange={(event) => onUserChange(event.currentTarget.value)}
              placeholder="usr_123"
              value={userId}
            />
          </label>

          <label>
            Message
            <textarea
              onChange={(event) =>
                onShareMessageChange(event.currentTarget.value)
              }
              placeholder="Optional context"
              value={shareMessage}
            />
          </label>

          <footer>
            <button onClick={onShareCancel} type="button">
              Cancel
            </button>
            <button disabled={isSharing || userId.trim() === ""} type="submit">
              {isSharing ? "Sharing..." : "Share todo"}
            </button>
          </footer>
        </form>
      ) : null}
    </section>
  );
};

export { TodoUi };
export type { TodoListItem, TodoUiProps };
