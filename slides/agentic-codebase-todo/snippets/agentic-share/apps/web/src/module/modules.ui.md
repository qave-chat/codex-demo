# Module UI

Applies to: \`src/module/\*_/_.ui.tsx\`
Enforced by: \`./modules.ui.lint.ts\`

UI files are pure presentational React. They render from props only.

## Rules

- Export named components only.
- Receive data, async status, and callbacks through props.
- Do not import machines, RPC clients, routers, auth clients, or atoms.
- Do not call effect hooks such as \`useEffect\` or \`useLayoutEffect\`.
