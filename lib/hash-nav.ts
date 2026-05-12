import type { MouseEvent } from "react";

/** Płynny scroll do `#id` tylko na stronie głównej (href zaczyna się od `#`). */
export function maybeSmoothScrollHomeHashNav(e: MouseEvent<HTMLAnchorElement>, isHome: boolean) {
  if (!isHome) return;
  const href = e.currentTarget.getAttribute("href");
  if (!href?.startsWith("#")) return;
  const id = href.slice(1);
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
