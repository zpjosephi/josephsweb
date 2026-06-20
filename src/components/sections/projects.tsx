"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { projects, type Project, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "engineering", label: "Engineering" },
  { key: "data", label: "Data / Stats" },
];

// Fallback live screenshot for projects without a local image (free, no key).
function screenshotUrl(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(
    url
  )}&screenshot=true&meta=false&embed=screenshot.url`;
}

function ProjectCard({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);
  const localImage = project.image;
  const remotePreview =
    !localImage && project.liveUrl ? screenshotUrl(project.liveUrl) : null;
  const host = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "preview";

  return (
    <article className="group flex h-full flex-col overflow-hidden border-2 border-card-border bg-card transition-colors hover:border-accent">
      {/* Terminal window frame */}
      <div className="border-b-2 border-card-border bg-muted">
        <div className="flex items-center gap-2 px-3 py-2">
          <span className="h-2.5 w-2.5 border border-foreground/60" />
          <span className="h-2.5 w-2.5 border border-foreground/60" />
          <span className="h-2.5 w-2.5 bg-accent" />
          <span className="ml-2 flex-1 truncate border border-card-border bg-background px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
             {host}
          </span>
        </div>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="relative block aspect-[1280/875] w-full overflow-hidden"
        >
          {project.badge && (
            <span className="absolute right-3 top-3 z-10 border border-card-border bg-background px-2 py-1 tele text-[10px] text-accent">
              {project.badge}
            </span>
          )}
          {localImage && !imgError ? (
            <Image
              src={localImage}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              onError={() => setImgError(true)}
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : remotePreview && !imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={remotePreview}
              alt={`${project.title} screenshot`}
              loading="lazy"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <div aria-hidden className="absolute inset-0 datasheet-grid opacity-50" />
              <span className="tele relative text-sm text-muted-foreground">
                [ {project.title} ]
              </span>
            </div>
          )}
        </a>
      </div>

      {/* Description */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="tele border border-accent px-1.5 py-0.5 text-[10px] text-accent">
            {project.category === "data" ? "DATA / STATS" : "ENGINEERING"}
          </span>
          <div className="flex items-center gap-2 text-muted-foreground">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="transition-colors hover:text-foreground"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live site`}
                className="inline-flex items-center gap-1 text-xs font-medium transition-colors hover:text-foreground"
              >
                Live <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <ul className="mt-4 max-w-[58ch] space-y-1.5">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.tech.map((t) => (
            <li
              key={t}
              className="border border-card-border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <Section
      id="projects"
      eyebrow="fig.04 / work"
      annotation={`n = ${projects.length} records`}
      title="Selected work"
    >
      <div className="mb-8 flex flex-wrap items-center gap-px bg-card-border">
        <span className="tele bg-background px-3 py-1.5 text-[10px] text-muted-foreground">
          FILTER:
        </span>
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={cn(
              "tele px-4 py-1.5 text-[11px] transition-colors",
              filter === f.key
                ? "bg-accent text-accent-foreground"
                : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {visible.map((p, i) => (
          <Reveal key={p.slug} delay={0.05 * i}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
