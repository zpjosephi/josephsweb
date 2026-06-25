"use client";

import { useEffect, useRef } from "react";

// Interactive hero figure: drag left/right to set the data's correlation. The
// scatter eases to the new structure, the least-squares line refits, and the
// live r / equation readouts update every frame. The hero proves the stats
// point instead of just decorating it. Math mirrors the in-browser engines my
// projects (ceritabel) actually run.

const N = 40;

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

export function HeroCorrelation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rRef = useRef<HTMLSpanElement>(null);
  const eqRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Fixed latent variables; correlation is a parameter we morph between.
    const xs = normals(N, 41);
    const zs = normals(N, 79);
    const phase = Array.from({ length: N }, (_, i) => (i * 53) % 628 / 100);

    // Map standard-normal space into the unit box the canvas draws in.
    const toUnit = (v: number) => Math.min(0.94, Math.max(0.06, 0.5 + v / 6.4));

    let targetR = 0.6;
    const cur = xs.map((x, i) => {
      const r = targetR;
      const y = r * x + Math.sqrt(Math.max(0, 1 - r * r)) * zs[i];
      return { x: toUnit(x), y: toUnit(y) };
    });

    const colors = { ink: "#16150f", accent: "#2a44c4" };
    function readColors() {
      const s = getComputedStyle(canvas!);
      colors.ink = s.getPropertyValue("--foreground").trim() || colors.ink;
      colors.accent = s.getPropertyValue("--accent").trim() || colors.accent;
    }
    readColors();
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // ---- drag to set correlation -----------------------------------------
    let dragging = false;
    let lastX = 0;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      targetR = Math.min(0.97, Math.max(-0.97, targetR + dx * 0.006));
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
      canvas.style.cursor = "grab";
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.style.cursor = "grab";
    canvas.style.touchAction = "pan-y";

    let w = 0;
    let h = 0;
    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.max(1, w * dpr);
      canvas!.height = Math.max(1, h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    function frame(t: number) {
      // Ease current points toward the structure implied by targetR.
      const r = targetR;
      const k = Math.sqrt(Math.max(0, 1 - r * r));
      for (let i = 0; i < N; i++) {
        const jitter = reduce ? 0 : Math.sin(t / 1700 + phase[i]) * 0.006;
        const ty = toUnit(r * xs[i] + k * zs[i]) + jitter;
        cur[i].y += (ty - cur[i].y) * 0.1;
      }

      // Sample correlation + least-squares fit on what is actually shown.
      let mx = 0;
      let my = 0;
      for (const p of cur) {
        mx += p.x;
        my += p.y;
      }
      mx /= N;
      my /= N;
      let sxy = 0;
      let sxx = 0;
      let syy = 0;
      for (const p of cur) {
        sxy += (p.x - mx) * (p.y - my);
        sxx += (p.x - mx) ** 2;
        syy += (p.y - my) ** 2;
      }
      const slope = sxy / sxx;
      const intercept = my - slope * mx;
      const corr = sxy / Math.sqrt(sxx * syy || 1e-9);

      // Readouts (write straight to DOM, no React re-render).
      if (rRef.current) rRef.current.textContent = corr.toFixed(2);
      if (eqRef.current) {
        // Avoid printing a "-0.00" intercept near zero.
        const ic = Math.abs(intercept) < 0.005 ? 0 : intercept;
        eqRef.current.textContent = `${slope.toFixed(2)}x ${ic >= 0 ? "+" : "-"} ${Math.abs(ic).toFixed(2)}`;
      }

      // Draw.
      ctx!.clearRect(0, 0, w, h);
      const X = (v: number) => v * w;
      const Y = (v: number) => (1 - v) * h;

      ctx!.strokeStyle = colors.accent;
      ctx!.globalAlpha = 0.9;
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.moveTo(X(0.02), Y(slope * 0.02 + intercept));
      ctx!.lineTo(X(0.98), Y(slope * 0.98 + intercept));
      ctx!.stroke();

      ctx!.lineWidth = 1.25;
      for (const p of cur) {
        ctx!.beginPath();
        ctx!.arc(X(p.x), Y(p.y), 2.6, 0, Math.PI * 2);
        ctx!.globalAlpha = 0.16;
        ctx!.fillStyle = colors.ink;
        ctx!.fill();
        ctx!.globalAlpha = 0.5;
        ctx!.strokeStyle = colors.ink;
        ctx!.stroke();
      }
      ctx!.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div className="rounded-xl border border-card-border bg-card/60 p-3 backdrop-blur-[1px]">
      <div className="flex items-center justify-between px-1 pb-2">
        <span className="mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
          drag to set correlation
        </span>
        <span className="mono text-[12px] text-accent">
          r = <span ref={rRef}>0.60</span>
        </span>
      </div>
      <canvas
        ref={canvasRef}
        className="block aspect-[4/3] w-full select-none"
        aria-label="Interactive scatter plot. Drag horizontally to change the correlation; the regression line and r value update live."
      />
      <div className="mono px-1 pt-2 text-[10.5px] text-muted-foreground">
        &#375; = <span ref={eqRef}>0.59x + 0.01</span>
      </div>
    </div>
  );
}
