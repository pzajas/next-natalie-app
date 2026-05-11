"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

function isStudioOpen(now: Date) {
  const day = now.getDay();
  const h = now.getHours();
  const workday = day >= 1 && day <= 6;
  return workday && h >= 9 && h < 19;
}

export function HeaderStudioStatus() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const tick = () => {
      setOpen(isStudioOpen(new Date()));
    };
    const id0 = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 60_000);
    return () => {
      window.clearTimeout(id0);
      window.clearInterval(id);
    };
  }, []);

  if (open === null) {
    return (
      <span className="hidden h-4 w-24 shrink-0 md:inline-block" aria-hidden />
    );
  }

  if (open) {
    return (
      <span className="hidden items-center gap-2 md:inline-flex" title="Godziny otwarcia: 9:00–19:00">
        <span className="h-2 w-2 shrink-0 rounded-full bg-black" aria-hidden />
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-600">
          Otwarte teraz
        </span>
      </span>
    );
  }

  return (
    <span className="hidden items-center gap-1.5 text-stone-500 md:inline-flex" title="Godziny pracy salonu">
      <Clock className="h-3.5 w-3.5 shrink-0 stroke-[1.5]" aria-hidden />
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">9:00–19:00</span>
    </span>
  );
}
