import { Tables } from "./types.database";

export type Party = Tables<"party">;
export type PartyInsert = Omit<Party, "uuid" | "updated_at" | "created_at">;

export type Shotglass = Tables<"shotglass">;
