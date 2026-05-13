import { MainFooter, MainHeader, PricingPageView } from "@/components/natalie";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cennik | NATALIE",
  description:
    "Cennik usług salonu NATALIE — strzyżenia, koloryzacja, regeneracja, fryzury i więcej. Sprawdź ceny i umów wizytę.",
};

export default function CennikPage() {
  return (
    <>
      <MainHeader />
      <main>
        <PricingPageView />
      </main>
      <MainFooter />
    </>
  );
}
