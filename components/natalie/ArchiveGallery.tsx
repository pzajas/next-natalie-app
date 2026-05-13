import { localGalleryImages } from "@/lib/local-gallery-assets";
import Image from "next/image";
import { ContentContainer } from "./ContentContainer";
import {
  GalleryCinematicPhotoTile,
  GalleryCinematicSpotlightProvider,
} from "./GalleryCinematicSpotlight";
import {
  GalleryPhotoZoomShell,
  galleryCinematicArchiveImgClass,
} from "./GalleryPhotoZoomShell";
import { SectionTextLink } from "./SectionTextLink";

const ARCHIVE_GALLERY_PHOTO_COUNT = 6;

/** Mobile: niższe kafla; desktop: jak dotąd. */
const tileClass =
  "relative min-h-[200px] w-full overflow-hidden md:h-[300px] md:min-h-0";

export function ArchiveGallery() {
  return (
    <section
      id="galeria"
      className="scroll-mt-28 bg-atelier-surface py-[40px]"
      data-purpose="gallery"
    >
      <ContentContainer className="!px-0 py-0">
        <div className="mb-10 px-6 text-center md:mb-16">
          <h2 className="section-title text-center">Efekty naszej pracy</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-atelier-text-secondary md:mt-4 md:text-base">
            Więcej finalnych efektów, więcej ruchu i naturalnego światła.
            Galeria pokazuje fryzury w realnym życiu, nie tylko studyjne kadry.
          </p>
        </div>
        <GalleryCinematicSpotlightProvider
          photoCount={ARCHIVE_GALLERY_PHOTO_COUNT}
        >
        <div className="grid grid-cols-1 gap-3 px-[24px] md:grid-cols-12 md:gap-4">
          <GalleryCinematicPhotoTile
            photoIndex={0}
            className={`${tileClass} md:col-span-6`}
          >
            <GalleryPhotoZoomShell zoomClassName="">
              <Image
                alt="Efekt fryzury — fale i połysk"
                className={galleryCinematicArchiveImgClass}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                src={localGalleryImages.clientBrunetteWavesBack}
              />
            </GalleryPhotoZoomShell>
          </GalleryCinematicPhotoTile>
          <GalleryCinematicPhotoTile
            photoIndex={1}
            className={`${tileClass} md:col-span-6`}
          >
            <GalleryPhotoZoomShell zoomClassName="">
              <Image
                alt="Wnętrze salonu — szeroki kadr"
                className={galleryCinematicArchiveImgClass}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                src={localGalleryImages.salonWideInterior}
              />
            </GalleryPhotoZoomShell>
          </GalleryCinematicPhotoTile>
          <div
            className={`flex items-center justify-center border border-white/[0.08] bg-atelier-surface-secondary p-5 md:col-span-4 md:p-8 ${tileClass}`}
          >
            <p className="font-playfair text-center text-lg italic leading-snug text-atelier-accent md:text-2xl md:leading-relaxed">
              &quot;Dopieszczenie bez przepychu — schludnie, bez nadmiernej
              stylizacji. Włosy mają dobrze wyglądać od rana do wieczora.&quot;
            </p>
          </div>
          <GalleryCinematicPhotoTile
            photoIndex={2}
            className={`${tileClass} md:col-span-4`}
          >
            <GalleryPhotoZoomShell zoomClassName="">
              <Image
                alt="Detal pracy stylisty przy włosach"
                className={galleryCinematicArchiveImgClass}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                src={localGalleryImages.stylistHandsDetail}
              />
            </GalleryPhotoZoomShell>
          </GalleryCinematicPhotoTile>
          <GalleryCinematicPhotoTile
            photoIndex={3}
            className={`${tileClass} md:col-span-4`}
          >
            <GalleryPhotoZoomShell zoomClassName="">
              <Image
                alt="Efekt: nowoczesny bob"
                className={galleryCinematicArchiveImgClass}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                src={localGalleryImages.clientModernBob}
              />
            </GalleryPhotoZoomShell>
          </GalleryCinematicPhotoTile>
          <GalleryCinematicPhotoTile
            photoIndex={4}
            className={`${tileClass} md:col-span-4`}
          >
            <GalleryPhotoZoomShell zoomClassName="">
              <Image
                alt="Stylistka podczas strzyżenia"
                className={galleryCinematicArchiveImgClass}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                src={localGalleryImages.stylistCutting}
              />
            </GalleryPhotoZoomShell>
          </GalleryCinematicPhotoTile>
          <GalleryCinematicPhotoTile
            photoIndex={5}
            className={`${tileClass} md:col-span-8`}
          >
            <GalleryPhotoZoomShell zoomClassName="">
              <Image
                alt="Klientka w przestrzeni salonu"
                className={galleryCinematicArchiveImgClass}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                src={localGalleryImages.clientSalonPortrait}
              />
            </GalleryPhotoZoomShell>
          </GalleryCinematicPhotoTile>
        </div>
        </GalleryCinematicSpotlightProvider>
        <div className="mx-auto mt-8 max-w-4xl px-6 text-center md:mt-10">
          <SectionTextLink href="/galeria">
            <span>Zobacz pełną galerię</span>
            <span aria-hidden>→</span>
          </SectionTextLink>
        </div>
      </ContentContainer>
    </section>
  );
}
