"use client"
import { useMutation, usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ThumbsUp } from "lucide-react";
import { Button } from "./button";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import { LoadingCussWords } from "./loading-cusswords";
import React, { useEffect } from "react";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "./card";

function getRandomInteger(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function CussWordsList() {
    const { results, status, loadMore } = usePaginatedQuery(
        api.palavrao.list,
        { searchDate: "today" },
        { initialNumItems: 20 });
    const sendLike = useMutation(api.palavrao.voteUp);

    return (
        <div className="w-full max-w-128 flex flex-col gap-3 mt-6">
            <p>Vote no próximo palavrão do dia!</p>
            <LoadingPaginated status={status}>
                {results?.map(({ _id, text, votes, votedByUser, nome_usuario }) => {

                    const colors = ["bg-red-300", "bg-lime-300", "bg-blue-300", "bg-amber-300", "bg-violet-300", "bg-fuchsia-300"]
                    const randomColor = getRandomInteger(0, colors.length - 1);
                    const rotations = ["-rotate-1", "rotate-1"];
                    const randomRotation = getRandomInteger(0, 1);

                    return (
                        <Card key={_id} className={` rounded-none ${rotations[randomRotation]} ${colors[randomColor]}`}>
                            <CardHeader>
                                <CardTitle className="">{text}</CardTitle>
                                <CardDescription className="text-black">
                                    Sugerido por {nome_usuario}
                                </CardDescription>
                                <CardAction>
                                    <button className="flex gap-1 cursor-pointer" onClick={async () => {
                                        try {
                                            await sendLike({ palavrao: _id })
                                        } catch (error) {
                                            if (error instanceof ConvexError) {
                                                toast.error(error.data);
                                            }
                                        }
                                    }}>
                                        <ThumbsUp fill={votedByUser ? "white" : "black"} /> {votes}
                                    </button>
                                </CardAction>
                            </CardHeader>
                        </Card>
                    )
                })}
            </LoadingPaginated>
            <Button className="cursor-pointer w-full max-w-128" onClick={() => loadMore(20)} disabled={status !== "CanLoadMore"}>Carregar Mais</Button>
        </div >
    )
}

function LoadingPaginated({ status, children }: { status: "LoadingFirstPage" | "CanLoadMore" | "LoadingMore" | "Exhausted", children: React.ReactNode }) {
    useEffect(() => { }, [status])

    return (
        <>
            {status === "LoadingFirstPage" ? <LoadingCussWords /> : children}
        </>
    )
}