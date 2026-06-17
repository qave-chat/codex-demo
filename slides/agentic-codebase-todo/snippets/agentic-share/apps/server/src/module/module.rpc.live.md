# Module RPC Live Files

Applies to: `src/module/**/*.rpc.live.ts`

Enforced by: `./module.rpc.live.lint.ts`

RPC live files adapt package contracts to server reads. They are the boundary between `packages/effect-api` contracts and module query services.

Rules:

- Handle read RPCs only.
- Delegate reads to `*.query.ts` services.
- Do not submit intents from query handlers.
- Do not emit events from query handlers.
- Keep write behavior in `*.intent.live.ts` and event persistence in `*.event.live.ts`.
