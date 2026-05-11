import { ContentContainer } from "./ContentContainer";

export function ReservationCta() {
  return (
    <section
      id="rezerwacja"
      className="scroll-mt-28 bg-black py-[52px] text-center text-white"
      data-purpose="reservation-cta"
    >
      <ContentContainer>
        <h2 className="mb-6 text-5xl leading-tight md:text-7xl">Styl dopasowany do życia</h2>
        <div className="mx-auto mb-10 max-w-2xl space-y-3 text-base font-medium leading-relaxed text-stone-200">
          <p>Zobacz dostępne terminy i zarezerwuj wizytę online.</p>
          <p>Każdego dnia przyjmujemy ograniczoną liczbę rezerwacji.</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
          <a
            className="inline-flex min-h-12 items-center justify-center border border-white bg-white px-10 py-3 text-[10px] font-bold uppercase tracking-widest text-black shadow-subtle transition-colors duration-300 hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
            href="/cennik"
          >
            Sprawdź dostępne terminy
          </a>
          <a
            className="inline-flex min-h-12 items-center justify-center border border-white/40 px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
            href="/#kontakt"
          >
            Umów konsultację
          </a>
        </div>
      </ContentContainer>
    </section>
  );
}
