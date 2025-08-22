"use client"

import { Id } from "@/convex/_generated/dataModel";
import { Cursor, PaginationResult } from "convex/server";
import { ArrowRightFromLineIcon, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardAction, CardDescription } from "./card";
import { Button } from "./button";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";

function getRandomInteger(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getHashFromString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return hash;
}

function seededGetRandomInteger(seed: string, min: number, max: number): number {
    const hash = getHashFromString(seed);
    const random = Math.abs(Math.sin(hash) * 10000) % 1;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(random * (max - min + 1)) + min;
}

interface CussWordsHistoryListProps {
    dia: string,
    pages: {
        page: {
            votedByUser: boolean;
            _id: Id<"palavroes">;
            _creationTime: number;
            text: string;
            usuario: string;
            nome_usuario: string;
            votes: number;
            dia: string;
        }[];
        isDone: boolean;
        continueCursor: Cursor;
        splitCursor?: Cursor | null; pageStatus?: "SplitRecommended" | "SplitRequired" | null;
    }
}


export function CussWordsHistoryList({ pages, dia }: CussWordsHistoryListProps) {
    const convex = useConvex();

    const [palavroes, setPalavroes] = useState(pages.page);
    const [cursor, setCursor] = useState(pages.continueCursor ?? null);
    const [isDone, setIsDone] = useState(pages.isDone);
    const [loading, setLoading] = useState(false);

    async function loadMore(numItems: number) {
        setLoading(true);
        const result = await convex.query(api.palavrao.list, {
            paginationOpts: { numItems: numItems, cursor },
            searchDate: dia
        });

        setPalavroes(prev => [...prev, ...result.page]);
        setCursor(result.continueCursor ?? null);
        setIsDone(result.isDone);
        setLoading(false);
    }

    return (
        <div className="w-full max-w-128 flex flex-col gap-3 mt-6">
            {palavroes.map((palavrao) => {
                const colors = ["bg-red-300", "bg-lime-300", "bg-blue-300", "bg-amber-300", "bg-violet-300", "bg-fuchsia-300"]
                const randomColor = seededGetRandomInteger(palavrao._id, 0, colors.length - 1);
                const rotations = ["-rotate-1", "rotate-1"];
                const randomRotation = seededGetRandomInteger(palavrao._id, 0, colors.length - 1);

                const data = new Date(palavrao.dia);
                const opcoes = {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                } as const;

                const dataFormatada = new Intl.DateTimeFormat('pt-BR', opcoes).format(data);

                return (
                    <Card key={palavrao._id} className={`rounded-none ${rotations[randomRotation]} ${colors[randomColor]}`}>
                        <CardHeader>
                            <CardTitle className="text-2xl">{palavrao.text}</CardTitle>
                            <CardDescription className="text-black">
                                Sugerido por {palavrao.nome_usuario}
                            </CardDescription>
                            <CardAction>
                                <button className="flex gap-1 cursor-pointer" onClick={async () => { }}>
                                    <ThumbsUp fill="white" />{palavrao.votes}
                                </button>
                            </CardAction>
                        </CardHeader>
                    </Card>
                )
            })}
            {!isDone && (
                <Button className="cursor-pointer w-full max-w-128" onClick={() => loadMore(10)} disabled={loading}>Carregar Mais</Button>
            )}
        </div>
    )
}