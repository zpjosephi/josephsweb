"use client";

import { useEffect, useRef } from "react";

// A playable Galton board. Balls fall through ROWS rows of pegs, deflecting
// half a slot left or right at each row (a fair coin per row), and pile into
// bins. The dotted line is the exact binomial expectation for the number of
// balls dropped so far, which is the bell the pile keeps trying to become.
//
// Reduced motion: no falling animation; "drop" buttons sample the binomial
// directly into the bins and the board redraws once. Same math, no movement.

const ROWS = 11;
const BINS = ROWS + 1;
const MAX_FLYING = 320;

type Ball = { x: number; y: number; vy: number; row: number; tx: number };

function binom(n: number, k: number) {
  let c = 1;
  for (let i = 0; i < k; i++) c = (c * (n - i)) / (i + 1);
  return c;
}
const EXPECTED = Array.from(
  { length: BINS },
  (_, k) => binom(ROWS, k) / 2 ** ROWS
);

export function Galton() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const landedRef = useRef<HTMLSpanElement>(null);
  const meanRef = useRef<HTMLSpanElement>(null);
  const sdRef = useRef<HTMLSpanElement>(null);
  const dropOneRef = useRef<HTMLButtonElement>(null);
  const dropManyRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const styles = getComputedStyle(wrap);
    const accent = styles.getPropertyValue("--accent").trim() || "#7df0a6";
    const ink = styles.getPropertyValue("--foreground").trim() || "#e9efe9";

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // geometry, recomputed on resize
    let sx = 0; // horizontal slot width
    let sy = 0; // vertical peg spacing
    let topY = 0;
    let binTop = 0;
    let cx = 0;

    const bins = new Array<number>(BINS).fill(0);
    const balls: Ball[] = [];
    let landed = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = Math.round(rect.width * 0.72);
      h = Math.min(Math.max(h, 320), 460);
      canvas.style.height = `${h}px`;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sx = Math.min(44, (w * 0.86) / BINS);
      sy = (h * 0.52) / ROWS;
      topY = h * 0.06;
      binTop = topY + ROWS * sy + 14;
      cx = w / 2;
    };
    resize();

    const pegX = (row: number, i: number) => cx + (i - row / 2) * sx;

    const updateStats = () => {
      if (landedRef.current) landedRef.current.textContent = String(landed);
      if (landed > 0) {
        let sum = 0;
        for (let k = 0; k < BINS; k++) sum += k * bins[k];
        const mean = sum / landed;
        let varr = 0;
        for (let k = 0; k < BINS; k++) varr += bins[k] * (k - mean) ** 2;
        const sd = Math.sqrt(varr / landed);
        if (meanRef.current)
          meanRef.current.textContent = `${mean.toFixed(2)} (theory ${(ROWS / 2).toFixed(1)})`;
        if (sdRef.current)
          sdRef.current.textContent = `${sd.toFixed(2)} (theory ${(Math.sqrt(ROWS) / 2).toFixed(2)})`;
      } else {
        if (meanRef.current) meanRef.current.textContent = "n/a";
        if (sdRef.current) sdRef.current.textContent = "n/a";
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // pegs
      ctx.fillStyle = ink;
      ctx.globalAlpha = 0.3;
      for (let row = 0; row < ROWS; row++) {
        for (let i = 0; i <= row; i++) {
          ctx.beginPath();
          ctx.arc(pegX(row, i), topY + row * sy, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // bins
      const maxCount = Math.max(1, ...bins);
      const maxBar = h - binTop - 18;
      ctx.fillStyle = accent;
      for (let k = 0; k < BINS; k++) {
        const bh = (bins[k] / maxCount) * maxBar;
        const bx = cx + (k - ROWS / 2) * sx - (sx - 3) / 2;
        ctx.globalAlpha = 0.85;
        ctx.fillRect(bx, h - 12 - bh, sx - 3, bh);
      }
      ctx.globalAlpha = 1;

      // baseline
      ctx.strokeStyle = ink;
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.moveTo(cx - ((ROWS / 2) + 0.7) * sx, h - 12);
      ctx.lineTo(cx + ((ROWS / 2) + 0.7) * sx, h - 12);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // expected binomial outline over the current total
      if (landed > 0) {
        ctx.strokeStyle = ink;
        ctx.globalAlpha = 0.75;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        for (let k = 0; k < BINS; k++) {
          const eh = ((EXPECTED[k] * landed) / maxCount) * maxBar;
          const ex = cx + (k - ROWS / 2) * sx;
          const ey = h - 12 - eh;
          if (k === 0) ctx.moveTo(ex, ey);
          else ctx.lineTo(ex, ey);
        }
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      // flying balls
      ctx.fillStyle = accent;
      for (const b of balls) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 2.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const land = (k: number) => {
      bins[Math.min(BINS - 1, Math.max(0, k))]++;
      landed++;
    };

    // instant statistical drop (reduced motion, or overflow beyond MAX_FLYING)
    const dropInstant = (count: number) => {
      for (let c = 0; c < count; c++) {
        let k = 0;
        for (let r = 0; r < ROWS; r++) if (Math.random() < 0.5) k++;
        land(k);
      }
      updateStats();
      draw();
    };

    const spawn = (count: number) => {
      if (reduce) {
        dropInstant(count);
        return;
      }
      const room = Math.max(0, MAX_FLYING - balls.length);
      const animated = Math.min(count, room);
      if (count - animated > 0) dropInstant(count - animated);
      for (let c = 0; c < animated; c++) {
        balls.push({
          x: cx + (Math.random() - 0.5) * 3,
          y: topY - 14 - Math.random() * 90,
          vy: 0.6 + Math.random() * 0.7,
          row: 0,
          tx: cx,
        });
      }
      start();
    };

    const reset = () => {
      bins.fill(0);
      balls.length = 0;
      landed = 0;
      updateStats();
      draw();
    };

    // ------------------------------------------------------------ animation
    let raf = 0;
    let running = false;
    let inView = true;
    let last = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(2.5, last ? (now - last) / 16.7 : 1);
      last = now;

      for (let i = balls.length - 1; i >= 0; i--) {
        const b = balls[i];
        b.vy = Math.min(b.vy + 0.16 * dt, 5.2);
        b.y += b.vy * dt;
        b.x += (b.tx - b.x) * Math.min(1, 0.22 * dt);

        if (b.row < ROWS && b.y >= topY + b.row * sy) {
          const dir = Math.random() < 0.5 ? -1 : 1;
          b.tx += (dir * sx) / 2;
          b.row++;
        }
        if (b.y >= h - 16) {
          land(Math.round((b.tx - cx) / sx + ROWS / 2));
          balls.splice(i, 1);
        }
      }

      draw();
      if (balls.length === 0) {
        updateStats();
        stop();
      }
    };

    const start = () => {
      if (running || reduce || !inView || document.hidden) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // first-view demo drop
    let demoDone = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          if (!demoDone) {
            demoDone = true;
            if (reduce) dropInstant(140);
            else spawn(90);
          }
          if (balls.length) start();
        } else stop();
      },
      { threshold: 0.25 }
    );
    io.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (balls.length) start();
    };

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(wrap);
    document.addEventListener("visibilitychange", onVisibility);

    const one = () => spawn(1);
    const many = () => spawn(100);
    const btnOne = dropOneRef.current;
    const btnMany = dropManyRef.current;
    const btnReset = resetRef.current;
    btnOne?.addEventListener("click", one);
    btnMany?.addEventListener("click", many);
    btnReset?.addEventListener("click", reset);

    updateStats();
    draw();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      btnOne?.removeEventListener("click", one);
      btnMany?.removeEventListener("click", many);
      btnReset?.removeEventListener("click", reset);
    };
  }, []);

  return (
    <div ref={wrapRef}>
      <canvas
        ref={canvasRef}
        className="block w-full"
        role="img"
        aria-label="Galton board: balls fall through pegs and pile up into a bell-shaped histogram"
      />
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          ref={dropManyRef}
          type="button"
          className="rounded-lg bg-foreground px-4 py-2 text-[13.5px] font-medium text-background transition-transform hover:-translate-y-px active:translate-y-0"
        >
          Drop 100
        </button>
        <button
          ref={dropOneRef}
          type="button"
          className="rounded-lg border border-hairline px-4 py-2 text-[13.5px] font-medium transition-colors hover:bg-card"
        >
          Drop 1
        </button>
        <button
          ref={resetRef}
          type="button"
          className="rounded-lg border border-hairline px-4 py-2 text-[13.5px] font-medium transition-colors hover:bg-card"
        >
          Reset
        </button>
      </div>
      <dl className="mono mt-5 grid gap-x-8 gap-y-1 text-[12.5px] leading-[1.7] sm:grid-cols-3">
        <div className="flex gap-3">
          <dt className="text-muted-foreground">balls</dt>
          <dd ref={landedRef}>0</dd>
        </div>
        <div className="flex gap-3">
          <dt className="text-muted-foreground">mean bin</dt>
          <dd ref={meanRef}>n/a</dd>
        </div>
        <div className="flex gap-3">
          <dt className="text-muted-foreground">sd</dt>
          <dd ref={sdRef}>n/a</dd>
        </div>
      </dl>
    </div>
  );
}
