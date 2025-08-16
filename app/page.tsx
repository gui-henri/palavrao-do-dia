import { CussWordOfTheDay } from "@/components/ui/cussword-day";
import { CussWordsList } from "@/components/ui/cusswords-list";
import { Login } from "@/components/ui/login";
import { RemainingVotes } from "@/components/ui/remaining-votes";
import { SendForm } from "@/components/ui/send-form";

export default function Home() {
  return (
    <div className="p-4 gap-3 flex flex-col">
      <Login />
      <CussWordOfTheDay />
      <SendForm />
      <RemainingVotes />
      <CussWordsList />
    </div>
  );
}
