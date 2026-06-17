export const SubmitIntentInputSchema = Schema.Struct({
  clientIntentKey: Schema.String,
  orgId: Schema.optional(Schema.String),
  payload: Schema.Record(Schema.String, Schema.Unknown),
  type: Schema.String,
});

export const SubmitIntentResultSchema = Schema.Struct({
  intentId: Schema.String,
  status: Schema.Literal("accepted"),
});

export const WaitForIntentInputSchema = Schema.Struct({
  intentId: Schema.String,
  target: Schema.Literal("completed"),
  timeoutMs: Schema.Number,
});

export const WaitForIntentResultSchema = Schema.Struct({
  intentId: Schema.String,
  status: Schema.Literals("accepted", "processing", "completed", "failed"),
});
