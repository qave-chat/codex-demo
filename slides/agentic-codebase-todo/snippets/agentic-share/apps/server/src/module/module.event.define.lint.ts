const moduleEventDefineFilePatterns = ["*.event.define.ts"] as const;

const moduleEventDefineRules = [
  "event-definitions-only",
  "stable-versioned-type",
  "no-database-imports",
  "no-service-access",
  "live-behavior-in-event-live",
] as const;

export { moduleEventDefineFilePatterns, moduleEventDefineRules };
