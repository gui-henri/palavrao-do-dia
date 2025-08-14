import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    palavroes: defineTable({
        text: v.string(),
        user_name: v.string(),
        votes: v.number()
    }).index("by_text", ["text"]),
    votos: defineTable({
        palavrao: v.id("palavroes"),
        usuario: v.string() // email do usuário
    }).index("by_user", ["usuario"])
});