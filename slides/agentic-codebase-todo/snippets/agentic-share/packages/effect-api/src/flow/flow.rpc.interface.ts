import * as Rpc from "effect/Rpc";
import * as RpcGroup from "effect/RpcGroup";
import {
  SubmitIntentInputSchema,
  SubmitIntentResultSchema,
  WaitForIntentInputSchema,
  WaitForIntentResultSchema,
} from "./flow.rpc.schema";

interface IntentInstance<
  Payload extends Record<string, unknown>,
  Type extends string = string,
> {
  readonly payload: Payload;
  readonly type: Type;
}

interface IntentInput<
  Payload extends Record<string, unknown>,
  Type extends string = string,
> extends IntentInstance<Payload, Type> {
  readonly clientIntentKey: string;
}

export const Intent = {
  define: <
    Payload extends Record<string, unknown>,
    Type extends string,
  >(config: {
    readonly payload: Schema.Schema<Payload>;
    readonly type: Type;
  }) => ({
    input: ({
      clientIntentKey,
      payload,
    }: {
      readonly clientIntentKey: string;
      readonly payload: Payload;
    }): IntentInput<Payload, Type> => ({
      clientIntentKey,
      payload,
      type: config.type,
    }),
    make: (payload: Payload): IntentInstance<Payload, Type> => ({
      payload,
      type: config.type,
    }),
    payload: config.payload,
    type: config.type,
  }),
};

export class SubmitIntentRpc extends Rpc.make("Flow/SubmitIntent", {
  payload: SubmitIntentInputSchema,
  success: SubmitIntentResultSchema,
}) {}

export class WaitForIntentRpc extends Rpc.make("Flow/WaitForIntent", {
  payload: WaitForIntentInputSchema,
  success: WaitForIntentResultSchema,
}) {}

export const FlowRpcs = RpcGroup.make(SubmitIntentRpc, WaitForIntentRpc);
