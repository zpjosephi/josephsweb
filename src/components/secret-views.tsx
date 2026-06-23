"use client";

import { useEffect, useState } from "react";

// A private visit counter only Joseph knows how to open: click the ® after the
// name in the navbar six times. The panel then shows at the very bottom of the
// page, so an accidental trigger goes unnoticed. The owner's own visits are not
// counted once the panel has been opened on this browser.
const ADMIN_KEY = "jv_admin"; // this browser is the owner; never counted
const COUNTED_KEY = "jv_counted"; // this browser already counted once

export function SecretViews() {
  const [views, setViews] = useState<number | null>(null);
  const [configured, setConfigured] = useState(true);
  const [shown, setShown] = useState(false);

  // Count this visit once per browser, unless it's the owner's browser.
  useEffect(() => {
    try {
      const isOwner = localStorage.getItem(ADMIN_KEY) === "1";
      const counted = localStorage.getItem(COUNTED_KEY) === "1";
      if (!isOwner && !counted) {
        fetch("/api/views", { method: "POST" }).catch(() => {});
        localStorage.setItem(COUNTED_KEY, "1");
      }
    } catch {
      /* localStorage blocked: skip counting */
    }
  }, []);

  // Open on the secret signal dispatched by the navbar.
  useEffect(() => {
    const onReveal = () => {
      try {
        localStorage.setItem(ADMIN_KEY, "1");
      } catch {
        /* ignore */
      }
      setShown(true);
      fetch("/api/views", { cache: "no-store" })
        .then((r) => r.json())
        .then((d: { views: number | null; configured: boolean }) => {
          setViews(typeof d.views === "number" ? d.views : null);
          setConfigured(d.configured);
        })
        .catch(() => setViews(null));
    };
    window.addEventListener("jv:reveal-views", onReveal);
    return () => window.removeEventListener("jv:reveal-views", onReveal);
  }, []);

  // Esc hides it again.
  useEffect(() => {
    if (!shown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShown(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shown]);

  if (!shown) return null;

  return (
    <aside className="border-t-2 border-card-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-3">
        <p className="tele text-[10px] text-muted-foreground">
          <span className="mr-1.5 inline-block h-2 w-2 animate-blink bg-accent align-middle" />
          TOTAL VIEWS ·{" "}
          <span className="font-bold text-foreground">
            {!configured
              ? "— store not connected"
              : views === null
                ? "—"
                : views.toLocaleString()}
          </span>{" "}
          · visitors, you not counted
        </p>
        <button
          type="button"
          onClick={() => setShown(false)}
          className="tele text-[10px] text-muted-foreground transition-colors hover:text-accent"
        >
          [ esc to hide ]
        </button>
      </div>
    </aside>
  );
}
