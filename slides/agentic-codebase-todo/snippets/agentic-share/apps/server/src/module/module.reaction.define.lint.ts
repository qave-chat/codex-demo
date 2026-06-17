export const moduleReactionDefineFilePatterns = [
  "*.reaction.define.ts",
] as const;

export const moduleReactionDefineRules = [
  "reaction-definitions-only",
  "stable-versioned-type",
  "explicit-on-emits-schema-type",
  "no-database-imports",
  "live-behavior-in-reaction-live",
] as const;
