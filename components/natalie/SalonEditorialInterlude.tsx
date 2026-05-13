"use client";

import { maybeSmoothScrollHomeHashNav } from "@/lib/hash-nav";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ContentContainer } from "./ContentContainer";

const interiorSrc = "/images/Interior.png";
const flowersSrc = "/images/Flowers.png";

/** Delikatny offset w prawy dolny róg — „plecy” pod małym kadrem (referencja editorial). */
const flowersBackingClass =
  "pointer-events-none absolute inset-0 z-0 translate-x-[10%] translate-y-[11%] bg-[rgb(196_182_158_/_0.44)] md:translate-x-[11%] md:translate-y-[12%]";

const imageHoverMs = 7000;

export function SalonEditorialInterlude() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const salonHref = isHome ? "#o-salonie" : "/#o-salonie";

  return (
    <section
      id="przestrzen"
      className="scroll-mt-28 bg-atelier-surface py-20 md:py-28 lg:py-32"
      data-purpose="salon-editorial-interlude"
      aria-labelledby="salon-editorial-interlude-heading"
    >
      <ContentContainer className="!px-0 py-0">
        <div className="px-6 md:px-10 lg:px-14">
          <div className="relative mx-auto max-w-[1180px]">
            <div className="flex flex-col md:block md:min-h-[min(70vh,560px)] lg:min-h-[min(72vh,580px)]">
              {/* 1 — nadal największy, ale mniejszy niż poprzednio */}
              <div className="relative z-0 order-1 w-full md:order-none md:ml-0 md:w-[50%] lg:w-[49%]">
                <div className="group relative aspect-[4/3] w-full overflow-hidden md:aspect-[4/5] md:min-h-[min(46vh,400px)] lg:min-h-[min(48vh,420px)]">
                  <Image
                    alt="Wnętrze salonu NATALIE — przestrzeń pełna światła i spokoju"
                    className="object-cover grayscale-[72%] contrast-[0.96] transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    src={interiorSrc}
                    style={{ transitionDuration: `${imageHoverMs}ms` }}
                  />
                  <span
                    className="pointer-events-none absolute inset-0 bg-atelier-accent/[0.04]"
                    aria-hidden
                  />
                </div>
              </div>

              {/* 2 — większa karta, druga w hierarchii */}
              <div className="relative z-20 order-2 -mt-12 w-full max-w-[min(100%,420px)] md:order-none md:absolute md:left-[38%] md:top-1/2 md:mt-0 md:max-w-[min(420px,42%)] md:-translate-y-1/2 lg:left-[39%] lg:max-w-[min(440px,40%)]">
                <div className="border border-[rgb(212_186_146_/_0.22)] bg-atelier-surface px-8 py-10 shadow-[0_18px_44px_-26px_rgb(0_0_0_/_0.38)] md:px-10 md:py-11 lg:px-11 lg:py-12">
                  <div>
                    <p className="label-caps text-atelier-accent">Przestrzeń</p>
                    <div
                      className="mt-3 h-px w-11 bg-atelier-accent/55"
                      aria-hidden
                    />
                  </div>
                  <h2
                    id="salon-editorial-interlude-heading"
                    className="font-playfair mt-6 text-[1.65rem] font-normal leading-[1.14] tracking-tight text-atelier-text md:mt-7 md:text-[1.9rem] lg:text-[2.05rem]"
                  >
                    Miejsce stworzone
                    <br />
                    z myślą o Tobie.
                  </h2>
                  <p className="mt-5 max-w-[28ch] font-sans text-sm font-medium leading-relaxed text-atelier-text-secondary md:mt-6 md:text-[0.9375rem]">
                    Spokój, estetyka i komfort, w którym możesz na chwilę
                    zwolnić.
                  </p>
                  <a
                    href={salonHref}
                    className="label-caps mt-8 inline-flex items-center gap-2 border-0 bg-transparent pb-0.5 text-atelier-accent transition-colors duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-atelier-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atelier-accent/40 md:mt-10"
                    onClick={(e) => maybeSmoothScrollHomeHashNav(e, isHome)}
                  >
                    Zobacz salon
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>

              {/* 3 — skala porównywalna z kartą (nieco mniejsza od 1., blisko 2.) */}
              <div className="relative z-30 order-3 mt-10 w-full max-w-[min(280px,88vw)] self-end md:absolute md:right-[3%] md:top-[10%] md:mt-0 md:w-[min(280px,28vw)] md:max-w-[min(300px,28vw)] md:self-auto lg:right-[4%] lg:top-[11%]">
                <div className="relative ml-auto aspect-square w-full max-w-[260px] md:ml-0 md:max-w-[min(280px,26vw)] lg:max-w-[min(300px,24vw)]">
                  <div className={flowersBackingClass} aria-hidden />
                  <div className="group relative z-10 h-full min-h-0 w-full overflow-hidden">
                    <Image
                      alt="Dekoracja kwiatowa w salonie"
                      className="object-cover grayscale-[65%] contrast-[0.96] transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none"
                      fill
                      sizes="(max-width: 768px) 70vw, 28vw"
                      src={flowersSrc}
                      style={{ transitionDuration: `${imageHoverMs}ms` }}
                    />
                    <span
                      className="pointer-events-none absolute inset-0 bg-atelier-surface/15"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
