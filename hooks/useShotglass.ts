import { useQuery } from "@tanstack/react-query";
import { Shotglass } from "@/types";

import supabase from "@/utils/supabase";

type ShotglassProps = {
  uuid: string;
};

export const useShotglass = ({ uuid }: ShotglassProps) => {
  return useQuery<Shotglass | null>({
    queryKey: ["shotglass", uuid],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("shotglass")
        .select("*")
        .eq("uuid", uuid)
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
  });
};
