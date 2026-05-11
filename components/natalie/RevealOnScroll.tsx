"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Fade + lekki ruch w górę po wejściu sekcji w viewport.
 * Respektuje prefers-reduced-motion.
 */
export function RevealOnScroll({ children, className = "" }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (hit) {
          setVisible(true);
          io.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: [0, 0.06, 0.12],
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stateClass = visible ? "reveal-on-scroll--visible" : "";

  return (
    <div ref={ref} className={`reveal-on-scroll ${stateClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
