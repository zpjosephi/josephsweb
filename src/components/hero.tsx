"use client";

import Link from "next/link";
import { useState } from "react";
import { PlayerField, type View } from "@/components/player-field";
import { model, peakAge, players } from "@/lib/epl";
import { site } from "@/lib/site";

const VIEWS: { id: View; label: string; title: string; body: string }[] = [
  {
    id: "age",
    label: "Age",
    title: `Value peaks around ${Math.round(peakAge)}.`,
    body: "Each dot is one attacker in one season. Market value climbs fast through the early twenties, then turns. The turn shows up inside players' own careers, not just across the league.",
  },
  {
    id: "passport",
    label: "Passport",
    title: "No English premium.",
    body: `Put English and foreign attackers with the same output side by side and the English ones come out ${model.english.pct}% higher, with p = ${model.english.p}. That's noise. Among home-grown players the gap is basically zero.`,
  },
  {
    id: "homegrown",
    label: "Home-grown",
    title: `Home-grown players come in ${Math.abs(model.homegrown.pct)}% cheaper.`,
    body: "Same goals, same minutes, lower value, and it holds for foreign home-grown players too. My read: players bought from abroad arrive with big fees that anchor their price, home-grown ones arrive young and cheap. A hypothesis for now, not a finding.",
  },
];

export function Hero() {
  const [view, setView] = useState<View>("age");
  const current = VIEWS.find((v) => v.id === view)!;

  return (
    <section className="relative flex min-h-dvh flex-col bg-stage text-on-stage">
      <header className="shell flex items-center justify-between pt-6 sm:pt-8">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          Joseph Irawan
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-5 text-[15px] sm:gap-7">
          <a href="#work" className="hover:text-mark">
            Work
          </a>
          <a href={site.cvUrl} className="hover:text-mark">
            CV
          </a>
          <a
            href="#contact"
            className="rounded-full bg-mark px-4 py-2 font-semibold text-mark-ink transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
          >
            Contact
          </a>
        </nav>
      </header>

      <div
        id="main-content"
        className="shell grid flex-1 grid-cols-1 gap-y-8 pb-8 pt-10 lg:grid-cols-12 lg:gap-x-10 lg:pt-6"
      >
        <div className="flex flex-col justify-end lg:col-span-5 lg:row-span-2 lg:pb-6">
          <h1 className="font-display text-[clamp(2.4rem,5.2vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.025em]">
            Are English players overpriced?{" "}
            <span className="text-mark">I checked {players.length} of them.</span>
          </h1>
          <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-on-stage-soft">
            I&apos;m Joseph, a statistics and computer science graduate in Jakarta. This is my thesis
            data: every attacker at every Premier League club over three seasons. Pick a question.
          </p>

          <div role="group" aria-label="Question" className="mt-8 flex flex-wrap gap-2">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                aria-pressed={view === v.id}
                onClick={() => setView(v.id)}
                className="rounded-full border border-on-stage-faint/50 px-4 py-2 text-[15px] font-medium transition-colors duration-200 hover:border-on-stage aria-pressed:border-mark aria-pressed:bg-mark aria-pressed:text-mark-ink"
              >
                {v.label}
              </button>
            ))}
          </div>

          <div aria-live="polite" className="mt-6 hidden min-h-[9.5rem] max-w-[48ch] lg:block">
            <Readout view={current} />
          </div>
        </div>

        <div className="h-[58svh] min-h-[360px] lg:col-span-7 lg:row-span-2 lg:h-auto lg:min-h-[560px]">
          <PlayerField view={view} />
        </div>

        <div aria-live="polite" className="min-h-[9rem] lg:hidden">
          <Readout view={current} />
        </div>
      </div>

      <p className="shell pb-6 text-[13px] text-on-stage-faint">
        Transfermarkt market values, 2022/23 to 2024/25. Home-grown status from Football Manager.
        Hover or tap a dot.
      </p>
    </section>
  );
}

function Readout({ view }: { view: (typeof VIEWS)[number] }) {
  return (
    <>
      <p className="font-display text-2xl font-semibold">{view.title}</p>
      <p className="mt-2 text-[15px] leading-relaxed text-on-stage-soft">{view.body}</p>
    </>
  );
}
