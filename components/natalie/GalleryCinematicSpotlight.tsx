"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/** Fade in do koloru — musi być zgodne z `transition` w `globals.css`. */
const FADE_IN_MS = 2000;
/** Pełny kolor po zakończeniu fade in. */
const HOLD_MS = 5000;
/** Fade out do szarości przed kolejnym zdjęciem. */
const FADE_OUT_MS = 2000;

type SpotlightContextValue = {
  /** `null` = wszystkie szaro (fade out lub prefers-reduced-motion). */
  activeIndex: number | null;
};

const GalleryCinematicSpotlightContext =
  createContext<SpotlightContextValue | null>(null);

function pickNextDistinct(prev: number, count: number): number {
  if (count <= 1) {
    return 0;
  }
  let next = Math.floor(Math.random() * count);
  while (next === prev) {
    next = Math.floor(Math.random() * count);
  }
  return next;
}

/**
 * Jedno „aktywne” zdjęcie naraz: fade in → pauza w kolorze → fade out → następne losowe zdjęcie.
 */
export function GalleryCinematicSpotlightProvider({
  photoCount,
  children,
}: {
  photoCount: number;
  children: ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (photoCount < 1) {
      setActiveIndex(null);
      return;
    }

    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMq.matches) {
      setActiveIndex(null);
      return;
    }

    const initial = Math.floor(Math.random() * photoCount);
    setActiveIndex(initial);

    let cancelled = false;
    const timeouts: number[] = [];

    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        const idx = timeouts.indexOf(id);
        if (idx >= 0) {
          timeouts.splice(idx, 1);
        }
        if (!cancelled) {
          fn();
        }
      }, ms);
      timeouts.push(id);
    };

    const loop = (shownIndex: number) => {
      later(() => {
        setActiveIndex(null);
        later(() => {
          const next = pickNextDistinct(shownIndex, photoCount);
          setActiveIndex(next);
          loop(next);
        }, FADE_OUT_MS);
      }, FADE_IN_MS + HOLD_MS);
    };

    loop(initial);

    return () => {
      cancelled = true;
      for (const id of timeouts) {
        window.clearTimeout(id);
      }
    };
  }, [photoCount]);

  return (
    <GalleryCinematicSpotlightContext.Provider value={{ activeIndex }}>
      {children}
    </GalleryCinematicSpotlightContext.Provider>
  );
}

export function GalleryCinematicPhotoTile({
  photoIndex,
  className = "",
  children,
}: {
  photoIndex: number;
  className?: string;
  children: ReactNode;
}) {
  const ctx = useContext(GalleryCinematicSpotlightContext);
  if (!ctx) {
    throw new Error(
      "GalleryCinematicPhotoTile must be used inside GalleryCinematicSpotlightProvider",
    );
  }
  const isActive =
    ctx.activeIndex !== null && ctx.activeIndex === photoIndex;

  return (
    <div
      className={`gallery-cinematic-target ${className}`.trim()}
      data-cinematic-active={isActive ? "true" : "false"}
    >
      {children}
    </div>
  );
}
