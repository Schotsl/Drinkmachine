import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  parties: defineTable({
    title: v.string(),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }),

  shotglasses: defineTable({
    emoji: v.string(),
    createdAt: v.number(),
  }),

  entries: defineTable({
    amount: v.number(),
    partyId: v.id("parties"),
    shotglassId: v.id("shotglasses"),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_party", ["partyId"])
    .index("by_shotglass", ["shotglassId"])
    .index("by_party_and_shotglass", ["partyId", "shotglassId"]),
});
