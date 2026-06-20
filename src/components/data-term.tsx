"use client";

import { useId, useState } from "react";

// An inline term that, on hover, reveals a tiny sparkline + metric - as if
// every word were backed by data. Part of the datasheet concept.
export function DataTerm({
  children,
  series,
  metric,
}: {
  children: string;
  series: number[];
  metric: string;
}) {
  const [open, setOpen] = useState(false);
  const gid = useId();

  const max = Math.max(...series);
  const min = Math.min(...series);
  const span = max - min || 1;
  const w = 96;
  const h = 28;
  const step = w / (series.length - 1);
  const pts = series
    .map((v, i) => `${i * step},${h - ((v - min) / span) * h}`)
    .join(" ");

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span
        data-cursor
        className="cursor-help text-foreground underline decoration-accent decoration-dotted underline-offset-4"
      >
        {children}
      </span>

      {open && (
        <span className="absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 rounded-lg border border-card-border bg-card p-2.5 shadow-xl">
          <svg width={w} height={h} className="block">
            <polyline
              points={pts}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={1.5}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <circle
              cx={(series.length - 1) * step}
              cy={h - ((series[series.length - 1] - min) / span) * h}
              r={2}
              fill="var(--accent)"
            />
          </svg>
          <span className="mt-1 block whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {metric}
          </span>
          {/* hidden id keeps each instance unique under StrictMode */}
          <span hidden>{gid}</span>
        </span>
      )}
    </span>
  );
}
