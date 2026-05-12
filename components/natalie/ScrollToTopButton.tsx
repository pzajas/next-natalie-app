"use client";

import { ChevronUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

/** Po przekroczeniu tej odległości od góry dokumentu pokazuje się przycisk. */
const SCROLL_SHOW_PX = 400;

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  const update = useCallback(() => {
    setVisible(window.scrollY > SCROLL_SHOW_PX);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [update]);

  const goTop = useCallback(() => {
    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: instant ? "instant" : "smooth" });
  }, []);

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Wróć na górę strony"
      className={`fixed z-90 flex h-11 w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-black bg-white text-black shadow-sm transition-opacity duration-200 ease-out motion-reduce:transition-none md:h-12 md:w-12 ${
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
        right: "max(1rem, env(safe-area-inset-right, 0px))",
      }}
    >
      <ChevronUp className="h-5 w-5 shrink-0 md:h-5 md:w-5" strokeWidth={2} aria-hidden />
    </button>
  );
}
