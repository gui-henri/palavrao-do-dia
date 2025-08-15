"use client"

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "./input";
import { Button } from "./button";

export function SendForm() {
    const sendSuggestion = useMutation(api.palavrao.send);
    const [palavrao, setPalavrao] = useState("");

    return (
        <>
            <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                    await sendSuggestion({ text: palavrao });
                } catch (error) {
                    if (error instanceof ConvexError) {
                        toast(String(error.data));
                    }
                }
                setPalavrao("");
            }}
                className="flex gap-2"
            >
                <Input placeholder="Sugira seu palavão do dia. (Apenas uma vez por dia)" value={palavrao} onChange={(e) => setPalavrao(e.target.value)}></Input>
                <Button className="cursor-pointer">Enviar</Button>
            </form>
        </>
    )
}