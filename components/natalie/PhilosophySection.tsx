import { natalieImages } from "@/lib/natalie-images";
import Image from "next/image";
import { ContentContainer } from "./ContentContainer";
import { PhilosophyTeamSpotlight } from "./PhilosophyTeamSpotlight";
import { SalonSocialLinks } from "./SalonSocialLinks";

export function PhilosophySection() {
  return (
    <section
      id="o-salonie"
      className="scroll-mt-28 bg-[#f7f4f1] py-[40px]"
      data-purpose="brand-philosophy"
    >
      <ContentContainer className="!px-0 py-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch md:gap-16">
          <div className="min-w-0 pl-[24px]">
            <div className="group grain-overlay relative aspect-[4/3] w-full overflow-hidden shadow-subtle md:aspect-square">
              <Image
                alt="Narzędzia rzemieślnicze NATALIE"
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                src={natalieImages.philosophyTools}
              />
              <span
                className="pointer-events-none absolute inset-0 bg-black/10"
                aria-hidden
              />
            </div>
          </div>
          <div className="flex min-h-0 flex-col px-6 md:h-full md:px-0 md:pr-6">
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
