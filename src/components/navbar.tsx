"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "#experience", label: "Career" },
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#demo", label: "Demo" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b-2 transition-colors duration-200",
        scrolled
          ? "border-card-border bg-background/85 backdrop-blur"
          : "border-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Left — spec label: unit id over name */}
        <a href="#" className="group flex items-center gap-3 leading-none">
          <span className="tele border border-card-border px-1.5 py-1 text-[10px] text-accent">
            J—01
          </span>
          <span className="leading-tight">
            <span className="tele block text-[9px] text-muted-foreground">
              CS × Statistics
            </span>
            <span className="block text-sm font-bold tracking-tight transition-colors group-hover:text-accent">
              JOSEPH IRAWAN<span className="text-accent">®</span>
            </span>
          </span>
        </a>

        {/* Right — numbered micro-nav */}
        <div className="flex items-center gap-4">
          <ul className="hidden items-center sm:flex">
            {links.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="tele flex items-baseline gap-1 px-3 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
                >
                  <span className="text-accent/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
