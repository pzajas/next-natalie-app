"use client";

import { ctaEditorialGhost, ctaEditorialPrimary } from "@/lib/cta-classes";
import { Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ContentContainer } from "./ContentContainer";

const testimonials = [
  {
    quote:
      "Wyszłam i od razu wiedziałam, że to moje włosy — lekkie, naturalne, bez przerysowania.",
    author: "Elżbieta",
  },
  {
    quote:
      "Super konsultacja i jeszcze lepszy efekt. Fryzura układa się sama, nawet bez stylizacji.",
    author: "Angelika",
  },
  {
    quote:
      "Dokładnie taki balans: nowocześnie, ale nadal po mojemu. Wrócę na pewno.",
    author: "Maciej",
  },
  {
    quote:
      "Włosy wyglądają premium, ale nadal naturalnie. To nie jest efekt tylko na jedno zdjęcie.",
    author: "Dominika",
  },
  {
    quote:
      "Kolor dobrany idealnie do karnacji. Minął miesiąc, a fryzura dalej trzyma formę.",
    author: "Katarzyna",
  },
  {
    quote:
      "Pierwsza wizyta i totalny spokój. Wiedziałam, że jestem w dobrych rękach.",
    author: "Zuzanna",
  },
  {
    quote:
      "W końcu salon, który słucha i dopasowuje fryzurę do twarzy — bez szablonów i bez pośpiechu.",
    author: "Anna",
  },
  {
    quote:
      "Bardzo dobry rytm wizyty: konsultacja, cięcie, finalny efekt. Bez chaosu i pośpiechu.",
    author: "Gloria",
  },
  {
    quote:
      "Efekt końcowy był nawet lepszy niż inspiracja. Bardzo świadoma praca na detalu.",
    author: "Julia",
  },
  {
    quote:
      "Szybko, ale bez kompromisu w jakości. Dokładnie tego potrzebowałam.",
    author: "Ewa",
  },
  {
    quote:
      "Atmosfera butikowa, a efekt bardzo nośny. To jest poziom dużego miasta.",
    author: "Izabela",
  },
  {
    quote:
      "Byłam z córką i obie wyszłyśmy zachwycone. Delikatnie, cierpliwie i bardzo estetycznie.",
    author: "Klientka",
  },
  {
    quote:
      "Syn bardzo zadowolony, ja też — czyste cięcie, miła atmosfera i zero pośpiechu.",
    author: "Agnieszka",
  },
  {
    quote:
      "Kolejna wizyta i znów to samo: świetne cięcie, luz i wysoka kultura pracy.",
    author: "Mariusz",
  },
  {
    quote:
      "Podejście do dziecka perfekcyjne. Zero stresu, tylko spokój i profesjonalizm.",
    author: "Paulina",
  },
  {
    quote:
      "Wysoki poziom, świetny dobór detali i finish — widać rzemiosło. Wrócę regularnie.",
    author: "Kinga",
  },
  {
    quote:
      "Koloryzacja wyszła dokładnie tak, jak chciałam: miękka, świeża i bez ostrej granicy.",
    author: "Mirela",
  },
  {
    quote:
      "Pierwsza wizyta i od razu poczucie, że to moje miejsce. Bardzo premium doświadczenie.",
    author: "Renata",
  },
] as const;

const SLOT_COUNT = 3;
/** Dłuższe fazy + `ease-in-out` — wcześniejszy easing „zjadał” większość ruchu na początku 2 s. */
const FADE_MS = 2000;
const HOLD_MS = 6000;

function nextIndexAvoidingPeers(
  slot: number,
  prevIndices: readonly number[],
  len: number,
): number {
  const others = new Set<number>();
  for (let i = 0; i < SLOT_COUNT; i++) {
    if (i !== slot) {
      others.add(prevIndices[i]!);
    }
  }
  let candidate = (prevIndices[slot]! + 1) % len;
  let guard = 0;
  while (others.has(candidate) && guard < len) {
    candidate = (candidate + 1) % len;
    guard++;
  }
  return candidate;
}

function TestimonialCardBody({
  t,
  contentOpacity,
}: {
  t: (typeof testimonials)[number];
  contentOpacity: number;
}) {
  return (
    <div
      className="transition-opacity ease-in-out motion-reduce:transition-none"
      style={{
        opacity: contentOpacity,
        transitionDuration: `${FADE_MS}ms`,
      }}
    >
      <div className="mb-3 flex items-center justify-between md:mb-4">
        <p className="text-sm font-semibold text-atelier-text">{t.author}</p>
        <div className="flex items-center gap-1" role="img" aria-label="Ocena 5 na 5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5 text-atelier-accent"
              strokeWidth={1.75}
              fill="none"
              aria-hidden
            />
          ))}
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        <p
          className="font-playfair line-clamp-3 min-h-[4.875rem] flex-1 text-lg italic leading-snug text-atelier-text md:min-h-0 md:text-xl md:leading-relaxed md:line-clamp-none"
          title={t.quote}
        >
          &quot;{t.quote}&quot;
        </p>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const len = testimonials.length;
  const initialIndices = useMemo(() => {
    const base = [0, 1, 2] as number[];
    if (len >= SLOT_COUNT) {
      return base;
    }
    return Array.from({ length: SLOT_COUNT }, (_, i) => i % len);
  }, [len]);

  const [indices, setIndices] = useState<number[]>(() => [...initialIndices]);
  const [contentOpacity, setContentOpacity] = useState<number[]>(() =>
    Array.from({ length: SLOT_COUNT }, () => 1),
  );

  useEffect(() => {
    if (len < 1) {
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      return;
    }

    let cancelled = false;
    const timeouts: number[] = [];
    let slot = 0;

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

    const rotateOne = () => {
      const s = slot % SLOT_COUNT;
      later(() => {
        setContentOpacity((o) => {
          const n = [...o];
          n[s] = 0;
          return n;
        });
      }, 0);

      later(() => {
        setIndices((prev) => {
          const n = [...prev];
          n[s] = nextIndexAvoidingPeers(s, prev, len);
          return n;
        });
        setContentOpacity((o) => {
          const n = [...o];
          n[s] = 1;
          return n;
        });
        slot += 1;
        later(rotateOne, FADE_MS + HOLD_MS);
      }, FADE_MS);
    };

    later(rotateOne, HOLD_MS);

    return () => {
      cancelled = true;
      for (const id of timeouts) {
        window.clearTimeout(id);
      }
    };
  }, [len]);

  return (
    <section
      id="opinie"
      className="scroll-mt-28 bg-atelier-surface py-[40px]"
      data-purpose="testimonials"
    >
      <ContentContainer className="py-0">
        <div className="px-[24px]">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="section-title text-center">Opinie klientów</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-atelier-text-secondary md:mt-4 md:text-base">
              Zweryfikowane opinie z Google i Booksy.
            </p>
          </div>
          <div className="mb-8 grid min-h-0 grid-cols-1 items-stretch gap-4 md:mb-12 md:grid-cols-3 md:gap-6">
            {indices.map((ti, slot) => {
              const t = testimonials[ti]!;
              return (
                <div
                  key={slot}
                  className="flex h-full flex-col border border-white/[0.08] bg-atelier-surface-elevated p-5 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-atelier-accent/20 md:min-h-0 md:p-6"
                >
                  <TestimonialCardBody
                    t={t}
                    contentOpacity={contentOpacity[slot] ?? 1}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex flex-col items-stretch gap-3">
            <p className="text-center label-caps text-atelier-text-muted">
              Podziel się opinią
            </p>
            <div className="grid w-full grid-cols-1 gap-3 sm:mx-auto sm:max-w-2xl sm:grid-cols-2 sm:gap-4">
              <a
                className={`inline-flex min-h-11 w-full items-center justify-center px-6 py-2.5 text-center text-[9px] font-bold uppercase leading-snug tracking-[0.12em] md:min-h-12 md:px-8 md:py-3 md:text-[10px] md:tracking-widest ${ctaEditorialPrimary}`}
                href="#"
              >
                Oceń nas na Google
              </a>
              <a
                className={`inline-flex min-h-11 w-full items-center justify-center px-6 py-2.5 text-center text-[9px] font-bold uppercase leading-snug tracking-[0.12em] md:min-h-12 md:px-8 md:py-3 md:text-[10px] md:tracking-widest ${ctaEditorialGhost}`}
                href="#"
              >
                Zostaw opinię na Booksy
              </a>
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
