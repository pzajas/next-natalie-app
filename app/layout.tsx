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
  title: "NATALIE | Precyzyjne fryzjerstwo",
  description:
    "Nowoczesny salon fryzjerski — precyzja, naturalny styl i klasyczne techniki barberingu.",
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
      <body className="min-h-full bg-atelier-light text-atelier-dark font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
