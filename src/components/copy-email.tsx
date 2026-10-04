"use client";

import { useRef, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      // clipboard blocked (http, old browser): fall back to the mail client
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 lg:justify-end">
      <button
        type="button"
        onClick={copy}
        className="rounded-full bg-mark px-6 py-3.5 text-[17px] font-semibold text-mark-ink transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 active:translate-y-0"
      >
        {copied ? "Copied to clipboard" : email}
      </button>
      <a
        href={`mailto:${email}`}
        className="rounded-full border border-on-stage-faint/60 px-5 py-3.5 text-[16px] font-medium transition-colors hover:border-on-stage"
      >
        Open mail app
      </a>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </div>
  );
}
