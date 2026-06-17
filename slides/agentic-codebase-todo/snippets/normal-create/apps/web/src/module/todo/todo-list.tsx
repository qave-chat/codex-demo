import { useState } from "react";
import { trpc } from "./todo-api";

export function TodoList() {
  const [title, setTitle] = useState("");
  const utils = trpc.useUtils();
  const todos = trpc.todo.list.useQuery({ limit: 50 });
  const createTodo = trpc.todo.create.useMutation({
    onSuccess: async () => {
      setTitle("");
      await utils.todo.list.invalidate();
    },
  });
  const updateTodo = trpc.todo.update.useMutation({
    onSuccess: () => utils.todo.list.invalidate(),
  });
  const deleteTodo = trpc.todo.delete.useMutation({
    onSuccess: () => utils.todo.list.invalidate(),
  });

  return (
    <section className="todo-panel">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createTodo.mutate({ title });
        }}
      >
        <input
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          placeholder="Add todo"
        />
        <button disabled={createTodo.isPending || title.trim() === ""}>
          Add
        </button>
      </form>
      <ul>
        {(todos.data ?? []).map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <button
              disabled={updateTodo.isPending}
              onClick={() => updateTodo.mutate({ id: todo.id, status: "done" })}
              type="button"
            >
              Done
            </button>
            <button
              disabled={deleteTodo.isPending}
              onClick={() => deleteTodo.mutate({ id: todo.id })}
              type="button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
