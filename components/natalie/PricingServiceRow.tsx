import Link from "next/link";
import type { PricingService } from "@/lib/pricing-data";

type PricingServiceRowProps = {
  service: PricingService;
};

export function PricingServiceRow({ service }: PricingServiceRowProps) {
  const { name, description, price, duration, originalPrice, promoLabel } = service;

  return (
    <div className="group border border-black/8 bg-white px-5 py-6 transition-all duration-300 hover:border-black/20 hover:shadow-subtle md:px-7 md:py-7">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
        <div className="min-w-0 flex-1">
          <h3 className="mb-2 text-2xl leading-tight">{name}</h3>
          {description ? (
            <p className="text-sm font-medium leading-relaxed text-stone-700">{description}</p>
          ) : null}
          <p className="mt-3 flex flex-wrap items-baseline gap-x-2 text-sm font-medium text-stone-800">
            <span className="label-caps text-stone-600">Cena od</span>
            {originalPrice ? (
              <span className="text-xs font-normal text-stone-500 line-through">{originalPrice}</span>
            ) : null}
            <span className="serif-font text-xl tabular-nums text-black">{price}</span>
            <span className="text-stone-400" aria-hidden>
              —
            </span>
            <span className="tabular-nums text-stone-700">{duration}</span>
          </p>
          {promoLabel ? (
            <span className="mt-2 inline-flex border border-teal-700/30 bg-teal-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-teal-800">
              {promoLabel}
            </span>
          ) : null}
        </div>
        <div className="shrink-0 md:pt-0.5">
          <Link
            className="inline-flex min-h-11 w-full items-center justify-center border border-black bg-black px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40 md:w-auto md:min-w-50"
            href="/#rezerwacja"
          >
            Zarezerwuj wizytę
          </Link>
        </div>
      </div>
    </div>
  );
}
