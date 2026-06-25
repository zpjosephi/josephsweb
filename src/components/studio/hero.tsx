"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/magnetic";
import { Scatter } from "@/components/studio/scatter";
import { site } from "@/lib/site";

const line1 = ["Building", "software"];
const line2 = ["that"];
const accentWord = "understands";
const line3 = ["data."];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Word({ children, accent }: { children: string; accent?: boolean }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span
        variants={word}
        className={accent ? "inline-block italic text-accent" : "inline-block"}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Plain headline for reduced-motion users. No transforms, no reveal.
function StaticHeadline() {
  return (
    <h1 className="studio-display mt-7 text-[clamp(2.6rem,6.6vw,5.4rem)]">
      <span className="block">{line1.join(" ")} </span>
      <span className="block">
        {line2.join(" ")} <span className="italic text-accent">{accentWord}</span>
      </span>
      <span className="block">{line3.join(" ")}</span>
    </h1>
  );
}

export function StudioHero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="studio-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24 lg:pt-10">
        {/* ---------------------------------------------------------- copy */}
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mono flex items-center gap-3 text-[12px] uppercase tracking-[0.16em] text-muted-foreground"
          >
            <span className="inline-block h-px w-8 bg-foreground/30" />
            Computer Science &times; Statistics
          </motion.p>

          {reduce ? (
            <StaticHeadline />
          ) : (
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="studio-display mt-7 text-[clamp(2.6rem,6.6vw,5.4rem)]"
          >
            <span className="block">
              {line1.map((w) => (
                <Word key={w}>{w + " "}</Word>
              ))}
            </span>
            <span className="block">
              {line2.map((w) => (
                <Word key={w}>{w + " "}</Word>
              ))}
              <Word accent>{accentWord}</Word>
            </span>
            <span className="block">
              {line3.map((w) => (
                <Word key={w}>{w}</Word>
              ))}
            </span>
          </motion.h1>
          )}

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 max-w-md text-[17px] leading-[1.65] text-muted-foreground"
          >
            Engineering to build it, statistics to make it reason. One person,
            one story, not two half-skills.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.3}>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-[14px] font-medium text-background transition-transform hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                View work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <a
              href={site.cvUrl}
              className="inline-flex items-center gap-2 rounded-full border border-hairline px-6 py-3 text-[14px] font-medium transition-colors hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Download CV
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        {/* --------------------------------------------------------- figure */}
        <motion.figure
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="rounded-xl border border-card-border bg-card/60 p-3 backdrop-blur-[1px]">
            <div className="flex items-center justify-between px-1 pb-2">
              <span className="mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
                fig.01 / regression
              </span>
              <span className="mono inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.16em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                live
              </span>
            </div>
            <Scatter className="block aspect-[4/3] w-full" />
          </div>
          <figcaption className="mt-3 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
            A least-squares line, re-solved on every frame. Move your cursor
            through the cloud and the fit follows.
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
