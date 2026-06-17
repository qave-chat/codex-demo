import { FlowRpcs } from "@acme/effect-api/flow/flow.rpc.interface";

export const FlowRpcClient = RpcClient.make(FlowRpcs, { url: "/rpc/flow" });
