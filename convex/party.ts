import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getCurrentParty = query({
  handler: async (ctx) => {
    const recentEntry = await ctx.db
      .query("entries")
      .filter((q) =>
        q.gt(q.field("_creationTime"), Date.now() - 8 * 60 * 60 * 1000)
      )
      .first();

    if (!recentEntry) {
      return null;
    }

    const party = await ctx.db.get(recentEntry.partyId);
    return party;
  },
});

export const createParty = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("parties", {
      title: args.title,
      createdAt: Date.now(),
    });

    return {
      id,
    };
  },
});
