"use client";

import { ctaEditorialGhost, ctaEditorialPrimary } from "@/lib/cta-classes";
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
      className="scroll-mt-28 mb-10 py-0 md:mb-14"
      data-purpose="reservation-cta"
    >
      <ContentContainer className="border-t border-white/[0.05] bg-atelier-surface-secondary py-[44px] text-center text-atelier-text md:py-[52px]">
        <h2 className="mb-4 text-[2.15rem] font-normal leading-[1.12] tracking-tight text-atelier-text md:mb-6 md:text-7xl md:leading-tight">
          Styl dopasowany do życia
        </h2>
        <div className="mx-auto mb-8 max-w-2xl space-y-2.5 text-sm font-medium leading-relaxed text-atelier-text-secondary md:mb-10 md:space-y-3 md:text-base">
          <p>Zobacz dostępne terminy i zarezerwuj wizytę online.</p>
          <p>Każdego dnia przyjmujemy ograniczoną liczbę rezerwacji.</p>
        </div>
        <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 md:max-w-3xl md:gap-6">
          <a
            className={`inline-flex min-h-11 min-w-0 w-full items-center justify-center px-3 py-2.5 text-center text-[8px] font-bold uppercase leading-tight tracking-[0.08em] sm:text-[9px] sm:tracking-[0.1em] md:min-h-12 md:px-10 md:py-3 md:text-[10px] md:tracking-widest ${ctaEditorialPrimary}`}
            href="/cennik"
          >
            Sprawdź dostępne terminy
          </a>
          <a
            className={`inline-flex min-h-11 min-w-0 w-full items-center justify-center px-3 py-2.5 text-center text-[8px] font-bold uppercase leading-tight tracking-[0.08em] sm:text-[9px] sm:tracking-[0.1em] md:min-h-12 md:px-8 md:py-3 md:text-[10px] md:tracking-widest ${ctaEditorialGhost}`}
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
