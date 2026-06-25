"use client";

import { useEffect, useRef } from "react";

// A living scatter with a least-squares line refit every frame. The points
// drift gently and scatter away from the cursor, so the regression visibly
// re-solves as you move. A data motif for the hero, not a particle toy.
export function Scatter({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Read themed colors; refresh them when the .dark class flips.
    const colors = { ink: "#16150f", accent: "#2a44c4" };
    function readColors() {
      const s = getComputedStyle(canvas!);
      colors.ink = s.getPropertyValue("--foreground").trim() || colors.ink;
      colors.accent = s.getPropertyValue("--accent").trim() || colors.accent;
    }
    readColors();
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const N = 38;
    const pts = Array.from({ length: N }, () => {
      const x = Math.random();
      const y = 0.16 + 0.6 * x + (Math.random() - 0.5) * 0.26;
      return {
        x,
        y: Math.min(Math.max(y, 0.05), 0.95),
        phase: Math.random() * Math.PI * 2,
        amp: 0.01 + Math.random() * 0.02,
      };
    });

    let w = 0;
    let h = 0;
    let mxp = -1;
    let myp = -1;
    const onMove = (e: MouseEvent) => {
      const r = canvas!.getBoundingClientRect();
      mxp = e.clientX - r.left;
      myp = e.clientY - r.top;
    };
    const onLeave = () => {
      mxp = -1;
      myp = -1;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

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
    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);

      const cur = pts.map((p) => {
        const dy = reduce ? 0 : Math.sin(t / 1600 + p.phase) * p.amp;
        let px = p.x * w;
        let py = (1 - (p.y + dy)) * h;
        if (mxp >= 0) {
          const ddx = px - mxp;
          const ddy = py - myp;
          const dist = Math.hypot(ddx, ddy);
          const R = 96;
          if (dist < R && dist > 0.001) {
            const push = (1 - dist / R) * 30;
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

      // Regression line, the only accent stroke.
      ctx!.strokeStyle = colors.accent;
      ctx!.globalAlpha = 0.9;
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.moveTo(X(0), Y(intercept));
      ctx!.lineTo(X(1), Y(slope + intercept));
      ctx!.stroke();

      // Points: quiet ink, hollow so they read as data, not confetti.
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

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
