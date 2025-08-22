import { BottomIndicator } from "@/components/ui/bottom-indicator";
import { BottomSpacer } from "@/components/ui/bottom-spacer";
import { DaysHistory } from "@/components/ui/days-history";
import PageTitle from "@/components/ui/page-title";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";

export default async function HistoryPage() {

    const results = await fetchQuery(api.days.getVotationDays, {
        paginationOpts: { numItems: 20, cursor: null },
    });

    return (
        <>
            <Link href="/" className="underline">Voltar para o início.</Link>
            <PageTitle>Votações antigas</PageTitle>
            <DaysHistory pages={results} />
            <BottomIndicator />
            <BottomSpacer />
        </>
    );
}