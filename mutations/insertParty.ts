import { Party, PartyInsert } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import supabase from "@/utils/supabase";

export const useInsertParty = () => {
  const queryClient = useQueryClient();

  return useMutation<Party, Error, PartyInsert>({
    mutationFn: async (insert: PartyInsert) => {
      const { data, error } = await supabase
        .from("party")
        .insert(insert)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["party"] });
    },
  });
};
