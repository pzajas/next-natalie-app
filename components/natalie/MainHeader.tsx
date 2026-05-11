"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { natalieImages } from "@/lib/natalie-images";
import { ContentContainer } from "./ContentContainer";

const hashNav = [
  { id: "o-salonie", label: "O salonie" },
  { id: "uslugi", label: "Usługi" },
  { id: "galeria", label: "Galeria" },
  { id: "opinie", label: "Opinie" },
  { id: "kontakt", label: "Kontakt" },
] as const;

const scrollThresholdPx = 16;

export function MainHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > scrollThresholdPx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "border-black/10 bg-atelier-light/92 shadow-[0_1px_0_rgba(0,0,0,0.04),0_8px_32px_-12px_rgba(0,0,0,0.08)] backdrop-blur-xl supports-backdrop-filter:bg-atelier-light/88"
          : "border-black/5 bg-atelier-light/78 backdrop-blur-md supports-backdrop-filter:bg-atelier-light/72"
      }`}
      data-purpose="site-navigation"
    >
      <ContentContainer className="flex h-24 items-center justify-between">
        <Link
          href="/"
          className="inline-block shrink-0"
          aria-label="NATALIE — strona główna"
          data-purpose="brand-logo"
        >
          <Image
            alt="NATALIE Logo"
            className="logo-no-bg h-24 w-auto object-contain"
            height={114}
            src={natalieImages.logo}
            width={381}
            priority
          />
        </Link>
        <nav className="hidden items-center space-x-8 md:flex lg:space-x-10">
          {hashNav.map((item) => (
            <a
              key={item.id}
              className="nav-link transition-opacity hover:opacity-60"
              href={isHome ? `#${item.id}` : `/#${item.id}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center">
          <a
            className="bg-atelier-dark px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-black"
            href={isHome ? "#rezerwacja" : "/#rezerwacja"}
          >
            REZERWUJ
          </a>
        </div>
      </ContentContainer>
    </header>
  );
}
