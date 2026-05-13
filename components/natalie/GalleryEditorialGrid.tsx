"use client";

import type { GalleryImage } from "@/lib/gallery-editorial-images";
import { galleryEditorialImages } from "@/lib/gallery-editorial-images";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import {
    useCallback,
    useEffect,
    useId,
    useMemo,
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

const LIGHTBOX_CONTENT_FADE_MS = 500;
const GRID_FILTER_FADE_MS = 500;

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
  const prevLightboxIndexRef = useRef<number | null>(null);

  const imagesSignature = useMemo(
    () => images.map((img) => img.id).join("|"),
    [images],
  );

  const [displayedImages, setDisplayedImages] = useState<readonly GalleryImage[]>(
    () => images,
  );
  const [gridContentVisible, setGridContentVisible] = useState(true);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setLightboxPortalReady(true);
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  const goLightboxPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || displayedImages.length < 2) {
        return i;
      }
      return (i - 1 + displayedImages.length) % displayedImages.length;
    });
  }, [displayedImages]);

  const goLightboxNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || displayedImages.length < 2) {
        return i;
      }
      return (i + 1) % displayedImages.length;
    });
  }, [displayedImages]);

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

  const prevImagesSignatureRef = useRef<string | null>(null);

  useEffect(() => {
    if (prevImagesSignatureRef.current === imagesSignature) {
      return;
    }
    const prevSig = prevImagesSignatureRef.current;
    prevImagesSignatureRef.current = imagesSignature;

    if (prevSig === null) {
      setDisplayedImages(images);
      setGridContentVisible(true);
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplayedImages(images);
      setGridContentVisible(true);
      setLightboxIndex(null);
      setLightboxEntered(false);
      return;
    }

    setLightboxIndex(null);
    setLightboxEntered(false);
    setGridContentVisible(false);
    const t = window.setTimeout(() => {
      setDisplayedImages(images);
      window.requestAnimationFrame(() => {
        setGridContentVisible(true);
      });
    }, GRID_FILTER_FADE_MS);
    return () => {
      window.clearTimeout(t);
    };
  }, [imagesSignature, images]);

  useEffect(() => {
    if (lightboxIndex === null) {
      prevLightboxIndexRef.current = null;
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLightboxEntered(true);
      prevLightboxIndexRef.current = lightboxIndex;
      return;
    }

    const prev = prevLightboxIndexRef.current;

    if (prev === null) {
      let inner = 0;
      const outer = window.requestAnimationFrame(() => {
        setLightboxEntered(false);
        inner = window.requestAnimationFrame(() => {
          setLightboxEntered(true);
          prevLightboxIndexRef.current = lightboxIndex;
        });
      });
      return () => {
        window.cancelAnimationFrame(outer);
        window.cancelAnimationFrame(inner);
      };
    }

    setLightboxEntered(false);
    const t = window.setTimeout(() => {
      setLightboxEntered(true);
      prevLightboxIndexRef.current = lightboxIndex;
    }, LIGHTBOX_CONTENT_FADE_MS);
    return () => {
      window.clearTimeout(t);
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
      if (displayedImages.length < 2) {
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
    displayedImages.length,
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

  const openItem =
    lightboxIndex !== null ? displayedImages[lightboxIndex] ?? null : null;
  const lightboxOpen = lightboxIndex !== null && openItem !== null;
  const showNav = displayedImages.length > 1;

  const lightboxModal =
    lightboxPortalReady && lightboxOpen && openItem ? (
      <div
        ref={dialogRef}
        className={`fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:p-6 ${
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
          Galeria — zdjęcie {lightboxIndex + 1} z {displayedImages.length}
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
              className={`relative mx-auto h-[min(82dvh,calc(100dvh-4.5rem))] w-full max-w-6xl rounded-sm border border-white/[0.08] ease-in-out motion-reduce:transition-none ${
                lightboxEntered
                  ? "scale-100 opacity-100"
                  : "scale-[0.96] opacity-0"
              }`}
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: `${LIGHTBOX_CONTENT_FADE_MS}ms`,
              }}
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
          {lightboxIndex + 1} / {displayedImages.length}
        </div>
      </div>
    ) : null;

  return (
    <>
      <RevealOnScroll className={className}>
        <div className="w-full">
          <div
            className={`transition-opacity duration-500 ease-in-out motion-reduce:transition-none ${
              gridContentVisible
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
          {/* Mobile */}
          <div
            className="flex flex-col gap-3 md:hidden"
            role="list"
            aria-label="Galeria editorial NATALIE"
          >
            {displayedImages.map((image, index) => (
              <article
                key={image.id}
                role="listitem"
                className="group relative overflow-hidden bg-atelier-surface-elevated"
              >
                <button
                  type="button"
                  className="relative block w-full cursor-pointer border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atelier-accent/45"
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
                  <span className="pointer-events-none absolute inset-0 bg-white/0 transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-white/[0.04]" />
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
            {displayedImages.map((image, index) => (
              <article
                key={image.id}
                role="listitem"
                className={`group relative h-full min-h-0 overflow-hidden bg-atelier-surface-elevated ${image.className ?? ""}`}
              >
                <button
                  type="button"
                  className="absolute inset-0 z-10 cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atelier-accent/45"
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
                <span className="pointer-events-none absolute inset-0 bg-white/0 transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-white/[0.04]" />
              </article>
            ))}
          </div>
          </div>
        </div>
      </RevealOnScroll>
      {lightboxModal ? createPortal(lightboxModal, document.body) : null}
    </>
  );
}
