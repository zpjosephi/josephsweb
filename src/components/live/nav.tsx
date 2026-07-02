"use client";

import Link from "next/link";
import { openPalette } from "@/components/live/palette";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function LiveNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-card-border bg-[oklch(0.145_0.012_145/0.82)] backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="live-display text-[17px] tracking-[0.04em]"
        >
          Joseph Irawan
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <ul className="hidden items-center gap-6 sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open the command palette"
            className="mono inline-flex items-center gap-1.5 rounded-lg border border-card-border px-2.5 py-1.5 text-[12px] text-muted-foreground transition-colors hover:border-hairline hover:text-foreground"
          >
            <kbd className="text-[11px]">ctrl</kbd>
            <kbd className="text-[11px]">k</kbd>
          </button>
        </div>
      </nav>
    </header>
  );
}
