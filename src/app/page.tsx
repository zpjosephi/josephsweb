import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { EmailCopy } from "@/components/live/email-copy";
import { Galton } from "@/components/live/galton";
import { HeroField } from "@/components/live/hero-field";
import { KineticTitle } from "@/components/live/kinetic-title";
import { CommandPalette } from "@/components/live/palette";
import { ToolkitMatrix } from "@/components/live/toolkit-matrix";
import { WorkShowcase, footballWork, otherWork } from "@/components/live/work-showcase";
import { Research } from "@/components/research";
import { Reveal } from "@/components/reveal";
import { ThesisExplorer } from "@/components/thesis-explorer";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <div className="live relative flex min-h-screen flex-col">
      <CommandPalette />

      <main id="main-content" className="flex-1">
        <HeroField>
          {/* no navbar: the name sits in the hero like a plate on the instrument */}
          <p className="shell absolute inset-x-0 top-0 flex h-20 items-center text-[15px] font-medium">
            Joseph Irawan
          </p>
          <div
            data-kinetic-zone
            className="shell flex min-h-dvh flex-col justify-end pb-[clamp(2.5rem,9vh,6rem)] pt-28"
          >
            <KineticTitle
              lines={["Software that", "understands", "data."]}
              accentLineIndex={2}
              className="live-display text-[clamp(2.1rem,10vw,3rem)] sm:text-[clamp(2.5rem,5.5vw,4rem)]"
            />
            <p className="mt-6 max-w-[50ch] text-[16.5px] leading-[1.65] text-muted-foreground">
              I&apos;m Joseph, a data analyst in Jakarta who read football through Transfermarkt
              long before it became thesis data. Move around: the scatter is you, and the line is
              least squares, solved live.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#thesis"
                className="inline-flex items-center rounded-lg bg-foreground px-5 py-2.5 text-[14px] font-medium text-background transition-transform hover:-translate-y-px active:translate-y-0"
              >
                See the football work
              </a>
              <a
                href={site.cvUrl}
                className="inline-flex items-center gap-1.5 rounded-lg border border-hairline px-5 py-2.5 text-[14px] font-medium transition-colors hover:bg-card"
              >
                Download CV
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </HeroField>

        <ThesisExplorer />

        <section id="work" className="shell py-[clamp(4rem,8vw,7rem)]">
          <Reveal>
            <h2 className="live-display text-[clamp(1.8rem,4.5vw,3rem)]">Football, in code</h2>
            <p className="mt-4 max-w-[56ch] text-[15px] leading-[1.6] text-muted-foreground">
              Where the thesis went next. Both live, both built on real Premier League data.
            </p>
          </Reveal>
          <div className="mt-10">
            <WorkShowcase entries={footballWork} />
          </div>
        </section>

        <section className="border-t border-card-border">
          <div className="shell grid gap-12 py-[clamp(4rem,8vw,7rem)] lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
            <Reveal>
              <h2 className="live-display text-[clamp(1.8rem,4.5vw,3rem)]">
                Statistics you can poke
              </h2>
              <div className="mt-6 max-w-[52ch] space-y-4 text-[15.5px] leading-[1.7] text-muted-foreground">
                <p>
                  Each ball flips a fair coin at every peg: eleven small accidents that pile into a
                  bell. The dotted outline is the exact binomial expectation, and the pile keeps
                  chasing it. That&apos;s the central limit theorem, acted out by physics.
                </p>
                <p>
                  The same instinct runs the real work: checking that a model can actually answer
                  the question before trusting its numbers, which is how my own thesis got
                  re-examined.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-xl border border-card-border bg-card p-5 sm:p-7">
                <Galton />
              </div>
            </Reveal>
          </div>
        </section>

        <div className="border-t border-card-border">
          <Experience id="experience" />
        </div>

        <Research />

        <section className="border-t border-card-border">
          <div className="shell py-[clamp(4rem,8vw,7rem)]">
            <Reveal>
              <h2 className="live-display text-[clamp(1.8rem,4.5vw,3rem)]">More things I built</h2>
              <p className="mt-4 max-w-[56ch] text-[15px] leading-[1.6] text-muted-foreground">
                Built with AI-assisted development: I decide what they do, design them, wire up
                the data and APIs, and ship them.
              </p>
            </Reveal>
            <div className="mt-10">
              <WorkShowcase entries={otherWork} />
            </div>
          </div>
        </section>

        <section id="toolkit" className="border-t border-card-border">
          <div className="shell py-[clamp(4rem,8vw,7rem)]">
            <Reveal>
              <h2 className="live-display text-[clamp(1.8rem,4.5vw,3rem)]">Toolkit</h2>
              <p className="mt-4 max-w-[56ch] text-[15px] leading-[1.6] text-muted-foreground">
                Grouped by what it does. Hover a tool to trace the ones it actually worked
                alongside.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mt-10">
                <ToolkitMatrix />
              </div>
            </Reveal>
          </div>
        </section>

        <div className="border-t border-card-border">
          <About />
        </div>

        <section id="contact" className="border-t border-card-border">
          <div className="shell py-[clamp(4rem,8vw,7rem)]">
            <Reveal>
              <h2 className="live-display text-[clamp(1.8rem,4.5vw,3rem)]">Get in touch</h2>
              <p className="mt-5 max-w-[52ch] text-[15.5px] leading-[1.65] text-muted-foreground">
                Open to analyst roles and football data projects, in Jakarta, remote, or
                relocating. Email gets the fastest reply.
              </p>
              <div className="mt-8">
                <EmailCopy />
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="link inline-flex items-center gap-2 text-[14.5px] font-medium"
                >
                  <GithubIcon className="h-4 w-4" /> GitHub
                </a>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="link inline-flex items-center gap-2 text-[14.5px] font-medium"
                >
                  <LinkedinIcon className="h-4 w-4" /> LinkedIn
                </a>
                <a href={site.cvUrl} className="link inline-flex items-center gap-2 text-[14.5px] font-medium">
                  Download CV
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-card-border">
        <div className="shell flex flex-col justify-between gap-2 py-8 text-[13px] text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.shortName}
          </p>
          <p>
            Recruiting? There&apos;s a{" "}
            <Link href="/analyst" className="link">
              one-page version
            </Link>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
