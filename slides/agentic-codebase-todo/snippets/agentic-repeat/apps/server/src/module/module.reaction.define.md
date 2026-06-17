# Module Reaction Define Files

`*.reaction.define.ts` files define event-triggered reactions that run through the platform flow runtime.

Reaction definition files should export `PascalName` constants created with `Reaction.define({ type, schema, on, emits, policy })`. The `type` must be a stable versioned string such as `Reaction.V1.NotifyChannelMembers`.

The `schema` must decode the payload of every event listed in `on`, because the reaction payload is decoded from the triggering event payload. `emits` must list every event type the live handler may return. Omit `emits` or use an empty array for terminal reactions that only perform side effects.

Use `policy` only when the default timeout and retry behavior is not appropriate. Policies may configure `attemptTimeout`, durable first-attempt `delay`, `retry`, and event-age `ttl`.

Definitions must not perform side effects or access services. Put runtime behavior in `*.reaction.live.ts`.

## Examples

Define a reaction that turns one event into another event:

```ts
import { Schema } from "effect";
import { Reaction } from "@/platform/flow/flow.ts";
import { ChannelMessageSent } from "@/module/channel/channel.event.define.ts";
import { NotificationCreated } from "./notification.event.define.ts";

export const NotifyChannelMembers = Reaction.define({
  emits: [NotificationCreated],
  on: [ChannelMessageSent],
  schema: Schema.Struct({
    channelId: Schema.String,
    content: Schema.String,
    messageId: Schema.String,
  }),
  type: "Reaction.V1.NotifyChannelMembers",
});
```

Define a terminal side-effect reaction with an explicit policy:

```ts
import { Duration, Schedule, Schema } from "effect";
import { Reaction } from "@/platform/flow/flow.ts";
import { NotificationCreated } from "./notification.event.define.ts";

export const NotifyPushDelivery = Reaction.define({
  emits: [],
  on: [NotificationCreated],
  policy: {
    attemptTimeout: Duration.seconds(10),
    delay: Duration.seconds(5),
    retry: Schedule.exponential(Duration.seconds(1)).pipe(
      Schedule.jittered,
      Schedule.compose(Schedule.recurs(5)),
    ),
    ttl: Duration.minutes(10),
  },
  schema: Schema.Struct({
    body: Schema.String,
    recipientUserIds: Schema.Array(Schema.String),
    title: Schema.String,
  }),
  type: "Reaction.V1.NotifyPushDelivery",
});
```
