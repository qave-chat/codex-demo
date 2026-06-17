# Module Reaction Define Files

Applies to: `src/module/**/*.reaction.define.ts`

Enforced by: `./module.reaction.define.lint.ts`

Reaction define files declare fan-out from domain events. They name which events trigger follow-up work and which events may be emitted.

Rules:

- Export PascalCase constants created with `Reaction.define`.
- Use stable versioned reaction type strings.
- Declare `on`, `emits`, `schema`, and `type` explicitly.
- Do not import the database, services, clients, or clocks.
- Runtime behavior belongs in `*.reaction.live.ts`.
