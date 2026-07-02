import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { activities, languages } from "@/data/experience";

// The "communicates data" half of the story: public speaking, leadership,
// mentoring - the soft skills most engineers lack, reframed as evidence.
export function Leadership() {
  return (
    <Section
      id="leadership"
      eyebrow="fig.03 / voice"
      annotation="off the keyboard"
      title="Leadership & communication"
    >
      <Reveal>
        <p className="mb-10 max-w-[58ch] text-lg leading-relaxed text-muted-foreground">
          Most engineers can&apos;t present. I can. Two years hosting campus
          events as <span className="text-foreground">MC</span>, leading
          committees, and mentoring students, proof I can run a room and{" "}
          <span className="text-foreground">explain the work</span>, not just
          build it.
        </p>
      </Reveal>

      {/* Activities - flat panels */}
      <div className="grid gap-px border-2 border-card-border bg-card-border sm:grid-cols-2">
        {activities.map((a, i) => (
          <Reveal key={a.org} delay={0.05 * i}>
            <div className="flex h-full flex-col bg-card p-6">
              <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                {a.period}
              </div>
              <h3 className="text-base font-semibold leading-snug">{a.role}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.org}</p>
              <ul className="mt-4 space-y-1.5">
                {a.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Languages - instrument strip */}
      <div className="mt-8">
        <div className="mb-px bg-background px-1 py-2 tele text-[10px] text-accent">
          {">> "}LANGUAGES
        </div>
        <div className="grid grid-cols-1 gap-px border-2 border-card-border bg-card-border sm:grid-cols-3">
          {languages.map((l) => (
            <div key={l.name} className="bg-card px-5 py-4">
              <div className="text-sm font-semibold">{l.name}</div>
              <div className="mt-1 tele text-[10px] text-muted-foreground">
                {l.level}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
