"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "top", n: "00", label: "Index" },
  { id: "profile", n: "01", label: "Profile" },
  { id: "work", n: "02", label: "Work" },
  { id: "career", n: "03", label: "Career" },
  { id: "leadership", n: "04", label: "Voice" },
  { id: "stack", n: "05", label: "Stack" },
  { id: "live", n: "06", label: "Live" },
  { id: "contact", n: "07", label: "Contact" },
];

const IDS = NAV.map((n) => n.id);

function useClock() {
  const [t, setT] = useState<string>("--:--:--");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-GB", { hour12: false });
    // Defer the first tick out of the effect body (lint-clean, no flash).
    const raf = requestAnimationFrame(() => setT(fmt()));
    const id = setInterval(() => setT(fmt()), 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);
  return t;
}

export function SpecRail() {
  const active = useActiveSection(IDS);
  const clock = useClock();

  return (
    <aside className="z-40 border-b-2 border-card-border bg-background lg:fixed lg:inset-y-0 lg:left-0 lg:w-[270px] lg:border-b-0 lg:border-r-2">
      <div className="flex h-full flex-col">
        {/* Identity block */}
        <div className="flex items-center justify-between gap-3 border-b-2 border-card-border p-4 lg:block">
          <a href="#top" className="block leading-none">
            <span className="tele block text-[9px] text-muted-foreground">
              CS × STATISTICS
            </span>
            <span className="mt-1 block text-lg font-bold tracking-tight">
              JOSEPH<span className="text-accent">®</span>
              <span className="hidden lg:inline"> IRAWAN</span>
            </span>
          </a>
          <div className="lg:mt-3">
            <span className="hidden items-center gap-2 tele text-[10px] text-muted-foreground lg:flex">
              <span
                className="h-2 w-2 animate-blink"
                style={{ background: "var(--ok)" }}
              />
              STATUS / OPEN TO WORK
            </span>
            <span className="lg:hidden">
              <ThemeToggle />
            </span>
          </div>
        </div>

        {/* Numbered nav — vertical on desktop, horizontal scroll on mobile */}
        <nav className="flex-1 overflow-x-auto border-b-2 border-card-border lg:border-b-0 lg:py-4">
          <ul className="flex lg:block">
            {NAV.map((item) => {
              const on = active === item.id;
              return (
                <li key={item.id} className="shrink-0">
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "group flex items-center gap-3 px-4 py-3 transition-colors lg:py-2.5",
                      on
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <span className="tele text-[11px]">{item.n}</span>
                    <span
                      className={cn(
                        "tele text-[11px]",
                        on ? "" : "text-foreground/80"
                      )}
                    >
                      {item.label}
                    </span>
                    <span
                      className={cn(
                        "ml-auto hidden h-px flex-1 lg:block",
                        on ? "bg-accent-foreground/40" : "bg-card-border"
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer telemetry — desktop only */}
        <div className="hidden p-4 lg:block">
          <dl className="space-y-1.5 tele text-[10px] text-muted-foreground">
            <div className="flex justify-between">
              <dt>LOC</dt>
              <dd className="text-foreground/80">JAKARTA / ID</dd>
            </div>
            <div className="flex justify-between">
              <dt>UTC+7</dt>
              <dd className="tabular-nums text-accent">{clock}</dd>
            </div>
            <div className="flex justify-between">
              <dt>VOL</dt>
              <dd className="text-foreground/80">2026.01</dd>
            </div>
          </dl>
          <div className="mt-4 flex items-center justify-between border-t-2 border-card-border pt-4">
            <span className="tele text-[10px] text-muted-foreground">THEME</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  );
}
