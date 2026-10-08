"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// What Joseph works with, kept to what the CV can back up. Hovering a token
// traces the tools it actually sat next to in real work, so the graph is
// honest adjacency, not decoration.

const skillGroups = [
  { label: "Data & analysis", items: ["Excel", "Tableau", "SQL", "Python", "R"] },
  {
    label: "Statistics",
    items: ["Regression", "Panel data", "Hypothesis testing", "EDA", "Data cleaning"],
  },
  {
    label: "Football data",
    items: ["Transfermarkt", "Football Manager database", "football-data.org API"],
  },
  { label: "Web, AI-assisted", items: ["Next.js", "TypeScript", "Recharts", "GSAP", "Supabase"] },
  { label: "Tools", items: ["Git", "Figma", "Vercel", "AWS (Cloud Practitioner)"] },
];

const edges: [string, string][] = [
  // Eximbank
  ["Excel", "Tableau"],
  ["Excel", "SQL"],
  ["Python", "Excel"],
  ["Data cleaning", "Excel"],
  // thesis
  ["R", "Regression"],
  ["R", "Panel data"],
  ["Panel data", "Transfermarkt"],
  ["Panel data", "Football Manager database"],
  ["Regression", "Hypothesis testing"],
  ["EDA", "Data cleaning"],
  ["EDA", "R"],
  // the web builds
  ["football-data.org API", "Next.js"],
  ["Next.js", "Recharts"],
  ["Next.js", "TypeScript"],
  ["Next.js", "GSAP"],
  ["Next.js", "Supabase"],
  ["Next.js", "Vercel"],
  ["Hypothesis testing", "TypeScript"],
  ["Git", "Vercel"],
  ["Figma", "Next.js"],
];

function neighborsOf(skill: string) {
  const set = new Set<string>();
  for (const [a, b] of edges) {
    if (a === skill) set.add(b);
    if (b === skill) set.add(a);
  }
  return set;
}

type Line = { x1: number; y1: number; x2: number; y2: number };

export function ToolkitMatrix() {
  const frameRef = useRef<HTMLDivElement>(null);
  const tokens = useRef(new Map<string, HTMLElement>());
  const [hovered, setHovered] = useState<string | null>(null);
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!hovered || !frame) {
      setLines([]);
      return;
    }
    const box = frame.getBoundingClientRect();
    const from = tokens.current.get(hovered);
    if (!from) {
      setLines([]);
      return;
    }
    const fr = from.getBoundingClientRect();
    const fx = fr.left - box.left + fr.width / 2;
    const fy = fr.top - box.top + fr.height / 2;

    const out: Line[] = [];
    neighborsOf(hovered).forEach((n) => {
      const el = tokens.current.get(n);
      if (!el) return;
      const r = el.getBoundingClientRect();
      out.push({
        x1: fx,
        y1: fy,
        x2: r.left - box.left + r.width / 2,
        y2: r.top - box.top + r.height / 2,
      });
    });
    setLines(out);
  }, [hovered]);

  const related = (skill: string) =>
    hovered != null && (hovered === skill || neighborsOf(hovered).has(skill));

  return (
    <div ref={frameRef} className="relative overflow-hidden rounded-xl border border-card-border">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="var(--accent)"
            strokeWidth={1}
            strokeDasharray="2 4"
            strokeOpacity={0.7}
          />
        ))}
      </svg>

      <dl className="divide-y divide-card-border">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="grid gap-x-8 gap-y-3 px-5 py-5 sm:px-7 sm:py-6 md:grid-cols-[168px_1fr] md:items-baseline"
          >
            <dt className="mono pt-1 text-[12.5px] leading-none text-muted-foreground">
              {group.label}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    ref={(el) => {
                      if (el) tokens.current.set(item, el);
                    }}
                    data-cursor
                    onMouseEnter={() => setHovered(item)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                      "relative z-10 cursor-default rounded-md border px-2.5 py-1 text-[13px] leading-none transition-colors duration-200",
                      hovered == null
                        ? "border-hairline text-foreground"
                        : related(item)
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-card-border text-muted-foreground opacity-55"
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
