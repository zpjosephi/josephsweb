"use client";

import { useMemo, useState } from "react";
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
import { useMounted } from "@/lib/use-mounted";

const N = 64;
const DOMAIN: [number, number] = [-3.2, 3.2];

// Deterministic PRNG so server and client agree (no hydration drift).
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

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-4">
      <div className="mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </div>
      <div className="mono mt-1.5 text-[17px] font-medium text-foreground">
        {value}
      </div>
    </div>
  );
}

export function CorrelationLab() {
  const [r, setR] = useState(0.6);
  const mounted = useMounted();

  const { points, line, sampleR, slope, intercept, r2 } = useMemo(() => {
    const x = normals(N, 20260625);
    const z = normals(N, 19981211);
    const k = Math.sqrt(Math.max(0, 1 - r * r));
    const pts = x.map((xi, i) => ({ x: xi, y: r * xi + k * z[i] }));

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
    const b = sxy / sxx;
    const a = my - b * mx;
    const corr = sxy / Math.sqrt(sxx * syy);
    return {
      points: pts,
      line: [
        { x: DOMAIN[0], y: b * DOMAIN[0] + a },
        { x: DOMAIN[1], y: b * DOMAIN[1] + a },
      ],
      sampleR: corr,
      slope: b,
      intercept: a,
      r2: corr * corr,
    };
  }, [r]);

  return (
    <section id="stats" className="border-t border-card-border bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="studio-display max-w-2xl text-[clamp(2rem,4.6vw,3.4rem)]">
          The statistics half, running on your machine.
        </h2>
        <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-muted-foreground">
          No screenshots here. Set a target correlation and the sample
          regenerates, then the least-squares line and its fit statistics solve
          in the browser, the same math my projects lean on.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* controls + readouts */}
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="corr" className="text-[14px] font-medium">
                Target correlation
              </label>
              <span className="mono text-[15px] text-accent">
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
              className="mt-3 w-full"
            />
            <div className="mono mt-2 flex justify-between text-[11px] text-muted-foreground">
              <span>-0.95</span>
              <span>0</span>
              <span>+0.95</span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-card-border bg-card-border">
              <Readout label="Sample r" value={sampleR.toFixed(3)} />
              <Readout label="R²" value={r2.toFixed(3)} />
              <Readout
                label="Slope b"
                value={slope.toFixed(3)}
              />
              <Readout
                label="Fit line"
                value={`y = ${slope.toFixed(2)}x ${intercept >= 0 ? "+" : "−"} ${Math.abs(intercept).toFixed(2)}`}
              />
            </div>
          </div>

          {/* chart */}
          <div className="rounded-xl border border-card-border bg-card p-4">
            <div className="mono mb-3 flex items-center justify-between border-b border-card-border pb-2 text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
              <span>scatter / OLS fit</span>
              <span>n = {N}</span>
            </div>
            <div className="h-[340px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart margin={{ top: 8, right: 14, bottom: 4, left: -8 }}>
                    <CartesianGrid stroke="var(--card-border)" strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      dataKey="x"
                      domain={DOMAIN}
                      ticks={[-3, -2, -1, 0, 1, 2, 3]}
                      allowDecimals={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                      stroke="var(--card-border)"
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      domain={DOMAIN}
                      ticks={[-3, -2, -1, 0, 1, 2, 3]}
                      allowDecimals={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                      stroke="var(--card-border)"
                    />
                    <Tooltip
                      cursor={{ stroke: "var(--accent)", strokeOpacity: 0.25 }}
                      contentStyle={{
                        background: "var(--card)",
                        border: "1px solid var(--card-border)",
                        borderRadius: 10,
                        fontSize: 12,
                        fontFamily: "var(--font-mono)",
                      }}
                      formatter={(value) =>
                        typeof value === "number" ? value.toFixed(2) : String(value)
                      }
                    />
                    <Scatter
                      data={points}
                      fill="var(--foreground)"
                      fillOpacity={0.45}
                      isAnimationActive={false}
                    />
                    <Line
                      data={line}
                      dataKey="y"
                      stroke="var(--accent)"
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
