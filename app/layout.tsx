import type { Metadata } from "next";
import { Lacquer } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/providers";
import { Toaster } from "@/components/ui/sonner";

const cerdavileCursive = Lacquer({
  variable: "--font-cercavile-cursive",
  weight: "400",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Palavrão do Dia",
  description: "Veja o palavrão do dia e vote no próximo!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning
    >
      <body
        className={`${cerdavileCursive.className} antialiased bg-amber-50 bg-[image:linear-gradient(to_right,transparent_9%,#e63946_9%,#e63946_10%,transparent_10%),repeating-linear-gradient(#fefae0,#fefae0_29px,#a8dadc_30px,#a8dadc_31px)]`}
      >
        <Providers>
          <div className="p-4 gap-3 flex flex-col items-center">
            {children}
          </div>
        </Providers>
        <Toaster />
      </body>
    </html >
  );
}
