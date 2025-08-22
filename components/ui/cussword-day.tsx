import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";
import PageTitle from "./page-title";

export async function CussWordOfTheDay() {
    const palavraoDoDia = await fetchQuery(api.palavrao.palavraoDiario);

    return (
        <>
            <p>Atualizado sempre ao meio dia. <Link href="/privacy" className="underline">Política de Privacidade</Link></p>
            <Link href="/history" className="underline">Votações antigas</Link>
            <PageTitle>O Palavrão do Dia <br /> é: <span className="text-red-500 underline">{palavraoDoDia?.text}</span></PageTitle>
        </>
    )
}