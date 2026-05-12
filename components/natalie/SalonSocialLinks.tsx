import type { ReactNode } from "react";
import { instagramIconPath } from "@/lib/social-brand-paths";
import { salonSocialLinks } from "@/lib/social-links";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Jak karty w `PricingServiceRow`: cienka ramka, białe tło, hover na obrębie i cieniu. */
const socialButtonClass =
  "flex w-full min-h-10 items-center justify-center gap-2 border border-black/8 bg-white px-3 py-2.5 text-[13px] font-medium leading-tight text-black transition-all duration-300 outline-none hover:border-black/20 hover:shadow-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/35 sm:gap-2.5 sm:text-sm md:min-h-14 md:px-5 md:py-3.5";

const iconWrapClass = "flex h-4 w-4 shrink-0 items-center justify-center text-stone-800 md:h-5 md:w-5";

/** Kwadratowa marka (litera w ramce) — czytelniej „app tile” niż okrągły glyph SI. */
const squareMarkClass =
  "flex aspect-square h-full w-full items-center justify-center rounded-sm border-2 border-stone-800";

function SocialButton({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <a href={href} {...external} className={socialButtonClass}>
      <span className={iconWrapClass} aria-hidden>
        {icon}
      </span>
      {label}
    </a>
  );
}

export function SalonSocialLinks() {
  return (
    <div className="pt-1">
      <p className="label-caps mb-2.5 text-stone-700 md:mb-3">Znajdź nas</p>
      <nav
        aria-label="Media społecznościowe salonu"
        className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3 md:gap-4"
      >
        <SocialButton
          href={salonSocialLinks.facebook}
          label="Facebook"
          icon={
            <span className={`${squareMarkClass} font-sans text-[10px] font-bold leading-none tracking-tight`}>
              f
            </span>
          }
        />
        <SocialButton
          href={salonSocialLinks.instagram}
          label="Instagram"
          icon={
            <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24">
              <path fill="currentColor" d={instagramIconPath} />
            </svg>
          }
        />
        <SocialButton
          href={salonSocialLinks.booksy}
          label="Booksy"
          icon={
            <span className={`${squareMarkClass} font-serif text-[11px] font-semibold leading-none`}>b</span>
          }
        />
      </nav>
    </div>
  );
}
