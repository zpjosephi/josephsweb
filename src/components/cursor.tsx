"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Click anywhere to cycle cursor styles: dot → crosshair → ring → native.
// Native cursor stays visible throughout. Desktop / fine-pointer only.
const MODES = ["dot", "crosshair", "ring", "native"] as const;

export function Cursor() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const modeRef = useRef(0);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const dotRef = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLDivElement>(null);
  const hRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The /editorial demo ships its own cursor; /v3 stays minimalist (native).
    if (pathname?.startsWith("/editorial") || pathname?.startsWith("/v3")) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    // Reduced-motion: skip the custom cursor, keep the native one.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Defer enabling out of the effect body (lint-clean setState).
    const enableRaf = requestAnimationFrame(() => setEnabled(true));

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let hovering = false;
    let raf = 0;
    let hintTimer: ReturnType<typeof setTimeout>;

    const showHint = (text: string) => {
      setHint(text);
      clearTimeout(hintTimer);
      hintTimer = setTimeout(() => setHint(null), 1600);
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const t = e.target as HTMLElement | null;
      hovering = !!t?.closest("a, button, input, [data-cursor]");
    };
    const onClick = (e: MouseEvent) => {
      // Don't cycle when clicking links, buttons, inputs, or skill nodes -
      // only clicks on empty background change the cursor.
      const t = e.target as HTMLElement | null;
      if (
        t?.closest(
          "a, button, input, textarea, select, label, [role='button'], [data-cursor]"
        )
      )
        return;
      setMode((m) => {
        const next = (m + 1) % MODES.length;
        showHint(`cursor: ${MODES[next]}`);
        return next;
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    const accent = "var(--accent)";
    const faint = "color-mix(in oklab, var(--foreground) 18%, transparent)";

    const loop = () => {
      rx += (tx - rx) * 0.25;
      ry += (ty - ry) * 0.25;
      const m = modeRef.current;

      if (dotRef.current) {
        const on = m === 0;
        dotRef.current.style.opacity = on ? "1" : "0";
        if (on)
          dotRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${
            hovering ? 1.9 : 1
          })`;
      }

      const cx = m === 1;
      if (vRef.current) {
        vRef.current.style.opacity = cx ? "1" : "0";
        vRef.current.style.transform = `translateX(${tx}px)`;
        vRef.current.style.background = hovering ? accent : faint;
      }
      if (hRef.current) {
        hRef.current.style.opacity = cx ? "1" : "0";
        hRef.current.style.transform = `translateY(${ty}px)`;
        hRef.current.style.background = hovering ? accent : faint;
      }
      if (tagRef.current) {
        tagRef.current.style.opacity = cx ? "1" : "0";
        tagRef.current.style.transform = `translate(${tx + 12}px, ${ty + 14}px)`;
        tagRef.current.textContent = `${tx}, ${ty}`;
      }

      if (ringRef.current) {
        const on = m === 2;
        ringRef.current.style.opacity = on ? "1" : "0";
        if (on)
          ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${
            hovering ? 1.8 : 1
          })`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    showHint("click anywhere to change cursor");

    return () => {
      cancelAnimationFrame(enableRaf);
      cancelAnimationFrame(raf);
      clearTimeout(hintTimer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, [pathname]);

  if (!enabled || pathname?.startsWith("/editorial") || pathname?.startsWith("/v3"))
    return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      {/* dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2.5 w-2.5 rounded-full bg-accent opacity-0 transition-transform duration-200"
        style={{ willChange: "transform" }}
      />
      {/* crosshair */}
      <div
        ref={vRef}
        className="absolute inset-y-0 left-0 w-px opacity-0"
        style={{ willChange: "transform" }}
      />
      <div
        ref={hRef}
        className="absolute inset-x-0 top-0 h-px opacity-0"
        style={{ willChange: "transform" }}
      />
      <div
        ref={tagRef}
        className="absolute left-0 top-0 font-mono text-[10px] tracking-wider text-accent opacity-0"
        style={{ willChange: "transform" }}
      />
      {/* ring */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-7 w-7 rounded-full border border-accent opacity-0"
        style={{ willChange: "transform" }}
      />
      {/* hint */}
      {hint && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-card-border bg-card/90 px-3 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur">
          {hint}
        </div>
      )}
    </div>
  );
}
