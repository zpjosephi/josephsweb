"use client";

import { useEffect, useRef, useState } from "react";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

// The stack as a small instrument: an index of what Joseph works with, laid out
// as a spec-sheet ledger (one row per category, tokens flowing across the wide
// column). Hovering a token traces the tools it actually sits next to in the
// real projects, so the graph is honest adjacency, not decoration. The default
// state is fully legible; the trace only sharpens focus on top of it.

// Real relations between tools, drawn from how they pair in the shipped work.
const edges: [string, string][] = [
  ["Next.js", "React"],
  ["Next.js", "JavaScript / TypeScript"],
  ["Next.js", "Tailwind CSS"],
  ["Next.js", "Vercel"],
  ["Next.js", "Node.js"],
  ["Next.js", "Supabase"],
  ["Next.js", "AI / LLM"],
  ["React", "JavaScript / TypeScript"],
  ["React", "Recharts"],
  ["JavaScript / TypeScript", "Node.js"],
  ["Node.js", "REST API"],
  ["Supabase", "REST API"],
  ["AI / LLM", "REST API"],
  ["Python", "pandas"],
  ["Python", "NumPy"],
  ["Python", "scikit-learn"],
  ["Python", "SQL"],
  ["pandas", "NumPy"],
  ["pandas", "scikit-learn"],
  ["pandas", "Plotly"],
  ["pandas", "Tableau"],
  ["scikit-learn", "Statistical modeling"],
  ["Statistical modeling", "R"],
  ["R", "ggplot2"],
  ["Recharts", "D3.js"],
  ["D3.js", "Plotly"],
  ["Tableau", "Excel"],
  ["Excel", "SQL"],
  ["Figma", "Tailwind CSS"],
  ["Git", "Vercel"],
  ["Vercel", "AWS (Cloud Practitioner)"],
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
