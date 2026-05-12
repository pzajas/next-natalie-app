"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

const maxMdQuery = "(max-width: 767px)";

/** Zwraca true na mobile (max-md), po montażu — do ukrycia nakładki na desktopie. */
export function useIsMaxMd() {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(maxMdQuery);
    const sync = () => setValue(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return value;
}

type GalleryColorRevealTargetProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Na szerokości &lt; md: zdjęcie w skali szarości, tap przełącza kolor / z powrotem szarość (CSS + data-color-reveal).
 * Na md+: tylko styl hover z globals.css — bez nakładki.
 */
export function GalleryColorRevealTarget({ children, className = "" }: GalleryColorRevealTargetProps) {
  const isMaxMd = useIsMaxMd();
  const [colorOn, setColorOn] = useState(false);

  const toggle = useCallback(() => {
    setColorOn((v) => !v);
  }, []);

  return (
    <div
      className={`gallery-color-reveal-target ${className}`.trim()}
      data-color-reveal={colorOn ? "on" : undefined}
    >
      {children}
      {isMaxMd ? (
        <button
          type="button"
          className="absolute inset-0 z-[5] cursor-pointer touch-manipulation border-0 bg-transparent p-0"
          aria-label={colorOn ? "Czarno-białe" : "Kolor"}
          aria-pressed={colorOn}
          onClick={toggle}
        />
      ) : null}
    </div>
  );
}
