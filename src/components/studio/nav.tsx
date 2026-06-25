"use client";

import { Magnetic } from "@/components/magnetic";
import { StudioThemeToggle } from "@/components/studio/theme-toggle";
import { site } from "@/lib/site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#stats", label: "Stats" },
  { href: "#contact", label: "Contact" },
];

export function StudioNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-card-border bg-[var(--background)]/75 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-baseline gap-2.5">
          <span className="text-[15px] font-medium tracking-tight">
            Joseph Irawan
          </span>
          <span className="mono hidden text-[11px] text-muted-foreground sm:inline">
            CS &times; Statistics
          </span>
        </a>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <ul className="mr-2 hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="ul-draw text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <StudioThemeToggle />
          <Magnetic strength={0.25}>
            <a
              href={site.cvUrl}
              className="inline-flex items-center rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-transform hover:-translate-y-px active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              CV
            </a>
          </Magnetic>
        </div>
      </nav>
    </header>
  );
}
