"use client";

import { useEffect, useRef } from "react";

// Headline whose letters swell in weight near the cursor. Cabinet Grotesk is
// a variable font (wght 100-900); the swell is one CSS custom property per
// letter. The headline sits at regular weight - only the accent line (the
// data) is bold - so each letter carries its own resting weight and swells
// from there. Letter positions are re-measured only on resize; per-frame work
// is a loop of distance checks writing font-variation-settings, no React
// re-renders.
//
// Accessibility: the h1 carries the full text via aria-label; the letter spans
// are presentation-only. Reduced motion and touch devices keep the static
// weight.

const REGULAR = { base: 420, peak: 640 }; // matches .live-display
const EMPHASIS = { base: 780, peak: 900 }; // the accent line only
const RADIUS = 150;

type LetterBox = { el: HTMLSpanElement; cx: number; cy: number; base: number; peak: number };

export function KineticTitle({
  lines,
  accentLineIndex,
  className,
}: {
  lines: string[];
  /** index of the line rendered in the accent color and emphasis weight */
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
        const emphasis = el.dataset.letter === "emphasis";
        return {
          el,
          cx: r.left + r.width / 2,
          cy: r.top + r.height / 2,
          base: emphasis ? EMPHASIS.base : REGULAR.base,
          peak: emphasis ? EMPHASIS.peak : REGULAR.peak,
        };
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
        const wght = Math.round(b.base + (b.peak - b.base) * t * t);
        b.el.style.fontVariationSettings = `"wght" ${wght}`;
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
      {lines.map((line, li) => {
        const emphasis = li === accentLineIndex;
        return (
          <span
            key={li}
            aria-hidden
            className={`block ${emphasis ? "text-accent font-[780]" : ""}`}
          >
            {/* letters are inline-blocks, so group them per word (nowrap) and
                keep real spaces between groups - otherwise the browser may
                break a line mid-word */}
            {line.split(" ").map((word, wi, words) => (
              <span key={wi}>
                <span className="inline-block whitespace-nowrap">
                  {Array.from(word).map((ch, ci) => (
                    <span
                      key={ci}
                      data-letter={emphasis ? "emphasis" : "regular"}
                      className="inline-block"
                    >
                      {ch}
                    </span>
                  ))}
                </span>
                {wi < words.length - 1 ? " " : null}
              </span>
            ))}
          </span>
        );
      })}
    </h1>
  );
}
