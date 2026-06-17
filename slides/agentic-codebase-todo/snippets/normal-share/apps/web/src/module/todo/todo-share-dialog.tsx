import type { FormEvent } from "react";

interface TodoShareDialogProps {
  readonly canSubmit: boolean;
  readonly error: string | null;
  readonly isSubmitting: boolean;
  readonly message: string;
  readonly onCancel: () => void;
  readonly onMessageChange: (value: string) => void;
  readonly onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  readonly onUserIdChange: (value: string) => void;
  readonly todoTitle: string;
  readonly userId: string;
}

export function TodoShareDialog(props: TodoShareDialogProps) {
  return (
    <form className="share-dialog" onSubmit={props.onSubmit}>
      <header>
        <strong>Share todo</strong>
        <span>{props.todoTitle}</span>
      </header>

      <label>
        User id
        <input
          autoFocus
          onChange={(event) => props.onUserIdChange(event.currentTarget.value)}
          placeholder="usr_123"
          value={props.userId}
        />
      </label>

      <label>
        Message
        <textarea
          onChange={(event) => props.onMessageChange(event.currentTarget.value)}
          placeholder="Optional context"
          value={props.message}
        />
      </label>

      {props.error ? <p role="alert">{props.error}</p> : null}

      <footer>
        <button onClick={props.onCancel} type="button">
          Cancel
        </button>
        <button disabled={!props.canSubmit} type="submit">
          {props.isSubmitting ? "Sending..." : "Send invite"}
        </button>
      </footer>
    </form>
  );
}
