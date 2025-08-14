"use client"

import { Button } from "@/components/ui/button";
import { CussWordsList } from "@/components/ui/cusswords-list";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { UserButton, SignInButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useMutation } from "convex/react";
import { LogInIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const sendSuggestion = useMutation(api.palavrao.send);
  const [palavrao, setPalavrao] = useState("");

  return (
    <div className="p-4 gap-3 flex flex-col">
      <Authenticated>
        <UserButton />
      </Authenticated>
      <Unauthenticated>
        <SignInButton mode="modal"><button className="cursor-pointer bg-blue-500 p-2 flex gap-4 w-64"><LogInIcon />Faça login para votar ou sugerir</button></SignInButton>
      </Unauthenticated>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">O Palavrão do Dia</h1>
      <form onSubmit={async (e) => {
        e.preventDefault();
        await sendSuggestion({ text: palavrao })
        setPalavrao("");
      }}
        className="flex gap-2"
      >
        <Input placeholder="Sugira um Palavrão" onChange={(e) => setPalavrao(e.target.value)}></Input>
        <Button>Enviar</Button>
      </form>
      <CussWordsList />
    </div>
  );
}
