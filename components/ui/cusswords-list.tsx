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

export function CussWordsList() {
    const { results, status, loadMore } = usePaginatedQuery(
        api.palavrao.list,
        {},
        { initialNumItems: 20 });
    const sendLike = useMutation(api.palavrao.voteUp);

    return (
        <div className="flex flex-col gap-3 mt-6">
            <p>Vote no próximo palavrão do dia!</p>
            <LoadingPaginated status={status}>
                {results?.map(({ _id, text, votes, votedByUser, nome_usuario }) => {
                    return (
                        <Card key={_id} className="w-128">
                            <CardHeader>
                                <CardTitle>{text}</CardTitle>
                                <CardDescription>
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
                                        <ThumbsUp fill={votedByUser ? "white" : ""} /> {votes}
                                    </button>
                                </CardAction>
                            </CardHeader>
                        </Card>
                    )
                })}
            </LoadingPaginated>
            <Button className="cursor-pointer" onClick={() => loadMore(20)} disabled={status !== "CanLoadMore"}>Carregar Mais</Button>
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