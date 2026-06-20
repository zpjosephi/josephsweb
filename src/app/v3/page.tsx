import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Portrait } from "@/components/portrait";
import { ProjectsListV3 } from "@/components/v3/projects-list";
import { DataVizPanel } from "@/components/sections/dataviz";
import { site } from "@/lib/site";
import { roles, education, certifications } from "@/data/experience";
import { skillGroups } from "@/data/skills";

// Editorial serif for hero headings & quotes (scoped via --font-serif).
const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Editorial / v3",
  description: site.blurb,
};

const facts = [
  {
    tag: "Engineering",
    title: "I build",
    body: "Production-grade web apps end to end — from UI to API to deployment. CS background.",
    bg: "#e1f3fe",
    fg: "#1f6c9f",
  },
  {
    tag: "Statistics",
    title: "I analyze",
    body: "Modeling, testing, and turning raw data into insight people can act on. Statistics background.",
    bg: "#edf3ec",
    fg: "#346538",
  },
  {
    tag: "The edge",
    title: "I do both",
    body: "Most engineers are weak at modeling; most statisticians can't ship apps. The combination is the edge.",
    bg: "#fbf3db",
    fg: "#956400",
  },
];

const stats = [
  { n: "03", label: "projects shipped" },
  { n: "1,000+", label: "companies mapped at LPEI" },
  { n: "02", label: "disciplines, one engineer" },
  { n: "380", label: "matches analyzed in xEleven" },
];

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function V3Page() {
  return (
    <div className={`${newsreader.variable} v3 min-h-screen`}>
      {/* Minimal top nav */}
      <header className="sticky top-0 z-50 border-b border-card-border bg-[var(--background)]/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#main-content" className="text-sm font-medium tracking-tight">
            Joseph Irawan
            <span className="ml-2 font-mono text-[11px] text-muted-foreground">
              CS × Stats
            </span>
          </a>
          <div className="flex items-center gap-6">
            <ul className="hidden items-center gap-6 sm:flex">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={site.cvUrl}
              className="rounded-md bg-foreground px-3.5 py-1.5 text-[13px] font-medium text-background transition-opacity hover:opacity-85"
            >
              CV
            </a>
          </div>
        </nav>
      </header>

      <main id="main-content">
        {/* ============================================================ HERO */}
        <section className="relative overflow-hidden">
          <div className="v3-ambient pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-24 sm:pt-32">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Computer Science × Statistics
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1
                className="editorial mt-6 max-w-4xl font-normal"
                style={{ fontSize: "clamp(2.5rem, 6.4vw, 5.25rem)" }}
              >
                Building software that{" "}
                <span className="italic text-accent">understands</span> data.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-[17px] leading-[1.7] text-muted-foreground">
                {site.blurb}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
                >
                  View work <span aria-hidden>↓</span>
                </a>
                <a
                  href={site.cvUrl}
                  className="inline-flex items-center gap-2 rounded-md border border-card-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Download CV
                </a>
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-card-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <GithubIcon className="h-4 w-4" /> GitHub
                </a>
              </div>
            </Reveal>
          </div>

          {/* Understated stat line */}
          <div className="border-y border-card-border">
            <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-6 px-6 py-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-2xl font-medium tracking-tight tabular-nums">
                    {s.n}
                  </dt>
                  <dd className="mt-1 text-[13px] leading-snug text-muted-foreground">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* =========================================================== ABOUT */}
        <section id="about" className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <div className="grid gap-12 md:grid-cols-[1fr_280px] md:items-start">
            <Reveal>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  About
                </p>
                <h2
                  className="editorial mt-6 font-normal"
                  style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.75rem)" }}
                >
                  Two disciplines, treated as one. Software that&apos;s built
                  well <span className="italic text-accent">and</span> reasons
                  about data.
                </h2>
                <div className="mt-7 max-w-xl space-y-4 text-[16px] leading-[1.75] text-muted-foreground">
                  <p>
                    I&apos;m a double-degree student in Computer Science and
                    Statistics. My engineering projects prove I can build; my
                    statistics projects prove I can analyze. Together they tell a
                    single story: data-driven products people actually use.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <figure className="md:pt-2">
                <div className="overflow-hidden rounded-xl border border-card-border bg-muted">
                  <Portrait mode="grayscale" className="block h-auto w-full" />
                </div>
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                  Joseph Irawan — Jakarta, ID
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* Bento facts */}
          <div className="mt-16 grid gap-5 sm:grid-cols-3">
            {facts.map((f, i) => (
              <Reveal key={f.title} delay={0.05 * i}>
                <div className="h-full rounded-xl border border-card-border bg-card p-7">
                  <span
                    className="inline-block px-2.5 py-1 text-[11px] uppercase tracking-[0.08em]"
                    style={{ background: f.bg, color: f.fg, borderRadius: 9999 }}
                  >
                    {f.tag}
                  </span>
                  <h3 className="editorial mt-5 text-2xl font-normal">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.7] text-muted-foreground">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============================================================ WORK */}
        <section
          id="work"
          className="border-t border-card-border bg-[var(--card)]"
        >
          <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Selected work
              </p>
              <h2
                className="editorial mt-5 font-normal"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3.25rem)" }}
              >
                Things I&apos;ve shipped.
              </h2>
            </Reveal>
            <div className="mt-10">
              <ProjectsListV3 />
            </div>
          </div>
        </section>

        {/* ====================================================== EXPERIENCE */}
        <section className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Experience
            </p>
            <h2
              className="editorial mt-5 font-normal"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3.25rem)" }}
            >
              Where I&apos;ve worked.
            </h2>
          </Reveal>

          <div className="mt-10 border-t border-card-border">
            {roles.map((role, i) => (
              <Reveal key={role.company} delay={0.05 * i}>
                <div className="grid gap-4 border-b border-card-border py-8 md:grid-cols-[200px_1fr]">
                  <div>
                    <div className="font-mono text-[12px] text-muted-foreground">
                      {role.period}
                    </div>
                    <div className="font-mono text-[11px] text-muted-foreground">
                      {role.location}
                    </div>
                  </div>
                  <div>
                    <h3 className="editorial text-xl font-normal">
                      {role.title}{" "}
                      <span className="text-muted-foreground">
                        — {role.company}
                      </span>
                    </h3>
                    <ul className="mt-3 max-w-[68ch] space-y-2">
                      {role.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex gap-3 text-[15px] leading-[1.6] text-muted-foreground"
                        >
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rounded-full"
                            style={{ background: "var(--accent)" }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {role.tools.map((t) => (
                        <li
                          key={t}
                          className="rounded-md border border-card-border px-2.5 py-1 font-mono text-[12px] text-muted-foreground"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Education + certifications */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-xl border border-card-border bg-card p-7">
                <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                  Education
                </div>
                <h3 className="editorial mt-3 text-xl font-normal">
                  {education.school}
                </h3>
                <p className="mt-1 text-[15px] text-muted-foreground">
                  {education.degree}
                </p>
                <p className="mt-1 font-mono text-[12px] text-muted-foreground">
                  {education.period}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {education.coursework.map((c) => (
                    <li
                      key={c}
                      className="rounded-md border border-card-border px-2.5 py-1 font-mono text-[12px] text-muted-foreground"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="h-full rounded-xl border border-card-border bg-card p-7">
                <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                  Certifications
                </div>
                <ul className="mt-3 space-y-3">
                  {certifications.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-[15px]">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-mono text-[12px] text-muted-foreground">
                  AWS Cloud Engineer Talent Academy · 2024
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =========================================================== STACK */}
        <section
          id="stack"
          className="border-t border-card-border bg-[var(--card)]"
        >
          <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Toolkit
              </p>
              <h2
                className="editorial mt-5 font-normal"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3.25rem)" }}
              >
                Tech stack.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {skillGroups.map((g, i) => (
                <Reveal key={g.label} delay={0.04 * i}>
                  <div className="h-full rounded-xl border border-card-border bg-background p-7">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                      {g.label}
                    </h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {g.items.map((it) => (
                        <li
                          key={it}
                          className="rounded-md border border-card-border px-2.5 py-1 text-[13px] text-foreground/80"
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ LIVE */}
        <section className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Live demo
            </p>
            <h2
              className="editorial mt-5 font-normal"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3.25rem)" }}
            >
              Statistics, running in your browser.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-10">
              <DataVizPanel />
            </div>
          </Reveal>
        </section>

        {/* ========================================================= CONTACT */}
        <section
          id="contact"
          className="border-t border-card-border bg-[var(--card)]"
        >
          <div className="mx-auto max-w-3xl px-6 py-28 text-center sm:py-36">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Contact
              </p>
              <h2
                className="editorial mx-auto mt-6 max-w-2xl font-normal"
                style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
              >
                Let&apos;s work together.
              </h2>
              <p className="mx-auto mt-7 max-w-md text-[16px] leading-[1.7] text-muted-foreground">
                Open to internships, freelance, and full-time roles. The fastest
                way to reach me is email — or grab my CV.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={site.socials.email}
                  className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
                >
                  Email me
                </a>
                <a
                  href={site.cvUrl}
                  className="inline-flex items-center gap-2 rounded-md border border-card-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Download CV
                </a>
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-card-border transition-colors hover:bg-muted"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
                {site.socials.linkedin && (
                  <a
                    href={site.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-card-border transition-colors hover:bg-muted"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                )}
              </div>
              <p className="mt-8 font-mono text-[13px] text-muted-foreground">
                {site.email}
              </p>
            </Reveal>
          </div>
        </section>

        <div className="border-t border-card-border">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 py-8 text-center sm:flex-row sm:text-left">
            <p className="text-[13px] text-muted-foreground">
              © {site.shortName}. Built with Next.js.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
              Editorial / v3
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
