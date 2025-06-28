import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "@/convex/_generated/api";

export function useCurrentParty() {
  return useSuspenseQuery(convexQuery(api.party.getCurrentParty, {}));
}

export function useCreateParty() {
  return useMutation({
    mutationFn: useConvexMutation(api.party.createParty),
  });
}
