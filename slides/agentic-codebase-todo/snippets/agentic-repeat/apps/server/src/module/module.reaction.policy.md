# Module Reaction Policy Files

Applies to: reaction definitions with `policy` blocks.

Enforced by: `./module.reaction.policy.lint.ts`

Reaction policy rules make durable work explicit. Recurrence, delayed delivery, and retryable fan-out must declare timing and failure behavior where the reaction is defined.

Rules:

- Declare `idempotencyKey` for reactions that can re-enqueue themselves.
- Declare `attemptTimeout` for any external IO or recurrence generation.
- Declare retry schedule and max attempts for durable work.
- Declare `ttl` for work that becomes stale.
- Keep policy values near the reaction definition, not hidden in workers.
