import type { MouseEvent } from "react";

function triggerHeroNavFlash(el: HTMLElement) {
  el.classList.remove("hero-nav-flash");
  void el.offsetWidth;
  el.classList.add("hero-nav-flash");
  window.setTimeout(() => {
    el.classList.remove("hero-nav-flash");
  }, 900);
}

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
  const path = `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(null, "", `${path}#${id}`);
  if (id === "hero") {
    if (reduce) {
      triggerHeroNavFlash(el);
    } else {
      window.setTimeout(() => triggerHeroNavFlash(el), 420);
    }
  }
}
