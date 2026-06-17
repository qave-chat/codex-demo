import type { Meta, StoryObj } from "@storybook/react";
import { TodoUi } from "./todo.ui";

const meta = { component: TodoUi, title: "module/todo/TodoUi" } satisfies Meta<
  typeof TodoUi
>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    error: null,
    isCreating: false,
    isLoading: false,
    onCreateSubmit: () => {},
    onDelete: () => {},
    onRetry: () => {},
    onTitleChange: () => {},
    onUpdate: () => {},
    title: "",
    todos: [],
  },
};
export const Loaded: Story = {
  args: {
    ...Empty.args,
    todos: [{ id: "todo_1", number: 1, title: "Write contract" }],
  },
};
export const CreateFailed: Story = {
  args: { ...Loaded.args, error: "Could not create todo" },
};
