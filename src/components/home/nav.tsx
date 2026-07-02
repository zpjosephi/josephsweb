"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useMounted } from "@/lib/use-mounted";

const links = [
  { hash: "work", label: "Work" },
  { hash: "experience", label: "Experience" },
  { hash: "about", label: "About" },
  { hash: "contact", label: "Contact" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-card-border text-foreground/70 transition-colors hover:border-hairline hover:text-foreground"
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  );
}

// base = the page whose sections the anchors target ("/" for the main site,
// "/minimal" when the nav sits on the quiet cut so links stay on that page).
export function HomeNav({ base = "/" }: { base?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-card-border bg-[var(--background)]/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href={base} className="text-[15px] font-semibold tracking-tight">
          Joseph Irawan
        </Link>
        <div className="flex items-center gap-2 sm:gap-5">
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <li key={l.hash}>
                <Link
                  href={`${base}#${l.hash}`}
                  className="text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`${base}#contact`}
            className="text-[14px] text-muted-foreground transition-colors hover:text-foreground md:hidden"
          >
            Contact
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
