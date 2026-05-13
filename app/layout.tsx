import { RouteScrollToTop, ScrollToTopButton } from "@/components/natalie";
import type { Metadata } from "next";
import { Bodoni_Moda, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni-moda",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NATALIE | Salon Fryzjerski Premium w Oświęcimiu",
  description:
    "Nowoczesny salon fryzjerski w Oświęcimiu. Strzyżenie damskie i męskie, nowoczesne cięcia oraz naturalny styl bez przesadnej stylizacji.",
  icons: {
    icon: "/fav.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${bodoniModa.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full bg-[#f5f3f0] text-atelier-dark font-sans antialiased">
        <RouteScrollToTop />
        <div className="mx-auto w-full min-w-0 max-w-[1200px]">{children}</div>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
