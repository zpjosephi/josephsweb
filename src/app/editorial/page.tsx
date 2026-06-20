"use client";

/**
 * STANDALONE DEMO - Editorial concept (the "()" function-call motif).
 * Lives entirely under /editorial. If you don't like it, delete this folder;
 * nothing else depends on it.
 */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

const INK = "#0c0b09";
const CREAM = "#f3efe6";
const ACCENT = "#3b2bff";

/* ----------------------------- Label cursor ----------------------------- */
function EditorialCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [dark, setDark] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    // Defer enabling out of the effect body (lint-clean setState).
    const enableRaf = requestAnimationFrame(() => setEnabled(true));
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const el = t?.closest("[data-label]") as HTMLElement | null;
      setLabel(el?.dataset.label ?? "");
      setDark(!!t?.closest("[data-cursorinvert]"));
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(enableRaf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [x, y]);

  if (!enabled) return null;

  // On the dark contact area, ink-on-ink vanishes - go white instead.
  const dotColor = label ? ACCENT : dark ? "#ffffff" : INK;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{
          width: label ? 84 : 12,
          height: label ? 84 : 12,
          backgroundColor: dotColor,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="flex items-center justify-center rounded-full"
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[11px] font-medium uppercase tracking-wider text-white"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* --------------------------- Rotating () word --------------------------- */
function Rotating({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span
      className="relative inline-flex items-baseline"
      style={{ color: ACCENT }}
    >
      <span aria-hidden>(&nbsp;</span>
      <span className="relative inline-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={words[i]}
            initial={{ y: "0.6em", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-0.6em", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="col-start-1 row-start-1 whitespace-nowrap"
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-hidden>&nbsp;)</span>
    </span>
  );
}

/* ----------------------- Work list w/ hover preview ---------------------- */
const work = [
  {
    title: "xEleven",
    meta: "Premier League analytics · 2025",
    img: "/projects/xeleven.png",
    href: "https://epl-xeleven.vercel.app/",
  },
  {
    title: "Bakery Kita",
    meta: "E-commerce demo · QRIS",
    img: "/projects/bakery.png",
    href: "https://bakery-kita.vercel.app/",
  },
  {
    title: "ceritabel",
    meta: "AI data analysis · 2026",
    img: "/projects/ceritabel.png",
    href: "https://ceritabel.vercel.app/",
  },
];

function WorkList() {
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });

  return (
    <div
      className="relative"
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      {/* Floating preview that follows the cursor */}
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        animate={{ opacity: hover !== null ? 1 : 0, scale: hover !== null ? 1 : 0.9 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden -translate-x-1/2 -translate-y-1/2 md:block"
      >
        {hover !== null && (
          <Image
            src={work[hover].img}
            alt=""
            width={360}
            height={246}
            className="rounded-lg shadow-2xl ring-1 ring-black/10"
          />
        )}
      </motion.div>

      <ul>
        {work.map((w, idx) => (
          <li key={w.title}>
            <a
              href={w.href}
              target="_blank"
              rel="noreferrer"
              data-label="view"
              onMouseEnter={() => setHover(idx)}
              onMouseLeave={() => setHover(null)}
              className="group flex items-end justify-between gap-6 border-t py-8 transition-colors"
              style={{ borderColor: "rgba(12,11,9,0.15)" }}
            >
              <span
                className="text-5xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-3 sm:text-7xl"
                style={{ color: INK }}
              >
                {w.title}
              </span>
              <span
                className="mb-2 hidden font-mono text-sm sm:block"
                style={{ color: "rgba(12,11,9,0.55)" }}
              >
                {w.meta}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div
        className="border-t"
        style={{ borderColor: "rgba(12,11,9,0.15)" }}
      />
    </div>
  );
}

/* --------------------- Contact: flip dark + line art --------------------- */
function ContactFlip() {
  return (
    <section
      data-cursorinvert
      className="relative overflow-hidden px-6 py-32 sm:py-40"
      style={{ backgroundColor: INK, color: CREAM }}
    >
      <div className="mx-auto max-w-6xl">
        <p
          className="mb-6 font-mono text-xs uppercase tracking-[0.3em]"
          style={{ color: "rgba(243,239,230,0.5)" }}
        >
          + Contact
        </p>
        <h2 className="text-5xl font-semibold tracking-tight sm:text-8xl">
          Let&apos;s make{" "}
          <span style={{ color: ACCENT }}>something</span>.
        </h2>

        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 text-lg">
          <a
            data-label="email"
            href="mailto:josephirawan07@gmail.com"
            className="underline-offset-8 hover:underline"
          >
            josephirawan07@gmail.com
          </a>
          <a
            data-label="open"
            href="https://github.com/zpjosephi"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-8 hover:underline"
          >
            github.com/zpjosephi
          </a>
        </div>
      </div>

      {/* Animated line-art drawn on view */}
      <svg
        className="pointer-events-none absolute -bottom-10 right-0 h-[340px] w-[680px] max-w-full opacity-60"
        viewBox="0 0 680 340"
        fill="none"
      >
        {[0, 1, 2].map((k) => (
          <motion.path
            key={k}
            d={
              k === 0
                ? "M20 320 C 160 320 160 60 340 60 S 520 320 660 320"
                : k === 1
                ? "M20 320 L 340 40 L 660 320"
                : "M20 280 Q 340 -40 660 280"
            }
            stroke={ACCENT}
            strokeWidth={1.5}
            strokeDasharray="3 6"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: k * 0.25, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </section>
  );
}

/* -------------------------------- Page --------------------------------- */
export default function EditorialDemo() {
  const [menu, setMenu] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  return (
    <div
      className="min-h-screen cursor-none"
      style={{ backgroundColor: CREAM, color: INK }}
    >
      <EditorialCursor />

      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5">
        <Link href="/" data-label="home" className="text-lg font-bold">
          (jo)
        </Link>
        <button
          type="button"
          data-label={menu ? "close" : "menu"}
          onClick={() => setMenu((v) => !v)}
          className="text-3xl leading-none"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: menu ? 45 : 0 }}
            className="inline-block"
          >
            +
          </motion.span>
        </button>
      </header>

      {/* Menu overlay */}
      <AnimatePresence>
        {menu && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-start justify-center gap-2 px-6"
            style={{ backgroundColor: CREAM }}
          >
            {["Work", "About", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                data-label="go"
                onClick={() => setMenu(false)}
                className="text-6xl font-semibold tracking-tight hover:italic sm:text-8xl"
              >
                {l}.
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="px-6 pb-24 pt-40 sm:pt-52">
        <div className="mx-auto max-w-6xl">
          <h1
            ref={headingRef}
            className="text-[13vw] font-semibold leading-[0.95] tracking-tight sm:text-[8.5rem]"
          >
            <span className="block">
              I build <Rotating words={["software", "products", "tools", "systems"]} />
            </span>
            <span className="block">
              that thinks in <Rotating words={["data", "numbers", "models", "signals"]} />
            </span>
            <span className="block">
              for <Rotating words={["people", "real users", "decisions", "impact"]} />
            </span>
          </h1>

          <div className="mt-14 flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-md text-lg leading-relaxed" style={{ color: "rgba(12,11,9,0.7)" }}>
              Joseph Irawan, a Computer Science{" "}
              <span style={{ color: ACCENT }}>×</span> Statistics student building
              data-driven software.
            </p>
            <div className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(12,11,9,0.5)" }}>
              Base: Indonesia
              <br />
              Index: Portfolio 2026
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.4fr]">
          <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "rgba(12,11,9,0.5)" }}>
            (about)
          </p>
          <p className="text-3xl font-medium leading-snug tracking-tight sm:text-4xl">
            Most engineers are weak at{" "}
            <span data-label="" className="underline decoration-2 underline-offset-4" style={{ textDecorationColor: ACCENT }}>
              modeling
            </span>
            . Most statisticians can&apos;t{" "}
            <span className="underline decoration-2 underline-offset-4" style={{ textDecorationColor: ACCENT }}>
              ship apps
            </span>
            . I do both. Engineering to build, statistics to understand. One
            story, not two different people.
          </p>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-10 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "rgba(12,11,9,0.5)" }}>
            (selected work)
          </p>
          <WorkList />
        </div>
      </section>

      <div id="contact">
        <ContactFlip />
      </div>

      {/* Tiny footer note that this is a demo */}
      <div
        data-cursorinvert
        className="px-6 py-6 text-center font-mono text-[11px]"
        style={{ backgroundColor: INK, color: "rgba(243,239,230,0.4)" }}
      >
        editorial concept demo · <Link href="/" className="underline" data-label="back">back to main site</Link>
      </div>
    </div>
  );
}
