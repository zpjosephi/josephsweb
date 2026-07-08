"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/section";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

// Undirected relations between skills - drives the hover graph.
const edges: [string, string][] = [
  ["Next.js", "React"],
  ["Next.js", "JavaScript / TypeScript"],
  ["Next.js", "Tailwind CSS"],
  ["Next.js", "Vercel"],
  ["Next.js", "Node.js"],
  ["React", "JavaScript / TypeScript"],
  ["React", "Recharts"],
  ["JavaScript / TypeScript", "Node.js"],
  ["Node.js", "REST API"],
  ["Next.js", "Supabase"],
  ["Supabase", "REST API"],
  ["Next.js", "AI / LLM"],
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

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pills = useRef(new Map<string, HTMLElement>());
  const [hovered, setHovered] = useState<string | null>(null);
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!hovered || !container) {
      setLines([]);
      return;
    }
    const crect = container.getBoundingClientRect();
    const from = pills.current.get(hovered);
    if (!from) {
      setLines([]);
      return;
    }
    const fr = from.getBoundingClientRect();
    const fx = fr.left - crect.left + fr.width / 2;
    const fy = fr.top - crect.top + fr.height / 2;

    const out: Line[] = [];
    neighborsOf(hovered).forEach((n) => {
      const el = pills.current.get(n);
      if (!el) return;
      const r = el.getBoundingClientRect();
      out.push({
        x1: fx,
        y1: fy,
        x2: r.left - crect.left + r.width / 2,
        y2: r.top - crect.top + r.height / 2,
      });
    });
    setLines(out);
  }, [hovered]);

  const isActive = (skill: string) =>
    hovered != null && (hovered === skill || neighborsOf(hovered).has(skill));

  return (
    <Section
      id="skills"
      eyebrow="fig.05 / stack"
      annotation="hover to trace links"
      title="Tech stack"
    >
      <div ref={containerRef} className="relative">
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          {lines.map((l, i) => (
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="var(--accent)"
              strokeWidth={1}
              strokeDasharray="2 3"
            />
          ))}
        </svg>

        <div className="grid gap-px border-2 border-card-border bg-card-border sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="h-full bg-card p-5"
            >
              <h3 className="mb-3 tele text-xs text-accent">
                {"// "}
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    ref={(el) => {
                      if (el) pills.current.set(item, el);
                    }}
                    data-cursor
                    onMouseEnter={() => setHovered(item)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                      "relative z-10 cursor-default border px-2.5 py-1 font-mono text-xs uppercase tracking-wider transition-all duration-200",
                      hovered == null
                        ? "border-card-border bg-muted text-muted-foreground"
                        : isActive(item)
                        ? "border-accent bg-accent/15 text-foreground"
                        : "border-card-border bg-muted text-muted-foreground opacity-40"
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-5 tele text-[11px] text-muted-foreground">
          {">> "}HOVER A NODE TO TRACE RELATED SKILLS
        </p>
      </div>
    </Section>
  );
}
