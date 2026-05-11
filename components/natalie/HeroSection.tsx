import Image from "next/image";
import { Award, MessageCircle, Medal, Star } from "lucide-react";
import { natalieImages } from "@/lib/natalie-images";
import { ContentContainer } from "./ContentContainer";
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
      <section className="py-[52px] md:py-[58px]" data-purpose="hero-banner">
        <ContentContainer>
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
            <div className="order-2 space-y-7 md:order-1 md:space-y-8">
              <p className="label-caps text-stone-700 reveal-fade-up">
                4.9 ★ | 200+ opinii • Najwyżej oceniany salon premium
              </p>
              <h1 className="reveal-fade-up text-5xl leading-[1.03] md:text-7xl">
                Naturalne cięcia.
                <br />
                Nowoczesny styl.
              </h1>
              <p className="reveal-fade-up max-w-xl text-base font-medium leading-relaxed text-stone-700 md:text-lg">
                Nowoczesne fryzjerstwo o naturalnym i subtelnym charakterze. Cięcia dopasowane do
                rytmu codzienności.
              </p>
              <p className="text-sm font-medium tracking-wide text-black">
                Rezerwacje online w 2 minuty
              </p>
              <div className="reveal-fade-up flex flex-wrap items-center gap-4 pt-1">
                <a
                  className="inline-flex min-h-12 items-center justify-center border border-black bg-black px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-white shadow-subtle transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40"
                  href="#rezerwacja"
                >
                  Sprawdź dostępne terminy
                </a>
                <a
                  className="inline-flex min-h-12 items-center justify-center border border-black/25 bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-black transition-colors hover:border-black hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40"
                  href="/cennik"
                >
                  Umów konsultację
                </a>
              </div>
            </div>
            <div className="order-1 flex justify-end md:order-2">
              <div className="group gallery-color-reveal-target grain-overlay reveal-fade-up relative aspect-4/5 w-full overflow-hidden bg-stone-200 shadow-subtle">
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
              </div>
            </div>
          </div>
        </ContentContainer>
      </section>
      <section className="bg-white py-[52px]" data-purpose="trust-social-proof">
        <ContentContainer>
          <h2 className="section-title mx-auto mb-10 max-w-3xl text-center md:mb-12">
            Zaufanie i jakość
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-base font-medium leading-relaxed text-stone-700 md:mb-10">
            Ponad 200 zweryfikowanych opinii i wieloletnie doświadczenie w nowoczesnym
            fryzjerstwie.
          </p>
          <div className="grid grid-cols-1 gap-6 border-y border-black/10 py-5 md:grid-cols-4 md:gap-8">
            {trustCards.map((card) => (
              <div
                key={`${card.title}-${card.subtitle}`}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-3 rounded-full border border-black/15 p-2.5" aria-hidden>
                  <card.icon className="h-5 w-5 text-atelier-dark" strokeWidth={1.75} />
                </div>
                <h3 className="serif-font mb-1 text-2xl font-semibold">{card.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-stone-700">{card.subtitle}</p>
              </div>
            ))}
          </div>
        </ContentContainer>
      </section>
    </>
  );
}
