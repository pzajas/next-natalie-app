"use client";

import type { GalleryImage } from "@/lib/gallery-editorial-images";
import { galleryEditorialImages } from "@/lib/gallery-editorial-images";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import {
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
    type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { RevealOnScroll } from "./RevealOnScroll";

type GalleryEditorialGridProps = {
  images?: readonly GalleryImage[];
  className?: string;
};

export function GalleryEditorialGrid({
  images = galleryEditorialImages,
  className = "",
}: GalleryEditorialGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxEntered, setLightboxEntered] = useState(false);
  const [lightboxPortalReady, setLightboxPortalReady] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const lightboxTriggerRef = useRef<HTMLElement | null>(null);
  const hadLightboxRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const lightboxTitleId = useId();
  const lightboxHelpId = useId();

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setLightboxPortalReady(true);
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  const goLightboxPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || images.length < 2) {
        return i;
      }
      return (i - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const goLightboxNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || images.length < 2) {
        return i;
      }
      return (i + 1) % images.length;
    });
  }, [images.length]);

  const closeLightbox = useCallback(() => {
    setLightboxEntered(false);
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      closeTimeoutRef.current = null;
      setLightboxIndex(null);
      window.requestAnimationFrame(() => {
        const el = lightboxTriggerRef.current;
        if (el && "focus" in el && typeof el.focus === "function") {
          el.focus({ preventScroll: true });
        }
      });
    }, 280);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }
    let outer = 0;
    let inner = 0;
    outer = window.requestAnimationFrame(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setLightboxEntered(true);
        return;
      }
      setLightboxEntered(false);
      inner = window.requestAnimationFrame(() => {
        setLightboxEntered(true);
      });
    });
    return () => {
      window.cancelAnimationFrame(outer);
      window.cancelAnimationFrame(inner);
    };
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) {
      hadLightboxRef.current = false;
      return;
    }
    const justOpened = !hadLightboxRef.current;
    hadLightboxRef.current = true;
    if (justOpened) {
      const id = window.requestAnimationFrame(() => {
        closeButtonRef.current?.focus({ preventScroll: true });
      });
      return () => window.cancelAnimationFrame(id);
    }
    return undefined;
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
        return;
      }
      if (images.length < 2) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goLightboxPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goLightboxNext();
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [
    lightboxIndex,
    closeLightbox,
    goLightboxPrev,
    goLightboxNext,
    images.length,
  ]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleLightboxTabTrap = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "Tab" || !dialogRef.current) {
        return;
      }
      const dialog = dialogRef.current;
      const selectors =
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
      const focusable = [
        ...dialog.querySelectorAll<HTMLElement>(selectors),
      ].filter((el) => !el.closest("[aria-hidden='true'])"));
      if (focusable.length < 2) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [],
  );

  const openLightbox = useCallback((index: number, trigger: HTMLElement) => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    lightboxTriggerRef.current = trigger;
    setLightboxIndex(index);
  }, []);

  if (images.length === 0) {
    return null;
  }

  const openItem = lightboxIndex !== null ? images[lightboxIndex] : null;
  const lightboxOpen = lightboxIndex !== null && openItem !== null;
  const showNav = images.length > 1;

  const lightboxModal =
    lightboxPortalReady && lightboxOpen && openItem ? (
      <div
        ref={dialogRef}
        className={`fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300 ease-out motion-reduce:transition-none sm:p-6 ${
          lightboxEntered ? "opacity-100" : "opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={lightboxTitleId}
        aria-describedby={lightboxHelpId}
        onClick={closeLightbox}
        onKeyDown={handleLightboxTabTrap}
      >
        <h2 id={lightboxTitleId} className="sr-only">
          Galeria — zdjęcie {lightboxIndex + 1} z {images.length}
        </h2>
        <p id={lightboxHelpId} className="sr-only">
          Strzałki w lewo i w prawo zmieniają zdjęcie. Escape zamyka okno.
        </p>
        <button
          ref={closeButtonRef}
          type="button"
          className="absolute right-3 top-3 z-10 rounded-full p-2 text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 sm:right-5 sm:top-5"
          aria-label="Zamknij"
          onClick={(e) => {
            e.stopPropagation();
            closeLightbox();
          }}
        >
          <X className="h-6 w-6" strokeWidth={1.5} />
        </button>
        <div
          className="pointer-events-auto mx-auto flex w-full max-w-[min(calc(100vw-1.25rem),calc(72rem+5rem))] items-center justify-center gap-1.5 sm:max-w-[min(calc(100vw-2rem),calc(72rem+6.5rem))] sm:gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {showNav ? (
            <button
              ref={prevButtonRef}
              type="button"
              className="shrink-0 self-center rounded-full p-2 text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 sm:p-2.5"
              aria-label="Poprzednie zdjęcie"
              onClick={(e) => {
                e.stopPropagation();
                goLightboxPrev();
              }}
            >
              <ChevronLeft
                className="h-7 w-7 sm:h-8 sm:w-8"
                strokeWidth={1.25}
                aria-hidden
              />
            </button>
          ) : null}
          <div className="relative flex min-w-0 flex-1 justify-center">
            <div
              className={`relative mx-auto h-[min(82dvh,calc(100dvh-4.5rem))] w-full max-w-6xl rounded-sm shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                lightboxEntered
                  ? "scale-100 opacity-100"
                  : "scale-[0.96] opacity-0"
              }`}
            >
              <Image
                key={openItem.id}
                src={openItem.src}
                alt={openItem.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 1152px"
                priority
              />
            </div>
          </div>
          {showNav ? (
            <button
              ref={nextButtonRef}
              type="button"
              className="shrink-0 self-center rounded-full p-2 text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 sm:p-2.5"
              aria-label="Następne zdjęcie"
              onClick={(e) => {
                e.stopPropagation();
                goLightboxNext();
              }}
            >
              <ChevronRight
                className="h-7 w-7 sm:h-8 sm:w-8"
                strokeWidth={1.25}
                aria-hidden
              />
            </button>
          ) : null}
        </div>
        <div
          className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs font-medium tabular-nums text-white/85 ring-1 ring-white/10 sm:bottom-5 sm:text-sm"
          aria-hidden
        >
          {lightboxIndex + 1} / {images.length}
        </div>
      </div>
    ) : null;

  return (
    <>
      <RevealOnScroll className={className}>
        <div className="w-full">
          {/* Mobile */}
          <div
            className="flex flex-col gap-3 md:hidden"
            role="list"
            aria-label="Galeria editorial NATALIE"
          >
            {images.map((image, index) => (
              <article
                key={image.id}
                role="listitem"
                className="group relative overflow-hidden bg-neutral-100"
              >
                <button
                  type="button"
                  className="relative block w-full cursor-pointer border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40"
                  aria-label={`Otwórz zdjęcie: ${image.alt}`}
                  onClick={(e) => openLightbox(index, e.currentTarget)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1200}
                    height={1600}
                    loading={index < 2 ? "eager" : "lazy"}
                    priority={index < 1}
                    sizes="(max-width: 767px) 100vw, 1200px"
                    className="h-auto w-full object-cover grayscale-[55%] opacity-95 transition-all duration-700 ease-out motion-safe:group-hover:scale-[1.03] motion-safe:group-hover:grayscale-0 motion-safe:group-hover:opacity-100"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-700 ease-out group-hover:bg-black/[0.03]" />
                </button>
              </article>
            ))}
          </div>

          {/* Tablet / Desktop */}
          <div
            className="hidden md:grid md:grid-cols-8 md:auto-rows-[72px] md:gap-3 lg:grid-cols-12 lg:auto-rows-[88px] lg:gap-3"
            role="list"
            aria-label="Galeria editorial NATALIE"
          >
            {images.map((image, index) => (
              <article
                key={image.id}
                role="listitem"
                className={`group relative h-full min-h-0 overflow-hidden bg-neutral-100 ${image.className ?? ""}`}
              >
                <button
                  type="button"
                  className="absolute inset-0 z-10 cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40"
                  aria-label={`Otwórz zdjęcie: ${image.alt}`}
                  onClick={(e) => openLightbox(index, e.currentTarget)}
                />
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading={index < 4 ? "eager" : "lazy"}
                  priority={index < 2}
                  sizes="(max-width: 767px) 100vw, 1200px"
                  className="object-cover grayscale-[55%] opacity-95 transition-all duration-700 ease-out motion-safe:group-hover:scale-[1.03] motion-safe:group-hover:grayscale-0 motion-safe:group-hover:opacity-100"
                />
                <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-700 ease-out group-hover:bg-black/[0.03]" />
              </article>
            ))}
          </div>
        </div>
      </RevealOnScroll>
      {lightboxModal ? createPortal(lightboxModal, document.body) : null}
    </>
  );
}
