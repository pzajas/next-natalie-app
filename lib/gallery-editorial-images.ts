import { localGalleryImages } from "@/lib/local-gallery-assets";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  className?: string;
};

/**
 * Editorial layout map inspired by premium fashion collages.
 * `className` controls span behavior on tablet/desktop breakpoints.
 */
export const galleryEditorialImages: readonly GalleryImage[] = [
  {
    id: "ed-1",
    src: localGalleryImages.clientBrunetteWavesBack,
    alt: "Długie, lśniące fale - ujęcie od tyłu",
    className:
      "md:col-start-1 md:col-span-4 md:row-start-1 md:row-span-4 lg:col-start-1 lg:col-span-6 lg:row-start-1 lg:row-span-5",
  },
  {
    id: "ed-2",
    src: localGalleryImages.clientModernBob,
    alt: "Nowoczesny bob - portret profilowy",
    className:
      "md:col-start-5 md:col-span-2 md:row-start-1 md:row-span-1 lg:col-start-7 lg:col-span-3 lg:row-start-1 lg:row-span-1",
  },
  {
    id: "ed-3",
    src: localGalleryImages.clientSoftNatural,
    alt: "Naturalna stylizacja w miękkim świetle",
    className:
      "md:col-start-7 md:col-span-2 md:row-start-1 md:row-span-1 lg:col-start-10 lg:col-span-3 lg:row-start-1 lg:row-span-1",
  },
  {
    id: "ed-4",
    src: localGalleryImages.clientSalonPortrait,
    alt: "Portret klientki we wnętrzu salonu",
    className:
      "md:col-start-5 md:col-span-2 md:row-start-2 md:row-span-2 lg:col-start-7 lg:col-span-3 lg:row-start-2 lg:row-span-2",
  },
  {
    id: "ed-5",
    src: localGalleryImages.stylistHandsDetail,
    alt: "Detal pracy stylisty - precyzyjne modelowanie",
    className:
      "md:col-start-7 md:col-span-2 md:row-start-2 md:row-span-2 lg:col-start-10 lg:col-span-3 lg:row-start-2 lg:row-span-2",
  },
  {
    id: "ed-6",
    src: localGalleryImages.salonMirrorStations,
    alt: "Strefa luster i stanowisk - minimalistyczny rytm",
    className:
      "md:col-start-1 md:col-span-3 md:row-start-5 md:row-span-1 lg:col-start-1 lg:col-span-4 lg:row-start-6 lg:row-span-1",
  },
  {
    id: "ed-7",
    src: localGalleryImages.clientLayeredCut,
    alt: "Cięcie warstwowe - ruch i objętość",
    className:
      "md:col-start-4 md:col-span-2 md:row-start-5 md:row-span-1 lg:col-start-5 lg:col-span-2 lg:row-start-6 lg:row-span-1",
  },
  {
    id: "ed-8",
    src: localGalleryImages.stylistCutting,
    alt: "Stylistka podczas precyzyjnego strzyżenia",
    className:
      "md:col-start-6 md:col-span-3 md:row-start-4 md:row-span-3 lg:col-start-7 lg:col-span-6 lg:row-start-4 lg:row-span-4",
  },
  {
    id: "ed-9",
    src: localGalleryImages.salonWideInterior,
    alt: "Szeroki kadr wnętrza premium",
    className:
      "md:col-start-1 md:col-span-5 md:row-start-6 md:row-span-2 lg:col-start-1 lg:col-span-6 lg:row-start-7 lg:row-span-3",
  },
  {
    id: "ed-10",
    src: localGalleryImages.clientBlondeWaves,
    alt: "Blond fale - miękki skręt i połysk",
    className:
      "md:col-start-6 md:col-span-2 md:row-start-7 md:row-span-1 lg:col-start-7 lg:col-span-3 lg:row-start-8 lg:row-span-2",
  },
  {
    id: "ed-11",
    src: localGalleryImages.clientModernBob,
    alt: "Portret boba - druga perspektywa",
    className:
      "md:col-start-8 md:col-span-1 md:row-start-7 md:row-span-1 lg:col-start-10 lg:col-span-3 lg:row-start-8 lg:row-span-1",
  },
  {
    id: "ed-12",
    src: localGalleryImages.salonMirrorStations,
    alt: "Architektura salonu - rytm i symetria",
    className:
      "md:col-start-6 md:col-span-3 md:row-start-8 md:row-span-1 lg:col-start-10 lg:col-span-3 lg:row-start-9 lg:row-span-1",
  },
  // Drugi pas (wiersze 10–15) — ten sam rytm editorial, bez kolizji z pierwszym blokiem
  {
    id: "ed-13",
    src: localGalleryImages.clientBrunetteWavesBack,
    alt: "Fale — drugi kadr, światło boczne",
    className:
      "md:col-start-1 md:col-span-4 md:row-start-9 md:row-span-3 lg:col-start-1 lg:col-span-5 lg:row-start-10 lg:row-span-4",
  },
  {
    id: "ed-14",
    src: localGalleryImages.clientSalonPortrait,
    alt: "Salon — portret w przestrzeni",
    className:
      "md:col-start-5 md:col-span-2 md:row-start-9 md:row-span-1 lg:col-start-6 lg:col-span-3 lg:row-start-10 lg:row-span-2",
  },
  {
    id: "ed-15",
    src: localGalleryImages.clientSoftNatural,
    alt: "Naturalny look — zbliżenie",
    className:
      "md:col-start-7 md:col-span-2 md:row-start-9 md:row-span-1 lg:col-start-9 lg:col-span-4 lg:row-start-10 lg:row-span-2",
  },
  {
    id: "ed-16",
    src: localGalleryImages.stylistHandsDetail,
    alt: "Detal — modelowanie",
    className:
      "md:col-start-5 md:col-span-2 md:row-start-10 md:row-span-1 lg:col-start-6 lg:col-span-3 lg:row-start-12 lg:row-span-2",
  },
  {
    id: "ed-17",
    src: localGalleryImages.clientBlondeWaves,
    alt: "Blond — tekstura",
    className:
      "md:col-start-7 md:col-span-2 md:row-start-10 md:row-span-1 lg:col-start-9 lg:col-span-4 lg:row-start-12 lg:row-span-2",
  },
  {
    id: "ed-18",
    src: localGalleryImages.salonWideInterior,
    alt: "Wnętrze — szeroki plan",
    className:
      "md:col-start-1 md:col-span-8 md:row-start-12 md:row-span-2 lg:col-start-6 lg:col-span-7 lg:row-start-14 lg:row-span-2",
  },
  {
    id: "ed-19",
    src: localGalleryImages.clientLayeredCut,
    alt: "Warstwy — ruch włosa",
    className:
      "md:col-start-1 md:col-span-4 md:row-start-14 md:row-span-1 lg:col-start-1 lg:col-span-5 lg:row-start-14 lg:row-span-3",
  },
  {
    id: "ed-20",
    src: localGalleryImages.stylistCutting,
    alt: "Strzyżenie — praca stylistki",
    className:
      "md:col-start-5 md:col-span-4 md:row-start-14 md:row-span-3 lg:col-start-6 lg:col-span-7 lg:row-start-16 lg:row-span-3",
  },
  // Trzeci pas — lewa strona: szeroki pas + dwa kafliki; prawy dolny róg: jeden duży hero (ed-20 lg)
  {
    id: "ed-21",
    src: localGalleryImages.clientModernBob,
    alt: "Bob — profil",
    className:
      "md:col-start-1 md:col-span-4 md:row-start-15 md:row-span-1 lg:col-start-1 lg:col-span-5 lg:row-start-17 lg:row-span-1",
  },
  {
    id: "ed-22",
    src: localGalleryImages.salonMirrorStations,
    alt: "Lustra — detal",
    className:
      "md:col-start-1 md:col-span-2 md:row-start-16 md:row-span-1 lg:col-start-1 lg:col-span-2 lg:row-start-18 lg:row-span-1",
  },
  {
    id: "ed-23",
    src: localGalleryImages.clientSalonPortrait,
    alt: "Salon — drugi portret",
    className:
      "md:col-start-3 md:col-span-2 md:row-start-16 md:row-span-1 lg:col-start-3 lg:col-span-3 lg:row-start-18 lg:row-span-1",
  },
] as const;
