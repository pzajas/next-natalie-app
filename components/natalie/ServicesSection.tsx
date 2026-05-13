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
      className="scroll-mt-28 bg-[#f3efea] py-[40px]"
      data-purpose="service-menu"
    >
      <ContentContainer className="py-0">
        <div className="mb-8 text-center md:mb-14">
          <h2 className="section-title text-center">Nasze usługi</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-stone-700 md:mt-4 md:text-base">
            Precyzyjne cięcie, nowoczesna koloryzacja i stylizacja, która trzyma
            formę nawet po kilku tygodniach.
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 hidden items-start justify-between md:flex">
            <span className="label-caps text-stone-600">Usługa i efekt</span>
            <span className="label-caps min-w-50 text-center text-stone-600">
              Rezerwacja
            </span>
          </div>
          <div className="space-y-3 md:space-y-4">
            {popularServices.map((service) => (
              <PricingServiceRow key={service.id} service={service} />
            ))}
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-4xl text-center md:mt-12">
          <SectionTextLink href="/cennik">
            <span>Sprawdź wszystkie usługi i cennik</span>
            <span aria-hidden>→</span>
          </SectionTextLink>
        </div>
      </ContentContainer>
    </section>
  );
}
