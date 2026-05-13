/**
 * Wspólny szkielet stron wewnętrznych (cennik, galeria) — ta sama typografia, odstępy i rytm sekcji.
 */

export const innerPageHeroSectionClass =
  "border-b border-white/[0.06] bg-atelier-surface py-[40px]";

export const innerPageHeroRowClass =
  "flex flex-col gap-8 md:flex-row md:items-end md:justify-between";

/** Nagłówek jak na cenniku (`section-title` z globals). */
export const innerPageTitleClass = "section-title max-w-xl";

/** Prawa kolumna hero (np. wyszukiwarka na cenniku). */
export const innerPageToolsSlotClass = "relative w-full max-w-md shrink-0";

export const innerPageChipSectionClass =
  "border-b border-white/[0.06] bg-atelier-surface-secondary py-[40px]";

export const innerPageContentSectionClass = "bg-atelier-surface py-[40px]";

export const innerPageEmptyStateClass =
  "text-center text-sm leading-relaxed text-atelier-text-muted";

/** Szerokość głównej kolumny treści (lista usług / siatka galerii). */
export const innerPageContentInnerClass = "mx-auto w-full max-w-4xl";

export const innerPageChipStripClass =
  "flex w-full cursor-grab select-none flex-nowrap items-stretch gap-2 overflow-x-auto overflow-y-hidden pb-1 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden md:mx-auto md:grid md:w-full md:max-w-[1200px] md:cursor-default md:gap-1 md:overflow-visible md:select-auto md:[grid-template-columns:repeat(var(--pricing-chip-cols),minmax(0,1fr))] md:active:cursor-default";
