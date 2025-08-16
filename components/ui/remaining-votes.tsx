"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export function RemainingVotes() {
    const remainingVotes = useQuery(api.votos.remainingVotes);

    if (remainingVotes === "NotLoggedIn" || remainingVotes === undefined) {
        return (
            <p>Faça login para poder votar.</p>
        )
    }

    let str = `Restam ${remainingVotes} votos.`;

    if (remainingVotes === 0) {
        str = "Não restou nada para o betinha.";
    }

    if (remainingVotes === 1) {
        str = "Apenas um voto restante."
    }

    return (
        <p>{str}</p>
    )
}