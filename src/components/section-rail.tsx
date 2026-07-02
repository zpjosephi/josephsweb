"use client";

import { sectionIndex, sectionIds } from "@/data/sections";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

// Vertical fig.01-06 index on the right edge. Highlights the active section.
export function SectionRail() {
  const active = useActiveSection(sectionIds);

  return (
    <nav
      aria-label="Section index"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="space-y-3.5">
        {sectionIndex.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="group flex items-center justify-end gap-2"
              >
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-widest transition-all duration-300",
                    on
                      ? "text-accent opacity-100"
                      : "opacity-0 text-muted-foreground group-hover:opacity-100"
                  )}
                >
                  {s.label}
                </span>
                <span
                  className={cn(
                    "font-mono text-[10px] tabular-nums transition-colors",
                    on ? "text-accent" : "text-muted-foreground/70"
                  )}
                >
                  {s.fig}
                </span>
                <span
                  className={cn(
                    "h-px transition-all duration-300",
                    on
                      ? "w-7 bg-accent"
                      : "w-3 bg-card-border group-hover:w-5 group-hover:bg-muted-foreground"
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
