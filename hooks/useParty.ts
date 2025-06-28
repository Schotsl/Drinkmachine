import { useQuery } from "@tanstack/react-query";
import { Party } from "@/types";

import supabase from "@/utils/supabase";

export const useParty = () => {
  return useQuery<Party>({
    queryKey: ["party"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_party");
      console.log("data", data);
      console.log(data);
      console.log("error", error);
      if (error) {
        throw error;
      }

      return data;
    },
  });
};
