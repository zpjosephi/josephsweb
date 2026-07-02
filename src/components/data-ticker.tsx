"use client";

import { useEffect, useState } from "react";

type Tick = { label: string; value: string; accent?: boolean };

// Self-telemetry, not market data. Every token here sells Joseph and builds
// trust in the first scroll - a recruiter reads "open to work / Jakarta / 03
// shipped", not a speculative crypto price. The live local clock keeps the
// "LIVE" badge honest without any external dependency.
const FACTS: Tick[] = [
  { label: "STATUS", value: "OPEN TO WORK", accent: true },
  { label: "BASE", value: "JAKARTA · 06°S" },
  { label: "FOCUS", value: "DATA × SOFTWARE" },
  { label: "STACK", value: "NEXT.JS · PYTHON · R" },
  { label: "SHIPPED", value: "03 PROJECTS" },
  { label: "DEGREE", value: "CS × STATISTICS" },
  { label: "GRAD", value: "AUG 2026" },
];

function Item({ t }: { t: Tick }) {
  return (
    <span className="mx-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
      <span className="text-muted-foreground">{t.label}</span>
      <span
        className={t.accent ? "font-medium text-accent" : "font-medium text-foreground"}
      >
        {t.value}
      </span>
      <span className="text-accent">{"//"}</span>
    </span>
  );
}

// Thin self-telemetry strip beneath the hero. On-brand: numbers, in motion.
export function DataTicker() {
  // Live local clock (Asia/Jakarta) - set only after mount so server and client
  // markup match (no hydration drift).
  const [clock, setClock] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const update = () => setClock(fmt.format(new Date()));
    // Defer the first tick out of the effect body (lint-clean).
    const raf = requestAnimationFrame(update);
    const id = setInterval(update, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  const ticks: Tick[] = [
    { label: "LOCAL", value: `${clock ?? "--:--:--"} WIB` },
    ...FACTS,
  ];

  // Duplicate the set so the marquee can loop seamlessly (-50% translate).
  const loop = [...ticks, ...ticks];

  return (
    <div className="relative overflow-hidden border-y-2 border-card-border bg-muted">
      <div className="flex items-center py-2">
        <span className="z-10 flex shrink-0 items-center gap-2 border-r-2 border-card-border bg-accent px-4 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent-foreground">
          <span className="h-2 w-2 animate-blink bg-accent-foreground" />
          LIVE
        </span>
        <div className="flex animate-ticker whitespace-nowrap pl-4">
          {loop.map((t, i) => (
            <Item key={`${t.label}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
