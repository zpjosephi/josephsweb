"use client";

import { useEffect, useRef } from "react";

// Poster headline whose letters swell in weight near the cursor. Big Shoulders
// is a variable font (wght 100-900), so the swell is one CSS custom property
// per letter; widths breathe a little with the weight, which is the charm.
// Letter positions are re-measured only on resize; per-frame work is a loop of
// distance checks writing font-variation-settings, no React re-renders.
//
// Accessibility: the h1 carries the full text via aria-label; the letter spans
// are presentation-only. Reduced motion and touch devices keep the static
// weight.

const BASE_WGHT = 750;
const PEAK_WGHT = 900;
const RADIUS = 150;

type LetterBox = { el: HTMLSpanElement; cx: number; cy: number };

export function KineticTitle({
  lines,
  accentLineIndex,
  className,
}: {
  lines: string[];
  /** index of the line rendered in the accent color */
  accentLineIndex?: number;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let boxes: LetterBox[] = [];
    const measure = () => {
      boxes = Array.from(
        root.querySelectorAll<HTMLSpanElement>("[data-letter]")
      ).map((el) => {
        const r = el.getBoundingClientRect();
        return { el, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
      });
    };
    measure();

    let raf = 0;
    let px = -9999;
    let py = -9999;
    let dirty = false;

    const apply = () => {
      raf = 0;
      // measured centers drift as weights change width; re-measure cheaply
      // every apply pass keeps the field honest without layout thrash spikes
      measure();
      for (const b of boxes) {
        const d = Math.hypot(b.cx - px, b.cy - py);
        const t = Math.max(0, 1 - d / RADIUS);
        const wght = Math.round(BASE_WGHT + (PEAK_WGHT - BASE_WGHT) * t * t);
        b.el.style.fontVariationSettings = `"opsz" 72, "wght" ${wght}`;
      }
      dirty = false;
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!dirty) {
        dirty = true;
        raf = requestAnimationFrame(apply);
      }
    };
    const onLeave = () => {
      px = -9999;
      py = -9999;
      if (!dirty) {
        dirty = true;
        raf = requestAnimationFrame(apply);
      }
    };

    const zone = root.closest("[data-kinetic-zone]") ?? root;
    zone.addEventListener("pointermove", onMove as EventListener);
    zone.addEventListener("pointerleave", onLeave as EventListener);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      zone.removeEventListener("pointermove", onMove as EventListener);
      zone.removeEventListener("pointerleave", onLeave as EventListener);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <h1 ref={ref} aria-label={lines.join(" ")} className={className}>
      {lines.map((line, li) => (
        <span
          key={li}
          aria-hidden
          className={`block ${li === accentLineIndex ? "text-accent" : ""}`}
        >
          {Array.from(line).map((ch, ci) =>
            ch === " " ? (
              <span key={ci}> </span>
            ) : (
              <span key={ci} data-letter className="inline-block">
                {ch}
              </span>
            )
          )}
        </span>
      ))}
    </h1>
  );
}
