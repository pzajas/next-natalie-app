import { pricingCategories } from "@/lib/pricing-data";
import { ContentContainer } from "./ContentContainer";
import { PricingServiceRow } from "./PricingServiceRow";
import { SectionTextLink } from "./SectionTextLink";

const popularServices =
  pricingCategories.find((c) => c.id === "popularne")?.services ?? [];

export function ServicesSection() {
  return (
    <section
      id="uslugi"
      className="scroll-mt-28 bg-atelier-surface-secondary py-14 md:py-[4.5rem]"
      data-purpose="service-menu"
    >
      <ContentContainer className="py-0">
        <div className="px-[24px]">
          <div className="mb-10 text-center md:mb-16">
            <h2 className="section-title text-center">Nasze usługi</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-atelier-text-secondary md:mt-5 md:text-base">
              Precyzyjne cięcie, nowoczesna koloryzacja i stylizacja, która trzyma
              formę nawet po kilku tygodniach.
            </p>
          </div>
          <div className="mb-6 hidden border-b border-white/[0.06] px-4 pb-3 sm:px-6 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:gap-10 md:px-8 md:items-end lg:px-10">
            <span className="label-caps text-atelier-text-muted">Usługa i efekt</span>
            <div className="flex justify-end md:min-w-50">
              <span className="label-caps text-atelier-text-muted">Rezerwacja</span>
            </div>
          </div>
          <div>
            {popularServices.map((service) => (
              <PricingServiceRow key={service.id} service={service} variant="editorial" />
            ))}
          </div>
          <div className="mt-10 text-center md:mt-14">
            <SectionTextLink href="/cennik">
              <span>Sprawdź wszystkie usługi i cennik</span>
              <span aria-hidden>→</span>
            </SectionTextLink>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
