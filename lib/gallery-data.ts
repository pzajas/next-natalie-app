import { localGalleryImages } from "@/lib/local-gallery-assets";

export type GalleryFilterId = "wszystkie" | "strzyzenie" | "broda" | "stylizacja" | "salon";

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  filters: Exclude<GalleryFilterId, "wszystkie">[];
  /** Proporcje miniatury (`aspect-ratio` w CSS). */
  aspectWidth: number;
  aspectHeight: number;
};

export const galleryFilters: { id: GalleryFilterId; label: string }[] = [
  { id: "wszystkie", label: "Wszystkie" },
  { id: "strzyzenie", label: "Strzyżenie" },
  { id: "broda", label: "Broda" },
  { id: "stylizacja", label: "Stylizacja" },
  { id: "salon", label: "Salon / Wnętrze" },
];

export const galleryItems: readonly GalleryItem[] = [
  {
    id: "g1",
    src: localGalleryImages.clientBrunetteWavesBack,
    alt: "Efekt: długie, zdrowe fale — widok od tyłu",
    filters: ["strzyzenie", "stylizacja"],
    aspectWidth: 4,
    aspectHeight: 5,
  },
  {
    id: "g2",
    src: localGalleryImages.clientModernBob,
    alt: "Efekt: nowoczesny bob — świeża linia i objętość",
    filters: ["strzyzenie"],
    aspectWidth: 3,
    aspectHeight: 4,
  },
  {
    id: "g3",
    src: localGalleryImages.clientSoftNatural,
    alt: "Portret klientki — naturalna stylizacja i miękki finish",
    filters: ["stylizacja", "strzyzenie"],
    aspectWidth: 3,
    aspectHeight: 4,
  },
  {
    id: "g4",
    src: localGalleryImages.clientLayeredCut,
    alt: "Cięcie warstwowe na ciemniejszym blondzie — ruch i lekkość",
    filters: ["strzyzenie"],
    aspectWidth: 4,
    aspectHeight: 5,
  },
  {
    id: "g5",
    src: localGalleryImages.clientBlondeWaves,
    alt: "Naturalne blond fale — tekstura i połysk",
    filters: ["stylizacja", "strzyzenie"],
    aspectWidth: 4,
    aspectHeight: 5,
  },
  {
    id: "g6",
    src: localGalleryImages.clientSalonPortrait,
    alt: "Klientka w przestrzeni salonu — spokojny, premium klimat",
    filters: ["salon", "stylizacja"],
    aspectWidth: 3,
    aspectHeight: 4,
  },
  {
    id: "g7",
    src: localGalleryImages.stylistCutting,
    alt: "Stylistka w pracy — precyzyjne cięcie",
    filters: ["strzyzenie", "broda"],
    aspectWidth: 4,
    aspectHeight: 5,
  },
  {
    id: "g8",
    src: localGalleryImages.stylistHandsDetail,
    alt: "Detal pracy stylisty — dłonie i faktura włosa",
    filters: ["strzyzenie"],
    aspectWidth: 1,
    aspectHeight: 1,
  },
  {
    id: "g9",
    src: localGalleryImages.salonWideInterior,
    alt: "Wnętrze salonu — szeroki kadr, światło i architektura",
    filters: ["salon"],
    aspectWidth: 16,
    aspectHeight: 9,
  },
  {
    id: "g10",
    src: localGalleryImages.salonMirrorStations,
    alt: "Strefa stanowisk — lustra, krzesła, minimalistyczny układ",
    filters: ["salon"],
    aspectWidth: 16,
    aspectHeight: 10,
  },
] as const;
