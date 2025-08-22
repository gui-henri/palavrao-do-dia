import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { Id, TableNames } from "./_generated/dataModel";
import { getDayBucket } from "./entity/day";
import { SUGGESTION_NUMBER, VOTE_NUMBER } from "./consts";

export const send = mutation({
    args: {
        text: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

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

        const lastSugestionPromisse = ctx.db
            .query("palavroes")
            .withIndex("by_day_and_user", (q) => q
                .eq("dia", date)
                .eq("usuario", user.tokenIdentifier)
            ).order("desc")
            .take(SUGGESTION_NUMBER);

        const palavraoJaSugeridoPromisse = ctx.db
            .query("palavroes")
            .withIndex("by_day_and_text", (doc) => doc
                .eq("dia", date)
                .eq("text", args.text))
            .first();

        const diaRegistradoPromisse = ctx.db
            .query("dias")
            .withIndex("by_day", (doc) => doc.eq("dia", date))
            .first();

        const [lastSugestion, palavraoJaSugerido, diaRegistrado] = await Promise.all(
            [lastSugestionPromisse, palavraoJaSugeridoPromisse, diaRegistradoPromisse]
        );

        if (lastSugestion.length >= SUGGESTION_NUMBER) {
            throw new ConvexError("Já sugeriu demais hoje, volte amanhã as 15hrs");
        }

        if (palavraoJaSugerido !== null) {
            throw new ConvexError("Já mandaram esse aí hoje. Só amanhã agora.")
        }

        const insertPalavraoPromisse = ctx.db.insert("palavroes", {
            text: args.text,
            usuario: user.tokenIdentifier,
            nome_usuario: user.name,
            votes: 0,
            dia: date
        })

        const inserts: Promise<Id<TableNames>>[] = [insertPalavraoPromisse];

        if (diaRegistrado === null) {
            const insertDay = ctx.db.insert("dias", {
                dia: date
            });
            inserts.push(insertDay);
        }

        await Promise.all(inserts);
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

        if (user === null || user.email === undefined) {
            throw new ConvexError("Voto anônimo é o caralho, faça login seu porra.");
        }
        const date = getDayBucket(Date.now());

        const lastVotesPromisse = ctx.db
            .query("votos")
            .withIndex("by_day_and_user", (q) => q
                .eq("dia", date)
                .eq("usuario", user.tokenIdentifier)
            ).order("desc")
            .take(VOTE_NUMBER);

        const palavraoPromisse = ctx.db.get(args.palavrao);

        const [palavrao, lastVotes] = await Promise.all([palavraoPromisse, lastVotesPromisse]);

        if (palavrao === null || palavrao.votes === undefined) {
            throw new ConvexError("Palavrão não existe.");
        }

        if (palavrao.dia !== date) {
            throw new ConvexError("A votação desse aí já passou fdp.");
        }

        if (lastVotes.length >= VOTE_NUMBER) {
            throw new ConvexError("Já votou demais cacete. Volta amanhã de 15hrs.");
        }

        if (palavrao.usuario === user.tokenIdentifier) {
            throw new ConvexError("Não pode votar em tu mesmo fera.");
        }

        const votoDuplicado = lastVotes.filter((p) => p.palavrao === palavrao._id);

        if (votoDuplicado.length > 0) {
            throw new ConvexError("Já votou nesse ô arrombado.");
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
        searchDate: v.string(),
        paginationOpts: paginationOptsValidator
    },
    handler: async (ctx, args) => {
        const date = args.searchDate === "today" ? getDayBucket(Date.now()) : args.searchDate;
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
                    .eq("dia", date)
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