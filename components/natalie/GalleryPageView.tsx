"use client";

import {
  innerPageChipSectionClass,
  innerPageChipStripClass,
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
import { galleryEditorialImages, type GalleryImage } from "@/lib/gallery-editorial-images";
import { type MouseEvent, type PointerEvent, useCallback, useMemo, useRef, useState } from "react";
import { ContentContainer } from "./ContentContainer";
import { GalleryEditorialGrid } from "./GalleryEditorialGrid";

function useFilteredItems(filter: GalleryFilterId) {
  return useMemo(() => {
    if (filter === "wszystkie") {
      return galleryItems;
    }
    return galleryItems.filter((item) => item.filters.includes(filter));
  }, [filter]);
}

function mapToEditorialImages(items: readonly GalleryItem[]): GalleryImage[] {
  const pattern = galleryEditorialImages;
  return items.map((item, index) => ({
    id: item.id,
    src: item.src,
    alt: item.alt,
    className: pattern[index % pattern.length]?.className,
  }));
}

export function GalleryPageView() {
  const [filter, setFilter] = useState<GalleryFilterId>("wszystkie");
  const filtered = useFilteredItems(filter);
  const editorialFiltered = useMemo(() => mapToEditorialImages(filtered), [filtered]);

  const chipStripRef = useRef<HTMLDivElement>(null);
  const stripDragRef = useRef({
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    dragging: false,
  });
  const blockChipClickUntilRef = useRef(0);

  const onChipStripPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }
    const el = chipStripRef.current;
    if (!el || el.scrollWidth <= el.clientWidth + 2) {
      return;
    }
    stripDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: el.scrollLeft,
      dragging: false,
    };
    el.setPointerCapture(event.pointerId);
  }, []);

  const onChipStripPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== stripDragRef.current.pointerId) {
      return;
    }
    const el = chipStripRef.current;
    if (!el) {
      return;
    }
    const dx = event.clientX - stripDragRef.current.startX;
    if (Math.abs(dx) > 6) {
      stripDragRef.current.dragging = true;
    }
    el.scrollLeft = stripDragRef.current.startScrollLeft - dx;
  }, []);

  const onChipStripPointerUp = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== stripDragRef.current.pointerId) {
      return;
    }
    const el = chipStripRef.current;
    try {
      el?.releasePointerCapture(event.pointerId);
    } catch {
      // ignore if capture was already released
    }
    if (stripDragRef.current.dragging) {
      blockChipClickUntilRef.current = Date.now() + 320;
    }
    stripDragRef.current.pointerId = -1;
    stripDragRef.current.dragging = false;
  }, []);

  const onChipStripLostPointerCapture = useCallback(() => {
    stripDragRef.current.pointerId = -1;
    stripDragRef.current.dragging = false;
  }, []);

  const onChipStripClickCapture = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (Date.now() < blockChipClickUntilRef.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, []);

  const selectFilter = useCallback((id: GalleryFilterId) => {
    setFilter(id);
  }, []);

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
            aria-label="Kategorie galerii - na małym ekranie przewiń lub przeciągnij"
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

      <section className="w-full py-[40px]" aria-label="Galeria zdjęć">
        <ContentContainer className="!px-0">
          {editorialFiltered.length === 0 ? (
            <p className={`${innerPageEmptyStateClass} px-6 py-0`}>Brak realizacji w tej kategorii.</p>
          ) : (
            <GalleryEditorialGrid images={editorialFiltered} />
          )}
        </ContentContainer>
      </section>
    </>
  );
}
