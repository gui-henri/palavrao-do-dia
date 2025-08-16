import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { Id } from "./_generated/dataModel";

const getDayBucket = (timestamp: number): string => {
    const date = new Date(timestamp);
    const cutoffHour = 15;

    if (date.getHours() < cutoffHour) {
        date.setDate(date.getDate() - 1);
    }

    return date.toISOString().slice(0, 10);
};

export const send = mutation({
    args: {
        text: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        const SUGGESTION_NUMBER = 1;

        if (user === null || user.name === undefined) {
            throw new ConvexError("Faz login primeiro caralho.");
        }

        if (args.text === "") {
            throw new ConvexError("Digita algo pra mandar primeiro.");
        }

        if (args.text.length > 100) {
            throw new ConvexError("Deu a porra, digita menos.");
        }

        const date = getDayBucket(Date.now());

        const lastSugestion = await ctx.db
            .query("palavroes")
            .withIndex("by_day_and_user", (q) => q
                .eq("dia", date)
                .eq("usuario", user.tokenIdentifier)
            ).order("desc")
            .take(SUGGESTION_NUMBER);

        if (lastSugestion.length >= SUGGESTION_NUMBER) {
            throw new ConvexError("Já sugeriu demais hoje, volte amanhã as 15hrs");
        }

        const palavraoJaSugerido = await ctx.db
            .query("palavroes")
            .withIndex("by_day_and_text", (doc) => doc
                .eq("dia", date)
                .eq("text", args.text))
            .first();

        if (palavraoJaSugerido !== null) {
            throw new ConvexError("Já mandaram esse aí hoje. Só amanhã agora.")
        }

        await ctx.db.insert("palavroes", {
            text: args.text,
            usuario: user.tokenIdentifier,
            nome_usuario: user.name,
            votes: 0,
            dia: getDayBucket(Date.now())
        })
    }
});

export const palavraoDiario = query({
    handler: async (ctx) => {
        const date = getDayBucket(Date.now() - 60000 * 60 * 24);
        const palavraoMaisVotado = await ctx.db
            .query("palavroes")
            .withIndex("by_day_and_votes", (doc) => doc.eq("dia", date))
            .order("desc")
            .first();
        return palavraoMaisVotado;
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
            throw new ConvexError("Voto anônimo é o caralho, faça login seu porra.");
        }
        const date = getDayBucket(Date.now());

        const lastVotes = await ctx.db
            .query("votos")
            .withIndex("by_day_and_user", (q) => q
                .eq("dia", date)
                .eq("usuario", user.tokenIdentifier)
            ).order("desc")
            .take(VOTE_NUMBER);

        if (lastVotes.length >= VOTE_NUMBER) {
            throw new ConvexError("Já votou demais cacete. Volta amanhã de 15hrs.");
        }

        const palavrao = await ctx.db.get(args.palavrao);
        if (palavrao === null || palavrao.votes === undefined) {
            throw new ConvexError("Palavrão não existe.");
        }

        if (palavrao.usuario === user.tokenIdentifier) {
            throw new ConvexError("Não pode votar em tu mesmo fera.");
        }

        await ctx.db.insert("votos", {
            palavrao: palavrao._id,
            usuario: user.tokenIdentifier,
            dia: date
        });

        await ctx.db.patch(args.palavrao, {
            votes: palavrao.votes + 1
        });
    }
});

export const list = query({
    args: {
        paginationOpts: paginationOptsValidator
    },
    handler: async (ctx, args) => {
        const date = getDayBucket(Date.now());
        if (args.paginationOpts.numItems > 20) {
            args.paginationOpts.numItems = 20;
        }

        const user = await ctx.auth.getUserIdentity();

        const palavroesPromisse = ctx.db
            .query("palavroes")
            .withIndex("by_day_and_votes",
                (doc) => doc
                    .eq("dia", date)
            ).order("desc")
            .paginate(args.paginationOpts);

        let userVotesPromisse: Promise<{
            _id: Id<"votos">;
            _creationTime: number;
            usuario: string;
            dia: string;
            palavrao: Id<"palavroes">;
        }[]> | null = null;

        if (user) {
            userVotesPromisse = ctx.db
                .query("votos")
                .withIndex("by_day_and_user", (doc) => doc
                    .eq("dia", getDayBucket(Date.now()))
                    .eq("usuario", user?.tokenIdentifier))
                .collect();
        }

        const [palavroes, userVotes] = await Promise.all([palavroesPromisse, userVotesPromisse]);

        const voteIds = new Set(
            userVotes?.map((vote) => vote.palavrao) ?? []
        )

        return {
            ...palavroes,
            page: palavroes.page.map((palavrao) => ({
                ...palavrao,
                votedByUser: voteIds.has(palavrao._id),
            }))
        }
    },
});