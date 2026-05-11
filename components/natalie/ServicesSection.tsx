import { pricingCategories } from "@/lib/pricing-data";
import { ContentContainer } from "./ContentContainer";
import { SectionTextLink } from "./SectionTextLink";
import { PricingServiceRow } from "./PricingServiceRow";

const popularServices =
  pricingCategories.find((c) => c.id === "popularne")?.services ?? [];

export function ServicesSection() {
  return (
    <section
      id="uslugi"
      className="scroll-mt-28 bg-white py-[52px]"
      data-purpose="service-menu"
    >
      <ContentContainer>
        <div className="mb-14 text-center">
          <h2 className="section-title text-center">Nasze usługi</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-stone-700">
            Precyzyjne cięcie, nowoczesna koloryzacja i stylizacja, która trzyma formę nawet po
            kilku tygodniach.
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 hidden items-start justify-between md:flex">
            <span className="label-caps text-stone-600">Usługa i efekt</span>
            <span className="label-caps min-w-50 text-center text-stone-600">Rezerwacja</span>
          </div>
          <div className="space-y-4">
            {popularServices.map((service) => (
              <PricingServiceRow key={service.id} service={service} />
            ))}
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-4xl text-center">
          <SectionTextLink href="/cennik">
            <span>Sprawdź wszystkie usługi i cennik</span>
            <span aria-hidden>→</span>
          </SectionTextLink>
        </div>
      </ContentContainer>
    </section>
  );
}
