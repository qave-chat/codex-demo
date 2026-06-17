const moduleIntentDefineFilePatterns = ["*.intent.define.ts"] as const;

const moduleIntentDefineRules = [
  "intent-definitions-only",
  "stable-versioned-type",
  "no-database-imports",
  "no-service-access",
  "live-behavior-in-intent-live",
] as const;

export { moduleIntentDefineFilePatterns, moduleIntentDefineRules };
