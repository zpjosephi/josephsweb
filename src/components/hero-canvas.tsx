"use client";

import { useEffect, useRef } from "react";

// Subtle animated scatter + live regression line - a data motif, not a
// generic particle network. Drifts gently and refits the trend each frame.
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const N = 32;
    const pts = Array.from({ length: N }, () => {
      const x = Math.random();
      const y = 0.18 + 0.58 * x + (Math.random() - 0.5) * 0.28;
      return {
        x,
        y: Math.min(Math.max(y, 0.04), 0.96),
        phase: Math.random() * Math.PI * 2,
        amp: 0.012 + Math.random() * 0.022,
      };
    });

    let w = 0;
    let h = 0;
    // Cursor position in canvas-local pixels (-1 = off canvas)
    let mxp = -1;
    let myp = -1;
    const onMouse = (e: MouseEvent) => {
      const r = canvas!.getBoundingClientRect();
      mxp = e.clientX - r.left;
      myp = e.clientY - r.top;
    };
    window.addEventListener("mousemove", onMouse);

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#8b7bff";

    let raf = 0;
    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);

      const cur = pts.map((p) => {
        const dy = reduce ? 0 : Math.sin(t / 1500 + p.phase) * p.amp;
        let px = p.x * w;
        let py = (1 - (p.y + dy)) * h;
        // Repel from the cursor within a radius
        if (mxp >= 0) {
          const ddx = px - mxp;
          const ddy = py - myp;
          const dist = Math.hypot(ddx, ddy);
          const R = 90;
          if (dist < R && dist > 0.001) {
            const push = (1 - dist / R) * 26;
            px += (ddx / dist) * push;
            py += (ddy / dist) * push;
          }
        }
        return { x: px / w, y: 1 - py / h };
      });

      // Least-squares fit, recomputed live.
      const n = cur.length;
      let mx = 0;
      let my = 0;
      for (const p of cur) {
        mx += p.x;
        my += p.y;
      }
      mx /= n;
      my /= n;
      let sxy = 0;
      let sxx = 0;
      for (const p of cur) {
        sxy += (p.x - mx) * (p.y - my);
        sxx += (p.x - mx) ** 2;
      }
      const slope = sxy / sxx;
      const intercept = my - slope * mx;

      const X = (v: number) => v * w;
      const Y = (v: number) => (1 - v) * h;

      ctx!.strokeStyle = accent;
      ctx!.globalAlpha = 0.45;
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.moveTo(X(0), Y(intercept));
      ctx!.lineTo(X(1), Y(slope + intercept));
      ctx!.stroke();

      ctx!.globalAlpha = 0.85;
      ctx!.fillStyle = accent;
      for (const p of cur) {
        ctx!.beginPath();
        ctx!.arc(X(p.x), Y(p.y), 2.5, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />
  );
}
