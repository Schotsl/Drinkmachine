import { useSuspenseQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@/convex/_generated/api";

export function useCurrentParty() {
  return useSuspenseQuery(convexQuery(api.party.getCurrentParty, {}));
}
