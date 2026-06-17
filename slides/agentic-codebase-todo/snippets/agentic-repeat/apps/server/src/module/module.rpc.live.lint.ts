export const moduleRpcLiveFilePatterns = ["*.rpc.live.ts"] as const;

export const moduleRpcLiveRules = [
  "read-rpcs-only",
  "delegate-to-query-service",
  "no-intent-submit-in-query-handler",
  "no-event-emit-in-query-handler",
  "no-direct-write-mutations",
] as const;
