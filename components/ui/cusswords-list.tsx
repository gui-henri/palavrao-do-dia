"use client"
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ThumbsUp } from "lucide-react";

export function CussWordsList() {
    const palavroes = useQuery(api.palavrao.list);
    const sendLike = useMutation(api.palavrao.voteUp);

    return (
        <div>
            {palavroes?.map(({ _id, text, votes }) => {
                return (
                    <div key={_id} className="flex p-2 gap-2 ">
                        {text},
                        <button className="flex gap-1 cursor-pointer" onClick={() => sendLike({ palavrao: _id })}>
                            <ThumbsUp /> {votes}
                        </button>
                    </div>
                )
            })}
        </div >
    )
}