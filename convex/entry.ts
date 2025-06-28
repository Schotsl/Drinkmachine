import { v } from "convex/values";
import { query } from "./_generated/server";

export const getMyEntries = query({
  args: {
    partyId: v.id("parties"),
    shotglassExposedId: v.string(),
  },
  handler: async (ctx, args) => {
    const shotglass = await ctx.db
      .query("shotglasses")
      .filter((q) => q.eq(q.field("exposedId"), args.shotglassExposedId))
      .unique();

    return await ctx.db
      .query("entries")
      .filter((q) => q.eq(q.field("partyId"), args.partyId))
      .filter((q) => q.eq(q.field("shotglassId"), shotglass?._id))
      .collect();
  },
});
