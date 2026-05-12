"use client";

import { usePathname } from "next/navigation";

/**
 * `key={pathname}` — nowy węzeł przy zmianie trasy.
 * Fade: `globals.css` → `[data-page-route-shell]` (poza @layer Tailwinda).
 */
export function PageRouteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} data-page-route-shell className="min-h-0 min-w-0">
      {children}
    </div>
  );
}
