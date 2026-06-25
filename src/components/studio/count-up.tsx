"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Zero-pad to this width, e.g. pad=2 renders 3 as "03". */
  pad?: number;
  /** Insert thousands separators. */
  comma?: boolean;
  className?: string;
};

function format(n: number, { pad, comma }: { pad?: number; comma?: boolean }) {
  let s = Math.round(n).toString();
  if (pad) s = s.padStart(pad, "0");
  if (comma) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return s;
}

// Counts from 0 to `value` once when scrolled into view. Writes straight to the
// DOM node so it doesn't re-render the tree every frame.
export function CountUp({ value, prefix, suffix, pad, comma, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce || !inView) {
      el.textContent =
        (prefix ?? "") + format(value, { pad, comma }) + (suffix ?? "");
      return;
    }
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent =
          (prefix ?? "") + format(v, { pad, comma }) + (suffix ?? "");
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, prefix, suffix, pad, comma]);

  return (
    <span ref={ref} className={className}>
      {(prefix ?? "") + format(reduce ? value : 0, { pad, comma }) + (suffix ?? "")}
    </span>
  );
}
