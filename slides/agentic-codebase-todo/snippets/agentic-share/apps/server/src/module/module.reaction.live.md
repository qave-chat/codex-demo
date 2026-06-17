# Module Reaction Live Files

Applies to: `src/module/**/*.reaction.live.ts`

Enforced by: `./module.reaction.live.lint.ts`

Reaction live files execute durable fan-out after events commit. They may read context, check idempotency, and emit follow-up events.

Rules:

- Register behavior with `Reaction.layer`.
- Treat reactions as retryable and idempotent.
- Return emitted events instead of mutating unrelated tables directly.
- Check for no-op cases before writing follow-up state.
- Keep notification, email, and recurrence fan-out out of intent handlers.
