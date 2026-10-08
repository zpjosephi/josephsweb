import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const FACTS = [
  {
    lead: "1 year",
    text: "as a Data Analyst Intern at Indonesia Eximbank, profiling 1,000+ prospective debtor companies",
  },
  { lead: "B.Sc.", text: "Computer Science & Statistics, BINUS University, 2026" },
  { lead: "Tools", text: "Excel, Tableau, SQL, Python and R" },
  {
    lead: "Methods",
    text: "Regression and panel data, hypothesis testing, data cleaning, dashboards",
  },
];

export function Intro() {
  return (
    <section className="relative flex min-h-[min(100svh,980px)] flex-col overflow-hidden bg-stage text-on-stage lg:min-h-[76svh]">
      <header className="shell relative z-[var(--z-sticky)] flex items-center justify-between pt-6 sm:pt-8">
        <Link href="/analyst" className="font-display text-lg font-semibold tracking-tight">
          Joseph Irawan
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-5 text-[15px] sm:gap-8">
          <a href="#thesis" className="hidden underline-offset-4 hover:underline sm:inline">
            Thesis
          </a>
          <a href="#work" className="underline-offset-4 hover:underline">
            Work
          </a>
          <a href="#contact" className="underline-offset-4 hover:underline">
            Contact
          </a>
        </nav>
      </header>

      <div
        id="main-content"
        className="shell relative grid flex-1 grid-cols-1 lg:grid-cols-12 lg:gap-x-10"
      >
        <div className="relative z-[1] flex flex-col justify-center pb-10 pt-12 lg:col-span-7 lg:pb-12 lg:pt-6">
          <p className="text-[17px] text-on-stage-soft">Based in Jakarta. Open to remote or relocating.</p>
          <h1 className="mt-3 font-display text-[clamp(3.4rem,8.6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.035em]">
            Data analyst.
          </h1>
          <p className="mt-5 max-w-[30ch] font-display text-[clamp(1.35rem,2.2vw,1.9rem)] leading-[1.2] text-on-stage-soft">
            I check whether the numbers hold up, then build the tools that show them.
          </p>

          <ul className="mt-9 max-w-[60ch] space-y-3">
            {FACTS.map((f) => (
              <li key={f.lead} className="grid grid-cols-[4.5rem_1fr] gap-x-4 text-[16px] leading-snug">
                <span className="tabular font-semibold text-on-stage">{f.lead}</span>
                <span className="text-on-stage-soft">{f.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={site.cvUrl}
              className="inline-flex items-center gap-2 rounded-full bg-mark px-6 py-3.5 text-[16px] font-semibold text-mark-ink transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Download CV
              <span aria-hidden="true" className="text-[18px] leading-none">
                ↓
              </span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center rounded-full border border-on-stage-faint/60 px-6 py-3.5 text-[16px] font-medium transition-colors duration-200 hover:border-on-stage"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="relative -mx-[var(--gutter)] h-[min(62svh,520px)] lg:col-span-5 lg:mx-0 lg:h-auto">
          <Image
            src="/joseph-cutout.webp"
            alt="Joseph Irawan in a dark suit and tie"
            width={1000}
            height={1438}
            priority
            quality={90}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="photo-fade absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom lg:left-auto lg:right-0 lg:h-[96%] lg:translate-x-0"
          />
        </div>
      </div>
    </section>
  );
}
