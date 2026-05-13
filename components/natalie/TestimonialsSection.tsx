"use client";

import { Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ContentContainer } from "./ContentContainer";

const testimonials = [
  {
    quote:
      "Wyszlam i od razu wiedzialam, ze to moje wlosy - lekkie, naturalne, bez przerysowania.",
    author: "Elzbieta",
  },
  {
    quote:
      "Super konsultacja i jeszcze lepszy efekt. Fryzura uklada sie sama, nawet bez stylizacji.",
    author: "Angelika",
  },
  {
    quote:
      "Dokladnie taki balans: nowoczesnie, ale nadal po mojemu. Wroce na pewno.",
    author: "Maciej",
  },
  {
    quote:
      "Wlosy wygladaja premium, ale nadal naturalnie. To nie jest efekt tylko na jedno zdjecie.",
    author: "Dominika",
  },
  {
    quote:
      "Kolor dobrany idealnie do karnacji. Minal miesiac, a fryzura dalej trzyma forme.",
    author: "Katarzyna",
  },
  {
    quote:
      "Pierwsza wizyta i totalny spokoj. Wiedzialam, ze jestem w dobrych rekach.",
    author: "Zuzanna",
  },
  {
    quote:
      "W końcu salon, który słucha i dopasowuje fryzurę do twarzy — bez szablonów i bez pośpiechu.",
    author: "Anna",
  },
  {
    quote:
      "Bardzo dobry rytm wizyty: konsultacja, ciecie, finalny efekt. Bez chaosu i pospiechu.",
    author: "Gloria",
  },
  {
    quote:
      "Efekt koncowy byl nawet lepszy niz inspiracja. Bardzo swiadoma praca na detalu.",
    author: "Julia",
  },
  {
    quote:
      "Szybko, ale bez kompromisu w jakosci. Dokladnie tego potrzebowalam.",
    author: "Ewa",
  },
  {
    quote:
      "Atmosfera butikowa, a efekt bardzo noszalny. To jest poziom duzego miasta.",
    author: "Izabela",
  },
  {
    quote:
      "Bylam z corka i obie wyszlysmy zachwycone. Delikatnie, cierpliwie i bardzo estetycznie.",
    author: "Klientka",
  },
  {
    quote:
      "Syn bardzo zadowolony, ja też — czyste cięcie, miła atmosfera i zero pośpiechu.",
    author: "Agnieszka",
  },
  {
    quote:
      "Kolejna wizyta i znow to samo: swietne ciecie, luz i wysoka kultura pracy.",
    author: "Mariusz",
  },
  {
    quote:
      "Podejscie do dziecka perfekcyjne. Zero stresu, tylko spokoj i profesjonalizm.",
    author: "Paulina",
  },
  {
    quote:
      "Wysoki poziom, świetny dobór detali i finish — widać rzemiosło. Wrócę regularnie.",
    author: "Kinga",
  },
  {
    quote:
      "Koloryzacja wyszla dokladnie taka, jakiej chcialam: miekka, swieza i bez ostrej granicy.",
    author: "Mirela",
  },
  {
    quote:
      "Pierwsza wizyta i od razu poczucie, ze to moje miejsce. Bardzo premium doswiadczenie.",
    author: "Renata",
  },
] as const;

export function TestimonialsSection() {
  const [page, setPage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const groups = useMemo(() => {
    const result: (typeof testimonials)[number][][] = [];
    for (let i = 0; i < testimonials.length; i += 3) {
      result.push(
        testimonials.slice(i, i + 3) as (typeof testimonials)[number][],
      );
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
      className="scroll-mt-28 bg-[#f3efea] py-[40px]"
      data-purpose="testimonials"
    >
      <ContentContainer className="py-0">
        <div className="px-[24px]">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="section-title text-center">Opinie klientów</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-stone-700 md:mt-4 md:text-base">
              Zweryfikowane opinie z Google i Booksy.
            </p>
          </div>
          <div
            className={`mb-8 grid min-h-0 grid-cols-1 items-stretch gap-4 transition-opacity duration-500 ease-in-out md:mb-12 md:grid-cols-3 md:gap-6 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {groups[page].map((t) => (
              <div
                key={`${t.author}-${t.quote}`}
                className="flex h-full flex-col border border-black/8 bg-stone-50 p-5 shadow-subtle transition-shadow duration-300 ease-out hover:shadow-[0_28px_52px_-14px_rgba(0,0,0,0.26)] md:min-h-0 md:p-6"
              >
                <div className="mb-3 flex items-center justify-between md:mb-4">
                  <p className="text-sm font-semibold text-black">{t.author}</p>
                  <div
                    className="flex items-center gap-1"
                    aria-label="Ocena 5 na 5"
                  >
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
                  <p
                    className="font-playfair line-clamp-3 min-h-[4.875rem] flex-1 text-lg italic leading-snug text-black md:min-h-0 md:text-xl md:leading-relaxed md:line-clamp-none"
                    title={t.quote}
                  >
                    &quot;{t.quote}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <p className="mb-1 w-full text-center label-caps text-stone-600 sm:mb-2">
              Podziel się opinią
            </p>
            <a
              className="inline-flex min-h-11 items-center justify-center border border-black px-6 py-2.5 text-center text-[9px] font-bold uppercase leading-snug tracking-[0.12em] text-black transition-colors hover:bg-black hover:text-white md:min-h-12 md:px-8 md:py-3 md:text-[10px] md:tracking-widest"
              href="#"
            >
              Oceń nas na Google
            </a>
            <a
              className="inline-flex min-h-11 items-center justify-center border border-black px-6 py-2.5 text-center text-[9px] font-bold uppercase leading-snug tracking-[0.12em] text-black transition-colors hover:bg-black hover:text-white md:min-h-12 md:px-8 md:py-3 md:text-[10px] md:tracking-widest"
              href="#"
            >
              Zostaw opinię na Booksy
            </a>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
