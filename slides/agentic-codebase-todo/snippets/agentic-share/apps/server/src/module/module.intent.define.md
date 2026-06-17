# Module Intent Define

Applies to: \`src/module/\*_/_.intent.define.ts\`
Enforced by: \`./module.intent.define.lint.ts\`

Intent definition files declare business commands that can be submitted through the flow runtime.

## Rules

- Export PascalCase constants created with \`Intent.define({ type, payload, emits })\`.
- Use stable versioned type strings such as \`Intent.V1.CreateTodo\`.
- Keep definitions pure: no database imports, no services, no runtime effects.
- Put behavior in sibling \`\*.intent.live.ts\` files.
