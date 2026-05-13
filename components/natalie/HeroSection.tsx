"use client";

import Image from "next/image";
import { Award, MessageCircle, Medal, Star } from "lucide-react";
import { natalieImages } from "@/lib/natalie-images";
import { maybeSmoothScrollHomeHashNav } from "@/lib/hash-nav";
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
        className="scroll-mt-28 bg-[#f7f4f1] py-[40px] md:scroll-mt-28"
        data-purpose="hero-banner"
      >
        <ContentContainer className="!px-0">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
            <div className="order-1 space-y-5 px-6 md:order-1 md:space-y-8">
              <p className="label-caps text-stone-700 reveal-fade-up">
                4.9 ★ | 200+ opinii • Najwyżej oceniany salon premium
              </p>
              <h1 className="reveal-fade-up text-[2.35rem] leading-[1.05] tracking-tight sm:text-5xl md:text-7xl md:leading-[1.03]">
                Naturalne cięcia.
                <br />
                Nowoczesny styl.
              </h1>
              <p className="reveal-fade-up max-w-xl text-[0.9375rem] font-medium leading-relaxed text-stone-700 md:text-lg">
                Nowoczesne fryzjerstwo o naturalnym i subtelnym charakterze. Cięcia dopasowane do
                rytmu codzienności.
              </p>
              <p className="text-xs font-medium tracking-wide text-black md:text-sm">
                Rezerwacje online w 2 minuty
              </p>
              <div className="reveal-fade-up grid grid-cols-2 gap-2 pt-0.5 md:flex md:flex-wrap md:items-center md:gap-4 md:pt-1">
                <a
                  className="inline-flex min-h-11 min-w-0 items-center justify-center border border-black bg-black px-2 py-2.5 text-center text-[8px] font-bold uppercase leading-tight tracking-[0.08em] text-white shadow-subtle transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40 sm:text-[9px] sm:tracking-[0.1em] md:min-h-12 md:px-8 md:py-3 md:text-[10px] md:tracking-widest"
                  href="#rezerwacja"
                  onClick={(e) => maybeSmoothScrollHomeHashNav(e, true)}
                >
                  Sprawdź dostępne terminy
                </a>
                <a
                  className="inline-flex min-h-11 min-w-0 items-center justify-center border border-black/25 bg-white px-2 py-2.5 text-center text-[8px] font-bold uppercase leading-tight tracking-[0.08em] text-black transition-colors hover:border-black hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40 sm:text-[9px] sm:tracking-[0.1em] md:min-h-12 md:px-6 md:py-3 md:text-[10px] md:tracking-widest"
                  href="/cennik"
                >
                  Umów konsultację
                </a>
              </div>
            </div>
            <div className="order-2 flex min-w-0 justify-center px-[24px] md:order-2 md:justify-end">
              <GalleryColorRevealTarget className="group grain-overlay reveal-fade-up relative aspect-[5/4] w-full max-w-md overflow-hidden bg-stone-200 shadow-subtle md:aspect-4/5 md:max-w-none">
                <GalleryPhotoZoomShell zoomClassName="transition-transform duration-1000 ease-out motion-safe:group-hover:scale-[1.04]">
                  <Image
                    alt="Lifestyle ujęcie pracy stylistki nad fryzurą"
                    className="object-cover transition-[filter] duration-1000 ease-out"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    src={natalieImages.heroInterior}
                    priority
                  />
                </GalleryPhotoZoomShell>
                <span
                  className="pointer-events-none absolute inset-0 bg-linear-to-tr from-black/15 via-transparent to-white/20"
                  aria-hidden
                />
              </GalleryColorRevealTarget>
            </div>
          </div>
        </ContentContainer>
      </section>
      <section className="bg-[#f3efea] py-10 md:py-[52px]" data-purpose="trust-social-proof">
        <ContentContainer className="py-0">
          <h2 className="section-title mx-auto mb-6 max-w-3xl text-center md:mb-12">
            Zaufanie i jakość
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-center text-sm font-medium leading-relaxed text-stone-700 md:mb-10 md:text-base">
            Ponad 200 zweryfikowanych opinii i wieloletnie doświadczenie w nowoczesnym
            fryzjerstwie.
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5 border-y border-black/10 py-4 md:grid-cols-4 md:gap-x-8 md:gap-y-6 md:py-5">
            {trustCards.map((card) => (
              <div
                key={`${card.title}-${card.subtitle}`}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-2 rounded-full border border-black/15 p-2 md:mb-3 md:p-2.5" aria-hidden>
                  <card.icon className="h-4 w-4 text-atelier-dark md:h-5 md:w-5" strokeWidth={1.75} />
                </div>
                <h3 className="serif-font mb-0.5 text-lg font-semibold leading-tight md:mb-1 md:text-2xl">
                  {card.title}
                </h3>
                <p className="text-[11px] font-medium leading-snug text-stone-700 md:text-sm md:leading-relaxed">
                  {card.subtitle}
                </p>
              </div>
            ))}
          </div>
        </ContentContainer>
      </section>
    </>
  );
}
