import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "xEleven — Case study",
  description:
    "How a Computer Science × Statistics thesis became a nine-tool Premier League analytics and season-management app.",
};

const meta = [
  { k: "Role", v: "Solo — design · data · build" },
  { k: "Type", v: "Data / Statistics" },
  { k: "Stack", v: "Next.js · TypeScript · Recharts" },
  { k: "Source", v: "football-data.org · 10 EPL seasons" },
];

const chapters = [
  {
    n: "01",
    label: "the brief",
    title: "A thesis I didn't want to stop at",
    body: [
      "xEleven began as my final-year thesis. My double degree — Computer Science and Statistics — required a project that was both a working application and statistically grounded.",
      "That first version was a modest statistical exercise in R; it did the job, and I could have stopped there. But I love football, and the more I worked on it the more I saw what it could become — not a deliverable, but a real Premier League analytics and season-management tool. So after submitting, I kept building, and rebuilt it into the nine-tool web app it is today: live standings, scouting, title-race charts, aging curves, a squad builder, and a full Manager Mode.",
    ],
  },
  {
    n: "02",
    label: "the hard part",
    title: "Manager Mode had to feel real",
    body: [
      "The hardest part wasn't the charts — it was Manager Mode, the tool that runs a club through an entire season. A simulation is only convincing if the logic underneath it holds up, so I treated it like a model to validate, not just code to write.",
      "I defined the rules myself — transfer economics, squad value, match and penalty outcomes — then tested them by hand, season after season, watching for where they broke. Across roughly thirty iterations I tuned the edge cases: should the engine reward buying a cheap, aging star? how often should a penalty actually miss? Every fix looked small on its own; together they're what makes the simulation feel real instead of arbitrary.",
    ],
  },
  {
    n: "03",
    label: "the data",
    title: "Working within honest limits",
    body: [
      "Live data comes from the football-data.org API — chosen because it's accessible and free, which also meant designing around its rate limits and the fields it doesn't expose.",
      "That constraint was familiar. For the original thesis I collected data entirely by hand, pulling from Transfermarkt and cross-referencing Football Manager for homegrown status, because Transfermarkt's terms don't permit scraping. Respecting that — and doing the tedious manual work instead — taught me as much about data as any model did.",
    ],
  },
  {
    n: "04",
    label: "the edge",
    title: "What I'd push further",
    body: [
      "I wanted xEleven to track players across more than a single season, but that runs straight into the limits of freely available data — proper multi-season analysis would need players from outside the Premier League too. For now I scoped to what I could source reliably. It's the kind of limit I'd rather state plainly than paper over.",
    ],
  },
  {
    n: "05",
    label: "what it taught me",
    title: "The first thing I built with real intent",
    body: [
      "xEleven is the first web app I built because I wanted to, not because I had to — and it changed how I see my own range. I learned I could pull live data, model it, and put it in front of someone in a browser, end to end.",
      "As a Computer Science and Statistics student I'd always worked with data. This is where I felt how powerful it is when it's actually running, not just analyzed. And I don't think it's finished — I keep finding more it could be, which is probably the best sign I picked the right thing to build.",
    ],
  },
];

export default function XelevenCaseStudy() {
  return (
    <div className="brutal relative flex min-h-screen flex-col">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 datasheet-grid" />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] noise-overlay" />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] scanlines" />

      {/* Top bar */}
      <header className="border-b-2 border-card-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <Link
            href="/#projects"
            className="tele inline-flex items-center gap-2 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Index / Work
          </Link>
          <span className="tele text-[10px] text-accent">CASE FILE · 001</span>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        {/* Masthead */}
        <section className="border-b-2 border-card-border">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <p className="tele mb-6 inline-flex items-center gap-2 border border-card-border px-2.5 py-1 text-[11px] text-muted-foreground">
              <span className="h-2 w-2 animate-blink bg-accent" />
              [ DOSSIER / xELEVEN ]
            </p>
            <h1
              className="display font-normal"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
            >
              xEleven<span className="text-accent">.</span>
            </h1>
            <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              A Premier League analytics and season-management app that brings
              nine interactive tools into one place — built from a thesis into
              something I actually wanted to use.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-px border-2 border-card-border bg-card-border sm:grid-cols-4">
              {meta.map((m) => (
                <div key={m.k} className="bg-background px-4 py-4">
                  <div className="tele text-[10px] text-muted-foreground">{m.k}</div>
                  <div className="mt-1.5 text-sm font-semibold">{m.v}</div>
                </div>
              ))}
            </div>

            <a
              href="https://epl-xeleven.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-accent px-6 py-3.5 tele text-xs font-bold text-accent-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Open the live app
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Hero screenshot */}
        <section className="border-b-2 border-card-border">
          <div className="mx-auto max-w-5xl px-6 py-10">
            <a
              href="https://epl-xeleven.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-[1280/875] w-full overflow-hidden border-2 border-card-border bg-[#0a0a0a]"
            >
              <Image
                src="/projects/xeleven.png"
                alt="xEleven dashboard screenshot"
                fill
                sizes="(max-width: 1024px) 100vw, 940px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                priority
              />
            </a>
          </div>
        </section>

        {/* Chapters */}
        <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <div className="border-t-2 border-card-border">
            {chapters.map((c) => (
              <Reveal key={c.n}>
                <article className="grid gap-6 border-b-2 border-card-border py-12 lg:grid-cols-[200px_1fr]">
                  <div>
                    <div className="tele text-[11px] text-accent">
                      {c.n} / {c.label}
                    </div>
                  </div>
                  <div className="max-w-[65ch]">
                    <h2 className="text-xl font-semibold sm:text-2xl">{c.title}</h2>
                    <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                      {c.body.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}

            {/* Footer CTA */}
            <div className="mt-12 flex flex-wrap items-center gap-px bg-card-border">
              <a
                href="https://epl-xeleven.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 tele text-xs font-bold text-accent-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Open the live app
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 bg-background px-6 py-3.5 tele text-xs transition-colors hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all work
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
