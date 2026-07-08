import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Portrait } from "@/components/portrait";
import { Magnetic } from "@/components/magnetic";
import { StudioNav } from "@/components/studio/nav";
import { StudioHero } from "@/components/studio/hero";
import { CountUp } from "@/components/studio/count-up";
import { WorkGallery } from "@/components/studio/work-gallery";
import { site } from "@/lib/site";
import {
  roles,
  education,
  certifications,
  activities,
  languages,
} from "@/data/experience";
import { skillGroups } from "@/data/skills";

type Stat = {
  value: number;
  label: string;
  pad?: number;
  comma?: boolean;
  prefix?: string;
  suffix?: string;
};

const stats: Stat[] = [
  { value: 4, pad: 2, label: "projects shipped, all live" },
  { value: 1000, comma: true, suffix: "+", label: "companies mapped at LPEI" },
  { value: 2, pad: 2, label: "disciplines, one engineer" },
  { value: 80, prefix: "~", label: "unit tests on the stats engine" },
];

type Fact = { k: string; t: string; b: string; accent?: boolean };

const facts: Fact[] = [
  {
    k: "Engineering",
    t: "I build the thing.",
    b: "Production web apps end to end, from interface to API to deploy. The CS half.",
  },
  {
    k: "Statistics",
    t: "I make it reason.",
    b: "Modeling, testing, and turning raw tables into something worth acting on. The stats half.",
  },
  {
    k: "The combination",
    t: "Most people pick one.",
    b: "Plenty of engineers cannot model; plenty of statisticians cannot ship. Doing both is the edge.",
    accent: true,
  },
];

export const metadata: Metadata = {
  title: "Studio",
  description:
    "The editorial ink-on-paper cut of Joseph Irawan's portfolio: same work, louder typography.",
};

export default function Home() {
  return (
    <div className="studio relative flex min-h-screen flex-col">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
      >
        Skip to work
      </a>

      <StudioNav />

      <main id="main-content" className="flex-1">
        <StudioHero />

        {/* ===================================================== STAT BAND */}
        <section className="border-y border-card-border">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 px-5 sm:px-8 md:grid-cols-4">
            {stats.map((s, i) => {
              const mobileLeft = i % 2 === 1; // right column on mobile
              const cls = [
                "py-8",
                mobileLeft ? "border-l border-card-border pl-6" : "",
                i >= 2 ? "border-t border-card-border md:border-t-0" : "",
                i !== 0 ? "md:border-l md:border-card-border md:pl-6" : "",
              ].join(" ");
              return (
                <div key={s.label} className={cls}>
                  <dt className="studio-display text-[clamp(2.2rem,4.4vw,3.1rem)] leading-none">
                    <CountUp
                      value={s.value}
                      pad={s.pad}
                      comma={s.comma}
                      prefix={s.prefix}
                      suffix={s.suffix}
                    />
                  </dt>
                  <dd className="mt-2 max-w-[22ch] text-[13px] leading-snug text-muted-foreground">
                    {s.label}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>

        {/* ========================================================= ABOUT */}
        <section id="about" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
            <Reveal>
              <div>
                <h2 className="studio-display max-w-xl text-[clamp(2rem,4.6vw,3.4rem)]">
                  Two disciplines, treated as one person.
                </h2>
                <div className="mt-7 max-w-md space-y-4 text-[16px] leading-[1.7] text-muted-foreground">
                  <p>
                    I am a double-degree student in Computer Science and
                    Statistics. The engineering projects prove I can build; the
                    statistics projects prove I can analyze.
                  </p>
                  <p>
                    Put together they tell one story instead of two: data-driven
                    software that people actually use, built and reasoned about by
                    the same hands.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <figure>
                <div className="overflow-hidden rounded-xl border border-card-border bg-muted">
                  <Portrait mode="grayscale" className="block h-auto w-full" />
                </div>
                <figcaption className="mono mt-3 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  Joseph Irawan, Jakarta ID
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* three facts as a divided band, not boxed cards */}
          <div className="mt-16 grid divide-y divide-card-border border-t border-card-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {facts.map((f, i) => (
              <Reveal key={f.k} delay={0.05 * i}>
                <div
                  className={`py-8 sm:px-7 ${i === 0 ? "sm:pl-0" : ""}`}
                >
                  <div
                    className={`mono text-[11px] uppercase tracking-[0.14em] ${f.accent ? "text-accent" : "text-muted-foreground"}`}
                  >
                    {f.k}
                  </div>
                  <h3 className="studio-display mt-4 text-[1.4rem] leading-tight">
                    {f.t}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.65] text-muted-foreground">
                    {f.b}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ========================================================== WORK */}
        <WorkGallery />

        {/* ==================================================== EXPERIENCE */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <h2 className="studio-display max-w-2xl text-[clamp(2rem,4.6vw,3.4rem)]">
              Where the work has happened.
            </h2>
          </Reveal>

          <div className="mt-12 border-t border-card-border">
            {roles.map((role, i) => (
              <Reveal key={role.company} delay={0.04 * i}>
                <div className="grid gap-4 border-b border-card-border py-8 md:grid-cols-[210px_1fr]">
                  <div>
                    <div className="mono text-[12.5px] text-foreground/80">
                      {role.period}
                    </div>
                    <div className="mono text-[11px] text-muted-foreground">
                      {role.location}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-medium tracking-tight">
                      {role.title}
                      <span className="text-muted-foreground"> · {role.company}</span>
                    </h3>
                    <ul className="mt-3 max-w-[70ch] space-y-2">
                      {role.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex gap-3 text-[15px] leading-[1.6] text-muted-foreground"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {role.tools.map((t) => (
                        <li
                          key={t}
                          className="mono rounded-full border border-hairline px-3 py-1 text-[12px] text-muted-foreground"
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

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-xl border border-card-border bg-card p-7">
                <div className="mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  Education
                </div>
                <h3 className="mt-3 text-[18px] font-medium tracking-tight">
                  {education.school}
                </h3>
                <p className="mt-1 text-[15px] text-muted-foreground">
                  {education.degree}
                </p>
                <p className="mono mt-1 text-[12px] text-muted-foreground">
                  {education.period}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {education.coursework.map((c) => (
                    <li
                      key={c}
                      className="mono rounded-full border border-hairline px-3 py-1 text-[12px] text-muted-foreground"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="h-full rounded-xl border border-card-border bg-card p-7">
                <div className="mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  Certifications and languages
                </div>
                <ul className="mt-3 space-y-2.5">
                  {certifications.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-[15px]">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-card-border pt-4">
                  {languages.map((l) => (
                    <div key={l.name} className="text-[13.5px]">
                      <span className="font-medium">{l.name}</span>
                      <span className="text-muted-foreground"> · {l.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* leadership, folded in so the page keeps the "communicates" half */}
          <Reveal>
            <div className="mt-16 grid gap-6 border-t border-card-border pt-12 md:grid-cols-[210px_1fr]">
              <h3 className="text-[18px] font-medium tracking-tight">
                Leading rooms, not just code
              </h3>
              <div className="max-w-[70ch] text-[15px] leading-[1.7] text-muted-foreground">
                <p>
                  Two years as event MC, chief committee, and first-year mentor.
                  The communication half of the story most engineers skip over.
                </p>
                <ul className="mt-4 space-y-2">
                  {activities.map((a) => (
                    <li key={a.org} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>
                        <span className="text-foreground">{a.role}</span>
                        <span className="text-muted-foreground"> · {a.org}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ========================================================= STACK */}
        <section className="border-t border-card-border bg-card/40">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <Reveal>
              <h2 className="studio-display max-w-2xl text-[clamp(2rem,4.6vw,3.4rem)]">
                The toolkit, grouped by what it is for.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {skillGroups.map((g, i) => (
                <Reveal key={g.label} delay={0.03 * i}>
                  <div className="border-t border-hairline pt-4">
                    <h3 className="mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {g.label}
                    </h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {g.items.map((it) => (
                        <li
                          key={it}
                          className="rounded-full border border-card-border bg-card px-3 py-1.5 text-[13px] text-foreground/85"
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

        {/* ======================================================= CONTACT */}
        <section id="contact" className="border-t border-card-border">
          <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:py-32">
            <Reveal>
              <p className="mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                Get in touch
              </p>
              <h2 className="studio-display mx-auto mt-6 max-w-2xl text-[clamp(2.4rem,6vw,4.6rem)]">
                Let&apos;s build something that reasons.
              </h2>
              <p className="mx-auto mt-6 max-w-md text-[16px] leading-[1.65] text-muted-foreground">
                Open to internships, freelance, and full-time roles. Email is the
                fastest way to reach me, or take the CV.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Magnetic strength={0.3}>
                  <a
                    href={site.socials.email}
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-[14px] font-medium text-background transition-transform hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <Mail className="h-4 w-4" /> Email me
                  </a>
                </Magnetic>
                <a
                  href={site.cvUrl}
                  className="inline-flex items-center gap-2 rounded-full border border-hairline px-6 py-3 text-[14px] font-medium transition-colors hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  Download CV <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline transition-colors hover:bg-card"
                >
                  <GithubIcon className="h-[18px] w-[18px]" />
                </a>
                {site.socials.linkedin && (
                  <a
                    href={site.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline transition-colors hover:bg-card"
                  >
                    <LinkedinIcon className="h-[18px] w-[18px]" />
                  </a>
                )}
              </div>
              <p className="mono mt-8 text-[13px] text-muted-foreground">
                {site.email}
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-card-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-center sm:flex-row sm:px-8 sm:text-left">
          <p className="text-[13px] text-muted-foreground">
            © {new Date().getFullYear()} {site.shortName}. Built with Next.js.
          </p>
          <a
            href="/lab"
            className="ul-draw mono text-[12px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Prefer it louder? See the lab cut
          </a>
        </div>
      </footer>
    </div>
  );
}
