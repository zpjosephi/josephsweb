import { ArrowRight, Download } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { HeroCanvas } from "@/components/hero-canvas";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-card-border">
      <div className="pointer-events-none absolute inset-0 glow-grid" aria-hidden />
      {/* Live regression scatter, faded in from the right so text stays clean */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-2/3 opacity-70 [mask-image:linear-gradient(to_right,transparent,black_45%)] md:block"
        aria-hidden
      >
        <HeroCanvas />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-24 sm:pt-28">
        {/* Masthead - manifest / issue line */}
        <div className="mb-10 flex items-center justify-between gap-3 border-y-2 border-card-border py-2 tele text-[10px] text-muted-foreground">
          <span className="text-foreground">JOSEPH IRAWAN</span>
          <span className="hidden sm:inline">PORTFOLIO / VOL.2026</span>
          <span className="text-accent">JAKARTA, ID · 06°S</span>
        </div>

        <Reveal>
          <p className="mb-6 inline-flex items-center gap-2 border border-card-border px-2.5 py-1 tele text-[11px] text-muted-foreground">
            <span className="h-2 w-2 animate-blink bg-accent" />
            [ CS × STATISTICS ]
          </p>
        </Reveal>

        {/* Macro type - viewport-bleeding, uppercase, compressed leading */}
        <Reveal delay={0.05}>
          <h1
            className="display max-w-5xl font-normal"
            style={{ fontSize: "clamp(2.75rem, 9vw, 8.5rem)" }}
          >
            Building software
            <br />
            that <span className="text-accent">understands</span>
            <br />
            data<span className="text-accent">.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 max-w-xl">
            <span aria-hidden className="mb-4 block h-0.5 w-10 bg-accent" />
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {site.blurb}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-px border border-card-border bg-card-border">
            <Magnetic className="inline-block">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 tele text-xs font-bold text-accent-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic className="inline-block">
              <a
                href={site.cvUrl}
                download="Joseph Irawan - CV.pdf"
                className="inline-flex items-center gap-2 bg-background px-6 py-3.5 tele text-xs text-foreground transition-colors hover:bg-muted"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </Magnetic>
            <Magnetic className="inline-block">
              <a
                href={site.socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-background px-6 py-3.5 tele text-xs text-foreground transition-colors hover:bg-muted"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
            </Magnetic>
          </div>
        </Reveal>

        {/* Spec-sheet manifest - razor-thin grid dividers via gap:1px */}
        <Reveal delay={0.2}>
          <dl className="mt-20 grid grid-cols-2 gap-px border border-card-border bg-card-border sm:grid-cols-4">
            {[
              { k: "Base", v: "Indonesia" },
              { k: "Focus", v: "Data · Software" },
              { k: "Stack", v: "Next.js · Python" },
              { k: "Index", v: "Portfolio 2026" },
            ].map((s) => (
              <div key={s.k} className="bg-background px-4 py-4">
                <dt className="tele text-[10px] text-muted-foreground">
                  {s.k}
                </dt>
                <dd className="mt-1.5 text-sm font-semibold">{s.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* hazard stripe seam at the section base */}
      <div aria-hidden className="hazard-stripe h-1.5 w-full opacity-80" />
    </section>
  );
}
