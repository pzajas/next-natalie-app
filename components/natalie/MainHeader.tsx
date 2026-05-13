"use client";

import { ctaEditorialPrimary } from "@/lib/cta-classes";
import {
  FRAGMENT_NAV_EVENT,
  maybeSmoothScrollHomeHashNav,
  type FragmentNavEventDetail,
} from "@/lib/hash-nav";
import { natalieImages } from "@/lib/natalie-images";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ContentContainer } from "./ContentContainer";

const MAIN_NAV_SECTIONS = [
  { id: "hero", label: "Natalie" },
  { id: "o-salonie", label: "O salonie" },
  { id: "uslugi", label: "Usługi" },
  { id: "galeria", label: "Galeria" },
  { id: "opinie", label: "Opinie" },
  { id: "kontakt", label: "Kontakt" },
] as const;

type MainNavSectionId = (typeof MAIN_NAV_SECTIONS)[number]["id"];

const scrollThresholdPx = 16;

/**
 * Próg „sekcja jest aktywna” dla scroll-spy — musi być ≥ `scroll-mt-28` (~7rem),
 * inaczej po `scrollIntoView` góra sekcji zostaje poniżej progu i podkreślenie zostaje o jedną pozycję wstecz.
 */
function navSectionSpyMarkerPx(): number {
  return window.matchMedia("(min-width: 768px)").matches ? 132 : 120;
}

/** Musi być ≥ czasowi `transition-[grid-template-rows]` panelu menu + margines. */
const menuExpandDurationMs = 520;

export function MainHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  /** Po pełnym rozwinięciu menu — wtedy montujemy przyciemnienie. */
  const [dimmerMounted, setDimmerMounted] = useState(false);
  /** Drugi krok: uruchomienie fade-in opacity (1s). */
  const [dimmerFadeIn, setDimmerFadeIn] = useState(false);
  const [activeSectionId, setActiveSectionId] =
    useState<MainNavSectionId>("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > scrollThresholdPx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      return;
    }
    const ids = MAIN_NAV_SECTIONS.map((s) => s.id);

    const updateActiveSection = () => {
      const marker = navSectionSpyMarkerPx();
      let current: MainNavSectionId = "hero";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) {
          continue;
        }
        if (el.getBoundingClientRect().top <= marker) {
          current = id;
        }
      }
      setActiveSectionId((prev) => (prev === current ? prev : current));
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [isHome]);

  useEffect(() => {
    if (!isHome) {
      return;
    }
    const hash = window.location.hash.slice(1);
    if (!hash || !MAIN_NAV_SECTIONS.some((s) => s.id === hash)) {
      return;
    }
    const id = window.requestAnimationFrame(() => {
      setActiveSectionId(hash as MainNavSectionId);
    });
    return () => window.cancelAnimationFrame(id);
  }, [isHome, pathname]);

  useEffect(() => {
    if (!isHome) {
      return;
    }
    const onFragmentNav = (e: Event) => {
      const { id } = (e as CustomEvent<FragmentNavEventDetail>).detail;
      if (MAIN_NAV_SECTIONS.some((s) => s.id === id)) {
        setActiveSectionId(id as MainNavSectionId);
      }
    };
    window.addEventListener(FRAGMENT_NAV_EVENT, onFragmentNav);
    return () => {
      window.removeEventListener(FRAGMENT_NAV_EVENT, onFragmentNav);
    };
  }, [isHome]);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setMenuOpen(false);
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const prev = document.body.style.overflow;
    const raf = window.requestAnimationFrame(() => {
      document.body.style.overflow = "hidden";
    });
    return () => {
      window.cancelAnimationFrame(raf);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      const id = window.requestAnimationFrame(() => {
        setDimmerMounted(false);
        setDimmerFadeIn(false);
      });
      return () => window.cancelAnimationFrame(id);
    }
    const showDimmer = window.setTimeout(() => {
      setDimmerMounted(true);
    }, menuExpandDurationMs);
    return () => {
      window.clearTimeout(showDimmer);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!dimmerMounted) {
      return;
    }
    let innerId = 0;
    const outerId = window.requestAnimationFrame(() => {
      setDimmerFadeIn(false);
      innerId = window.requestAnimationFrame(() => {
        setDimmerFadeIn(true);
      });
    });
    return () => {
      window.cancelAnimationFrame(outerId);
      if (innerId) {
        window.cancelAnimationFrame(innerId);
      }
    };
  }, [dimmerMounted]);

  return (
    <header
      className={`sticky top-0 z-[100] border-b border-white/[0.08] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        menuOpen
          ? "max-md:transition-none bg-atelier-surface-secondary/95 md:bg-atelier-surface/86 md:backdrop-blur-md md:supports-backdrop-filter:bg-atelier-surface/82 md:transition-[background-color,backdrop-filter] md:duration-700"
          : scrolled
            ? "bg-atelier-surface/90 backdrop-blur-xl transition-[background-color,backdrop-filter] duration-700 supports-backdrop-filter:bg-atelier-surface/86"
            : "bg-atelier-surface/78 backdrop-blur-md transition-[background-color,backdrop-filter] duration-700 supports-backdrop-filter:bg-atelier-surface/74"
      }`}
      data-purpose="site-navigation"
    >
      {menuOpen && dimmerMounted ? (
        <button
          type="button"
          className={`fixed inset-x-0 bottom-0 top-[72px] z-0 bg-black/45 transition-opacity duration-1000 ease-out motion-reduce:transition-none md:hidden ${
            dimmerFadeIn ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Zamknij menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      <ContentContainer className="relative z-10 flex h-[72px] items-center justify-between gap-3 px-[24px]! md:h-24">
        <Link
          href="/"
          className="inline-block shrink-0 bg-transparent"
          aria-label="NATALIE — strona główna"
          data-purpose="brand-logo"
        >
          <Image
            alt="NATALIE Logo"
            className="logo-no-bg h-6 w-auto object-contain sm:h-7 md:h-9 lg:h-10"
            height={44}
            src={natalieImages.logo}
            width={147}
            priority
          />
        </Link>
        <nav
          className="hidden items-center space-x-8 md:flex lg:space-x-10"
          aria-label="Nawigacja główna"
        >
          {MAIN_NAV_SECTIONS.map((item) => (
            <a
              key={item.id}
              className={`nav-link transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isHome && activeSectionId === item.id
                  ? "nav-link--active"
                  : "hover:text-atelier-text"
              }`}
              href={isHome ? `#${item.id}` : `/#${item.id}`}
              aria-current={
                isHome && activeSectionId === item.id ? "location" : undefined
              }
              onClick={(e) => maybeSmoothScrollHomeHashNav(e, isHome)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center md:gap-0">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-atelier-text transition-opacity duration-500 hover:opacity-70 md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-site-nav"
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            {menuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
          <a
            className={`hidden px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest md:inline-flex md:items-center ${ctaEditorialPrimary}`}
            href={isHome ? "#rezerwacja" : "/#rezerwacja"}
            onClick={(e) => maybeSmoothScrollHomeHashNav(e, isHome)}
          >
            REZERWUJ
          </a>
        </div>

        <div
          id="mobile-site-nav"
          className={`absolute inset-x-0 top-full z-20 grid overflow-hidden bg-atelier-surface-secondary transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:hidden md:backdrop-blur-xl ${
            menuOpen
              ? "pointer-events-auto grid-rows-[1fr] border-b border-white/[0.08]"
              : "pointer-events-none grid-rows-[0fr] border-b-0"
          }`}
          aria-hidden={!menuOpen}
        >
          <div className="min-h-0 overflow-hidden" inert={!menuOpen}>
            <nav
              className="flex max-h-[min(72vh,520px)] flex-col overflow-y-auto overscroll-contain px-4 py-2 pb-4"
              aria-label="Menu mobilne"
            >
              {MAIN_NAV_SECTIONS.map((item) => (
                <a
                  key={item.id}
                  className={`nav-link border-t border-white/[0.06] py-3.5 first:border-t-0 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isHome && activeSectionId === item.id
                      ? "nav-link--active bg-white/[0.04]"
                      : "hover:bg-white/[0.03]"
                  }`}
                  href={isHome ? `#${item.id}` : `/#${item.id}`}
                  aria-current={
                    isHome && activeSectionId === item.id
                      ? "location"
                      : undefined
                  }
                  onClick={(e) => {
                    maybeSmoothScrollHomeHashNav(e, isHome);
                    setMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <a
                className="mt-1 border-t border-white/[0.08] bg-atelier-surface-elevated py-3.5 text-center text-[9px] font-bold uppercase tracking-[0.14em] text-atelier-text transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-atelier-accent/50 hover:bg-atelier-surface-secondary"
                href={isHome ? "#rezerwacja" : "/#rezerwacja"}
                onClick={(e) => {
                  maybeSmoothScrollHomeHashNav(e, isHome);
                  setMenuOpen(false);
                }}
              >
                Rezerwuj wizytę
              </a>
            </nav>
          </div>
        </div>
      </ContentContainer>
    </header>
  );
}
