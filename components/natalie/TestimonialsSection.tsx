"use client";

import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import { ContentContainer } from "./ContentContainer";

const testimonials = [
  {
    quote: "Wyszlam i od razu wiedzialam, ze to moje wlosy - lekkie, naturalne, bez przerysowania.",
    author: "Elzbieta",
  },
  {
    quote: "Super konsultacja i jeszcze lepszy efekt. Fryzura uklada sie sama, nawet bez stylizacji.",
    author: "Angelika",
  },
  {
    quote: "Dokladnie taki balans: nowoczesnie, ale nadal po mojemu. Wroce na pewno.",
    author: "Maciej",
  },
  {
    quote: "Wlosy wygladaja premium, ale nadal naturalnie. To nie jest efekt tylko na jedno zdjecie.",
    author: "Dominika",
  },
  {
    quote: "Kolor dobrany idealnie do karnacji. Minal miesiac, a fryzura dalej trzyma forme.",
    author: "Katarzyna",
  },
  {
    quote: "Pierwsza wizyta i totalny spokoj. Wiedzialam, ze jestem w dobrych rekach.",
    author: "Zuzanna",
  },
  {
    quote: "W końcu salon, który słucha i dopasowuje fryzurę do twarzy — bez szablonów i bez pośpiechu.",
    author: "Anna",
  },
  {
    quote: "Bardzo dobry rytm wizyty: konsultacja, ciecie, finalny efekt. Bez chaosu i pospiechu.",
    author: "Gloria",
  },
  {
    quote: "Efekt koncowy byl nawet lepszy niz inspiracja. Bardzo swiadoma praca na detalu.",
    author: "Julia",
  },
  {
    quote: "Szybko, ale bez kompromisu w jakosci. Dokladnie tego potrzebowalam.",
    author: "Ewa",
  },
  {
    quote: "Atmosfera butikowa, a efekt bardzo noszalny. To jest poziom duzego miasta.",
    author: "Izabela",
  },
  {
    quote: "Bylam z corka i obie wyszlysmy zachwycone. Delikatnie, cierpliwie i bardzo estetycznie.",
    author: "Klientka",
  },
  {
    quote: "Syn bardzo zadowolony, ja też — czyste cięcie, miła atmosfera i zero pośpiechu.",
    author: "Agnieszka",
  },
  {
    quote: "Kolejna wizyta i znow to samo: swietne ciecie, luz i wysoka kultura pracy.",
    author: "Mariusz",
  },
  {
    quote: "Podejscie do dziecka perfekcyjne. Zero stresu, tylko spokoj i profesjonalizm.",
    author: "Paulina",
  },
  {
    quote: "Wysoki poziom, świetny dobór detali i finish — widać rzemiosło. Wrócę regularnie.",
    author: "Kinga",
  },
  {
    quote: "Koloryzacja wyszla dokladnie taka, jakiej chcialam: miekka, swieza i bez ostrej granicy.",
    author: "Mirela",
  },
  {
    quote: "Pierwsza wizyta i od razu poczucie, ze to moje miejsce. Bardzo premium doswiadczenie.",
    author: "Renata",
  },
] as const;

const testimonialsGridMinHeightRem = Math.min(
  20,
  Math.max(11, 5 + Math.ceil(Math.max(...testimonials.map((t) => t.quote.length)) / 34) * 2.75),
);

export function TestimonialsSection() {
  const [page, setPage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const groups = useMemo(() => {
    const result: (typeof testimonials)[number][][] = [];
    for (let i = 0; i < testimonials.length; i += 3) {
      result.push(testimonials.slice(i, i + 3) as (typeof testimonials)[number][]);
    }
    return result;
  }, []);

  useEffect(() => {
    if (groups.length <= 1) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const intervalId = setInterval(() => {
      setIsVisible(false);

      timeoutId = setTimeout(() => {
        setPage((prevPage) => (prevPage + 1) % groups.length);
        setIsVisible(true);
      }, 500);
    }, 10000);

    return () => {
      clearInterval(intervalId);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [groups.length]);

  return (
    <section
      id="opinie"
      className="scroll-mt-28 bg-white py-[52px]"
      data-purpose="testimonials"
    >
      <ContentContainer>
        <div className="mb-12 text-center">
          <h2 className="section-title text-center">Opinie klientów</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-stone-700">
            Zweryfikowane opinie z Google i Booksy.
          </p>
        </div>
        <div
          className={`mb-12 grid min-h-0 grid-cols-1 items-stretch gap-6 transition-opacity duration-500 ease-in-out md:min-h-(--tm-row-min) md:grid-cols-3 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ ["--tm-row-min" as string]: `${testimonialsGridMinHeightRem}rem` }}
        >
          {groups[page].map((t) => (
            <div
              key={`${t.author}-${t.quote}`}
              className="flex h-full min-h-32 flex-col border border-black/8 bg-stone-50 p-6 shadow-subtle transition-shadow duration-300 ease-out hover:shadow-[0_28px_52px_-14px_rgba(0,0,0,0.26)] md:min-h-0"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-black">{t.author}</p>
                <div className="flex items-center gap-1" aria-label="Ocena 5 na 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 text-black"
                      strokeWidth={1.75}
                      fill="none"
                      aria-hidden
                    />
                  ))}
                </div>
              </div>
              <div className="flex min-h-0 flex-1 flex-col">
                <p className="font-playfair flex-1 text-xl italic leading-relaxed text-black">
                  &quot;{t.quote}&quot;
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <p className="mb-2 w-full text-center label-caps text-stone-600">Podziel się opinią</p>
          <a
            className="inline-flex min-h-12 items-center justify-center border border-black px-8 py-3 text-center text-[10px] font-bold uppercase leading-snug tracking-widest text-black transition-colors hover:bg-black hover:text-white"
            href="#"
          >
            Oceń nas na Google
          </a>
          <a
            className="inline-flex min-h-12 items-center justify-center border border-black px-8 py-3 text-center text-[10px] font-bold uppercase leading-snug tracking-widest text-black transition-colors hover:bg-black hover:text-white"
            href="#"
          >
            Zostaw opinię na Booksy
          </a>
        </div>
      </ContentContainer>
    </section>
  );
}
