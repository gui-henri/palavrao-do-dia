import { query } from "./_generated/server";
import { VOTE_NUMBER } from "./consts";
import { getDayBucket } from "./entity/day";

export const remainingVotes = query({
    handler: async (ctx) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            return "NotLoggedIn";
        }

        const userVotes = await ctx.db
            .query("votos")
            .withIndex("by_day_and_user", (doc) => doc
                .eq("dia", getDayBucket(Date.now()))
                .eq("usuario", user?.tokenIdentifier))
            .collect();

        return VOTE_NUMBER - userVotes.length;
    }
})