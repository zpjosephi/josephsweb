"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { euros, peakAge, model, players, seasonLabel, type Player } from "@/lib/epl";

export type View = "age" | "passport" | "homegrown";

const PAD = { top: 28, right: 12, bottom: 44, left: 56 };
const V_MIN = Math.log(0.15);
const V_MAX = Math.log(220);
const AGE_MIN = 16;
const AGE_MAX = 38;

// Deterministic 0..1 noise per dot, so jitter doesn't reshuffle between renders.
function hash(i: number, salt = 0) {
  const x = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function median(xs: number[]) {
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

type Size = { w: number; h: number };
type Layout = { x: Float32Array; y: Float32Array };

function yOf(value: number, s: Size) {
  const t = (Math.log(value) - V_MIN) / (V_MAX - V_MIN);
  return PAD.top + (1 - t) * (s.h - PAD.top - PAD.bottom);
}

function xOfAge(age: number, s: Size) {
  const t = (age - AGE_MIN) / (AGE_MAX - AGE_MIN);
  return PAD.left + t * (s.w - PAD.left - PAD.right);
}

function groupOf(p: Player, view: View) {
  if (view === "passport") return p.english ? 1 : 0;
  return p.homegrown ? 1 : 0;
}

function columnCenters(s: Size) {
  const inner = s.w - PAD.left - PAD.right;
  return [PAD.left + inner * 0.27, PAD.left + inner * 0.73];
}

// Classic beeswarm: walk dots in value order and push each one sideways until it
// clears every dot already placed near the same height.
function swarm(view: View, s: Size, r: number): Layout {
  const x = new Float32Array(players.length);
  const y = new Float32Array(players.length);
  const centers = columnCenters(s);
  const d = r * 2 + 0.6;
  for (const g of [0, 1]) {
    const idx = players
      .map((p, i) => i)
      .filter((i) => groupOf(players[i], view) === g)
      .sort((a, b) => players[a].value - players[b].value);
    const placed: number[] = [];
    for (const i of idx) {
      const yi = yOf(players[i].value, s);
      y[i] = yi;
      for (let k = 0; ; k++) {
        const off = k === 0 ? 0 : Math.ceil(k / 2) * d * 0.55 * (k % 2 ? 1 : -1);
        const xi = centers[g] + off;
        const clash = placed.some((j) => {
          const dy = y[j] - yi;
          if (Math.abs(dy) >= d) return false;
          const dx = x[j] - xi;
          return dx * dx + dy * dy < d * d;
        });
        if (!clash) {
          x[i] = xi;
          break;
        }
      }
      placed.push(i);
    }
  }
  return { x, y };
}

function ageLayout(s: Size): Layout {
  const x = new Float32Array(players.length);
  const y = new Float32Array(players.length);
  const band = (s.w - PAD.left - PAD.right) / (AGE_MAX - AGE_MIN);
  players.forEach((p, i) => {
    x[i] = xOfAge(p.age, s) + (hash(i) - 0.5) * band * 0.82;
    y[i] = yOf(p.value, s) + (hash(i, 1) - 0.5) * 5;
  });
  return { x, y };
}

const groupStats = (view: Exclude<View, "age">) =>
  [0, 1].map((g) => median(players.filter((p) => groupOf(p, view) === g).map((p) => p.value)));

const STATS = { passport: groupStats("passport"), homegrown: groupStats("homegrown") };
const LABELS = {
  passport: ["Foreign", "English"],
  homegrown: ["Not home-grown", "Home-grown"],
};

// Within-player age curve from the thesis model, anchored to the sample's
// average log value so it sits on the cloud. Only its shape carries meaning.
const anchor = (() => {
  const f = (a: number) => model.age * a + model.ageSquared * a * a;
  const meanLn = players.reduce((t, p) => t + Math.log(p.value), 0) / players.length;
  const meanF = players.reduce((t, p) => t + f(p.age), 0) / players.length;
  return (a: number) => Math.exp(meanLn - meanF + f(a));
})();

// read from the canvas so a themed parent (the night-lab home) can recolor it
function readCss(el: Element, name: string) {
  return getComputedStyle(el).getPropertyValue(name).trim();
}

function tag(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, align: "left" | "right", fg: string, bg: string) {
  const w = ctx.measureText(text).width;
  const left = align === "left" ? x : x - w;
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.roundRect(left - 6, y - 19, w + 12, 22, 6);
  ctx.fill();
  ctx.fillStyle = fg;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(text, left, y - 3);
}

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function PlayerField({ view }: { view: View }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState<Size | null>(null);
  // the entrance only plays once the field is actually on screen
  const [seen, setSeen] = useState(false);
  const [hover, setHover] = useState<{ i: number; x: number; y: number; view: View } | null>(null);

  const anim = useRef({
    fromX: new Float32Array(players.length),
    fromY: new Float32Array(players.length),
    curX: new Float32Array(players.length),
    curY: new Float32Array(players.length),
    toX: new Float32Array(players.length),
    toY: new Float32Array(players.length),
    start: 0,
    duration: 0,
    delay: new Float32Array(players.length),
    progress: 1,
    raf: 0,
    first: true,
  });
  const hoverRef = useRef<number | null>(null);
  const viewRef = useRef(view);

  const radius = size ? Math.max(2.1, Math.min(3.6, size.w / 300)) : 3;

  const layout = useMemo(() => {
    if (!size || !seen) return null;
    return view === "age" ? ageLayout(size) : swarm(view, size, radius);
  }, [view, size, radius, seen]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !size) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== size.w * dpr || canvas.height !== size.h * dpr) {
      canvas.width = size.w * dpr;
      canvas.height = size.h * dpr;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size.w, size.h);

    const font = getComputedStyle(document.body).fontFamily;
    const onStage = readCss(canvas, "--on-stage");
    const soft = readCss(canvas, "--on-stage-soft");
    const faint = readCss(canvas, "--on-stage-faint");
    const mark = readCss(canvas, "--mark");
    const stage = readCss(canvas, "--stage-deep");
    const a = anim.current;
    const v = viewRef.current;

    // value gridlines
    ctx.font = `500 12px ${font}`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";
    for (const tick of [1, 5, 20, 100]) {
      const y = yOf(tick, size);
      ctx.strokeStyle = faint;
      ctx.globalAlpha = 0.28;
      ctx.beginPath();
      ctx.moveTo(PAD.left, y);
      ctx.lineTo(size.w - PAD.right, y);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillStyle = soft;
      ctx.fillText(euros(tick), PAD.left - 10, y);
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    if (v === "age") {
      for (const age of [18, 22, 26, 30, 34]) {
        ctx.fillStyle = soft;
        ctx.fillText(String(age), xOfAge(age, size), size.h - PAD.bottom + 14);
      }
      ctx.fillStyle = faint;
      ctx.fillText("age", xOfAge(37, size), size.h - PAD.bottom + 14);
    } else {
      const centers = columnCenters(size);
      ctx.font = `600 14px ${font}`;
      LABELS[v].forEach((label, g) => {
        ctx.fillStyle = g === 1 ? mark : onStage;
        ctx.fillText(label, centers[g], size.h - PAD.bottom + 14);
      });
    }

    // dots
    const hi = hoverRef.current;
    for (let i = 0; i < players.length; i++) {
      const p = players[i];
      const lit = v === "passport" ? p.english : v === "homegrown" ? p.homegrown : false;
      ctx.fillStyle = lit ? mark : onStage;
      ctx.globalAlpha = lit ? 0.95 : v === "age" ? 0.78 : 0.5;
      ctx.beginPath();
      ctx.arc(a.curX[i], a.curY[i], radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    const settled = a.progress >= 1 ? 1 : Math.max(0, (a.progress - 0.55) / 0.45);

    if (v === "age" && settled > 0) {
      // draw the curve left to right as the dots land
      const stop = AGE_MIN + 1 + (AGE_MAX - AGE_MIN - 2) * easeOutExpo(settled);
      ctx.strokeStyle = mark;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      for (let age = AGE_MIN + 1; age <= stop; age += 0.25) {
        const x = xOfAge(age, size);
        const y = yOf(anchor(age), size);
        if (age === AGE_MIN + 1) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      if (stop > peakAge) {
        const px = xOfAge(peakAge, size);
        const py = yOf(anchor(peakAge), size);
        ctx.fillStyle = mark;
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = `600 13px ${font}`;
        tag(ctx, `peak ~${Math.round(peakAge)}`, px + 10, py - 8, "left", mark, stage);
      }
    }

    if (v !== "age" && settled > 0) {
      const centers = columnCenters(size);
      const half = Math.min(150, (size.w - PAD.left - PAD.right) * 0.2);
      STATS[v].forEach((m, g) => {
        const y = yOf(m, size);
        ctx.globalAlpha = settled;
        ctx.strokeStyle = g === 1 ? mark : onStage;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(centers[g] - half, y);
        ctx.lineTo(centers[g] + half, y);
        ctx.stroke();
        ctx.font = `600 13px ${font}`;
        tag(
          ctx,
          `median ${euros(m)}`,
          g === 0 ? centers[g] - half : centers[g] + half,
          y - 6,
          g === 0 ? "left" : "right",
          g === 1 ? mark : onStage,
          stage,
        );
        ctx.globalAlpha = 1;
      });
    }

    if (hi != null) {
      ctx.strokeStyle = onStage;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(a.curX[hi], a.curY[hi], radius + 4, 0, Math.PI * 2);
      ctx.stroke();
    }
  }, [size, radius]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  // Kick off a transition whenever the target layout changes.
  useEffect(() => {
    if (!layout || !size) return;
    const a = anim.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resized = !a.first && viewRef.current === view;
    viewRef.current = view;

    for (let i = 0; i < players.length; i++) {
      if (a.first) {
        a.fromX[i] = layout.x[i];
        a.fromY[i] = size.h + 20 + hash(i, 2) * 120;
        a.delay[i] = ((layout.x[i] - PAD.left) / size.w) * 650 + hash(i, 3) * 220;
      } else {
        a.fromX[i] = a.curX[i];
        a.fromY[i] = a.curY[i];
        a.delay[i] = hash(i, 4) * 260;
      }
      a.toX[i] = layout.x[i];
      a.toY[i] = layout.y[i];
    }
    a.duration = a.first ? 1300 : 950;
    a.first = false;
    a.start = performance.now();
    a.progress = 0;

    if (reduce || resized) {
      a.curX.set(a.toX);
      a.curY.set(a.toY);
      a.progress = 1;
      draw();
      return;
    }

    cancelAnimationFrame(a.raf);
    const tick = (now: number) => {
      let done = true;
      for (let i = 0; i < players.length; i++) {
        const t = Math.max(0, Math.min(1, (now - a.start - a.delay[i]) / a.duration));
        if (t < 1) done = false;
        const e = easeOutExpo(t);
        a.curX[i] = a.fromX[i] + (a.toX[i] - a.fromX[i]) * e;
        a.curY[i] = a.fromY[i] + (a.toY[i] - a.fromY[i]) * e;
      }
      a.progress = Math.min(1, (now - a.start) / (a.duration + 400));
      draw();
      if (!done || a.progress < 1) a.raf = requestAnimationFrame(tick);
    };
    a.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(a.raf);
    // size and view are already folded into layout
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout, draw]);

  useEffect(() => {
    hoverRef.current = hover && hover.view === view ? hover.i : null;
    draw();
  }, [hover, view, draw]);

  function pick(clientX: number, clientY: number) {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = clientX - rect.left;
    const my = clientY - rect.top;
    const a = anim.current;
    let best = -1;
    let bestD = 14 * 14;
    for (let i = 0; i < players.length; i++) {
      const dx = a.curX[i] - mx;
      const dy = a.curY[i] - my;
      const d = dx * dx + dy * dy;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    setHover(best === -1 ? null : { i: best, x: a.curX[best], y: a.curY[best], view: viewRef.current });
  }

  const shown = hover && hover.view === view ? hover : null;
  const hp = shown ? players[shown.i] : null;
  const tipX = shown?.x ?? 0;
  const tipY = shown?.y ?? 0;
  const flip = size ? tipX > size.w * 0.62 : false;

  return (
    <div ref={wrapRef} className="relative h-full w-full touch-pan-y">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={ariaFor(view)}
        onPointerMove={(e) => pick(e.clientX, e.clientY)}
        onPointerDown={(e) => pick(e.clientX, e.clientY)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setHover(null)}
      />
      {hp && (
        <div
          className="pointer-events-none absolute z-[var(--z-tooltip)] w-max max-w-60 rounded-xl bg-paper px-3.5 py-2.5 text-ink shadow-[0_12px_32px_-12px_oklch(0.15_0.1_266/0.6)]"
          style={{
            left: tipX,
            top: tipY,
            transform: `translate(${flip ? "calc(-100% - 14px)" : "14px"}, -50%)`,
          }}
        >
          <p className="font-display text-[15px] font-semibold leading-tight">{hp.name}</p>
          <p className="text-[13px] text-ink-soft">
            {hp.club}, {seasonLabel(hp.season)}, age {hp.age}
          </p>
          <p className="tabular mt-1 text-[13px]">
            <span className="font-semibold">{euros(hp.value)}</span>
            <span className="text-ink-soft">
              {" "}
              · {hp.goals} G · {hp.assists} A · {hp.minutes.toLocaleString("en-US")} min
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

function ariaFor(view: View) {
  if (view === "age")
    return `Scatter of ${players.length} Premier League attackers, market value against age. Value rises through the early twenties and peaks around ${Math.round(peakAge)}.`;
  const [a, b] = STATS[view];
  const [la, lb] = LABELS[view];
  return `Two columns of player market values. ${la} median ${euros(a)}, ${lb} median ${euros(b)}.`;
}
