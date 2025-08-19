"use client"

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "./input";
import { Button } from "./button";
import { SendHorizonal, SendIcon } from "lucide-react";

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
                className="flex gap-2 w-128"
            >
                <Input className="bg-slate-50 border-2 border-black" placeholder="Sugira seu palavão do dia. (Ex: Supunhetamos)" value={palavrao} onChange={(e) => setPalavrao(e.target.value)}></Input>
                <Button size={"icon"} className="cursor-pointer bg-blue-600"><SendHorizonal /></Button>
            </form>
        </>
    )
}