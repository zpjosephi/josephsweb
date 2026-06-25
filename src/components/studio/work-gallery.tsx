"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { useMounted } from "@/lib/use-mounted";
import { projects, type Project } from "@/data/projects";

// A headline number per project: the thing worth remembering at a glance.
const METRIC: Record<string, { value: string; label: string }> = {
  xeleven: { value: "9", label: "tools, one app" },
  bakery: { value: "E2E", label: "commerce + QRIS" },
  ceritabel: { value: "~80", label: "tests vs R" },
  "after-hours": { value: "<1MB", label: "real-time 3D" },
};

function metricFor(p: Project) {
  return METRIC[p.slug] ?? METRIC[p.slug.split("-")[0]] ?? { value: "", label: "" };
}

function Card({ p, index }: { p: Project; index: number }) {
  const m = metricFor(p);
  const live = p.liveUrl;
  const cat = p.category === "data" ? "Data / Statistics" : "Engineering";
  return (
    <article className="group flex h-full flex-col rounded-xl border border-card-border bg-card transition-colors hover:border-foreground/30">
      {p.image && (
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          aria-label={`${p.title}, open live`}
          className="relative block aspect-[16/10] overflow-hidden rounded-t-xl bg-muted"
        >
          <Image
            src={p.image}
            alt={`${p.title} screenshot`}
            fill
            sizes="(max-width: 1024px) 90vw, 480px"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </a>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {String(index + 1).padStart(2, "0")} / {cat}
          </span>
          {p.badge && (
            <span className="mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              {p.badge}
            </span>
          )}
        </div>

        <h3 className="studio-display mt-4 text-[1.6rem] leading-[1.05]">
          {p.title.split(":")[0]}
        </h3>
        <p className="mt-3 max-w-[46ch] text-[14.5px] leading-[1.6] text-muted-foreground">
          {p.summary.split(". ")[0]}.
        </p>

        <div className="mt-auto flex items-end justify-between pt-7">
          <div>
            <div className="studio-display text-[2.4rem] leading-none text-accent">
              {m.value}
            </div>
            <div className="mono mt-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              {m.label}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {p.caseStudyUrl && (
              <Link
                href={p.caseStudyUrl}
                className="rounded-full border border-hairline px-3.5 py-2 text-[12.5px] font-medium transition-colors hover:bg-muted"
              >
                Case study
              </Link>
            )}
            {p.githubUrl && (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.title} source`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline transition-colors hover:bg-muted"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.title} live`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:-translate-y-px"
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function Heading() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <p className="mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
        Selected work
      </p>
      <h2 className="studio-display mt-4 max-w-2xl text-[clamp(2rem,4.6vw,3.4rem)]">
        Four things I actually shipped, end to end.
      </h2>
      <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-muted-foreground">
        Two lean toward engineering, two toward statistics. Each one runs live,
        not a mockup.
      </p>
    </div>
  );
}

export function WorkGallery() {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const pinned = mounted && desktop && !reduce;

  // ---- Static / mobile / reduced-motion: vertical stack -------------------
  if (!pinned) {
    return (
      <section id="work" className="py-20 sm:py-28">
        <Heading />
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-5 sm:grid-cols-2 sm:px-8">
          {projects.map((p, i) => (
            <Card key={p.slug} p={p} index={i} />
          ))}
        </div>
      </section>
    );
  }

  return <PinnedGallery />;
}

// ---- Desktop: vertical scroll drives horizontal pan ----------------------
function PinnedGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <div id="work" className="pb-4 pt-20">
        <Heading />
      </div>
      <section
        ref={sectionRef}
        style={{ height: `calc(100dvh + ${distance}px)` }}
        className="relative"
      >
        <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-stretch gap-7 px-5 sm:px-8 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]"
          >
            {projects.map((p, i) => (
              <div
                key={p.slug}
                className="w-[clamp(20rem,34vw,27rem)] shrink-0"
              >
                <Card p={p} index={i} />
              </div>
            ))}
            {/* trailing spacer so the last card clears the right edge */}
            <div aria-hidden className="w-8 shrink-0" />
          </motion.div>

          {/* horizontal-scroll progress */}
          <div className="mx-auto mt-10 w-full max-w-6xl px-5 sm:px-8">
            <div className="h-px w-full bg-card-border">
              <motion.div
                style={{ width: progress }}
                className="h-px bg-foreground"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
