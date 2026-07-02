"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

// The hero instrument. Pointer movement over the section becomes a scatter
// sample; each frame re-solves the least-squares line and Pearson r over the
// points currently alive, and a readout panel shows n / r / the fitted
// equation. When nobody is interacting (first paint, mobile before touch), a
// wandering walker keeps feeding the sample so the instrument never flatlines.
//
// All state lives in refs; the React tree renders exactly once. The rAF loop
// pauses when the section leaves the viewport or the tab hides. Under
// prefers-reduced-motion everything collapses to a single static plot of a
// seeded dataset, fitted once.

type Pt = { x: number; y: number; t: number };

const MAX_POINTS = 260;
const SAMPLE_MS = 28; // min gap between pointer samples
const LIFE_MS = 9000; // point fade-out horizon
const FALLBACK_ACCENT = "#7df0a6";
const FALLBACK_INK = "#e9efe9";

function fit(points: Pt[], w: number, h: number) {
  const n = points.length;
  if (n < 8) return null;
  let sx = 0,
    sy = 0,
    sxx = 0,
    syy = 0,
    sxy = 0;
  for (const p of points) {
    const nx = p.x / w;
    const ny = 1 - p.y / h; // y up, like a chart
    sx += nx;
    sy += ny;
    sxx += nx * nx;
    syy += ny * ny;
    sxy += nx * ny;
  }
  const vx = sxx - (sx * sx) / n;
  const vy = syy - (sy * sy) / n;
  const cxy = sxy - (sx * sy) / n;
  if (vx < 1e-6 || vy < 1e-6) return null;
  const b = cxy / vx;
  const a = (sy - b * sx) / n;
  const r = cxy / Math.sqrt(vx * vy);
  return { a, b, r, n };
}

// Deterministic PRNG for the reduced-motion still.
function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function HeroField({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nRef = useRef<HTMLSpanElement>(null);
  const rRef = useRef<HTMLSpanElement>(null);
  const eqRef = useRef<HTMLSpanElement>(null);
  const modeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Resolve theme colors to concrete values the canvas can use.
    const styles = getComputedStyle(wrap);
    const accent = styles.getPropertyValue("--accent").trim() || FALLBACK_ACCENT;
    const ink = styles.getPropertyValue("--foreground").trim() || FALLBACK_INK;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const setHud = (
      n: number,
      model: { a: number; b: number; r: number } | null,
      mode: string
    ) => {
      if (nRef.current) nRef.current.textContent = String(n);
      if (rRef.current)
        rRef.current.textContent = model ? model.r.toFixed(2) : "n/a";
      if (eqRef.current)
        eqRef.current.textContent = model
          ? `y = ${model.a.toFixed(2)} ${model.b < 0 ? "-" : "+"} ${Math.abs(model.b).toFixed(2)}x`
          : "need more points";
      if (modeRef.current) modeRef.current.textContent = mode;
    };

    const drawScene = (points: Pt[], now: number) => {
      ctx.clearRect(0, 0, w, h);

      // faint plot frame ticks along the bottom, so it reads as a chart
      ctx.strokeStyle = ink;
      ctx.globalAlpha = 0.14;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let gx = 0; gx <= w; gx += 80) {
        ctx.moveTo(gx, h - 14);
        ctx.lineTo(gx, h - 6);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      for (const p of points) {
        const age = now - p.t;
        const a = Math.max(0, 1 - age / LIFE_MS);
        ctx.globalAlpha = 0.25 + 0.75 * a;
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const model = fit(points, w, h);
      if (model) {
        const y0 = (1 - model.a) * h;
        const y1 = (1 - (model.a + model.b)) * h;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.moveTo(0, y0);
        ctx.lineTo(w, y1);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      return model;
    };

    // ------------------------------------------------ reduced motion: still
    if (reduce) {
      const renderStill = () => {
        resize();
        const rand = mulberry32(7);
        const pts: Pt[] = [];
        for (let i = 0; i < 110; i++) {
          const nx = rand();
          const ny = Math.min(
            0.92,
            Math.max(0.08, 0.28 + 0.45 * nx + (rand() - 0.5) * 0.22)
          );
          pts.push({ x: nx * w, y: (1 - ny) * h, t: performance.now() });
        }
        const model = drawScene(pts, performance.now());
        setHud(pts.length, model, "sample: fixed");
      };
      renderStill();
      const ro = new ResizeObserver(renderStill);
      ro.observe(wrap);
      return () => ro.disconnect();
    }

    // --------------------------------------------------------- live loop
    const points: Pt[] = [];
    let lastSample = 0;
    let lastInput = 0; // 0 = never touched, walker owns the sample
    let raf = 0;
    let running = false;
    let inView = true;

    // idle walker state
    let wx = w * 0.3;
    let wy = h * 0.6;
    let heading = -0.5;
    let lastWalk = 0;

    const push = (x: number, y: number, t: number) => {
      points.push({ x, y, t });
      if (points.length > MAX_POINTS) points.splice(0, points.length - MAX_POINTS);
    };

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      lastInput = now;
      if (now - lastSample < SAMPLE_MS) return;
      lastSample = now;
      const rect = wrap.getBoundingClientRect();
      push(e.clientX - rect.left, e.clientY - rect.top, now);
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, input, [role='button']")) return;
      const rect = wrap.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();
      lastInput = now;
      for (let i = 0; i < 14; i++) {
        const ang = Math.random() * Math.PI * 2;
        const rad = 6 + Math.random() * 42;
        push(cx + Math.cos(ang) * rad, cy + Math.sin(ang) * rad, now);
      }
    };

    let hudAt = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);

      // walker feeds the sample when the visitor isn't
      if (now - lastInput > 2500 && now - lastWalk > 70) {
        lastWalk = now;
        heading += (Math.random() - 0.5) * 0.9;
        wx += Math.cos(heading) * 16;
        wy += Math.sin(heading) * 16;
        const mx = 30;
        if (wx < mx || wx > w - mx) {
          heading = Math.PI - heading;
          wx = Math.min(Math.max(wx, mx), w - mx);
        }
        if (wy < mx || wy > h - mx) {
          heading = -heading;
          wy = Math.min(Math.max(wy, mx), h - mx);
        }
        push(wx, wy, now);
      }

      // retire old points
      while (points.length && now - points[0].t > LIFE_MS) points.shift();

      const model = drawScene(points, now);
      if (now - hudAt > 160) {
        hudAt = now;
        setHud(
          points.length,
          model,
          lastInput && now - lastInput < 2500 ? "sample: you" : "sample: idle walk"
        );
      }
    };

    const start = () => {
      if (running || !inView || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative overflow-hidden">
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0" />
      <div className="relative z-10">{children}</div>

      {/* live readout; hidden on small screens where it would crowd the copy */}
      <div
        className="live-readout mono pointer-events-none absolute bottom-5 right-5 z-10 hidden min-w-[190px] px-4 py-3 text-[12px] leading-[1.7] sm:block"
        role="status"
        aria-label="Live statistics of the scatter behind this section"
      >
        <div className="flex justify-between gap-6">
          <span className="text-muted-foreground">n</span>
          <span ref={nRef}>0</span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-muted-foreground">pearson r</span>
          <span ref={rRef}>n/a</span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-muted-foreground">ols</span>
          <span ref={eqRef}>need more points</span>
        </div>
        <div className="mt-1.5 border-t border-card-border pt-1.5 text-muted-foreground">
          <span ref={modeRef}>sample: idle walk</span>
        </div>
      </div>
    </div>
  );
}
