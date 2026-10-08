"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/lib/site";

// Big mailto link plus an explicit copy button with visible confirmation.
export function EmailCopy() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = site.socials.email;
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <a
        href={site.socials.email}
        className="live-display break-all text-[clamp(1.7rem,5vw,3.4rem)] transition-colors hover:text-accent"
      >
        {site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-lg border border-hairline px-3.5 py-2 text-[13.5px] font-medium transition-colors hover:bg-card"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-accent" /> Copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" /> Copy
          </>
        )}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
