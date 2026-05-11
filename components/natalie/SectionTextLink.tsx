import Link from "next/link";
import type { ReactNode } from "react";

const sectionTextLinkClass =
  "relative inline-flex items-center gap-2 pb-0.5 text-sm font-medium tracking-wide text-black transition-colors duration-300 ease-out after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:content-[''] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-stone-800 hover:after:scale-x-100 focus-visible:text-stone-800 focus-visible:after:scale-x-100 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/35";

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
