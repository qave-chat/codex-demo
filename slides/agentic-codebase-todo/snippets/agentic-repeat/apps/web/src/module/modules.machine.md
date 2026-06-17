# Module Machine

Applies to: \`src/module/\*_/_.machine.ts\`
Enforced by: \`./modules.machine.lint.ts\`

Machine files own state transitions and async actors. They are React-free and UI-free.

## Rules

- Export a named XState machine.
- Keep JSX and React hooks out of machine files.
- Invoke RPC calls through actors owned by machine states.
- Components send events and render snapshots; machines decide what work runs.
