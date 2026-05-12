import Image from "next/image";
import { localGalleryImages } from "@/lib/local-gallery-assets";
import { ContentContainer } from "./ContentContainer";
import { GalleryColorRevealTarget } from "./GalleryColorRevealTarget";
import { SectionTextLink } from "./SectionTextLink";
import { GalleryPhotoZoomShell, galleryPhotoImgClass } from "./GalleryPhotoZoomShell";

/** Mobile: niższe kafla; desktop: jak dotąd. */
const tileClass =
  "relative min-h-[200px] w-full overflow-hidden shadow-subtle md:h-[300px] md:min-h-0";

export function ArchiveGallery() {
  return (
    <section
      id="galeria"
      className="scroll-mt-28 bg-atelier-light py-10 md:py-[52px]"
      data-purpose="gallery"
    >
      <ContentContainer>
        <div className="mb-10 text-center md:mb-16">
          <h2 className="section-title text-center">Efekty naszej pracy</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-stone-700 md:mt-4 md:text-base">
            Więcej finalnych efektów, więcej ruchu i naturalnego światła. Galeria pokazuje fryzury
            w realnym życiu, nie tylko studyjne kadry.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
          <GalleryColorRevealTarget className={`group ${tileClass} md:col-span-6`}>
            <GalleryPhotoZoomShell>
              <Image
                alt="Efekt fryzury — fale i połysk"
                className={galleryPhotoImgClass}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                src={localGalleryImages.clientBrunetteWavesBack}
              />
            </GalleryPhotoZoomShell>
          </GalleryColorRevealTarget>
          <GalleryColorRevealTarget className={`group ${tileClass} md:col-span-6`}>
            <GalleryPhotoZoomShell>
              <Image
                alt="Wnętrze salonu — szeroki kadr"
                className={galleryPhotoImgClass}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                src={localGalleryImages.salonWideInterior}
              />
            </GalleryPhotoZoomShell>
          </GalleryColorRevealTarget>
          <div
            className={`flex items-center justify-center border border-black/12 bg-white p-5 shadow-subtle md:col-span-4 md:p-8 ${tileClass}`}
          >
            <p className="font-playfair text-center text-lg italic leading-snug text-black md:text-2xl md:leading-relaxed">
              &quot;Dopieszczenie bez przepychu — schludnie, bez nadmiernej stylizacji. Włosy mają dobrze
              wyglądać od rana do wieczora.&quot;
            </p>
          </div>
          <GalleryColorRevealTarget className={`group ${tileClass} md:col-span-4`}>
            <GalleryPhotoZoomShell>
              <Image
                alt="Detal pracy stylisty przy włosach"
                className={galleryPhotoImgClass}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                src={localGalleryImages.stylistHandsDetail}
              />
            </GalleryPhotoZoomShell>
          </GalleryColorRevealTarget>
          <GalleryColorRevealTarget className={`group ${tileClass} md:col-span-4`}>
            <GalleryPhotoZoomShell>
              <Image
                alt="Efekt: nowoczesny bob"
                className={galleryPhotoImgClass}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                src={localGalleryImages.clientModernBob}
              />
            </GalleryPhotoZoomShell>
          </GalleryColorRevealTarget>
          <GalleryColorRevealTarget className={`group ${tileClass} md:col-span-4`}>
            <GalleryPhotoZoomShell>
              <Image
                alt="Stylistka podczas strzyżenia"
                className={galleryPhotoImgClass}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                src={localGalleryImages.stylistCutting}
              />
            </GalleryPhotoZoomShell>
          </GalleryColorRevealTarget>
          <GalleryColorRevealTarget className={`group ${tileClass} md:col-span-8`}>
            <GalleryPhotoZoomShell>
              <Image
                alt="Klientka w przestrzeni salonu"
                className={galleryPhotoImgClass}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                src={localGalleryImages.clientSalonPortrait}
              />
            </GalleryPhotoZoomShell>
          </GalleryColorRevealTarget>
        </div>
        <div className="mx-auto mt-8 max-w-4xl text-center md:mt-10">
          <SectionTextLink href="/galeria">
            <span>Zobacz pełną galerię</span>
            <span aria-hidden>→</span>
          </SectionTextLink>
        </div>
      </ContentContainer>
    </section>
  );
}
