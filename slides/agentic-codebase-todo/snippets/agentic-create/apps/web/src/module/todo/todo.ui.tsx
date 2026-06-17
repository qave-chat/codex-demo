import type * as React from "react";

interface TodoListItem {
  readonly id: string;
  readonly number: number;
  readonly title: string;
}

interface TodoUiProps extends React.ComponentProps<"section"> {
  readonly error: string | null;
  readonly isCreating: boolean;
  readonly isLoading: boolean;
  readonly onCreateSubmit: () => void;
  readonly onDelete: (id: string) => void;
  readonly onRetry: () => void;
  readonly onTitleChange: (value: string) => void;
  readonly onUpdate: (id: string) => void;
  readonly title: string;
  readonly todos: readonly TodoListItem[];
}

const TodoUi = ({
  error,
  isCreating,
  isLoading,
  onCreateSubmit,
  onDelete,
  onRetry,
  onTitleChange,
  onUpdate,
  title,
  todos,
  ...props
}: TodoUiProps) => (
  <section {...props}>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onCreateSubmit();
      }}
    >
      <input
        aria-label="Todo title"
        onChange={(event) => onTitleChange(event.currentTarget.value)}
        placeholder="Add todo"
        value={title}
      />
      <button disabled={isCreating || title.trim() === ""} type="submit">
        Add
      </button>
    </form>
    {isLoading ? <p>Loading todos...</p> : null}
    {error ? (
      <button onClick={onRetry} type="button">
        {error}. Retry
      </button>
    ) : null}
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>
            {todo.number}. {todo.title}
          </span>
          <button onClick={() => onUpdate(todo.id)} type="button">
            Done
          </button>
          <button onClick={() => onDelete(todo.id)} type="button">
            Delete
          </button>
        </li>
      ))}
    </ul>
  </section>
);

export { TodoUi };
export type { TodoListItem, TodoUiProps };
