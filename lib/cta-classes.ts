/**
 * Wspólne style CTA — delikatniejsza ramka, trochę wyższy kontrast, ciepły tint na hover.
 * Składaj z lokalnymi klasami rozmiaru (min-h, px, text-*).
 */
export const ctaEditorialFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atelier-accent/45";

export const ctaEditorialPrimary = `border border-[rgb(243_239_234_/0.15)] bg-atelier-surface-elevated text-atelier-text shadow-[inset_0_1px_0_rgb(255_255_255_/0.05)] transition-[background-color,border-color,box-shadow,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[rgb(201_171_136_/0.4)] hover:bg-[rgb(201_171_136_/0.12)] hover:text-atelier-text hover:shadow-[0_12px_40px_-28px_rgb(201_171_136_/0.22)] ${ctaEditorialFocus}`;

export const ctaEditorialGhost = `border border-[rgb(243_239_234_/0.09)] bg-transparent text-atelier-text transition-[background-color,border-color,box-shadow,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[rgb(201_171_136_/0.32)] hover:bg-[rgb(201_171_136_/0.08)] hover:text-atelier-text hover:shadow-[0_12px_36px_-30px_rgb(201_171_136_/0.12)] ${ctaEditorialFocus}`;
