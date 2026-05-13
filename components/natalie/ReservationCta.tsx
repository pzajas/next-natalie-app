"use client";

import { maybeSmoothScrollHomeHashNav } from "@/lib/hash-nav";
import { usePathname } from "next/navigation";
import { ContentContainer } from "./ContentContainer";

export function ReservationCta() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const kontaktHref = isHome ? "#kontakt" : "/#kontakt";

  return (
    <section
      id="rezerwacja"
      className="scroll-mt-28 py-0"
      data-purpose="reservation-cta"
    >
      <ContentContainer className="bg-black py-[40px] text-center text-white">
        <h2 className="mb-4 text-[2.15rem] font-normal leading-[1.12] tracking-tight md:mb-6 md:text-7xl md:leading-tight">
          Styl dopasowany do życia
        </h2>
        <div className="mx-auto mb-8 max-w-2xl space-y-2.5 text-sm font-medium leading-relaxed text-stone-200 md:mb-10 md:space-y-3 md:text-base">
          <p>Zobacz dostępne terminy i zarezerwuj wizytę online.</p>
          <p>Każdego dnia przyjmujemy ograniczoną liczbę rezerwacji.</p>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-2 md:flex md:max-w-none md:flex-row md:justify-center md:gap-6">
          <a
            className="inline-flex min-h-11 min-w-0 items-center justify-center border border-white bg-white px-3 py-2.5 text-center text-[8px] font-bold uppercase leading-tight tracking-[0.08em] text-black shadow-subtle transition-colors duration-300 ease-out hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 sm:text-[9px] sm:tracking-[0.1em] md:min-h-12 md:px-10 md:py-3 md:text-[10px] md:tracking-widest"
            href="/cennik"
          >
            Sprawdź dostępne terminy
          </a>
          <a
            className="inline-flex min-h-11 min-w-0 items-center justify-center border border-white/40 px-3 py-2.5 text-center text-[8px] font-bold uppercase leading-tight tracking-[0.08em] text-white transition-colors duration-300 ease-out hover:border-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 sm:text-[9px] sm:tracking-[0.1em] md:min-h-12 md:px-8 md:py-3 md:text-[10px] md:tracking-widest"
            href={kontaktHref}
            onClick={(e) => maybeSmoothScrollHomeHashNav(e, isHome)}
          >
            Umów konsultację
          </a>
        </div>
      </ContentContainer>
    </section>
  );
}
