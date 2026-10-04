"use client";

import { useState } from "react";
import { PlayerField, type View } from "@/components/player-field";
import { model, peakAge, players } from "@/lib/epl";

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

export function ThesisExplorer() {
  const [view, setView] = useState<View>("age");
  const current = VIEWS.find((v) => v.id === view)!;

  return (
    <section
      id="thesis"
      aria-labelledby="thesis-title"
      className="relative bg-stage-deep text-on-stage"
    >
      <div className="shell grid grid-cols-1 gap-y-8 pb-10 pt-14 lg:grid-cols-12 lg:gap-x-10 lg:pt-12">
        <div className="flex flex-col lg:col-span-5 lg:row-span-2 lg:pb-6">
          <p className="text-[15px] font-medium text-on-stage-faint">My thesis, playable</p>
          <h2
            id="thesis-title"
            className="mt-3 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1] tracking-[-0.025em]"
          >
            Are English players overpriced?{" "}
            <span className="text-mark">I checked {players.length} of them.</span>
          </h2>
          <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-on-stage-soft">
            Every attacker at every Premier League club over three seasons, collected by hand from
            Transfermarkt. Pick a question and watch the data rearrange itself.
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

        <div className="h-[58svh] min-h-[360px] lg:col-span-7 lg:row-span-2 lg:h-[min(78svh,760px)] lg:min-h-[560px]">
          <PlayerField view={view} />
        </div>

        <div aria-live="polite" className="min-h-[9rem] lg:hidden">
          <Readout view={current} />
        </div>
      </div>

      <p className="shell pb-8 text-[13px] text-on-stage-faint">
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
