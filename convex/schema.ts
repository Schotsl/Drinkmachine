import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  parties: defineTable({
    title: v.string(),
  }),

  shotglasses: defineTable({
    emoji: v.string(),
    title: v.string(),
  }),

  entries: defineTable({
    amount: v.number(),
    partyId: v.id("parties"),
    shotglassId: v.id("shotglasses"),
  })
    .index("by_party", ["partyId"])
    .index("by_shotglass", ["shotglassId"])
    .index("by_party_and_shotglass", ["partyId", "shotglassId"]),
});
