import { CussWordsHistoryList } from "@/components/ui/cusswords-history-list";
import PageTitle from "@/components/ui/page-title";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";

export default async function HistoryPage({ params }: { params: { dia: string } }) {
    const dia = params.dia;

    const data = new Date(dia);
    const opcoes = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    } as const;

    const dataFormatada = new Intl.DateTimeFormat('pt-BR', opcoes).format(data);

    const results = await fetchQuery(api.palavrao.list, {
        paginationOpts: { numItems: 20, cursor: null },
        searchDate: dia
    });

    return (
        <>
            <p>Atualizado sempre ao meio dia. <Link href="/privacy" className="underline">Política de Privacidade</Link></p>
            <Link href="/history" className="underline">Votações antigas</Link>
            <Link href="/" className="underline">Voltar para o início.</Link>
            <PageTitle>O Palavrão do Dia {dataFormatada} <br /> é: <span className="text-red-500 underline">{results.page[0].text}</span></PageTitle>
            <CussWordsHistoryList dia={dia} pages={results} />
        </>
    )
}