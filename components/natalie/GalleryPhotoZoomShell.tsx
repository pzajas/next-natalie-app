import type { ReactNode } from "react";

/**
 * Obudowa pod `next/image` + `fill`: zoom na zewnętrznym `div`,
 * żeby nie kolidował z inline stylami `<img>` (position/size).
 * Grayscale / kolor zostaje na `img` + `globals.css` (.gallery-color-reveal-target).
 */
export function GalleryPhotoZoomShell({
  children,
  zoomClassName = "transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]",
}: {
  children: ReactNode;
  /** Nadpisanie np. `duration-1000` dla hero. */
  zoomClassName?: string;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className={`relative h-full w-full origin-center ${zoomClassName}`}>
        {children}
      </div>
    </div>
  );
}

/** Tylko `filter` na img — `transform` animuje się na rodzicu (GalleryPhotoZoomShell). */
export const galleryPhotoImgClass =
  "object-cover transition-[filter] duration-700 ease-out";
