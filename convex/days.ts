import { paginationOptsValidator } from "convex/server";
import { query } from "./_generated/server";

export const getVotationDays = query({
    args: {
        paginationOpts: paginationOptsValidator
    },
    async handler(ctx, args) {
        if (args.paginationOpts.numItems > 20) {
            args.paginationOpts.numItems = 20;
        }

        return await ctx.db.query("dias").order("desc").paginate(args.paginationOpts);
    }
})