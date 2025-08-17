import { BottomIndicator } from "@/components/ui/bottom-indicator";
import { CussWordOfTheDay } from "@/components/ui/cussword-day";
import { CussWordsList } from "@/components/ui/cusswords-list";
import { SendForm } from "@/components/ui/send-form";

export default function Home() {
  return (
    <div className="p-4 gap-3 flex flex-col items-center">
      <CussWordOfTheDay />
      <SendForm />
      <BottomIndicator />
      <CussWordsList />
    </div>
  );
}
