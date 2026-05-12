"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import {
  type MutableRefObject,
  type MouseEvent,
  type PointerEvent,
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  innerPageChipSectionClass,
  innerPageChipStripClass,
  innerPageContentInnerClass,
  innerPageContentSectionClass,
  innerPageEmptyStateClass,
  innerPageHeroRowClass,
  innerPageHeroSectionClass,
  innerPageTitleClass,
} from "@/lib/inner-page-layout";
import {
  type GalleryFilterId,
  type GalleryItem,
  galleryFilters,
  galleryItems,
} from "@/lib/gallery-data";
import { ContentContainer } from "./ContentContainer";
import { useIsMaxMd } from "./GalleryColorRevealTarget";
import { GalleryPhotoZoomShell, galleryPhotoImgClass } from "./GalleryPhotoZoomShell";

function useFilteredItems(filter: GalleryFilterId) {
  return useMemo(() => {
    if (filter === "wszystkie") {
      return galleryItems;
    }
    return galleryItems.filter((item) => item.filters.includes(filter));
  }, [filter]);
}

type MasonryLayout = {
  lefts: number[];
  tops: number[];
  heights: number[];
  colWidth: number;
  totalHeight: number;
};

function useGalleryMasonryLayout(
  items: readonly GalleryItem[],
  containerRef: RefObject<HTMLDivElement | null>,
): MasonryLayout | null {
  const [layout, setLayout] = useState<MasonryLayout | null>(null);

  const recompute = useCallback(() => {
    const el = containerRef.current;
    if (!el || items.length === 0) {
      setLayout(null);
      return;
    }
    const w = el.getBoundingClientRect().width;
    if (w <= 0) {
      return;
    }
    const colCount = w >= 640 ? 3 : 2;
    const colWidth = w / colCount;
    const columnHeights = Array.from({ length: colCount }, () => 0);
    const lefts: number[] = [];
    const tops: number[] = [];
    const heights: number[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i]!;
      const tileH = (colWidth * item.aspectHeight) / item.aspectWidth;
      let bestCol = 0;
      let bestTop = columnHeights[0]!;
      for (let c = 1; c < colCount; c++) {
        const t = columnHeights[c]!;
        if (t < bestTop) {
          bestTop = t;
          bestCol = c;
        }
      }
      lefts.push(bestCol * colWidth);
      tops.push(columnHeights[bestCol]!);
      heights.push(tileH);
      columnHeights[bestCol] = columnHeights[bestCol]! + tileH;
    }

    setLayout({
      lefts,
      tops,
      heights,
      colWidth,
      totalHeight: Math.max(...columnHeights, 0),
    });
  }, [items]);

  useLayoutEffect(() => {
    recompute();
    const el = containerRef.current;
    if (!el) {
      return;
    }
    const ro = new ResizeObserver(recompute);
    ro.observe(el);
    const mq = window.matchMedia("(min-width: 640px)");
    mq.addEventListener("change", recompute);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", recompute);
    };
  }, [recompute]);

  return layout;
}

function GalleryMasonryGrid({
  items,
  onOpenIndex,
}: {
  items: readonly GalleryItem[];
  onOpenIndex: (index: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layout = useGalleryMasonryLayout(items, containerRef);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: layout ? layout.totalHeight : undefined }}
    >
      {items.map((item, index) => {
        const brick =
          layout &&
          layout.lefts[index] !== undefined &&
          layout.tops[index] !== undefined &&
          layout.heights[index] !== undefined
            ? {
                left: layout.lefts[index],
                top: layout.tops[index],
                width: layout.colWidth,
                height: layout.heights[index],
              }
            : null;
        return (
          <div
            key={item.id}
            className="absolute overflow-hidden"
            style={
              brick
                ? {
                    left: brick.left,
                    top: brick.top,
                    width: brick.width,
                    height: brick.height,
                  }
                : { left: 0, top: 0, width: "100%", visibility: "hidden" as const }
            }
          >
            <GalleryThumb
              item={item}
              priority={index === 0}
              onOpen={() => onOpenIndex(index)}
            />
          </div>
        );
      })}
    </div>
  );
}

export function GalleryPageView() {
  const [filter, setFilter] = useState<GalleryFilterId>("wszystkie");
  const filtered = useFilteredItems(filter);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const chipStripRef = useRef<HTMLDivElement>(null);
  const stripDrag = useRef({
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    dragging: false,
  });
  const blockChipClickUntil = useRef(0);

  const onChipStripPointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) {
      return;
    }
    const el = chipStripRef.current;
    if (!el) {
      return;
    }
    if (el.scrollWidth <= el.clientWidth + 2) {
      return;
    }
    stripDrag.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
      dragging: false,
    };
    el.setPointerCapture(e.pointerId);
  }, []);

  const onChipStripPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerId !== stripDrag.current.pointerId) {
      return;
    }
    const el = chipStripRef.current;
    if (!el) {
      return;
    }
    const dx = e.clientX - stripDrag.current.startX;
    if (Math.abs(dx) > 6) {
      stripDrag.current.dragging = true;
    }
    el.scrollLeft = stripDrag.current.startScrollLeft - dx;
  }, []);

  const onChipStripPointerUp = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerId !== stripDrag.current.pointerId) {
      return;
    }
    const el = chipStripRef.current;
    try {
      el?.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    if (stripDrag.current.dragging) {
      blockChipClickUntil.current = Date.now() + 320;
    }
    stripDrag.current.pointerId = -1;
    stripDrag.current.dragging = false;
  }, []);

  const onChipStripLostPointerCapture = useCallback(() => {
    stripDrag.current.pointerId = -1;
    stripDrag.current.dragging = false;
  }, []);

  const onChipStripClickCapture = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (Date.now() < blockChipClickUntil.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

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
      <section className={innerPageHeroSectionClass}>
        <ContentContainer>
          <div className={innerPageHeroRowClass}>
            <h1 className={innerPageTitleClass}>Nasze realizacje</h1>
          </div>
        </ContentContainer>
      </section>

      <section className={innerPageChipSectionClass} aria-label="Filtr galerii">
        <ContentContainer>
          <div
            ref={chipStripRef}
            onPointerDown={onChipStripPointerDown}
            onPointerMove={onChipStripPointerMove}
            onPointerUp={onChipStripPointerUp}
            onPointerCancel={onChipStripPointerUp}
            onLostPointerCapture={onChipStripLostPointerCapture}
            onClickCapture={onChipStripClickCapture}
            className={innerPageChipStripClass}
            style={{ ["--pricing-chip-cols" as string]: String(galleryFilters.length) }}
            aria-label="Kategorie galerii — na małym ekranie przewiń lub przeciągnij"
          >
            {galleryFilters.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  title={f.label}
                  onClick={() => selectFilter(f.id)}
                  className={`shrink-0 border px-2 py-2.5 text-[9px] font-semibold uppercase leading-tight tracking-[0.08em] transition-colors max-md:whitespace-nowrap md:min-w-0 md:truncate md:px-1.5 md:text-[9px] md:leading-snug ${
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

      <section className={innerPageContentSectionClass} aria-label="Galeria zdjęć">
        <ContentContainer>
          {filtered.length === 0 ? (
            <p className={innerPageEmptyStateClass}>Brak realizacji w tej kategorii.</p>
          ) : (
            <div className={innerPageContentInnerClass}>
              <GalleryMasonryGrid items={filtered} onOpenIndex={openAt} />
            </div>
          )}
        </ContentContainer>
      </section>

      <section className="bg-black py-[60px] text-center text-white">
        <ContentContainer>
          <h2 className={`${innerPageTitleClass} mx-auto text-center text-white!`}>Podoba Ci się efekt?</h2>
          <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-stone-200 md:text-base">
            Zarezerwuj wizytę i stwórz swój własny styl
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
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
  const isMaxMd = useIsMaxMd();
  const [colorOn, setColorOn] = useState(false);

  useEffect(() => {
    if (!isMaxMd) {
      setColorOn(false);
    }
  }, [isMaxMd]);

  return (
    <div
      className="group gallery-color-reveal-target relative h-full w-full overflow-hidden bg-stone-200 text-left"
      data-color-reveal={isMaxMd && colorOn ? "on" : undefined}
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
      {isMaxMd ? (
        <>
          <button
            type="button"
            className="absolute inset-0 z-[1] cursor-pointer touch-manipulation border-0 bg-transparent p-0 outline-none [-webkit-tap-highlight-color:transparent] focus:outline-none"
            aria-label={colorOn ? "Czarno-biały" : "Kolor"}
            aria-pressed={colorOn}
            onClick={() => setColorOn((v) => !v)}
          />
          <button
            type="button"
            className="absolute bottom-1.5 right-1.5 z-[2] flex h-8 w-8 cursor-pointer touch-manipulation items-center justify-center border border-black/15 bg-white/95 text-black shadow-subtle backdrop-blur-sm outline-none transition-colors [-webkit-tap-highlight-color:transparent] hover:bg-white focus:outline-none"
            aria-label="Otwórz zdjęcie na pełnym ekranie"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          >
            <ZoomIn className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={onOpen}
          className="absolute inset-0 z-10 outline-none [-webkit-tap-highlight-color:transparent] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40"
          aria-label={`Otwórz: ${item.alt}`}
        />
      )}
    </div>
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
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setShown(true);
      return;
    }
    setShown(false);
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setShown(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [item.id, index]);

  const fadeUi = `transition-opacity duration-500 ease-out motion-reduce:transition-none ${shown ? "opacity-100" : "opacity-0"}`;

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center bg-black/96 p-4 transition-opacity duration-300 ease-out motion-reduce:transition-none md:p-8 ${shown ? "opacity-100" : "pointer-events-none opacity-0"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Podgląd zdjęcia"
      onClick={onClose}
    >
      <button
        type="button"
        className={`absolute right-4 top-4 z-110 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:right-8 md:top-8 ${fadeUi}`}
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
        className={`absolute left-2 top-1/2 z-110 -translate-y-1/2 rounded-full p-3 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:left-6 ${fadeUi}`}
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
        className={`absolute right-2 top-1/2 z-110 -translate-y-1/2 rounded-full p-3 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:right-6 ${fadeUi}`}
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Następne zdjęcie"
      >
        <ChevronRight className="h-10 w-10 md:h-12 md:w-12" strokeWidth={1.25} />
      </button>

      <div
        className={`relative h-[min(85vh,900px)] w-full max-w-6xl ${fadeUi}`}
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
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      <p className={`pointer-events-none absolute bottom-6 left-0 right-0 text-center text-xs text-stone-300 md:bottom-10 ${fadeUi}`}>
        {index + 1} / {total}
      </p>
    </div>
  );
}
