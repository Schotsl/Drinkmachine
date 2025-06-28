import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { subHours } from "date-fns";

export const getCurrentParty = query({
  handler: async (ctx) => {
    const eightHoursAgo = subHours(new Date(), 8);

    const recentParty = await ctx.db
      .query("parties")
      .filter((q) => q.gte(q.field("_creationTime"), eightHoursAgo.getTime()))
      .first();

    return recentParty;
  },
});

export const createParty = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("parties", {
      title: args.title.trim(),
    });

    return {
      id,
    };
  },
});
