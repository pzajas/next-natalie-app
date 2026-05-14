"use client";

import Image from "next/image";
import { Award, MessageCircle, Medal, Star } from "lucide-react";
import { ctaEditorialGhost, ctaEditorialPrimary } from "@/lib/cta-classes";
import { maybeSmoothScrollHomeHashNav } from "@/lib/hash-nav";
import { natalieImages } from "@/lib/natalie-images";
import { ContentContainer } from "./ContentContainer";
import { GalleryColorRevealTarget } from "./GalleryColorRevealTarget";
import { GalleryPhotoZoomShell } from "./GalleryPhotoZoomShell";

const trustCards = [
  {
    icon: Star,
    title: "4.9 / 5",
    subtitle: "Średnia ocen",
  },
  {
    icon: MessageCircle,
    title: "200+ opinii",
    subtitle: "Booksy + Google",
  },
  {
    icon: Award,
    title: "Polecany Salon",
    subtitle: "Wybór klientów",
  },
  {
    icon: Medal,
    title: "Złota firma",
    subtitle: "Nagroda branżowa",
  },
] as const;

export function HeroSection() {
  return (
    <>
      <section
        id="hero"
        className="scroll-mt-28 bg-atelier-surface py-10 md:scroll-mt-28 md:py-14"
        data-purpose="hero-banner"
      >
        <ContentContainer className="!px-0">
          {/** Pełna szerokość bloku ~1200px (`content-container`); zdjęcie w tle, treść po lewej. */}
          <div className="relative isolate w-full min-h-[min(78vh,620px)] overflow-hidden md:min-h-[min(52vh,520px)]">
            <div className="absolute inset-0 z-0">
              <GalleryColorRevealTarget className="group grain-overlay relative h-full min-h-[inherit] w-full overflow-hidden bg-atelier-surface-secondary">
                <GalleryPhotoZoomShell zoomClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.03]">
                  <Image
                    alt="Lifestyle ujęcie pracy stylistki nad fryzurą"
                    className="object-cover object-center transition-[filter,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    fetchPriority="high"
                    fill
                    sizes="100vw"
                    src={natalieImages.heroInterior}
                    priority
                  />
                </GalleryPhotoZoomShell>
              </GalleryColorRevealTarget>
            </div>
            <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
              <div className="absolute -right-[8%] top-1/2 h-[min(120%,920px)] w-[min(92%,640px)] -translate-y-1/2 translate-x-[12%] rounded-[50%] bg-atelier-accent opacity-[0.055] blur-[100px] motion-reduce:opacity-0 md:-right-[5%] md:blur-[140px]" />
            </div>
            <div
              className="pointer-events-none absolute inset-0 z-[2] bg-linear-to-r from-atelier-surface from-[-5%] via-atelier-surface/88 via-[42%] to-transparent to-[78%] md:via-atelier-surface/72 md:via-[48%] md:to-[85%]"
              aria-hidden
            />
            <div className="relative z-10 flex min-h-[min(78vh,620px)] flex-col justify-center px-6 py-12 pointer-events-none md:min-h-[min(52vh,520px)] md:px-10 md:py-16 lg:px-14">
              <div className="pointer-events-auto max-w-xl space-y-6 md:max-w-lg md:space-y-8">
                <p className="label-caps reveal-fade-up">
                  <span className="text-atelier-accent">4.9 ★</span>
                  <span className="text-atelier-text-muted">{" | "}</span>
                  <span className="text-atelier-text-secondary">
                    200+ opinii • Najwyżej oceniany salon premium
                  </span>
                </p>
                <h1 className="reveal-fade-up text-[2.35rem] leading-[1.05] tracking-tight text-atelier-text sm:text-5xl md:text-7xl md:leading-[1.03]">
                  Naturalne cięcia.
                  <br />
                  Nowoczesny styl.
                </h1>
                <p className="reveal-fade-up max-w-xl text-[0.9375rem] font-medium leading-relaxed text-atelier-text-secondary md:text-lg">
                  Nowoczesne fryzjerstwo o naturalnym i subtelnym charakterze. Cięcia dopasowane do
                  rytmu codzienności.
                </p>
                <p className="text-xs font-medium tracking-wide text-atelier-text-muted md:text-sm">
                  Rezerwacje online w 2 minuty
                </p>
                <div className="reveal-fade-up grid max-w-md grid-cols-2 gap-2 pt-0.5 md:max-w-none md:gap-4 md:pt-1">
                  <a
                    className={`inline-flex min-h-11 min-w-0 w-full items-center justify-center px-2 py-2.5 text-center text-[8px] font-bold uppercase leading-tight tracking-[0.08em] sm:text-[9px] sm:tracking-[0.1em] md:min-h-12 md:px-8 md:py-3 md:text-[10px] md:tracking-widest ${ctaEditorialPrimary}`}
                    href="#rezerwacja"
                    onClick={(e) => maybeSmoothScrollHomeHashNav(e, true)}
                  >
                    Sprawdź dostępne terminy
                  </a>
                  <a
                    className={`inline-flex min-h-11 min-w-0 w-full items-center justify-center px-2 py-2.5 text-center text-[8px] font-bold uppercase leading-tight tracking-[0.08em] sm:text-[9px] sm:tracking-[0.1em] md:min-h-12 md:px-6 md:py-3 md:text-[10px] md:tracking-widest ${ctaEditorialGhost}`}
                    href="/cennik"
                  >
                    Umów konsultację
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ContentContainer>
      </section>
      <section className="bg-atelier-surface-secondary py-12 md:py-14" data-purpose="trust-social-proof">
        <ContentContainer className="py-0">
          <h2 className="section-title mx-auto mb-6 max-w-3xl text-center md:mb-12">
            Zaufanie i jakość
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-center text-sm font-medium leading-relaxed text-atelier-text-secondary md:mb-10 md:text-base">
            Ponad 200 zweryfikowanych opinii i wieloletnie doświadczenie w nowoczesnym
            fryzjerstwie.
          </p>
          <div className="px-[24px]">
            <div className="border-y border-white/[0.08] py-4 md:py-5">
              <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4 md:gap-x-8 md:gap-y-6">
                {trustCards.map((card) => (
                  <div
                    key={`${card.title}-${card.subtitle}`}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="mb-2 rounded-full border-2 border-atelier-accent/55 p-2 md:mb-3 md:p-2.5" aria-hidden>
                      <card.icon className="h-4 w-4 text-atelier-accent md:h-5 md:w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="serif-font mb-0.5 text-lg font-semibold leading-tight text-atelier-text md:mb-1 md:text-2xl">
                      {card.title}
                    </h3>
                    <p className="text-[11px] font-medium leading-snug text-atelier-text-muted md:text-sm md:leading-relaxed">
                      {card.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ContentContainer>
      </section>
    </>
  );
}
