import { Context, Effect } from "effect";

export class FlowRegistry extends Context.Service<FlowRegistry>()(
  "platform/FlowRegistry",
  {
    effect: Effect.gen(function* () {
      const eventLayers = new Map<string, any>();
      const intentLayers = new Map<string, any>();
      const reactionLayers = new Map<string, any>();

      return {
        eventLayer: (type: string) => eventLayers.get(type),
        intentLayer: (type: string) => intentLayers.get(type),
        reactionLayer: (type: string) => reactionLayers.get(type),
        register: Effect.fn("register")(function* (input) {
          for (const layer of input.events ?? []) eventLayers.set(layer.event.type, layer);
          for (const layer of input.intents ?? []) intentLayers.set(layer.intent.type, layer);
          for (const layer of input.reactions ?? []) {
            reactionLayers.set(layer.reaction.type, layer);
          }
        }),
      } as const;
    }),
  },
) {}
