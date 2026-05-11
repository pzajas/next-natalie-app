import {
  ArchiveGallery,
  HeroSection,
  MainFooter,
  MainHeader,
  PhilosophySection,
  RevealOnScroll,
  ReservationCta,
  ServicesSection,
  TestimonialsSection,
} from "@/components/natalie";

export default function Home() {
  return (
    <>
      <MainHeader />
      <main className="pt-24">
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
          <ReservationCta />
        </RevealOnScroll>
      </main>
      <RevealOnScroll>
        <MainFooter />
      </RevealOnScroll>
    </>
  );
}
