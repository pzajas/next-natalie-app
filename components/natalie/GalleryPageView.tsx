"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  type MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  type GalleryFilterId,
  type GalleryItem,
  galleryFilters,
  galleryItems,
} from "@/lib/gallery-data";
import { ContentContainer } from "./ContentContainer";
import { GalleryPhotoZoomShell, galleryPhotoImgClass } from "./GalleryPhotoZoomShell";

function useFilteredItems(filter: GalleryFilterId) {
  return useMemo(() => {
    if (filter === "wszystkie") {
      return [...galleryItems];
    }
    return galleryItems.filter((item) => item.filters.includes(filter));
  }, [filter]);
}

export function GalleryPageView() {
  const [filter, setFilter] = useState<GalleryFilterId>("wszystkie");
  const filtered = useFilteredItems(filter);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const selectFilter = useCallback((id: GalleryFilterId) => {
    setLightboxIndex(null);
    setFilter(id);
  }, []);

  const openAt = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || filtered.length === 0) {
        return null;
      }
      return (i - 1 + filtered.length) % filtered.length;
    });
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || filtered.length === 0) {
        return null;
      }
      return (i + 1) % filtered.length;
    });
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
      if (e.key === "ArrowLeft") {
        goPrev();
      }
      if (e.key === "ArrowRight") {
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  const touchStartX = useRef<number | null>(null);

  return (
    <>
      <section className="border-b border-black/5 bg-white py-[60px]">
        <ContentContainer>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="serif-font text-4xl tracking-tight text-black md:text-6xl">
              Nasze realizacje
            </h1>
          </div>
        </ContentContainer>
      </section>

      <section className="border-b border-black/5 bg-white py-[60px]" aria-label="Filtr galerii">
        <ContentContainer>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {galleryFilters.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => selectFilter(f.id)}
                  className={`border px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors md:px-6 ${
                    active
                      ? "border-black bg-black text-white"
                      : "border-black/15 bg-transparent text-stone-600 hover:border-black/40 hover:text-black"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </ContentContainer>
      </section>

      <section className="bg-white py-[60px]" aria-label="Galeria zdjęć">
        <ContentContainer>
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-stone-500">
              Brak realizacji w tej kategorii.
            </p>
          ) : (
            <div className="grid grid-cols-2 items-start gap-3 sm:grid-cols-3 md:gap-4">
              {filtered.map((item, index) => (
                <GalleryThumb
                  key={item.id}
                  item={item}
                  priority={index === 0}
                  onOpen={() => openAt(index)}
                />
              ))}
            </div>
          )}
        </ContentContainer>
      </section>

      <section className="bg-black py-[60px] text-center text-white">
        <ContentContainer>
          <h2 className="serif-font text-4xl tracking-tight md:text-5xl">Podoba Ci się efekt?</h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-stone-200 md:text-base">
            Zarezerwuj wizytę i stwórz swój własny styl
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
            <button
              type="button"
              className="border border-white bg-white px-12 py-4 text-[10px] font-bold uppercase tracking-widest text-black shadow-sm transition-colors duration-300 hover:bg-transparent hover:text-white hover:shadow-md active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
            >
              Zarezerwuj wizytę
            </button>
            <a
              className="border-b border-white/50 pb-1 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:border-white"
              href="#"
            >
              Sprawdź dostępność
            </a>
          </div>
        </ContentContainer>
      </section>

      {lightboxIndex !== null && filtered[lightboxIndex] ? (
        <Lightbox
          item={filtered[lightboxIndex]!}
          index={lightboxIndex}
          total={filtered.length}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
          touchStartX={touchStartX}
        />
      ) : null}
    </>
  );
}

function GalleryThumb({
  item,
  onOpen,
  priority = false,
}: {
  item: GalleryItem;
  onOpen: () => void;
  priority?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group gallery-color-reveal-target relative w-full overflow-hidden rounded-sm bg-stone-200 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40"
      style={{
        aspectRatio: `${item.aspectWidth} / ${item.aspectHeight}`,
      }}
    >
      <GalleryPhotoZoomShell>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, 33vw"
          className={galleryPhotoImgClass}
        />
      </GalleryPhotoZoomShell>
      <span
        className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25"
        aria-hidden
      />
    </button>
  );
}

function Lightbox({
  item,
  index,
  total,
  onClose,
  onPrev,
  onNext,
  touchStartX,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  touchStartX: MutableRefObject<number | null>;
}) {
  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/96 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Podgląd zdjęcia"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-110 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:right-8 md:top-8"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Zamknij"
      >
        <X className="h-7 w-7" strokeWidth={1.25} />
      </button>

      <button
        type="button"
        className="absolute left-2 top-1/2 z-110 -translate-y-1/2 rounded-full p-3 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:left-6"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Poprzednie zdjęcie"
      >
        <ChevronLeft className="h-10 w-10 md:h-12 md:w-12" strokeWidth={1.25} />
      </button>

      <button
        type="button"
        className="absolute right-2 top-1/2 z-110 -translate-y-1/2 rounded-full p-3 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:right-6"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Następne zdjęcie"
      >
        <ChevronRight className="h-10 w-10 md:h-12 md:w-12" strokeWidth={1.25} />
      </button>

      <div
        className="relative h-[min(85vh,900px)] w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = touchStartX.current;
          touchStartX.current = null;
          const end = e.changedTouches[0]?.clientX;
          if (start == null || end == null) {
            return;
          }
          const dx = end - start;
          if (dx > 56) {
            onPrev();
          } else if (dx < -56) {
            onNext();
          }
        }}
      >
        <Image
          alt={item.alt}
          src={item.src}
          fill
          className="object-contain transition-opacity duration-300"
          sizes="100vw"
          priority
        />
      </div>

      <p className="pointer-events-none absolute bottom-6 left-0 right-0 text-center text-xs text-stone-300 md:bottom-10">
        {index + 1} / {total}
      </p>
    </div>
  );
}
