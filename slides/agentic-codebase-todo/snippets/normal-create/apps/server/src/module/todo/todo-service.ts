import type {
  CreateTodoInput,
  DeleteTodoInput,
  ListTodosInput,
  UpdateTodoInput,
} from "./todo-schema";
import type { createTodoRepository } from "./todo-repository";

type TodoRepository = ReturnType<typeof createTodoRepository>;

export function createTodoService(repo: TodoRepository) {
  return {
    list(input: ListTodosInput & { orgId: string }) {
      return repo.list(input);
    },

    create(input: {
      actorUserId: string;
      orgId: string;
      payload: CreateTodoInput;
    }) {
      return repo.create({
        ...input,
        payload: { ...input.payload, title: input.payload.title.trim() },
      });
    },

    update(input: { orgId: string; payload: UpdateTodoInput }) {
      return repo.update({
        ...input,
        payload: {
          ...input.payload,
          title: input.payload.title?.trim(),
        },
      });
    },

    delete(input: { orgId: string; payload: DeleteTodoInput }) {
      return repo.delete(input);
    },
  };
}
