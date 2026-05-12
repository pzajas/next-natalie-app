import Image from "next/image";
import { natalieImages } from "@/lib/natalie-images";
import { ContentContainer } from "./ContentContainer";
import { PhilosophyTeamSpotlight } from "./PhilosophyTeamSpotlight";
import { SalonSocialLinks } from "./SalonSocialLinks";

export function PhilosophySection() {
  return (
    <section
      id="o-salonie"
      className="scroll-mt-28 bg-atelier-light py-10 md:py-[52px]"
      data-purpose="brand-philosophy"
    >
      <ContentContainer>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch md:gap-16">
          <div className="group grain-overlay relative aspect-[4/3] w-full overflow-hidden shadow-subtle md:aspect-square">
            <Image
              alt="Narzędzia rzemieślnicze NATALIE"
              className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              src={natalieImages.philosophyTools}
            />
            <span className="pointer-events-none absolute inset-0 bg-black/10" aria-hidden />
          </div>
          <div className="flex min-h-0 flex-col md:h-full">
            <PhilosophyTeamSpotlight />
            <div className="mt-6 md:mt-auto">
              <SalonSocialLinks />
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
