import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/platform/trpc/root";

export const trpc = createTRPCReact<AppRouter>();
