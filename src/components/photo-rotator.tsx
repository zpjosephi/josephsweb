"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export type Slide = {
  src: string;
  alt: string;
  caption: string;
  /** CSS object-position, so portrait shots keep faces in a landscape frame. */
  focus?: string;
};

const INTERVAL = 5200;

export function PhotoRotator({ slides, label }: { slides: Slide[]; label: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const [manual, setManual] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const running = visible && !paused && !held && !reduced;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearTimeout(t);
  }, [running, index, slides.length]);

  function go(step: number) {
    setManual(true);
    setIndex((i) => (i + step + slides.length) % slides.length);
  }

  const current = slides[index];

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
      }}
    >
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-rule">
        {slides.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={i === index ? s.alt : ""}
            aria-hidden={i !== index}
            fill
            quality={90}
            sizes="(min-width: 1024px) 60vw, 100vw"
            style={{ objectPosition: s.focus ?? "50% 50%" }}
            className={`object-cover transition-[opacity,scale] duration-[1200ms] ease-[var(--ease-out-expo)] ${
              i === index ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
            }`}
          />
        ))}
        {/* progress bar for the current slide; restarts by remounting on index change */}
        {running && (
          <span
            key={index}
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-mark"
            style={{ animation: `slide-progress ${INTERVAL}ms linear forwards` }}
          />
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-4">
        <p aria-live={manual ? "polite" : "off"} className="min-h-[2.6em] text-[14px] leading-snug text-ink-soft">
          {current.caption}
        </p>
        <div className="flex shrink-0 items-center gap-1">
          <span className="tabular mr-2 text-[13px] text-ink-soft">
            {index + 1} / {slides.length}
          </span>
          <Control label="Previous photo" onClick={() => go(-1)}>
            <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </Control>
          <Control label="Next photo" onClick={() => go(1)}>
            <path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </Control>
          {!reduced && (
            <Control
              label={paused ? "Play slideshow" : "Pause slideshow"}
              onClick={() => setPaused((p) => !p)}
              pressed={paused}
            >
              {paused ? (
                <path d="M5 3.5v9l7.5-4.5z" fill="currentColor" />
              ) : (
                <path d="M5 3.5v9M11 3.5v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </Control>
          )}
        </div>
      </div>
    </div>
  );
}

function Control({
  label,
  onClick,
  pressed,
  children,
}: {
  label: string;
  onClick: () => void;
  pressed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className="grid size-9 place-items-center rounded-full border border-rule text-ink transition-colors hover:border-ink"
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4">
        {children}
      </svg>
    </button>
  );
}
