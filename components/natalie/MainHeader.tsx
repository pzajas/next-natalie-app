"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { maybeSmoothScrollHomeHashNav } from "@/lib/hash-nav";
import { natalieImages } from "@/lib/natalie-images";
import { ContentContainer } from "./ContentContainer";

const hashNav = [
  { id: "o-salonie", label: "O salonie" },
  { id: "uslugi", label: "Usługi" },
  { id: "galeria", label: "Galeria" },
  { id: "opinie", label: "Opinie" },
  { id: "kontakt", label: "Kontakt" },
] as const;

const scrollThresholdPx = 16;

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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > scrollThresholdPx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
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
      setDimmerMounted(false);
      setDimmerFadeIn(false);
      return;
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
    setDimmerFadeIn(false);
    let innerId = 0;
    const outerId = window.requestAnimationFrame(() => {
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
      className={`sticky top-0 z-[100] border-b ease-[cubic-bezier(0.22,1,0.36,1)] ${
        menuOpen
          ? "max-md:transition-none border-black/10 bg-atelier-light shadow-[0_1px_0_rgba(0,0,0,0.06),0_12px_40px_-18px_rgba(0,0,0,0.12)] md:border-black/5 md:bg-atelier-light/78 md:shadow-none md:backdrop-blur-md md:supports-backdrop-filter:bg-atelier-light/72 md:transition-[background-color,backdrop-filter,border-color,box-shadow] md:duration-500"
          : scrolled
            ? "border-black/10 bg-atelier-light/92 shadow-[0_1px_0_rgba(0,0,0,0.04),0_8px_32px_-12px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 supports-backdrop-filter:bg-atelier-light/88"
            : "border-black/5 bg-atelier-light/78 backdrop-blur-md transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 supports-backdrop-filter:bg-atelier-light/72"
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
      <ContentContainer className="relative z-10 flex h-[72px] items-center justify-between gap-3 md:h-24">
        <Link
          href="/"
          className="inline-block shrink-0 bg-transparent"
          aria-label="NATALIE — strona główna"
          data-purpose="brand-logo"
        >
          <Image
            alt="NATALIE Logo"
            className="logo-no-bg h-[52px] w-auto object-contain md:h-24"
            height={114}
            src={natalieImages.logo}
            width={381}
            priority
          />
        </Link>
        <nav className="hidden items-center space-x-8 md:flex lg:space-x-10" aria-label="Nawigacja główna">
          {hashNav.map((item) => (
            <a
              key={item.id}
              className="nav-link transition-opacity hover:opacity-60"
              href={isHome ? `#${item.id}` : `/#${item.id}`}
              onClick={(e) => maybeSmoothScrollHomeHashNav(e, isHome)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center md:gap-0">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-atelier-dark transition-opacity hover:opacity-70 md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-site-nav"
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            {menuOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
            <a
              className="hidden bg-atelier-dark px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-black md:inline-flex md:items-center"
              href={isHome ? "#rezerwacja" : "/#rezerwacja"}
              onClick={(e) => maybeSmoothScrollHomeHashNav(e, isHome)}
            >
            REZERWUJ
          </a>
        </div>

        <div
          id="mobile-site-nav"
          className={`absolute inset-x-0 top-full z-20 grid overflow-hidden bg-atelier-light shadow-[0_12px_40px_-16px_rgba(0,0,0,0.2)] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:hidden md:bg-atelier-light/98 md:backdrop-blur-xl ${
            menuOpen
              ? "pointer-events-auto grid-rows-[1fr] border-b border-black/10"
              : "pointer-events-none grid-rows-[0fr] border-b-0"
          }`}
          aria-hidden={!menuOpen}
        >
          <div className="min-h-0 overflow-hidden" inert={!menuOpen}>
            <nav className="flex max-h-[min(72vh,520px)] flex-col overflow-y-auto overscroll-contain px-4 py-2 pb-4" aria-label="Menu mobilne">
            {hashNav.map((item) => (
              <a
                key={item.id}
                className="nav-link border-t border-black/6 py-3.5 first:border-t-0 transition-opacity hover:opacity-60"
                href={isHome ? `#${item.id}` : `/#${item.id}`}
                onClick={(e) => {
                  maybeSmoothScrollHomeHashNav(e, isHome);
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              className="mt-1 border-t border-black/12 bg-atelier-dark py-3.5 text-center text-[9px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-black"
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
