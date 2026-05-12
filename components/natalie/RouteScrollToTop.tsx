"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/** Natychmiastowy scroll: góra strony albo element z `#hash` — przed malowaniem (bez „zjazdu” z html { scroll-behavior: smooth }). */
export function RouteScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const raw = window.location.hash.slice(1);
    if (raw) {
      const id = decodeURIComponent(raw);
      const go = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "instant", block: "start" });
          return true;
        }
        return false;
      };
      if (!go()) {
        requestAnimationFrame(() => {
          go();
        });
      }
      return;
    }

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
