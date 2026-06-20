"use client";

/**
 * STANDALONE DEMO - photo treatments, all with the red background removed.
 * Lives under /photo. Just for previewing; delete the folder anytime.
 */

import Link from "next/link";
import { useEffect, useRef } from "react";

const SRC = "/joseph.png";
const ACCENT = "139,123,255";

type Mode = "natural" | "grayscale" | "duotone" | "mono" | "halftone";

function lum(r: number, g: number, b: number) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function Portrait({ mode }: { mode: Mode }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.src = SRC;
    img.onload = () => {
      const W = 420;
      const H = Math.round((img.naturalHeight / img.naturalWidth) * W);
      canvas.width = W;
      canvas.height = H;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(img, 0, 0, W, H);

      const id = ctx.getImageData(0, 0, W, H);
      const d = id.data;
      const SHADOW = [40, 36, 78];
      const HIGH = [210, 203, 255];

      // Only the saturated red backdrop (low green & blue). Skin is safe.
      const isRedBg = (p: number) => {
        const i = p * 4;
        return (
          d[i] > 115 &&
          d[i + 1] < 95 &&
          d[i + 2] < 95 &&
          d[i] - Math.max(d[i + 1], d[i + 2]) > 70
        );
      };

      // Flood-fill from the borders so only edge-connected red is removed.
      const visited = new Uint8Array(W * H);
      const stack: number[] = [];
      const seed = (p: number) => {
        if (!visited[p] && isRedBg(p)) {
          visited[p] = 1;
          stack.push(p);
        }
      };
      for (let x = 0; x < W; x++) {
        seed(x);
        seed((H - 1) * W + x);
      }
      for (let y = 0; y < H; y++) {
        seed(y * W);
        seed(y * W + (W - 1));
      }
      while (stack.length) {
        const p = stack.pop()!;
        d[p * 4 + 3] = 0;
        const x = p % W;
        const y = (p / W) | 0;
        if (x > 0) seed(p - 1);
        if (x < W - 1) seed(p + 1);
        if (y > 0) seed(p - W);
        if (y < H - 1) seed(p + W);
      }

      // Halftone redraws as dots over the subject only.
      if (mode === "halftone") {
        ctx.clearRect(0, 0, W, H);
        const cell = 5;
        for (let y = 0; y < H; y += cell) {
          for (let x = 0; x < W; x += cell) {
            const i = (y * W + x) * 4;
            if (d[i + 3] < 128) continue;
            const l = lum(d[i], d[i + 1], d[i + 2]) / 255;
            const radius = (1 - l) * cell * 0.78;
            if (radius > 0.35) {
              ctx.beginPath();
              ctx.arc(x + cell / 2, y + cell / 2, radius, 0, Math.PI * 2);
              ctx.fillStyle = `rgb(${ACCENT})`;
              ctx.fill();
            }
          }
        }
        return;
      }

      for (let p = 0; p < W * H; p++) {
        const i = p * 4;
        if (d[i + 3] === 0) continue;
        let r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];

        // soften red fringe on cut edges
        const edge =
          (p % W > 0 && d[(p - 1) * 4 + 3] === 0) ||
          (p % W < W - 1 && d[(p + 1) * 4 + 3] === 0) ||
          (p >= W && d[(p - W) * 4 + 3] === 0) ||
          (p < W * (H - 1) && d[(p + W) * 4 + 3] === 0);
        if (edge && r - Math.max(g, b) > 18) r = Math.min(r, Math.max(g, b) + 6);

        if (mode === "grayscale") {
          d[i] = d[i + 1] = d[i + 2] = lum(r, g, b);
        } else if (mode === "duotone") {
          let l = lum(r, g, b) / 255;
          l = Math.min(1, Math.max(0, (l - 0.5) * 1.2 + 0.5));
          d[i] = SHADOW[0] + (HIGH[0] - SHADOW[0]) * l;
          d[i + 1] = SHADOW[1] + (HIGH[1] - SHADOW[1]) * l;
          d[i + 2] = SHADOW[2] + (HIGH[2] - SHADOW[2]) * l;
        } else if (mode === "mono") {
          const on = lum(r, g, b) > 120;
          const v = on ? HIGH : SHADOW;
          d[i] = v[0];
          d[i + 1] = v[1];
          d[i + 2] = v[2];
        } else {
          d[i] = r;
          d[i + 1] = g;
          d[i + 2] = b;
        }
      }
      ctx.putImageData(id, 0, 0);
    };
  }, [mode]);

  return <canvas ref={ref} className="block h-auto w-full" />;
}

function Frame({
  id,
  label,
  bg,
  children,
}: {
  id: string;
  label: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="w-full">
      <div className="relative">
        <div className="h-1.5 w-full tick-axis opacity-70" />
        <div className="h-px w-full bg-card-border" />
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>{id}</span>
        <span className="text-accent">{label}</span>
      </div>
      <div
        className="mt-3 overflow-hidden rounded-lg border border-card-border"
        style={{ background: bg }}
      >
        {children}
      </div>
    </figure>
  );
}

const DARK = "#0a0a0f";
const CARD = "#ece9f5";

export default function PhotoDemo() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          photo / 7 treatments
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          One photo, every look
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Red background removed on all of them. Now compare the styles without
          the backdrop getting in the way. Tell me a number to use.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          <Frame id="subject.001" label="original" bg={DARK}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SRC} alt="original" className="block h-auto w-full" />
          </Frame>
          <Frame id="subject.002" label="natural · dark" bg={DARK}>
            <Portrait mode="natural" />
          </Frame>
          <Frame id="subject.003" label="natural · card" bg={CARD}>
            <Portrait mode="natural" />
          </Frame>
          <Frame id="subject.004" label="b&w" bg={DARK}>
            <Portrait mode="grayscale" />
          </Frame>
          <Frame id="subject.005" label="duotone" bg={DARK}>
            <Portrait mode="duotone" />
          </Frame>
          <Frame id="subject.006" label="halftone" bg={DARK}>
            <Portrait mode="halftone" />
          </Frame>
          <Frame id="subject.007" label="mono" bg={DARK}>
            <Portrait mode="mono" />
          </Frame>
        </div>

        <p className="mt-8 max-w-xl text-sm text-muted-foreground">
          Note: automatic color-key removal, so hair edges can be slightly rough.
          For a perfectly crisp cut, remove.bg or Photoshop gives a cleaner PNG
          you can drop in.
        </p>

        <div className="mt-10 font-mono text-xs">
          <Link href="/" className="text-muted-foreground underline">
            ← back to main site
          </Link>
        </div>
      </div>
    </div>
  );
}
