"use client";

import { useState } from "react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { projects, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "engineering", label: "ENG" },
  { key: "data", label: "DATA" },
];

// Projects as a declassified index/manifest — dense rows, not cards.
// Click a row to declassify (expand) the full record.
export function ProjectsManifest() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>("xeleven");

  const visible = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <div>
      {/* Filter switches, right-aligned to break symmetry */}
      <div className="mb-px flex items-center justify-end gap-px bg-card-border">
        <span className="mr-auto bg-background py-1.5 pr-3 tele text-[10px] text-muted-foreground">
          {visible.length} RECORDS / CLICK TO DECLASSIFY
        </span>
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={cn(
              "tele px-3 py-1.5 text-[11px] transition-colors",
              filter === f.key
                ? "bg-accent text-accent-foreground"
                : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Column header */}
      <div className="hidden grid-cols-[3.5rem_1fr_7rem_2.5rem] items-center border-y-2 border-card-border bg-muted px-1 py-2 tele text-[10px] text-muted-foreground sm:grid">
        <span className="px-3">№</span>
        <span>Designation</span>
        <span>Class</span>
        <span className="text-right">±</span>
      </div>

      <ul className="border-t-2 border-card-border sm:border-t-0">
        {visible.map((p, i) => {
          const isOpen = open === p.slug;
          const primary = p.tech.slice(0, 3).join(" · ");
          return (
            <li key={p.slug} className="border-b-2 border-card-border">
              {/* Row */}
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : p.slug)}
                aria-expanded={isOpen}
                aria-label={`${isOpen ? "Collapse" : "Expand"} ${p.title}`}
                className={cn(
                  "grid w-full grid-cols-[3.5rem_1fr_2.5rem] items-center gap-y-1 px-1 py-4 text-left transition-colors sm:grid-cols-[3.5rem_1fr_7rem_2.5rem]",
                  isOpen ? "bg-muted" : "hover:bg-muted"
                )}
              >
                <span className="px-3 tele text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-base font-semibold tracking-tight sm:text-lg">
                    {p.title}
                  </span>
                  <span className="tele mt-0.5 block truncate text-[10px] text-muted-foreground sm:hidden">
                    {p.category === "data" ? "DATA / STATS" : "ENGINEERING"} · {primary}
                  </span>
                </span>
                <span className="tele hidden text-[11px] text-muted-foreground sm:block">
                  {p.category === "data" ? "DATA" : "ENG"}
                </span>
                <span className="flex justify-end px-3 text-muted-foreground">
                  {isOpen ? (
                    <Minus className="h-4 w-4 text-accent" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>

              {/* Declassified record */}
              {isOpen && (
                <div className="grid gap-px border-t-2 border-card-border bg-card-border lg:grid-cols-[1.4fr_1fr]">
                  <div className="bg-background p-5 sm:p-6">
                    <p className="max-w-[58ch] text-sm leading-relaxed text-muted-foreground">
                      {p.summary}
                    </p>
                    <ul className="mt-5 max-w-[58ch] space-y-2">
                      {p.highlights.slice(0, 5).map((h) => (
                        <li
                          key={h}
                          className="flex gap-2.5 text-sm leading-relaxed text-foreground/90"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-background p-5 sm:p-6">
                    <div className="mb-2 tele text-[10px] text-muted-foreground">
                      [ STACK ]
                    </div>
                    <ul className="flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <li
                          key={t}
                          className="border border-card-border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex items-center gap-px bg-card-border">
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 bg-accent px-4 py-2 tele text-[11px] font-bold text-accent-foreground transition-colors hover:bg-foreground hover:text-background"
                        >
                          Live <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 bg-background px-4 py-2 tele text-[11px] transition-colors hover:bg-muted"
                        >
                          <GithubIcon className="h-3.5 w-3.5" /> Source
                        </a>
                      )}
                      {p.badge && (
                        <span className="bg-background px-4 py-2 tele text-[11px] text-muted-foreground">
                          {p.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
