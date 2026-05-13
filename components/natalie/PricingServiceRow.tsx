import { ctaEditorialPrimary } from "@/lib/cta-classes";
import type { PricingService } from "@/lib/pricing-data";
import Link from "next/link";

type PricingServiceRowProps = {
  service: PricingService;
  /** `editorial` — strona główna: powietrze, divider, subtelny hover zamiast „karty”. */
  variant?: "card" | "editorial";
};

export function PricingServiceRow({
  service,
  variant = "card",
}: PricingServiceRowProps) {
  const { name, description, price, duration, originalPrice, promoLabel } =
    service;

  const rowClass =
    variant === "editorial"
      ? "group border-0 bg-transparent px-4 py-8 transition-[background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[rgb(201_171_136_/0.045)] sm:px-6 md:px-8 md:py-10 lg:px-10"
      : "group border border-white/[0.08] bg-atelier-surface-elevated px-4 py-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-atelier-accent/25 md:px-7 md:py-7";

  return (
    <div className={rowClass}>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-10">
        <div className="min-w-0 flex-1">
          <h3 className="mb-1.5 text-xl leading-tight text-atelier-text md:mb-2 md:text-2xl">
            {name}
          </h3>
          {description ? (
            <p className="text-[13px] font-medium leading-relaxed text-atelier-text-secondary md:text-sm">
              {description}
            </p>
          ) : null}
          <p className="mt-2.5 flex flex-wrap items-baseline gap-x-2 text-[13px] font-medium text-atelier-text-secondary md:mt-3 md:text-sm">
            <span className="label-caps text-atelier-text-muted">Cena od</span>
            {originalPrice ? (
              <span className="text-xs font-normal text-atelier-text-muted line-through">
                {originalPrice}
              </span>
            ) : null}
            <span className="serif-font text-lg tabular-nums text-atelier-text md:text-xl">
              {price}
            </span>
            <span className="text-atelier-accent" aria-hidden>
              —
            </span>
            <span className="tabular-nums text-atelier-text-secondary">{duration}</span>
          </p>
          {promoLabel ? (
            <span
              className={
                variant === "editorial"
                  ? "mt-2 inline-flex border border-atelier-accent/22 bg-atelier-accent/[0.06] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-atelier-text-secondary"
                  : "mt-2 inline-flex border border-atelier-accent/35 bg-atelier-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-atelier-text-secondary"
              }
            >
              {promoLabel}
            </span>
          ) : null}
        </div>
        <div className="shrink-0 md:pt-0.5">
          <Link
            className={`inline-flex min-h-10 w-full items-center justify-center px-5 py-2 text-[9px] font-bold uppercase tracking-[0.12em] md:min-h-11 md:px-6 md:py-2.5 md:text-[10px] md:tracking-[0.14em] md:w-auto md:min-w-50 ${
              variant === "editorial"
                ? ctaEditorialPrimary
                : "border border-white/12 bg-atelier-surface-secondary text-atelier-text transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-atelier-accent hover:bg-atelier-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atelier-accent/50"
            }`}
            href="/#rezerwacja"
          >
            Zarezerwuj wizytę
          </Link>
        </div>
      </div>
      {variant === "editorial" ? (
        <div
          aria-hidden
          className="mr-auto mt-8 h-px w-[min(68%,24rem)] bg-white/[0.065] md:mt-10 md:w-[min(calc(100%-18rem),28rem)]"
        />
      ) : null}
    </div>
  );
}
