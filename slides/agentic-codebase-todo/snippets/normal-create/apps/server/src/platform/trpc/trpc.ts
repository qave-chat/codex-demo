import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import type { TRPCContext } from "./context";

const t = initTRPC.context<TRPCContext>().create({ transformer: superjson });

export const router = t.router;
export const publicProcedure = t.procedure;

export const orgProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user || !ctx.org) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx: { ...ctx, org: ctx.org, user: ctx.user } });
});
