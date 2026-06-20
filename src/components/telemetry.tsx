"use client";

import { useEffect, useState } from "react";
import { sectionIndex, sectionIds } from "@/data/sections";
import { useActiveSection } from "@/lib/use-active-section";

// Small instrument readout, bottom-left. Reads like a datasheet HUD.
export function Telemetry() {
  const active = useActiveSection(sectionIds);
  const [hud, setHud] = useState({ x: 0, y: 0, scroll: 0 });

  useEffect(() => {
    const state = { x: 0, y: 0, scroll: 0 };
    let dirty = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      state.x = e.clientX;
      state.y = e.clientY;
      dirty = true;
    };
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      state.scroll = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
      dirty = true;
    };
    const loop = () => {
      if (dirty) {
        setHud({ ...state });
        dirty = false;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const meta = sectionIndex.find((s) => s.id === active);
  const fig = meta ? `fig.${meta.fig} / ${meta.label.toLowerCase()}` : "fig.00 / intro";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-4 left-4 z-40 hidden select-none border-2 border-card-border bg-card/90 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-muted-foreground backdrop-blur md:block"
    >
      <div className="flex items-center gap-2 border-b border-card-border bg-muted px-3 py-1 text-accent">
        <span className="h-1.5 w-1.5 animate-blink bg-accent" />
        TELEMETRY
      </div>
      <div className="px-3 py-2">
        <Row k="scroll" v={`${hud.scroll}%`} />
        <Row k="cursor" v={`${hud.x}, ${hud.y}`} />
        <Row k="section" v={fig} />
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground/60">{k}</span>
      <span className="text-accent">{v}</span>
    </div>
  );
}
