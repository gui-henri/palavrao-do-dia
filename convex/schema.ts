import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    palavroes: defineTable({
        text: v.string(),
        usuario: v.string(),
        nome_usuario: v.string(),
        votes: v.number(),
        dia: v.string(),
    }).index("by_text", ["text"])
        .index("by_user", ["usuario"])
        .index("by_day_and_votes", ["dia", "votes"])
        .index("by_day_and_text", ["dia", "text"])
        .index("by_day_and_user", ["dia", "usuario"]),
    votos: defineTable({
        palavrao: v.id("palavroes"),
        usuario: v.string(),
        dia: v.string(),
    }).index("by_user", ["usuario"])
        .index("by_day_and_user", ["dia", "usuario"])
});