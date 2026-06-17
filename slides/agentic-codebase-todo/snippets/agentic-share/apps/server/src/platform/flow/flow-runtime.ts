import { Context, Effect, Schema } from "effect";
import { events, intents } from "@/platform/db/schema/flow-table";
import { Database } from "@/platform/db/client";
import { FlowRegistry } from "./flow-registry";

export class FlowRuntime extends Context.Service<FlowRuntime>()(
  "platform/FlowRuntime",
  {
    effect: Effect.gen(function* () {
      const db = yield* Database;
      const registry = yield* FlowRegistry;
      return {
        submitIntent: Effect.fn("submitIntent")(function* (input) {
          const intentId = generateId("intent");
          yield* db.insert(intents).values({
            id: intentId,
            actorUserId: input.actorUserId,
            orgId: input.orgId,
            type: input.type,
            payload: input.payload,
            clientKey: input.clientKey,
          });
          yield* db.transaction((tx) =>
            Effect.gen(function* () {
              const intentLayer = registry.intentLayer(input.type);
              const emitted = yield* intentLayer.handler({
                context: {
                  actorUserId: input.actorUserId,
                  orgId: input.orgId,
                  tx,
                },
                intent: input,
              });
              for (const event of emitted) {
                const eventLayer = registry.eventLayer(event.type);
                const payload = yield* Schema.decodeUnknown(
                  eventLayer.event.payload,
                )(event.payload);
                yield* tx.insert(events).values({
                  id: generateId("event"),
                  actorUserId: input.actorUserId,
                  orgId: input.orgId,
                  intentId,
                  type: event.type,
                  payload,
                });
                yield* eventLayer.handler({
                  context: {
                    actorUserId: input.actorUserId,
                    orgId: input.orgId,
                    tx,
                  },
                  event: { ...event, payload },
                });
              }
            }),
          );
          return { intentId };
        }),
      } as const;
    }),
  },
) {}
