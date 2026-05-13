import { salonSocialLinks } from "@/lib/social-links";
import {
    Baby,
    Calendar,
    Car,
    CreditCard,
    Mail,
    MapPin,
    PawPrint,
    Phone,
    Store,
} from "lucide-react";
import type { ReactNode, SVGProps } from "react";
import { Fragment } from "react";
import { ContentContainer } from "./ContentContainer";

/** Uzupełnij prawdziwymi danymi salonu w Oświęcimiu. */
const siteContact = {
  studio: "NATALIE",
  addressLines: ["Oświęcim"],
  phoneDisplay: "+48 33 000 00 00",
  phoneHref: "tel:+48330000000",
  emailDisplay: "kontakt@natalie.pl",
  emailHref: "mailto:kontakt@natalie.pl",
} as const;

const openingHours = [
  {
    day: "Poniedziałek",
    dayShort: "Pon.",
    hours: "12:00 – 20:00",
    emphasized: false,
  },
  { day: "Wtorek", dayShort: "Wt.", hours: "08:30 – 16:00", emphasized: false },
  { day: "Środa", dayShort: "Śr.", hours: "12:00 – 20:00", emphasized: false },
  {
    day: "Czwartek",
    dayShort: "Czw.",
    hours: "08:30 – 16:00",
    emphasized: false,
  },
  { day: "Piątek", dayShort: "Pt.", hours: "12:00 – 20:00", emphasized: false },
  {
    day: "Sobota",
    dayShort: "Sob.",
    hours: "08:00 – 13:00",
    emphasized: false,
  },
  { day: "Niedziela", dayShort: "Nd.", hours: "Zamknięte", emphasized: false },
] as const;

const amenities = [
  { icon: CreditCard, label: "Płatność kartą" },
  { icon: Baby, label: "Przyjazne dla dzieci" },
  { icon: Car, label: "Parking" },
  { icon: PawPrint, label: "Zwierzęta dozwolone" },
] as const;

function AmenitiesList() {
  return (
    <ul className="grid grid-cols-2 gap-2 md:flex md:flex-col md:gap-2">
      {amenities.map(({ icon: Icon, label }) => (
        <li key={label} className="min-w-0 md:w-full">
          <div className="flex min-h-9 items-center gap-2 border border-black/10 bg-atelier-light/40 px-2.5 py-1.5 md:min-h-10 md:gap-2.5 md:px-3 md:py-2">
            <Icon
              className="h-4 w-4 shrink-0 text-atelier-dark"
              strokeWidth={1.5}
              aria-hidden
            />
            <span className="text-xs font-medium leading-snug text-black md:text-sm">
              {label}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

/** Jedna linia godzin (mobile, prawa kolumna) — divy, żeby dało się zipować z kontaktem w jednej siatce. */
function FooterMobileHoursCompactRow({
  dayShort,
  hours,
}: {
  dayShort: string;
  hours: string;
}) {
  return (
    <div className="flex w-full items-center justify-end gap-x-2 py-0.5 text-right text-[11px] leading-snug text-stone-700">
      <span className="shrink-0">{dayShort}</span>
      <span className="shrink-0 tabular-nums">{hours}</span>
    </div>
  );
}

/** Obrys jak ikony Lucide (`strokeWidth` 1.5) — spójnie z MapPin / Phone / Mail. */
function FacebookIconOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIconOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

/** Wiersz kontaktu na mobile: ikona + treść, wyrównanie do lewej, ten sam rytm pionowy co godziny (`gap-2`). */
function FooterContactMobileRow({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full items-center justify-start gap-2 py-0.5 text-left text-[11px] leading-snug text-stone-700">
      <span
        className="flex h-4 w-4 shrink-0 items-center justify-center text-atelier-dark [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:shrink-0"
        aria-hidden
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

const footerMobileContactLinkClass =
  "text-[11px] font-normal text-black transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/35";
const footerMobileOutlineIconClass = "h-3.5 w-3.5 shrink-0 text-atelier-dark";

/** Mobile: jedna siatka — każdy wiersz to ta sama linia: kontakt | godziny. */
function FooterMobileContactHoursGrid({
  headingClass,
}: {
  headingClass: string;
}) {
  function contactCell(rowIndex: number) {
    switch (rowIndex) {
      case 0:
        return (
          <FooterContactMobileRow
            icon={
              <Store
                className="text-atelier-dark"
                strokeWidth={1.25}
                aria-hidden
              />
            }
          >
            <span className="font-playfair text-[11px] font-normal tracking-tight text-stone-700">
              {siteContact.studio}
            </span>
          </FooterContactMobileRow>
        );
      case 1:
        return (
          <FooterContactMobileRow
            icon={<MapPin strokeWidth={1.25} aria-hidden />}
          >
            <span>{siteContact.addressLines[0]}</span>
          </FooterContactMobileRow>
        );
      case 2:
        return (
          <FooterContactMobileRow
            icon={<Phone strokeWidth={1.25} aria-hidden />}
          >
            <a
              className={`${footerMobileContactLinkClass} tabular-nums`}
              href={siteContact.phoneHref}
            >
              {siteContact.phoneDisplay}
            </a>
          </FooterContactMobileRow>
        );
      case 3:
        return (
          <FooterContactMobileRow
            icon={<Mail strokeWidth={1.25} aria-hidden />}
          >
            <a
              className={`${footerMobileContactLinkClass} break-all`}
              href={siteContact.emailHref}
            >
              {siteContact.emailDisplay}
            </a>
          </FooterContactMobileRow>
        );
      case 4:
        return (
          <FooterContactMobileRow
            icon={
              <FacebookIconOutline className={footerMobileOutlineIconClass} />
            }
          >
            <a
              className={footerMobileContactLinkClass}
              href={salonSocialLinks.facebook}
              aria-label="Facebook (nowa karta)"
              {...externalLinkProps}
            >
              Facebook
            </a>
          </FooterContactMobileRow>
        );
      case 5:
        return (
          <FooterContactMobileRow
            icon={
              <InstagramIconOutline className={footerMobileOutlineIconClass} />
            }
          >
            <a
              className={footerMobileContactLinkClass}
              href={salonSocialLinks.instagram}
              aria-label="Instagram (nowa karta)"
              {...externalLinkProps}
            >
              Instagram
            </a>
          </FooterContactMobileRow>
        );
      case 6:
        return (
          <FooterContactMobileRow
            icon={
              <Calendar
                className={footerMobileOutlineIconClass}
                strokeWidth={1.25}
                aria-hidden
              />
            }
          >
            <a
              className={footerMobileContactLinkClass}
              href={salonSocialLinks.booksy}
              aria-label="Booksy (nowa karta)"
              {...externalLinkProps}
            >
              Booksy
            </a>
          </FooterContactMobileRow>
        );
      default:
        return null;
    }
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
      <h2 className={headingClass}>Kontakt</h2>
      <h2 className={`${headingClass} text-right`}>Godziny otwarcia</h2>
      {openingHours.map((h, i) => (
        <Fragment key={h.day}>
          {contactCell(i)}
          <FooterMobileHoursCompactRow dayShort={h.dayShort} hours={h.hours} />
        </Fragment>
      ))}
    </div>
  );
}

function ContactBody() {
  return (
    <>
      <p className="font-playfair text-2xl tracking-tight text-black md:text-[1.375rem] md:leading-tight">
        {siteContact.studio}
      </p>
      <div className="mt-3 space-y-2.5 text-sm text-stone-800 md:mt-5 md:space-y-3">
        <p className="flex min-h-9 items-center justify-start gap-2 md:min-h-10">
          <MapPin
            className="h-4 w-4 shrink-0 text-atelier-dark"
            strokeWidth={1.5}
            aria-hidden
          />
          <span className="text-left leading-snug">
            {siteContact.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </p>
        <p className="flex min-h-9 items-center justify-start gap-2 md:min-h-10">
          <Phone
            className="h-4 w-4 shrink-0 text-atelier-dark"
            strokeWidth={1.5}
            aria-hidden
          />
          <a
            className="border-b border-black/20 font-normal tabular-nums text-black transition-colors hover:border-black"
            href={siteContact.phoneHref}
          >
            {siteContact.phoneDisplay}
          </a>
        </p>
        <p className="flex min-h-9 items-center justify-start gap-2 md:min-h-10">
          <Mail
            className="h-4 w-4 shrink-0 text-atelier-dark"
            strokeWidth={1.5}
            aria-hidden
          />
          <a
            className="break-all border-b border-black/20 font-normal text-black transition-colors hover:border-black"
            href={siteContact.emailHref}
          >
            {siteContact.emailDisplay}
          </a>
        </p>
        <p className="flex min-h-9 items-center justify-start gap-2 md:min-h-10">
          <a
            className="border-b border-black/20 font-normal text-black transition-colors hover:border-black"
            href={salonSocialLinks.facebook}
            aria-label="Facebook (nowa karta)"
            {...externalLinkProps}
          >
            Facebook
          </a>
        </p>
        <p className="flex min-h-9 items-center justify-start gap-2 md:min-h-10">
          <a
            className="border-b border-black/20 font-normal text-black transition-colors hover:border-black"
            href={salonSocialLinks.instagram}
            aria-label="Instagram (nowa karta)"
            {...externalLinkProps}
          >
            Instagram
          </a>
        </p>
        <p className="flex min-h-9 items-center justify-start gap-2 md:min-h-10">
          <a
            className="border-b border-black/20 font-normal text-black transition-colors hover:border-black"
            href={salonSocialLinks.booksy}
            aria-label="Booksy (nowa karta)"
            {...externalLinkProps}
          >
            Booksy
          </a>
        </p>
      </div>
    </>
  );
}

function OpeningHoursList({
  shortDayLabels = false,
}: {
  shortDayLabels?: boolean;
}) {
  return (
    <dl className="flex flex-col gap-0.5 md:gap-1.5">
      {openingHours.map(({ day, dayShort, hours, emphasized }) => (
        <div
          key={day}
          className={`flex items-baseline gap-x-1.5 leading-tight md:min-h-10 md:w-full md:justify-between md:gap-x-6 lg:gap-x-8 ${emphasized ? "text-black" : "text-stone-700"}`}
        >
          <dt className="shrink-0 text-left text-xs md:text-sm">
            {shortDayLabels ? dayShort : day}
          </dt>
          <dd className="shrink-0 text-right text-xs tabular-nums md:text-sm">
            {hours}
          </dd>
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
      className="scroll-mt-28 border-t border-stone-100 bg-white py-[40px]"
      data-purpose="site-footer"
    >
      <ContentContainer>
        <div className="px-[24px]">
          {/* Mobile: kontakt + godziny obok, udogodnienia na dole w 2×2 */}
          <div className="flex flex-col gap-8 md:hidden">
            <FooterMobileContactHoursGrid headingClass={headingClass} />
            <div className="w-full">
              <h2 className={`${headingClass} mb-3 text-center`}>
                Udogodnienia
              </h2>
              <AmenitiesList />
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

          <p className="mt-8 border-t border-stone-100 py-0 text-center text-[11px] leading-snug text-stone-500 md:mt-10">
            © {new Date().getFullYear()} NATALIE. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </ContentContainer>
    </footer>
  );
}
