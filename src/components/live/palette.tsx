"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/lib/site";

// Hand-rolled command palette: Ctrl/Cmd+K (or the nav button) opens a modal
// with type-to-filter and full keyboard navigation. No dependency; the whole
// thing is a focus-trapped dialog with a listbox.

export function openPalette() {
  window.dispatchEvent(new CustomEvent("live:palette"));
}

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  keywords?: string;
  run: (ctx: { push: (href: string) => void; close: () => void }) => void;
};

const go = (hash: string) => (ctx: { close: () => void }) => {
  ctx.close();
  document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
};
const external = (url: string) => (ctx: { close: () => void }) => {
  ctx.close();
  window.open(url, "_blank", "noopener,noreferrer");
};
const internal =
  (href: string) => (ctx: { push: (href: string) => void; close: () => void }) => {
    ctx.close();
    ctx.push(href);
  };

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
    setCopied(false);
    restoreRef.current?.focus?.();
  }, []);

  const items = useMemo<Item[]>(
    () => [
      { id: "work", group: "Go to", label: "Work", run: (c) => go("work")(c) },
      { id: "experience", group: "Go to", label: "Experience", run: (c) => go("experience")(c) },
      { id: "about", group: "Go to", label: "About", run: (c) => go("about")(c) },
      { id: "contact", group: "Go to", label: "Contact", run: (c) => go("contact")(c) },
      {
        id: "copy-email",
        group: "Actions",
        label: copied ? "Copied!" : "Copy email address",
        hint: site.email,
        keywords: "mail contact",
        run: async (c) => {
          try {
            await navigator.clipboard.writeText(site.email);
            setCopied(true);
            setTimeout(() => c.close(), 650);
          } catch {
            c.close();
            window.location.href = site.socials.email;
          }
        },
      },
      {
        id: "cv",
        group: "Actions",
        label: "Download CV",
        keywords: "resume pdf",
        run: (c) => {
          c.close();
          window.open(site.cvUrl, "_blank", "noopener,noreferrer");
        },
      },
      { id: "github", group: "Actions", label: "Open GitHub", run: (c) => external(site.socials.github)(c) },
      { id: "linkedin", group: "Actions", label: "Open LinkedIn", run: (c) => external(site.socials.linkedin)(c) },
      { id: "ceritabel", group: "Projects", label: "ceritabel", hint: "live app", keywords: "statistics regression", run: (c) => external("https://ceritabel.vercel.app/analyze?sample=siswa")(c) },
      { id: "xeleven", group: "Projects", label: "xEleven", hint: "live app", keywords: "football premier league", run: (c) => external("https://epl-xeleven.vercel.app/")(c) },
      { id: "xeleven-case", group: "Projects", label: "xEleven case study", run: (c) => internal("/work/xeleven")(c) },
      { id: "bakery", group: "Projects", label: "Bakery Kita", hint: "live app", keywords: "ecommerce qris", run: (c) => external("https://bakery-kita.vercel.app/")(c) },
      { id: "bakery-case", group: "Projects", label: "Bakery Kita case study", run: (c) => internal("/work/bakery-kita")(c) },
      { id: "afterhours", group: "Projects", label: "After hours", hint: "live app", keywords: "3d three webgl", run: (c) => external("https://afterhours-3d.vercel.app/")(c) },
      { id: "minimal", group: "Other cuts", label: "Minimal cut", hint: "/minimal", run: (c) => internal("/minimal")(c) },
      { id: "studio", group: "Other cuts", label: "Studio cut", hint: "/studio", run: (c) => internal("/studio")(c) },
      { id: "lab", group: "Other cuts", label: "Lab cut", hint: "/lab", run: (c) => internal("/lab")(c) },
    ],
    [copied]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      `${it.label} ${it.group} ${it.hint ?? ""} ${it.keywords ?? ""}`
        .toLowerCase()
        .includes(q)
    );
  }, [items, query]);

  // open triggers: hotkey + custom event from the nav button
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) restoreRef.current = document.activeElement as HTMLElement;
          return !o;
        });
      }
    };
    const onOpen = () => {
      restoreRef.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("live:palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("live:palette", onOpen);
    };
  }, []);

  // focus + scroll lock while open
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // clamp during render instead of a corrective effect
  const activeIndex = Math.max(0, Math.min(index, filtered.length - 1));

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-i="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!open) return null;

  const ctx = { push: (href: string) => router.push(href), close };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex(Math.min(activeIndex + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex(Math.max(activeIndex - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[activeIndex]?.run(ctx);
    } else if (e.key === "Tab") {
      // single-field dialog: keep focus on the input
      e.preventDefault();
    }
  };

  let lastGroup = "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[oklch(0.08_0.01_145/0.7)] px-4 pt-[14vh]"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-xl border border-card-border bg-card shadow-[0_30px_80px_oklch(0.04_0.01_145/0.6)]"
      >
        <div className="flex items-center gap-3 border-b border-card-border px-4">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Type a command or search"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={
              filtered[activeIndex]
                ? `palette-${filtered[activeIndex].id}`
                : undefined
            }
            className="h-12 w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
          />
          <kbd className="mono shrink-0 rounded border border-card-border px-1.5 py-0.5 text-[10.5px] text-muted-foreground">
            esc
          </kbd>
        </div>
        <ul
          ref={listRef}
          id="palette-list"
          role="listbox"
          aria-label="Commands"
          className="max-h-[46vh] overflow-y-auto p-2"
        >
          {filtered.length === 0 && (
            <li className="px-3 py-6 text-center text-[14px] text-muted-foreground">
              Nothing matches &quot;{query}&quot;
            </li>
          )}
          {filtered.map((it, i) => {
            const header = it.group !== lastGroup ? it.group : null;
            lastGroup = it.group;
            return (
              <li key={it.id}>
                {header && (
                  <div className="px-3 pb-1 pt-3 text-[11.5px] font-medium text-muted-foreground">
                    {header}
                  </div>
                )}
                <button
                  type="button"
                  id={`palette-${it.id}`}
                  data-i={i}
                  role="option"
                  aria-selected={i === activeIndex}
                  onPointerEnter={() => setIndex(i)}
                  onClick={() => it.run(ctx)}
                  className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-[14px] ${
                    i === activeIndex
                      ? "bg-muted text-foreground"
                      : "text-foreground/80"
                  }`}
                >
                  <span>{it.label}</span>
                  {it.hint && (
                    <span className="mono truncate text-[11.5px] text-muted-foreground">
                      {it.hint}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
