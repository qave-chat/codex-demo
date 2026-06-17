import type { Meta, StoryObj } from "@storybook/react";
import { TodoUi } from "./todo.ui";

const meta = { component: TodoUi, title: "module/todo/TodoUi" } satisfies Meta<
  typeof TodoUi
>;
export default meta;
type Story = StoryObj<typeof meta>;

const todos = [
  { id: "todo_1", number: 1, title: "Write module contract" },
  { id: "todo_2", number: 2, title: "Review reaction policy" },
];

export const Loaded: Story = {
  args: {
    error: null,
    isSharing: false,
    onShareCancel: () => {},
    onShareClick: () => {},
    onShareMessageChange: () => {},
    onShareSubmit: () => {},
    onUserChange: () => {},
    shareMessage: "",
    shareTodoId: null,
    todos,
    userId: "",
  },
};

export const ShareDialogOpen: Story = {
  args: {
    ...Loaded.args,
    shareMessage: "Please take the notification copy pass.",
    shareTodoId: "todo_1",
    userId: "usr_design",
  },
};

export const ShareFailed: Story = {
  args: {
    ...ShareDialogOpen.args,
    error: "Could not share todo",
  },
};
