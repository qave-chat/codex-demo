const machineFilePatterns = ["*.machine.ts"] as const;

const machineRules = [
  "xstate-machine-required",
  "react-free",
  "ui-free",
  "async-work-in-actors",
  "export-machine-types",
] as const;

export { machineFilePatterns, machineRules };
