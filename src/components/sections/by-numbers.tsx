"use client";

import { useEffect, useRef, useState } from "react";

// Honest, on-brand stats. Edit freely as your work grows.
const stats = [
  { id: "01", value: 3, suffix: "", label: "Projects shipped" },
  { id: "02", value: 1000, suffix: "+", label: "Companies mapped @ LPEI" },
  { id: "03", value: 2, suffix: "", label: "Disciplines: CS × Stats" },
  { id: "04", value: 10, suffix: "", label: "EPL seasons in xEleven" },
];

function useCountUp(target: number, start: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    // Reduced-motion: collapse the curve to a single frame (jumps to target).
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let t0: number | undefined;
    const tick = (t: number) => {
      if (t0 === undefined) t0 = t;
      const p = reduce ? 1 : Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return val;
}

function Stat({
  id,
  value,
  suffix,
  label,
  start,
}: {
  id: string;
  value: number;
  suffix: string;
  label: string;
  start: boolean;
}) {
  const v = useCountUp(value, start);
  return (
    <div className="bg-background px-5 py-7">
      <div className="mb-3 flex items-center justify-between tele text-[10px] text-muted-foreground">
        <span>UNIT</span>
        <span className="text-accent">/{id}</span>
      </div>
      <div className="display font-normal tabular-nums" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
        {v}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-3 h-1.5 w-full tick-axis opacity-60" />
      <div className="h-0.5 w-full bg-card-border" />
      <div className="mt-3 text-sm leading-snug text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export function ByNumbers() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-b-2 border-card-border bg-card-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-px flex items-center justify-between bg-background px-1 py-2 tele text-[10px] text-muted-foreground">
          <span className="text-accent">{">> "}DATA MANIFEST</span>
          <span>FIG.00 / BY THE NUMBERS</span>
        </div>
        <div className="grid grid-cols-2 gap-px sm:grid-cols-4">
          {stats.map((s) => (
            <Stat key={s.label} {...s} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
