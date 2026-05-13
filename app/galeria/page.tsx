import { GalleryPageView, MainFooter, MainHeader } from "@/components/natalie";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria | NATALIE",
  description:
    "Realizacje salonu NATALIE — naturalne efekty, precyzja i styl. Zobacz wybrane prace i zarezerwuj wizytę.",
};

export default function GaleriaPage() {
  return (
    <>
      <MainHeader />
      <main>
        <GalleryPageView />
      </main>
      <MainFooter />
    </>
  );
}
