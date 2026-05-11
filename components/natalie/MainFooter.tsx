import { Baby, Car, CreditCard, Mail, MapPin, PawPrint, Phone } from "lucide-react";
import { ContentContainer } from "./ContentContainer";

/** Uzupełnij prawdziwymi danymi salonu w Oświęcimiu. */
const siteContact = {
  studio: "NATALIE",
  tagline: "Fryzjerstwo · Oświęcim",
  addressLines: ["Oświęcim"],
  phoneDisplay: "+48 33 000 00 00",
  phoneHref: "tel:+48330000000",
  emailDisplay: "kontakt@natalie.pl",
  emailHref: "mailto:kontakt@natalie.pl",
} as const;

const openingHours = [
  { day: "Poniedziałek", hours: "12:00 – 20:00", emphasized: true },
  { day: "Wtorek", hours: "08:30 – 16:00", emphasized: false },
  { day: "Środa", hours: "12:00 – 20:00", emphasized: false },
  { day: "Czwartek", hours: "08:30 – 16:00", emphasized: false },
  { day: "Piątek", hours: "12:00 – 20:00", emphasized: false },
  { day: "Sobota", hours: "08:00 – 13:00", emphasized: false },
  { day: "Niedziela", hours: "Zamknięte", emphasized: false },
] as const;

const amenities = [
  { icon: CreditCard, label: "Płatność kartą" },
  { icon: Baby, label: "Przyjazne dla dzieci" },
  { icon: Car, label: "Parking" },
  { icon: PawPrint, label: "Zwierzęta dozwolone" },
] as const;

function AmenitiesList() {
  return (
    <ul className="flex flex-col gap-1.5 md:gap-2">
      {amenities.map(({ icon: Icon, label }) => (
        <li key={label}>
          <div className="flex min-h-9 items-center gap-2 border border-black/10 bg-atelier-light/40 px-2.5 py-1.5 md:min-h-10 md:gap-2.5 md:px-3 md:py-2">
            <Icon className="h-4 w-4 shrink-0 text-atelier-dark" strokeWidth={1.5} aria-hidden />
            <span className="text-xs font-medium leading-snug text-black md:text-sm">{label}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function ContactBody() {
  return (
    <>
      <p className="font-playfair text-2xl tracking-tight text-black md:text-[1.375rem] md:leading-tight">{siteContact.studio}</p>
      <p className="mt-1 text-sm text-stone-600">{siteContact.tagline}</p>
      <div className="mt-4 space-y-3 text-sm text-stone-800 md:mt-5 md:space-y-3">
        <p className="flex min-h-9 items-center justify-center gap-2 md:min-h-10 md:justify-start">
          <MapPin className="h-4 w-4 shrink-0 text-atelier-dark" strokeWidth={1.5} aria-hidden />
          <span className="text-left leading-snug">
            {siteContact.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </p>
        <p className="flex min-h-9 items-center justify-center gap-2 md:min-h-10 md:justify-start">
          <Phone className="h-4 w-4 shrink-0 text-atelier-dark" strokeWidth={1.5} aria-hidden />
          <a
            className="border-b border-black/20 font-medium tabular-nums text-black transition-colors hover:border-black"
            href={siteContact.phoneHref}
          >
            {siteContact.phoneDisplay}
          </a>
        </p>
        <p className="flex min-h-9 items-center justify-center gap-2 md:min-h-10 md:justify-start">
          <Mail className="h-4 w-4 shrink-0 text-atelier-dark" strokeWidth={1.5} aria-hidden />
          <a
            className="break-all border-b border-black/20 font-medium text-black transition-colors hover:border-black"
            href={siteContact.emailHref}
          >
            {siteContact.emailDisplay}
          </a>
        </p>
      </div>
    </>
  );
}

function OpeningHoursList() {
  return (
    <dl className="flex flex-col gap-1.5 md:gap-2">
      {openingHours.map(({ day, hours, emphasized }) => (
        <div
          key={day}
          className={`grid min-h-9 grid-cols-[1fr_auto] items-center gap-x-6 md:min-h-10 md:gap-x-8 ${emphasized ? "font-semibold text-black" : "text-stone-700"}`}
        >
          <dt className="text-left text-sm">{day}</dt>
          <dd className="text-right text-sm tabular-nums">{hours}</dd>
        </div>
      ))}
    </dl>
  );
}

export function MainFooter() {
  const headingClass = "label-caps text-stone-900";

  return (
    <footer
      id="kontakt"
      className="scroll-mt-28 border-t border-stone-100 bg-white py-[60px]"
      data-purpose="site-footer"
    >
      <ContentContainer>
        {/* Mobile: sekcja + nagłówek razem */}
        <div className="flex flex-col gap-14 md:hidden">
          <div className="mx-auto w-full max-w-54">
            <h2 className={`${headingClass} mb-6`}>Udogodnienia</h2>
            <AmenitiesList />
          </div>
          <div className="mx-auto w-full max-w-sm text-center">
            <h2 className={`${headingClass} mb-6`}>Kontakt</h2>
            <ContactBody />
          </div>
          <div className="mx-auto w-full max-w-xs text-center">
            <h2 className={`${headingClass} mb-6`}>Godziny otwarcia</h2>
            <OpeningHoursList />
          </div>
        </div>

        {/* Desktop: jedna linia nagłówków, potem treść — ta sama szerokość kolumn */}
        <div className="hidden md:flex md:flex-col md:gap-6">
          <div className="grid grid-cols-3 items-end gap-x-10 lg:gap-x-14">
            <h2 className={headingClass}>Udogodnienia</h2>
            <h2 className={headingClass}>Kontakt</h2>
            <h2 className={`${headingClass} text-right`}>Godziny otwarcia</h2>
          </div>
          <div className="grid grid-cols-3 items-start gap-x-10 lg:gap-x-14">
            <div className="w-full max-w-54 justify-self-start">
              <AmenitiesList />
            </div>
            <div className="min-w-0 justify-self-start text-left">
              <ContactBody />
            </div>
            <div className="w-full max-w-xs justify-self-end text-right">
              <OpeningHoursList />
            </div>
          </div>
        </div>
      </ContentContainer>
    </footer>
  );
}
