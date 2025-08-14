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
            usuario: user.tokenIdentifier,
            nome_usuario: user.name,
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
        const VOTE_NUMBER = 1;

        if (user === null || user.email === undefined) {
            throw new Error("Not Authenticated");
        }

        const lastVotes = await ctx.db
            .query("votos")
            .withIndex("by_user", (q) => q
                .eq("usuario", user.tokenIdentifier)
                .gt("_creationTime", Date.now() - 60000 * 60 * 24) // 24hrs from now
            ).order("desc")
            .take(VOTE_NUMBER);

        if (lastVotes.length >= VOTE_NUMBER) {
            const lastVote = lastVotes[0];
            const now = Date.now();
            const nextVoteTime = lastVote._creationTime + 60000 * 60 * 24; // 24 horas após o último voto
            const timeLeft = new Date(nextVoteTime - now);
            const hours = timeLeft.getHours();

            let errorStr = "";
            if (hours > 1) {
                errorStr = `Voted too much, come back in ${hours} hours`;
            } else if (hours === 1) {
                errorStr = `Voted too much, come back in ${hours} hour`;
            } else {
                const minutes = timeLeft.getMinutes();
                errorStr = `Voted too much, come back in ${minutes} minutes`;
            }
            throw new Error(errorStr);
        }

        const palavrao = await ctx.db.get(args.palavrao);
        if (palavrao === null || palavrao.votes === undefined) {
            throw new Error("Vote not set or cuss word doesn't exist");
        }

        await ctx.db.insert("votos", {
            palavrao: palavrao._id,
            usuario: user.tokenIdentifier
        });

        await ctx.db.patch(args.palavrao, {
            votes: palavrao.votes + 1
        });
    }
});

export const list = query({

    handler: async (ctx) => {
        const tasks = await ctx.db.query("palavroes").collect();
        return tasks;
    },
});