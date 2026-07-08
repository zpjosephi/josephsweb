import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { HomeNav } from "@/components/home/nav";
import { Reveal } from "@/components/reveal";
import { Portrait } from "@/components/portrait";
import { site } from "@/lib/site";

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="link inline-flex items-center gap-1 text-[14.5px] font-medium"
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  );
}

/* ------------------------------------------------------------------ hero */

function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:pb-24 sm:pt-24">
      <Reveal>
        <h1 className="home-display max-w-[22ch] text-[clamp(2.3rem,5.4vw,3.9rem)]">
          I build web apps that turn data into decisions.
        </h1>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-6 max-w-[54ch] text-[17px] leading-[1.65] text-muted-foreground">
          Final-year Computer Science &amp; Statistics student at BINUS,
          previously a data analyst intern at Indonesia Eximbank. Everything
          below is shipped and running live.
        </p>
      </Reveal>
      <Reveal delay={0.14}>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="inline-flex items-center rounded-[10px] bg-foreground px-5 py-2.5 text-[14px] font-medium text-background transition-transform hover:-translate-y-px active:translate-y-0"
          >
            See the work
          </a>
          <a
            href={site.cvUrl}
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-hairline px-5 py-2.5 text-[14px] font-medium transition-colors hover:bg-card"
          >
            Download CV
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ work */

function Stack({ items }: { items: string }) {
  return <p className="mono mt-4 text-[12.5px] text-muted-foreground">{items}</p>;
}

function Shot({
  src,
  alt,
  priority,
  aspect = "aspect-[16/10]",
  sizes,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  aspect?: string;
  sizes: string;
}) {
  return (
    <div
      className={`relative ${aspect} overflow-hidden rounded-[10px] border border-card-border bg-muted`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-top"
      />
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="border-t border-card-border">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <Reveal>
          <h2 className="home-display text-[clamp(1.7rem,3.4vw,2.4rem)]">
            Selected work
          </h2>
        </Reveal>

        {/* Flagship: ceritabel */}
        <Reveal className="mt-10">
          <Shot
            src="/projects/ceritabel.png"
            alt="ceritabel: dataset summary with a quality score, variable chips, and an AI insight panel"
            priority
            aspect="aspect-[16/9]"
            sizes="(max-width: 1024px) 92vw, 976px"
          />
          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_250px]">
            <div>
              <h3 className="text-[22px] font-semibold tracking-tight">
                ceritabel
              </h3>
              <p className="mt-3 max-w-[62ch] text-[15.5px] leading-[1.65] text-muted-foreground">
                Upload a spreadsheet and it runs the whole statistical workflow
                in your browser: cleaning, EDA, hypothesis tests, OLS regression
                with the classical assumption checks, plus panel models and
                time-series analysis. An AI layer then explains the results in
                plain language.
              </p>
              <ul className="mt-4 max-w-[62ch] list-disc space-y-1.5 pl-5 text-[15px] leading-[1.6] text-muted-foreground marker:text-hairline">
                <li>
                  The inference engine is hand-built; about 80 unit tests, with
                  its p-values verified against R reference values.
                </li>
                <li>
                  Privacy-first: raw rows never leave the browser, only compact
                  summaries reach the AI.
                </li>
                <li>
                  Exports runnable Python and R scripts that reproduce the exact
                  session.
                </li>
              </ul>
            </div>
            <div className="md:pt-1">
              <p className="text-[13px] font-medium text-muted-foreground">
                Stack
              </p>
              <p className="mono mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
                Next.js, TypeScript, Vitest, Recharts, Gemini / Groq
              </p>
              <p className="mt-5 text-[13px] font-medium text-muted-foreground">
                Links
              </p>
              <div className="mt-1.5">
                <ExternalLink href="https://ceritabel.vercel.app/analyze?sample=siswa">
                  Open live app
                </ExternalLink>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Second feature: xEleven */}
        <Reveal className="mt-16 sm:mt-20">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-[22px] font-semibold tracking-tight">
                xEleven
              </h3>
              <p className="mt-3 text-[15.5px] leading-[1.65] text-muted-foreground">
                Premier League analytics across ten seasons of data: nine tools,
                from standings and player scouting to a title-race chart and a
                full season Manager Mode. It started as my thesis and kept
                growing after submission.
              </p>
              <Stack items="Next.js, TypeScript, Recharts, football-data.org API" />
              <div className="mt-5 flex flex-wrap items-center gap-5">
                <ExternalLink href="https://epl-xeleven.vercel.app/">
                  Open live app
                </ExternalLink>
                <Link
                  href="/work/xeleven"
                  className="link text-[14.5px] font-medium"
                >
                  Read the case study
                </Link>
              </div>
            </div>
            <Shot
              src="/projects/xeleven.png"
              alt="xEleven: Premier League overview with a season selector and the toolbox of analytics tools"
              sizes="(max-width: 768px) 92vw, 480px"
            />
          </div>
        </Reveal>

        {/* Pair: Bakery Kita + After hours */}
        <div className="mt-16 grid gap-12 sm:mt-20 sm:grid-cols-2 sm:gap-10">
          <Reveal>
            <Shot
              src="/projects/bakery.png"
              alt="Bakery Kita: product catalog of an e-commerce storefront"
              sizes="(max-width: 640px) 92vw, 470px"
            />
            <h3 className="mt-5 text-[19px] font-semibold tracking-tight">
              Bakery Kita
            </h3>
            <p className="mt-2.5 text-[15px] leading-[1.6] text-muted-foreground">
              Full-stack e-commerce on a real Postgres database: catalog, cart,
              checkout, QRIS payments through Midtrans (sandbox mode), row-level
              security, and a role-gated admin dashboard. Prices are recomputed
              server-side and webhook signatures verified.
            </p>
            <Stack items="Next.js, Supabase, Midtrans, Tailwind CSS" />
            <div className="mt-4 flex flex-wrap items-center gap-5">
              <ExternalLink href="https://bakery-kita.vercel.app/">
                Open live app
              </ExternalLink>
              <Link
                href="/work/bakery-kita"
                className="link text-[14.5px] font-medium"
              >
                Read the case study
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <Shot
              src="/projects/after-hours.png"
              alt="After hours: 3D scene of a coder on a floating island at night"
              sizes="(max-width: 640px) 92vw, 470px"
            />
            <h3 className="mt-5 text-[19px] font-semibold tracking-tight">
              After hours
            </h3>
            <p className="mt-2.5 text-[15px] leading-[1.6] text-muted-foreground">
              A first go at real-time 3D, out of pure curiosity: a coder on a
              floating island, with hand-written GLSL shaders for the water and
              grass, a day/night toggle the whole scene reacts to, and thousands
              of grass blades drawn with instancing.
            </p>
            <Stack items="Three.js, react-three-fiber, GLSL, Next.js" />
            <div className="mt-4">
              <ExternalLink href="https://afterhours-3d.vercel.app/">
                Open live app
              </ExternalLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ experience */

type Row = {
  period: string;
  place: string;
  title: string;
  org: string;
  points: string[];
};

const rows: Row[] = [
  {
    period: "Mar 2025 - Feb 2026",
    place: "South Jakarta",
    title: "Data Analyst Intern",
    org: "Indonesia Eximbank (LPEI)",
    points: [
      "Wrote market research (Kajian) on export commodities: trends, market shifts, and the macroeconomic drivers behind them.",
      "Automated a leads pipeline that mapped and routed 1,000+ prospective debtor companies to the right business units.",
      "Built Tableau dashboards that generate the charts for economic reports automatically, replacing manual work.",
      "Scraped macroeconomic data from the BPS (Statistics Indonesia) portal into Excel pivot tables for faster analysis.",
    ],
  },
  {
    period: "Aug 2023",
    place: "West Jakarta",
    title: "UI/UX Designer Intern",
    org: "Nusatalent",
    points: [
      "Designed the platform's Events section end to end in Figma: user flows, wireframes, and high-fidelity mockups.",
      "Ran a one-month design sprint from business requirements to a developer-ready handoff.",
    ],
  },
  {
    period: "Expected Aug 2026",
    place: "West Jakarta",
    title: "B.Sc. Computer Science & Statistics",
    org: "Bina Nusantara University",
    points: [
      "Double degree. Coursework spans machine learning, deep learning (TensorFlow, Keras), artificial intelligence, data analysis, text and data mining, computational biology (BioPython), software engineering, object-oriented programming (Java), web programming, and UI/UX.",
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="border-t border-card-border">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <Reveal>
          <h2 className="home-display text-[clamp(1.7rem,3.4vw,2.4rem)]">
            Experience
          </h2>
        </Reveal>
        <div className="mt-6 divide-y divide-card-border">
          {rows.map((r, i) => (
            <Reveal key={r.org} delay={0.04 * i}>
              <div className="grid gap-3 py-8 md:grid-cols-[220px_1fr] md:gap-6">
                <div>
                  <p className="mono text-[13px]">{r.period}</p>
                  <p className="mono mt-0.5 text-[12px] text-muted-foreground">
                    {r.place}
                  </p>
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold tracking-tight">
                    {r.title}
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      at {r.org}
                    </span>
                  </h3>
                  <ul className="mt-3 max-w-[70ch] list-disc space-y-1.5 pl-5 text-[15px] leading-[1.6] text-muted-foreground marker:text-hairline">
                    {r.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="max-w-[70ch] border-t border-card-border pt-6 text-[14px] leading-[1.6] text-muted-foreground">
            Certifications: AWS Certified Cloud Practitioner (valid through
            2027), plus Progate fundamentals in Python and JavaScript.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- about */

const toolbox = [
  { k: "Languages", v: "TypeScript / JavaScript, Python, R, SQL" },
  { k: "Web & frameworks", v: "Next.js, React, Tailwind CSS, Node.js" },
  {
    k: "Data & statistics",
    v: "PostgreSQL / Supabase, Tableau, Excel, regression, hypothesis testing, panel data",
  },
  { k: "Tools & cloud", v: "Git / GitHub, Figma, Vercel, AWS (Cloud Practitioner)" },
];

function About() {
  return (
    <section id="about" className="border-t border-card-border">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <Reveal>
          <h2 className="home-display text-[clamp(1.7rem,3.4vw,2.4rem)]">
            About
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px] lg:gap-16">
          <Reveal>
            <div className="max-w-[62ch] space-y-4 text-[15.5px] leading-[1.7] text-muted-foreground">
              <p>
                The double degree is the whole idea: computer science to build
                the product, statistics to be honest about the data inside it.
                My favorite work is where both halves meet, like ceritabel,
                whose inference engine I wrote by hand and then tested against
                R until the numbers matched.
              </p>
              <p>
                Outside the code I spent two years in HIMSTAT, the statistics
                student association at BINUS, as HR staff, event MC, and chief
                committee for two annual gatherings. I also mentored first-year
                students through their first year of university. Presenting to
                a room full of people is genuinely part of the job I enjoy.
              </p>
              <p>
                Based in Jakarta. Bahasa Indonesia natively, Javanese fluently,
                English at professional working level.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <figure className="max-w-[280px]">
              <div className="overflow-hidden rounded-[10px] border border-card-border bg-muted">
                <Portrait mode="natural" className="block h-auto w-full" />
              </div>
            </figure>
          </Reveal>
        </div>
        <Reveal>
          <dl className="mt-12 grid gap-x-12 gap-y-6 border-t border-card-border pt-8 sm:grid-cols-2">
            {toolbox.map((t) => (
              <div key={t.k}>
                <dt className="text-[13px] font-medium text-muted-foreground">
                  {t.k}
                </dt>
                <dd className="mt-1 text-[15px] leading-[1.6]">{t.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- contact */

function Contact() {
  return (
    <section id="contact" className="border-t border-card-border">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <Reveal>
          <h2 className="home-display text-[clamp(1.7rem,3.4vw,2.4rem)]">
            Contact
          </h2>
          <p className="mt-5 max-w-[52ch] text-[15.5px] leading-[1.65] text-muted-foreground">
            Open to internships, junior roles, and freelance work. Email gets
            the fastest reply.
          </p>
          <a
            href={site.socials.email}
            className="link mt-6 inline-block break-all text-[clamp(1.3rem,3.2vw,2rem)] font-semibold tracking-tight"
          >
            {site.email}
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-6">
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
  );
}

/* ------------------------------------------------------------------ page */

export const metadata: Metadata = {
  title: "Minimal",
  description:
    "The quiet, typographic cut of Joseph Irawan's portfolio: same work, no theatrics.",
};

export default function MinimalHome() {
  return (
    <div id="top" className="home relative flex min-h-screen flex-col">
      <HomeNav base="/minimal" />
      <main id="main-content" className="flex-1">
        <Hero />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
      <footer className="border-t border-card-border">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-2 px-6 py-8 text-[13px] text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.shortName}
          </p>
          <p>
            This is the quiet cut.{" "}
            <Link href="/" className="link">
              Back to the interactive one
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
