import { BottomIndicator } from "@/components/ui/bottom-indicator";
import { BottomSpacer } from "@/components/ui/bottom-spacer";
import { CussWordOfTheDay } from "@/components/ui/cussword-day";
import { CussWordsList } from "@/components/ui/cusswords-list";
import { SendForm } from "@/components/ui/send-form";

export default function Home() {
  return (
    <>
      <CussWordOfTheDay />
      <SendForm />
      <CussWordsList />
      <BottomIndicator />
      <BottomSpacer />
    </>
  );
}
