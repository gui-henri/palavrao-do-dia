import { CussWordOfTheDay } from "@/components/ui/cussword-day";
import { CussWordsList } from "@/components/ui/cusswords-list";
import { Login } from "@/components/ui/login";
import { SendForm } from "@/components/ui/send-form";

export default function Home() {
  return (
    <div className="p-4 gap-3 flex flex-col">
      <Login />
      <CussWordOfTheDay />
      <SendForm />
      <p>Apenas um voto por dia. Use com sabedoria.</p>
      <CussWordsList />
    </div>
  );
}
