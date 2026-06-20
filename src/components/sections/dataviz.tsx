"use client";

import { useMemo, useState } from "react";
import { useMounted } from "@/lib/use-mounted";
import {
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

const N = 60;
const DOMAIN: [number, number] = [-3.2, 3.2];

// Deterministic PRNG so server & client render identically (no hydration drift).
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Standard normal via Box–Muller, driven by the seeded PRNG.
function normals(count: number, seed: number) {
  const rand = mulberry32(seed);
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    const u1 = Math.max(rand(), 1e-9);
    const u2 = rand();
    out.push(Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2));
  }
  return out;
}

export function DataViz() {
  return (
    <Section
      id="demo"
      eyebrow="fig.06 / live"
      annotation="interactive"
      title="Statistics, running in your browser"
    >
      <DataVizPanel />
    </Section>
  );
}

// Interactive content only — reused by the /v2 layout without the Section frame.
export function DataVizPanel() {
  // Target correlation the visitor controls.
  const [r, setR] = useState(0.6);

  // Recharts needs real DOM dimensions - render it only after mount.
  const mounted = useMounted();

  const { points, fit, sampleR } = useMemo(() => {
    const x = normals(N, 1337);
    const z = normals(N, 7331);
    const k = Math.sqrt(Math.max(0, 1 - r * r));
    const pts = x.map((xi, i) => ({ x: xi, y: r * xi + k * z[i] }));

    // Pearson correlation + least-squares line, computed live.
    const n = pts.length;
    const mx = pts.reduce((s, p) => s + p.x, 0) / n;
    const my = pts.reduce((s, p) => s + p.y, 0) / n;
    let sxy = 0;
    let sxx = 0;
    let syy = 0;
    for (const p of pts) {
      const dx = p.x - mx;
      const dy = p.y - my;
      sxy += dx * dy;
      sxx += dx * dx;
      syy += dy * dy;
    }
    const slope = sxy / sxx;
    const intercept = my - slope * mx;
    const corr = sxy / Math.sqrt(sxx * syy);
    const line = [
      { x: DOMAIN[0], y: slope * DOMAIN[0] + intercept },
      { x: DOMAIN[1], y: slope * DOMAIN[1] + intercept },
    ];
    return {
      points: pts,
      fit: { slope, intercept, line },
      sampleR: corr,
    };
  }, [r]);

  return (
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div className="space-y-5">
            <p className="max-w-[58ch] text-lg leading-relaxed text-muted-foreground">
              Drag the slider to set a target{" "}
              <span className="text-foreground">correlation</span>. The points
              regenerate and the least-squares regression line is fit{" "}
              <span className="text-foreground">in real time</span>. No images,
              the math runs on your machine.
            </p>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="corr" className="text-sm font-medium">
                  Target correlation
                </label>
                <span className="font-mono text-sm text-accent">
                  r = {r.toFixed(2)}
                </span>
              </div>
              <input
                id="corr"
                type="range"
                min={-0.95}
                max={0.95}
                step={0.05}
                value={r}
                onChange={(e) => setR(parseFloat(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
            </div>

            <dl className="grid grid-cols-2 gap-px border-2 border-card-border bg-card-border font-mono text-sm">
              <div className="bg-card p-3">
                <dt className="tele text-[10px] text-muted-foreground">Sample r</dt>
                <dd className="mt-1 text-lg font-semibold text-accent">
                  {sampleR.toFixed(3)}
                </dd>
              </div>
              <div className="bg-card p-3">
                <dt className="tele text-[10px] text-muted-foreground">Fit line</dt>
                <dd className="mt-1 text-sm">
                  ŷ = {fit.slope.toFixed(2)}x {fit.intercept >= 0 ? "+" : "−"}{" "}
                  {Math.abs(fit.intercept).toFixed(2)}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="border-2 border-card-border bg-card p-4">
            <div className="mb-3 flex items-center justify-between border-b border-card-border pb-2 tele text-[10px] text-muted-foreground">
              <span className="text-accent">{">> "}SCATTER / OLS FIT</span>
              <span>N = 60</span>
            </div>
            <div className="h-[360px] w-full">
              {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart margin={{ top: 10, right: 16, bottom: 8, left: 0 }}>
                  <CartesianGrid
                    stroke="var(--card-border)"
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    type="number"
                    dataKey="x"
                    domain={DOMAIN}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    stroke="var(--card-border)"
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    domain={DOMAIN}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    stroke="var(--card-border)"
                  />
                  <Tooltip
                    cursor={{ stroke: "var(--accent)", strokeOpacity: 0.3 }}
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--card-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(value) =>
                      typeof value === "number" ? value.toFixed(2) : String(value)
                    }
                  />
                  <Scatter
                    data={points}
                    fill="var(--accent)"
                    fillOpacity={0.7}
                    isAnimationActive={false}
                  />
                  <Line
                    data={fit.line}
                    dataKey="y"
                    stroke="var(--foreground)"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
              )}
            </div>
          </div>
        </Reveal>
      </div>
  );
}
