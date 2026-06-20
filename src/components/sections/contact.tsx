"use client";

import { useState } from "react";
import { Check, Copy, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { site } from "@/lib/site";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = site.socials.email;
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="fig.06 / contact"
      annotation="open to work"
      title="Let's work together"
    >
      <Reveal>
        <div className="border-2 border-card-border bg-card">
          <div className="flex items-center justify-between border-b-2 border-card-border bg-muted px-5 py-2 tele text-[10px] text-muted-foreground">
            <span className="text-accent">{">> "}OPEN CHANNEL</span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-blink" style={{ background: "var(--ok)" }} />
              STATUS / AVAILABLE
            </span>
          </div>

          <div className="p-8 sm:p-10">
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Looking for a developer who speaks both software and data? I&apos;m
              open to internships, freelance, and full-time roles. The fastest way
              to reach me is email, or grab my CV below.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-px bg-card-border">
              <a
                href={site.socials.email}
                className="inline-flex items-center gap-2 bg-accent px-5 py-3 tele text-xs font-bold text-accent-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                <Mail className="h-4 w-4" />
                Email me
              </a>
              <a
                href={site.cvUrl}
                className="inline-flex items-center gap-2 bg-background px-5 py-3 tele text-xs transition-colors hover:bg-muted"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 bg-background px-5 py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-accent" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "COPIED!" : site.email}
              </button>
            </div>

            <div className="mt-8 flex items-center gap-px border-t-2 border-card-border bg-card-border pt-px">
              <span className="bg-card py-3 pr-3 tele text-[10px] text-muted-foreground">
                FIND ME ON
              </span>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center border-2 border-card-border bg-background transition-colors hover:border-accent hover:text-accent"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              {site.socials.linkedin && (
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center border-2 border-card-border bg-background transition-colors hover:border-accent hover:text-accent"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
