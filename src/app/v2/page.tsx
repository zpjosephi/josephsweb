import type { Metadata } from "next";
import { ArrowRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Portrait } from "@/components/portrait";
import { HeroCanvas } from "@/components/hero-canvas";
import { Footer } from "@/components/footer";
import { SpecRail } from "@/components/v2/spec-rail";
import { ProjectsManifest } from "@/components/v2/projects-manifest";
import { DataVizPanel } from "@/components/sections/dataviz";
import { site } from "@/lib/site";
import { roles, education, certifications } from "@/data/experience";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = {
  title: "Dossier / v2",
  description: site.blurb,
};

const profilePoints = [
  {
    n: "01",
    title: "The engineer",
    body: "CS background. I build production-grade web apps end to end, from UI to API to deployment.",
  },
  {
    n: "02",
    title: "The statistician",
    body: "Statistics background. I model, test, and turn raw data into insight people can act on.",
  },
  {
    n: "03",
    title: "The combination",
    body: "Most engineers are weak at modeling; most statisticians can't ship apps. I do both, and that's the edge.",
  },
];

const stats = [
  { n: "03", label: "Projects shipped" },
  { n: "1000+", label: "Companies mapped @ LPEI" },
  { n: "02", label: "Disciplines: CS × Stats" },
  { n: "380", label: "Matches analyzed in xEleven" },
];

export default function V2Page() {
  return (
    <div className="brutal relative min-h-screen">
      {/* Backdrop + analog degradation */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 datasheet-grid" />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] noise-overlay" />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] scanlines" />

      <SpecRail />

      <div className="lg:pl-[270px]">
        <main id="main-content">
          {/* ====================================================== 00 / HERO */}
          <section
            id="top"
            className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden border-b-2 border-card-border px-6 py-24 sm:px-10"
          >
            <div className="pointer-events-none absolute inset-0 glow-grid" aria-hidden />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-60 [mask-image:linear-gradient(to_right,transparent,black_55%)] md:block"
              aria-hidden
            >
              <HeroCanvas />
            </div>

            <div className="relative">
              <p className="tele mb-8 inline-flex items-center gap-2 border border-card-border px-2.5 py-1 text-[11px] text-muted-foreground">
                <span className="h-2 w-2 animate-blink bg-accent" />
                [ CS × STATISTICS ]
              </p>

              <h1
                className="display font-normal"
                style={{ fontSize: "clamp(2.5rem, 8vw, 7.5rem)" }}
              >
                Building
                <br />
                software that
                <br />
                <span className="text-accent">understands</span>
                <br />
                data<span className="text-accent">.</span>
              </h1>

              <div className="mt-10 max-w-lg">
                <span aria-hidden className="mb-4 block h-0.5 w-10 bg-accent" />
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {site.blurb}
                </p>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-px bg-card-border">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 tele text-xs font-bold text-accent-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  View Work
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={site.cvUrl}
                  className="inline-flex items-center gap-2 bg-background px-6 py-3.5 tele text-xs transition-colors hover:bg-muted"
                >
                  <Download className="h-4 w-4" />
                  CV
                </a>
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-background px-6 py-3.5 tele text-xs transition-colors hover:bg-muted"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>

            <div className="relative mt-16 flex items-center gap-3 tele text-[10px] text-muted-foreground">
              <span className="h-px w-12 bg-accent" />
              SCROLL / 06 SECTIONS
            </div>
          </section>

          {/* =================================================== 01 / PROFILE */}
          <section id="profile" className="border-b-2 border-card-border">
            <div className="grid lg:grid-cols-[300px_1fr]">
              {/* Portrait — left compartment */}
              <div className="border-b-2 border-card-border p-6 lg:border-b-0 lg:border-r-2">
                <div className="overflow-hidden border-2 border-card-border bg-[#0a0a0a]">
                  <Portrait mode="halftone" className="block h-auto w-full" />
                </div>
                <div className="mt-3 flex items-center justify-between tele text-[10px] text-muted-foreground">
                  <span>SUBJECT.001</span>
                  <span className="text-accent">CS × STAT</span>
                </div>
              </div>

              {/* Statement — right, asymmetric */}
              <div className="p-6 sm:p-10">
                <div className="tele text-[11px] text-accent">[ 01 / PROFILE ]</div>
                <p
                  className="display mt-5 font-normal"
                  style={{ fontSize: "clamp(1.7rem, 3.6vw, 3rem)" }}
                >
                  Two disciplines,
                  <br />
                  <span className="text-accent">one</span> engineer.
                </p>
                <div className="mt-6 max-w-[58ch] space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  <p>
                    I&apos;m a double-degree student in Computer Science and
                    Statistics. Instead of treating them as separate worlds, I
                    combine them: software that&apos;s built well{" "}
                    <span className="text-foreground">and</span> reasons about
                    data.
                  </p>
                  <p>
                    My engineering projects prove I can build. My statistics
                    projects prove I can analyze. Together they tell a single
                    story: data-driven products people actually use.
                  </p>
                </div>

                {/* Hanging numbered facts — not cards */}
                <dl className="mt-10 border-t-2 border-card-border">
                  {profilePoints.map((p) => (
                    <div
                      key={p.n}
                      className="grid grid-cols-[3rem_1fr] gap-x-3 border-b-2 border-card-border py-4 sm:grid-cols-[3rem_10rem_1fr]"
                    >
                      <dt className="tele text-[11px] text-accent">{p.n}</dt>
                      <dt className="tele text-[11px] text-foreground">
                        {p.title}
                      </dt>
                      <dd className="col-span-2 mt-1 text-sm leading-relaxed text-muted-foreground sm:col-span-1 sm:mt-0">
                        {p.body}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Stats — bleeding numerals strip, full width */}
            <div className="grid grid-cols-2 gap-px border-t-2 border-card-border bg-card-border sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-background px-5 py-7">
                  <div
                    className="display font-normal tabular-nums"
                    style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
                  >
                    {s.n}
                  </div>
                  <div className="mt-3 h-1.5 w-full tick-axis opacity-60" />
                  <div className="h-0.5 w-full bg-card-border" />
                  <div className="mt-3 text-sm leading-snug text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ====================================================== 02 / WORK */}
          <section id="work" className="border-b-2 border-card-border p-6 sm:p-10">
            <Reveal>
              <div className="tele text-[11px] text-accent">[ 02 / WORK ]</div>
              <h2
                className="display mt-4 font-normal"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
              >
                Selected work
              </h2>
            </Reveal>
            <div className="mt-8">
              <ProjectsManifest />
            </div>
          </section>

          {/* ==================================================== 03 / CAREER */}
          <section id="career" className="border-b-2 border-card-border p-6 sm:p-10">
            <div className="tele text-[11px] text-accent">[ 03 / CAREER ]</div>
            <h2
              className="display mt-4 font-normal"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
            >
              Career log
            </h2>

            {/* Ledger — period column | record column */}
            <div className="mt-8 border-t-2 border-card-border">
              {roles.map((role) => (
                <div
                  key={role.company}
                  className="grid border-b-2 border-card-border lg:grid-cols-[220px_1fr]"
                >
                  <div className="pt-5 lg:pb-5 lg:pr-6">
                    <div className="tele text-[11px] text-accent">
                      {role.period}
                    </div>
                    <div className="tele mt-2 text-[10px] text-muted-foreground">
                      {role.location}
                    </div>
                  </div>
                  <div className="pb-5 pt-3 lg:border-l-2 lg:border-card-border lg:pl-6 lg:pt-5">
                    <h3 className="text-lg font-semibold">
                      {role.title}
                      <span className="text-muted-foreground">
                        {" "}
                        / {role.company}
                      </span>
                    </h3>
                    <ul className="mt-3 max-w-[58ch] space-y-1.5">
                      {role.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {role.tools.map((t) => (
                        <li
                          key={t}
                          className="border border-card-border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Education + certifications */}
            <div className="mt-8 grid gap-px border-2 border-card-border bg-card-border lg:grid-cols-2">
              <div className="bg-card p-6">
                <div className="mb-3 tele text-[10px] text-accent">
                  [ EDUCATION ]
                </div>
                <h3 className="text-base font-semibold">{education.school}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {education.degree}
                </p>
                <p className="tele mt-1 text-[11px] text-accent">
                  {education.period}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {education.coursework.map((c) => (
                    <li
                      key={c}
                      className="border border-card-border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card p-6">
                <div className="mb-3 tele text-[10px] text-accent">
                  [ CERTIFICATIONS ]
                </div>
                <ul className="space-y-2.5">
                  {certifications.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="tele mt-4 text-[10px] text-muted-foreground">
                  AWS CLOUD ENGINEER TALENT ACADEMY · 2024
                </p>
              </div>
            </div>
          </section>

          {/* ===================================================== 04 / STACK */}
          <section id="stack" className="border-b-2 border-card-border p-6 sm:p-10">
            <div className="tele text-[11px] text-accent">[ 04 / STACK ]</div>
            <h2
              className="display mt-4 font-normal"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
            >
              Tech matrix
            </h2>

            {/* Matrix table — group | items */}
            <div className="mt-8 border-2 border-card-border">
              {skillGroups.map((g) => (
                <div
                  key={g.label}
                  className="grid border-b-2 border-card-border last:border-b-0 lg:grid-cols-[210px_1fr]"
                >
                  <div className="bg-muted px-4 py-4 lg:border-r-2 lg:border-card-border">
                    <span className="tele text-[11px] text-accent">
                      {g.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 px-4 py-4">
                    {g.items.map((it) => (
                      <span
                        key={it}
                        className="border border-card-border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ====================================================== 05 / LIVE */}
          <section id="live" className="border-b-2 border-card-border p-6 sm:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="tele text-[11px] text-accent">[ 05 / LIVE ]</div>
                <h2
                  className="display mt-4 font-normal"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
                >
                  Stats in your browser
                </h2>
              </div>
              <span className="tele text-[10px] text-muted-foreground">
                [ INTERACTIVE ]
              </span>
            </div>
            <div className="mt-8">
              <DataVizPanel />
            </div>
          </section>

          {/* =================================================== 06 / CONTACT */}
          <section
            id="contact"
            className="px-6 py-24 sm:px-10 sm:py-32"
          >
            <div className="tele text-[11px] text-accent">[ 06 / CONTACT ]</div>
            <h2
              className="display mt-6 font-normal"
              style={{ fontSize: "clamp(3rem, 11vw, 9.5rem)" }}
            >
              Let&apos;s
              <br />
              work<span className="text-accent">.</span>
            </h2>

            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Open to internships, freelance, and full-time roles. Fastest way to
              reach me is email — or grab my CV.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-px bg-card-border">
              <a
                href={site.socials.email}
                className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 tele text-xs font-bold text-accent-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                <Mail className="h-4 w-4" />
                Email me
              </a>
              <a
                href={site.cvUrl}
                className="inline-flex items-center gap-2 bg-background px-6 py-3.5 tele text-xs transition-colors hover:bg-muted"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-background px-6 py-3.5 tele text-xs transition-colors hover:bg-muted"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
              {site.socials.linkedin && (
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-background px-6 py-3.5 tele text-xs transition-colors hover:bg-muted"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  LinkedIn
                </a>
              )}
            </div>

            <div className="mt-10 tele text-[10px] text-muted-foreground">
              {">> "}
              {site.email}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
