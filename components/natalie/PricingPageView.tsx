"use client";

import {
    innerPageChipSectionClass,
    innerPageChipStripClass,
    innerPageContentInnerClass,
    innerPageContentSectionClass,
    innerPageEmptyStateClass,
    innerPageHeroRowClass,
    innerPageHeroSectionClass,
    innerPageTitleClass,
    innerPageToolsSlotClass,
} from "@/lib/inner-page-layout";
import {
    type PricingCategory,
    type PricingCategoryId,
    pricingCategories,
} from "@/lib/pricing-data";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { ContentContainer } from "./ContentContainer";
import { PricingServiceRow } from "./PricingServiceRow";

const ALL = "wszystkie" as const;

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

function uslugLabel(n: number) {
  if (n === 1) {
    return "usługa";
  }
  const k = n % 10;
  const j = n % 100;
  if (k >= 2 && k <= 4 && (j < 12 || j > 14)) {
    return "usługi";
  }
  return "usług";
}

export function PricingPageView() {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<
    typeof ALL | PricingCategoryId
  >(ALL);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(pricingCategories.map((c) => [c.id, true])),
  );

  const chipStripRef = useRef<HTMLDivElement>(null);
  const stripDrag = useRef({
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    dragging: false,
  });
  const blockChipClickUntil = useRef(0);

  const onChipStripPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
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
    },
    [],
  );

  const onChipStripPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
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
    },
    [],
  );

  const onChipStripPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
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
    },
    [],
  );

  const onChipStripLostPointerCapture = useCallback(() => {
    stripDrag.current.pointerId = -1;
    stripDrag.current.dragging = false;
  }, []);

  const onChipStripClickCapture = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (Date.now() < blockChipClickUntil.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [],
  );

  const toggleCategory = useCallback((id: string) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const chipCount = 1 + pricingCategories.length;

  const filteredCategories = useMemo(() => {
    const q = normalize(query.trim());
    const match = (c: PricingCategory) => {
      if (categoryFilter !== ALL && c.id !== categoryFilter) {
        return null;
      }
      const services = c.services.filter((s) => {
        if (!q) {
          return true;
        }
        const hay = normalize(`${s.name} ${s.description ?? ""}`);
        return hay.includes(q);
      });
      if (services.length === 0) {
        return null;
      }
      return { ...c, services };
    };
    return pricingCategories.map(match).filter(Boolean) as PricingCategory[];
  }, [categoryFilter, query]);

  return (
    <>
      <section className={innerPageHeroSectionClass}>
        <ContentContainer>
          <div className={innerPageHeroRowClass}>
            <h1 className={innerPageTitleClass}>Cennik</h1>
            <div className={innerPageToolsSlotClass}>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-atelier-text-muted"
                strokeWidth={1.5}
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Szukaj usługi"
                className="w-full border border-white/[0.1] bg-atelier-surface-elevated py-2.5 pl-10 pr-4 text-sm text-atelier-text outline-none transition-colors duration-500 placeholder:text-atelier-text-muted focus:border-atelier-accent/50"
                aria-label="Szukaj usługi"
              />
            </div>
          </div>
        </ContentContainer>
      </section>

      <section
        className={innerPageChipSectionClass}
        aria-label="Filtry kategorii"
      >
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
            style={{ ["--pricing-chip-cols" as string]: String(chipCount) }}
            aria-label="Kategorie usług — na małym ekranie przewiń lub przeciągnij"
          >
            <button
              type="button"
              title="Wszystkie kategorie"
              onClick={() => setCategoryFilter(ALL)}
              className={`shrink-0 border px-2 py-2.5 text-[9px] font-semibold uppercase leading-tight tracking-[0.08em] transition-colors duration-500 max-md:whitespace-nowrap md:min-w-0 md:truncate md:px-1.5 md:text-[9px] md:leading-snug ${
                categoryFilter === ALL
                  ? "border-atelier-accent bg-atelier-surface-elevated text-atelier-text"
                  : "border-white/10 bg-transparent text-atelier-text-muted hover:border-atelier-accent/40 hover:text-atelier-text"
              }`}
            >
              Wszystkie
            </button>
            {pricingCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                title={c.name}
                onClick={() => setCategoryFilter(c.id)}
                className={`shrink-0 border px-2 py-2.5 text-[9px] font-semibold uppercase leading-tight tracking-[0.08em] transition-colors duration-500 max-md:whitespace-nowrap md:min-w-0 md:truncate md:px-1.5 md:text-[9px] md:leading-snug ${
                  categoryFilter === c.id
                    ? "border-atelier-accent bg-atelier-surface-elevated text-atelier-text"
                    : "border-white/10 bg-transparent text-atelier-text-muted hover:border-atelier-accent/40 hover:text-atelier-text"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </ContentContainer>
      </section>

      <section
        className={innerPageContentSectionClass}
        aria-label="Lista usług i ceny"
      >
        <ContentContainer>
          {filteredCategories.length === 0 ? (
            <p className={innerPageEmptyStateClass}>
              Brak usług spełniających kryteria.
            </p>
          ) : (
            <div className={`${innerPageContentInnerClass} space-y-16`}>
              {filteredCategories.map((cat) => {
                const open = openMap[cat.id] !== false;
                return (
                  <div key={cat.id}>
                    <h2 className="mb-6 font-normal leading-snug">
                      <button
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className="flex w-full items-center justify-between gap-4 border-b border-white/[0.08] pb-4 text-left transition-opacity duration-500 hover:opacity-80"
                        aria-expanded={open}
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          {open ? (
                            <ChevronUp
                              className="h-5 w-5 shrink-0 text-atelier-text-muted"
                              strokeWidth={1.5}
                            />
                          ) : (
                            <ChevronDown
                              className="h-5 w-5 shrink-0 text-atelier-text-muted"
                              strokeWidth={1.5}
                            />
                          )}
                          <span className="text-2xl text-atelier-text">
                            {cat.name}
                          </span>
                        </span>
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] text-atelier-text-muted">
                          {cat.services.length}{" "}
                          {uslugLabel(cat.services.length)}
                        </span>
                      </button>
                    </h2>
                    {open ? (
                      <div className="divide-y divide-white/[0.06]">
                        {cat.services.map((s) => (
                          <PricingServiceRow key={s.id} service={s} />
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </ContentContainer>
      </section>
    </>
  );
}
