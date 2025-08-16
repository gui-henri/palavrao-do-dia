"use client"
import { useMutation, usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ThumbsUp } from "lucide-react";
import { Button } from "./button";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import { LoadingCussWords } from "./loading-cusswords";
import React, { useEffect } from "react";

export function CussWordsList() {
    const { results, status, loadMore } = usePaginatedQuery(
        api.palavrao.list,
        {},
        { initialNumItems: 20 });
    const sendLike = useMutation(api.palavrao.voteUp);

    return (
        <div>
            <LoadingPaginated status={status}>
                {results?.map(({ _id, text, votes, votedByUser }) => {
                    return (
                        <div key={_id} className="flex p-2 gap-2 ">
                            {text},
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
                        </div>
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