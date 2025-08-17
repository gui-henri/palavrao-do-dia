"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export function RemainingVotes() {
    const remainingVotes = useQuery(api.votos.remainingVotes);

    let str = `Restam ${remainingVotes} votos.`;

    if (remainingVotes === "NotLoggedIn") {
        str = "Faça login para poder votar";
    }

    if (remainingVotes === undefined) {
        str = "";
    }


    if (remainingVotes === 0) {
        str = "Não restou nada para o betinha.";
    }

    if (remainingVotes === 1) {
        str = "Apenas um voto restante."
    }

    return (
        <p className="mr-2">{str}</p>
    )
}