export const moduleReactionLiveFilePatterns = ["*.reaction.live.ts"] as const;

export const moduleReactionLiveRules = [
  "reaction-layer-required",
  "idempotency-check-required",
  "return-events-not-side-table-writes",
  "no-intent-handler-fanout",
  "retry-safe-effects-only",
] as const;
