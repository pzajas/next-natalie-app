import Link from "next/link";
import type { ReactNode } from "react";

const sectionTextLinkClass =
  "relative inline-flex items-center gap-2 pb-0.5 text-sm font-medium tracking-wide text-atelier-text transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-atelier-accent after:content-[''] after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-atelier-accent-hover hover:after:scale-x-100 focus-visible:text-atelier-accent-hover focus-visible:after:scale-x-100 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atelier-accent/40";

export function SectionTextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={sectionTextLinkClass}>
      {children}
    </Link>
  );
}
