export const moduleReactionPolicyFilePatterns = [
  "*.reaction.define.ts",
] as const;

export const moduleReactionPolicyRules = [
  "idempotency-key-required-for-recursive-reactions",
  "attempt-timeout-required",
  "retry-schedule-required",
  "ttl-required-for-delayed-work",
  "policy-near-definition",
] as const;
