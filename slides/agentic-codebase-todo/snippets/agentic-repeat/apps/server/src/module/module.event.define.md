# Module Event Define

Applies to: \`src/module/\*_/_.event.define.ts\`
Enforced by: \`./module.event.define.lint.ts\`

Event definition files declare facts emitted by intent handlers and consumed by reactions.

## Rules

- Export PascalCase constants created with \`Event.define({ type, payload })\`.
- Use stable versioned type strings such as \`Event.V1.TodoCreated\`.
- Keep definitions pure: no database imports, no services, no runtime effects.
- Put write behavior in sibling \`\*.event.live.ts\` files.
