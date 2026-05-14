import dynamic from "next/dynamic";
import {
  HeroSection,
  MainFooter,
  MainHeader,
  PhilosophySection,
  ReservationCta,
  RevealOnScroll,
  ServicesSection,
} from "@/components/natalie";

const ArchiveGallery = dynamic(
  () =>
    import("@/components/natalie/ArchiveGallery").then((m) => ({
      default: m.ArchiveGallery,
    })),
  {
    loading: () => (
      <div
        className="min-h-[min(42vh,24rem)] w-full bg-atelier-surface-secondary/12 md:min-h-[26rem]"
        aria-hidden
      />
    ),
  },
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/natalie/TestimonialsSection").then((m) => ({
      default: m.TestimonialsSection,
    })),
  {
    loading: () => (
      <div
        className="min-h-[min(42vh,24rem)] w-full bg-atelier-surface-secondary/12 md:min-h-[26rem]"
        aria-hidden
      />
    ),
  },
);

const SalonEditorialInterlude = dynamic(
  () =>
    import("@/components/natalie/SalonEditorialInterlude").then((m) => ({
      default: m.SalonEditorialInterlude,
    })),
  {
    loading: () => (
      <div
        className="min-h-[min(36vh,20rem)] w-full bg-atelier-surface-secondary/12 md:min-h-[22rem]"
        aria-hidden
      />
    ),
  },
);

export default function Home() {
  return (
    <>
      <MainHeader />
      <main>
        <HeroSection />
        <RevealOnScroll>
          <PhilosophySection />
        </RevealOnScroll>
        <RevealOnScroll>
          <ServicesSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <ArchiveGallery />
        </RevealOnScroll>
        <RevealOnScroll>
          <TestimonialsSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <SalonEditorialInterlude />
        </RevealOnScroll>
        <RevealOnScroll>
          <ReservationCta />
        </RevealOnScroll>
      </main>
      <RevealOnScroll>
        <MainFooter />
      </RevealOnScroll>
    </>
  );
}
