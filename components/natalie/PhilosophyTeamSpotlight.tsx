"use client";

import { useEffect, useState } from "react";

const INTERVAL_MS = 10_000;
const FADE_MS = 520;

const profiles = [
  {
    id: "natalia",
    roleLabel: "Founder / Lead Stylist",
    name: "Natalia",
    paragraphs: [
      "Buduje fryzury, które dobrze wyglądają nie tylko zaraz po wyjściu z salonu, ale też w codziennym rytmie pracy, treningu i spotkań.",
      "Każde cięcie zaczyna od konsultacji proporcji twarzy, gęstości włosów i naturalnego ruchu pasm. Efekt ma być ponadczasowy i noszalny.",
    ],
  },
  {
    id: "kasia",
    roleLabel: "Pracownik / Stylistka",
    name: "Kasia",
    paragraphs: [
      "W salonie skupia się na precyzji detalu i spójności całej sylwetki — od linii cięcia po domowe modelowanie, żeby fryzura wyglądała naturalnie także bez dodatkowej stylizacji.",
      "Lubi długie konsultacje i jasne ustalenia: dobiera techniki do struktury włosów i tempa życia klientki, żeby efekt był przewidywalny i łatwy w utrzymaniu.",
    ],
  },
] as const;

export function PhilosophyTeamSpotlight() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const advance = () => {
      if (cancelled) {
        return;
      }
      if (reduceMotion) {
        setIndex((i) => (i + 1) % profiles.length);
        return;
      }
      setVisible(false);
      window.setTimeout(() => {
        if (cancelled) {
          return;
        }
        setIndex((i) => (i + 1) % profiles.length);
        requestAnimationFrame(() => {
          if (!cancelled) {
            setVisible(true);
          }
        });
      }, FADE_MS);
    };

    const id = window.setInterval(advance, INTERVAL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  const profile = profiles[index];

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={`space-y-6 transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:space-y-8 ${
        visible ? "opacity-100 duration-520" : "pointer-events-none opacity-0 duration-480"
      }`}
    >
      <div className="min-h-[5.75rem] md:min-h-[6.25rem]">
        <p className="label-caps text-stone-700">{profile.roleLabel}</p>
        <h2 className="section-title mt-2 md:mt-3">{profile.name}</h2>
      </div>
      <div className="min-h-[15.5rem] max-w-lg space-y-4 text-[0.9375rem] font-medium leading-relaxed text-stone-700 md:min-h-[17.5rem] md:space-y-5 md:text-base">
        {profile.paragraphs.map((text, i) => (
          <p key={`${profile.id}-${i}`}>{text}</p>
        ))}
      </div>
    </div>
  );
}
