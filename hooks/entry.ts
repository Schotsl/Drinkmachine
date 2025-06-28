import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useMyEntries(args: {
  partyId: Id<"parties">;
  shotglassExposedId: string;
}) {
  return useSuspenseQuery(convexQuery(api.entry.getMyEntries, args));
}
