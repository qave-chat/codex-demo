const uiFilePatterns = ["*.ui.tsx"] as const;

const uiRules = [
  "presentational-only",
  "props-in-jsx-out",
  "prefer-component-composition",
  "no-rpc-clients",
  "no-machines",
  "no-effects",
] as const;

export { uiFilePatterns, uiRules };
