import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Portrait } from "@/components/portrait";
import { LiveNav } from "@/components/live/nav";
import { HeroField } from "@/components/live/hero-field";
import { KineticTitle } from "@/components/live/kinetic-title";
import { WorkShowcase } from "@/components/live/work-showcase";
import { Galton } from "@/components/live/galton";
import { CommandPalette } from "@/components/live/palette";
import { EmailCopy } from "@/components/live/email-copy";
import { site } from "@/lib/site";
import { roles, education, certifications } from "@/data/experience";

export default function Home() {
  return (
    <div className="live relative flex min-h-screen flex-col">
      <LiveNav />
      <CommandPalette />

      <main id="main-content" className="flex-1">
        {/* ========================================================== HERO */}
        <HeroField>
          <div
            data-kinetic-zone
            className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl flex-col justify-center px-6 py-16"
          >
            <KineticTitle
              lines={["Software that", "understands", "data."]}
              accentLineIndex={2}
              className="live-display text-[clamp(3.2rem,9.5vw,6rem)]"
            />
            <p className="mt-7 max-w-[46ch] text-[16.5px] leading-[1.65] text-muted-foreground">
              Move around: the scatter is you, and the line is least squares,
              solved live. Everything I ship does real statistics in the
              browser.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center rounded-lg bg-foreground px-5 py-2.5 text-[14px] font-medium text-background transition-transform hover:-translate-y-px active:translate-y-0"
              >
                See the work
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

        {/* ========================================================== WORK */}
        <section id="work" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Reveal>
            <h2 className="live-display text-[clamp(2.2rem,6vw,4rem)]">
              Selected work
            </h2>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.6] text-muted-foreground">
              Four shipped apps, all public. Two lean statistics, two lean
              engineering; every one runs live behind these links.
            </p>
          </Reveal>
          <div className="mt-10">
            <WorkShowcase />
          </div>
        </section>

        {/* ======================================================== GALTON */}
        <section className="border-t border-card-border">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <Reveal>
              <h2 className="live-display text-[clamp(2.2rem,6vw,4rem)]">
                Statistics you can poke
              </h2>
              <div className="mt-6 max-w-[52ch] space-y-4 text-[15.5px] leading-[1.7] text-muted-foreground">
                <p>
                  Each ball flips a fair coin at every peg: eleven small
                  accidents that pile into a bell. The dotted outline is the
                  exact binomial expectation, and the pile keeps chasing it.
                  That&apos;s the central limit theorem, acted out by physics.
                </p>
                <p>
                  The same instinct runs the real work. ceritabel&apos;s
                  inference engine is hand-built and unit-tested against R
                  reference values, and a year as a data analyst intern at
                  Indonesia Eximbank was spent making export data hold up under
                  decisions.
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

        {/* ==================================================== EXPERIENCE */}
        <section id="experience" className="border-t border-card-border">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <Reveal>
              <h2 className="live-display text-[clamp(2.2rem,6vw,4rem)]">
                Experience
              </h2>
            </Reveal>
            <div className="mt-8 divide-y divide-card-border border-t border-card-border">
              {roles.map((role, i) => (
                <Reveal key={role.company} delay={0.04 * i}>
                  <div className="grid gap-3 py-8 md:grid-cols-[230px_1fr] md:gap-8">
                    <div>
                      <p className="mono text-[13px]">{role.period}</p>
                      <p className="mono mt-0.5 text-[12px] text-muted-foreground">
                        {role.location}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-[17px] font-semibold tracking-tight">
                        {role.title}
                        <span className="font-normal text-muted-foreground">
                          {" "}
                          at {role.company}
                        </span>
                      </h3>
                      <ul className="mt-3 max-w-[70ch] list-disc space-y-1.5 pl-5 text-[15px] leading-[1.6] text-muted-foreground marker:text-hairline">
                        {role.bullets.slice(0, 4).map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
              <Reveal>
                <div className="grid gap-3 py-8 md:grid-cols-[230px_1fr] md:gap-8">
                  <div>
                    <p className="mono text-[13px]">{education.period}</p>
                    <p className="mono mt-0.5 text-[12px] text-muted-foreground">
                      West Jakarta
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-semibold tracking-tight">
                      {education.degree}
                      <span className="font-normal text-muted-foreground">
                        {" "}
                        at {education.school}
                      </span>
                    </h3>
                    <p className="mt-3 max-w-[70ch] text-[15px] leading-[1.6] text-muted-foreground">
                      Double degree. Coursework spans{" "}
                      {education.coursework.join(", ").toLowerCase()}.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal>
              <p className="max-w-[70ch] pt-6 text-[14px] leading-[1.6] text-muted-foreground">
                Certifications: {certifications.join("; ").replaceAll(" · ", " ")}.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ========================================================= ABOUT */}
        <section id="about" className="border-t border-card-border">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:py-24 lg:grid-cols-[1fr_260px] lg:gap-16">
            <Reveal>
              <h2 className="live-display text-[clamp(2.2rem,6vw,4rem)]">
                About
              </h2>
              <div className="mt-6 max-w-[58ch] space-y-4 text-[15.5px] leading-[1.7] text-muted-foreground">
                <p>
                  I&apos;m Joseph Irawan, a final-year Computer Science &amp;
                  Statistics double degree at BINUS, based in Jakarta. The
                  degree pairing is the whole idea: computer science to build
                  the product, statistics to be honest about the data inside
                  it.
                </p>
                <p>
                  Outside the code I spent two years in HIMSTAT, the statistics
                  student association, as event MC and twice as chief committee,
                  and a year mentoring first-year students. Presenting to a
                  room is part of the job I actually enjoy.
                </p>
                <p>
                  Bahasa Indonesia natively, Javanese fluently, English at
                  professional working level.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <figure className="max-w-[260px]">
                <div className="overflow-hidden rounded-xl border border-card-border bg-muted">
                  <Portrait mode="grayscale" className="block h-auto w-full" />
                </div>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ======================================================= CONTACT */}
        <section id="contact" className="border-t border-card-border">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <Reveal>
              <h2 className="live-display text-[clamp(2.2rem,6vw,4rem)]">
                Get in touch
              </h2>
              <p className="mt-5 max-w-[52ch] text-[15.5px] leading-[1.65] text-muted-foreground">
                Open to internships, junior roles, and freelance work. Email
                gets the fastest reply.
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
                <a
                  href={site.cvUrl}
                  className="link inline-flex items-center gap-2 text-[14.5px] font-medium"
                >
                  Download CV
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-card-border">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-6 py-8 text-[13px] text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.shortName}
          </p>
          <p>
            Other cuts of this site:{" "}
            <Link href="/minimal" className="link">
              Minimal
            </Link>
            ,{" "}
            <Link href="/studio" className="link">
              Studio
            </Link>
            ,{" "}
            <Link href="/lab" className="link">
              Lab
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
