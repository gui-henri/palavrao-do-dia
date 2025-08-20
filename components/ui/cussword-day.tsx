import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";

export async function CussWordOfTheDay() {
    const palavraoDoDia = await fetchQuery(api.palavrao.palavraoDiario);

    return (
        <>
            <p>Atualizado sempre ao meio dia. <Link href="/privacy" className="underline">Política de Privacidade</Link></p>
            <h1 className="scroll-m-20 text-center text-4xl lg:text-6xl font-extrabold tracking-tight text-balance mb-8 mt-8">O Palavrão do Dia <br /> é: <span className="text-red-500 underline">{palavraoDoDia?.text}</span></h1>
        </>
    )
}