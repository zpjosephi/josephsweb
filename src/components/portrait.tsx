"use client";

import { useEffect, useRef } from "react";

// Renders the photo with the red ID background removed (border flood-fill so
// skin is never touched), in one of several styles. Used in the About section.
export type PortraitMode =
  | "natural"
  | "grayscale"
  | "duotone"
  | "mono"
  | "halftone";

const ACCENT = "255,45,45";

function lum(r: number, g: number, b: number) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function Portrait({
  src = "/joseph.png",
  mode = "halftone",
  className,
}: {
  src?: string;
  mode?: PortraitMode;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      const W = 440;
      const H = Math.round((img.naturalHeight / img.naturalWidth) * W);
      canvas.width = W;
      canvas.height = H;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(img, 0, 0, W, H);

      const id = ctx.getImageData(0, 0, W, H);
      const d = id.data;
      const SHADOW = [40, 36, 78];
      const HIGH = [210, 203, 255];

      const isRedBg = (p: number) => {
        const i = p * 4;
        return (
          d[i] > 115 &&
          d[i + 1] < 95 &&
          d[i + 2] < 95 &&
          d[i] - Math.max(d[i + 1], d[i + 2]) > 70
        );
      };

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
          const v = lum(r, g, b) > 120 ? HIGH : SHADOW;
          d[i] = v[0];
          d[i + 1] = v[1];
          d[i + 2] = v[2];
        } else {
          d[i] = r;
        }
      }
      ctx.putImageData(id, 0, 0);
    };
  }, [src, mode]);

  return <canvas ref={ref} className={className} aria-label="Portrait of Joseph Irawan" />;
}
