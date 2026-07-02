"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "@/components/icons";
import { projects, type ProjectCategory } from "@/data/projects";

// Muted pastel pairs per category - tokenized in globals.css (.v3 scope).
const TAG: Record<ProjectCategory, { bg: string; fg: string; label: string }> = {
  engineering: {
    bg: "var(--tag-eng-bg)",
    fg: "var(--tag-eng-fg)",
    label: "Engineering",
  },
  data: { bg: "var(--tag-data-bg)", fg: "var(--tag-data-fg)", label: "Data / Stats" },
};

// Projects as a stripped editorial accordion - hairline dividers, no boxes.
export function ProjectsListV3() {
  const [open, setOpen] = useState<string | null>("xeleven");

  return (
    <div className="border-t border-card-border">
      {projects.map((p) => {
        const isOpen = open === p.slug;
        const tag = TAG[p.category];
        return (
          <div key={p.slug} className="border-b border-card-border">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : p.slug)}
              aria-expanded={isOpen}
              aria-label={`${isOpen ? "Collapse" : "Expand"} ${p.title}`}
              className="group flex w-full items-center gap-4 py-6 text-left"
            >
              <span className="w-8 shrink-0 font-mono text-xs text-muted-foreground">
                {String(projects.indexOf(p) + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-medium tracking-tight text-foreground sm:text-xl">
                  {p.title}
                </span>
              </span>
              <span
                className="hidden shrink-0 px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] sm:inline-block"
                style={{
                  background: tag.bg,
                  color: tag.fg,
                  borderRadius: 9999,
                }}
              >
                {tag.label}
              </span>
              <span
                className="shrink-0 text-xl font-light text-muted-foreground transition-transform duration-200 group-hover:text-foreground"
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {isOpen && (
              <div className="pb-10">
                {p.image && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${p.title}, open live site`}
                    className="group/shot relative mb-8 block aspect-[1280/875] overflow-hidden rounded-xl border border-card-border bg-muted"
                  >
                    <Image
                      src={p.image}
                      alt={`${p.title} screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, 760px"
                      className="object-cover object-top transition-transform duration-500 group-hover/shot:scale-[1.015]"
                    />
                  </a>
                )}
                <div className="grid gap-8 sm:grid-cols-[1.5fr_1fr] sm:gap-12">
                <div className="max-w-[68ch]">
                  <p className="text-[15px] leading-[1.7] text-muted-foreground">
                    {p.summary}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {p.highlights.slice(0, 5).map((h) => (
                      <li
                        key={h}
                        className="flex gap-3 text-[15px] leading-[1.6] text-foreground/85"
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full"
                          style={{ background: "var(--accent)" }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                    Stack
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <li
                        key={t}
                        className="border border-card-border bg-card px-2.5 py-1 font-mono text-[12px] text-muted-foreground"
                        style={{ borderRadius: 6 }}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-colors hover:opacity-85"
                        style={{ borderRadius: 6 }}
                      >
                        Visit live <span aria-hidden>↗</span>
                      </a>
                    )}
                    {p.caseStudyUrl && (
                      <Link
                        href={p.caseStudyUrl}
                        className="inline-flex items-center gap-1.5 border border-card-border px-4 py-2 text-[13px] font-medium transition-colors hover:bg-muted"
                        style={{ borderRadius: 6 }}
                      >
                        Case study <span aria-hidden>→</span>
                      </Link>
                    )}
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 border border-card-border px-4 py-2 text-[13px] font-medium transition-colors hover:bg-muted"
                        style={{ borderRadius: 6 }}
                      >
                        <GithubIcon className="h-3.5 w-3.5" /> Source
                      </a>
                    )}
                    {p.badge && (
                      <span className="font-mono text-[12px] text-muted-foreground">
                        {p.badge}
                      </span>
                    )}
                  </div>
                </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
