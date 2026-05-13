import {
    ArchiveGallery,
    HeroSection,
    MainFooter,
    MainHeader,
    PhilosophySection,
    ReservationCta,
    RevealOnScroll,
    ServicesSection,
    TestimonialsSection,
} from "@/components/natalie";

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
          <ReservationCta />
        </RevealOnScroll>
      </main>
      <RevealOnScroll>
        <MainFooter />
      </RevealOnScroll>
    </>
  );
}
