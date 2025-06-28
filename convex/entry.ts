import { v } from "convex/values";
import { query } from "./_generated/server";

export const getMyEntries = query({
  args: {
    partyId: v.id("parties"),
    shotglassId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("entries")
      .filter((q) => q.eq(q.field("partyId"), args.partyId))
      .filter((q) => q.eq(q.field(""), args.shotglassId))
      .collect();
  },
});
