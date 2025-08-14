import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const send = mutation({
    args: {
        text: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (user === null || user.name === undefined) {
            throw new Error("Not Authenticated");
        }

        await ctx.db.insert("palavroes", {
            text: args.text,
            user_name: user.name,
            votes: 1
        })
    }
});

export const voteUp = mutation({
    args: {
        palavrao: v.id("palavroes"),
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (user === null || user.email === undefined) {
            throw new Error("Not Authenticated");
        }

        const palavrao = await ctx.db.get(args.palavrao);
        if (palavrao === null || palavrao.votes === undefined) {
            throw new Error("Vote not set or cuss word doesnt exist");
        }

        await ctx.db.patch(args.palavrao, {
            votes: palavrao.votes + 1
        })
    }
});

export const list = query({

    handler: async (ctx) => {
        const tasks = await ctx.db.query("palavroes").collect();
        return tasks;
    },
});