import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { roles, education, certifications } from "@/data/experience";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="fig.02 / career"
      annotation={`n = ${roles.length} roles`}
      title="Where I've worked"
    >
      {/* Role timeline */}
      <ol className="relative ml-1 border-l border-card-border">
        {roles.map((role, i) => (
          <li key={role.company} className="relative pl-6 pb-12 last:pb-0 sm:pl-8">
            {/* node on the rail */}
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background" />

            <Reveal delay={0.05 * i}>
              <div className="mb-1 font-mono text-[11px] uppercase tracking-widest text-accent">
                {role.period}
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-lg font-semibold">
                  {role.title}
                  <span className="text-muted-foreground"> · {role.company}</span>
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {role.location}
                </span>
              </div>

              <ul className="mt-3 max-w-[58ch] space-y-1.5">
                {role.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
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
            </Reveal>
          </li>
        ))}
      </ol>

      {/* Education + Certifications */}
      <div className="mt-14 grid gap-px border-2 border-card-border bg-card-border sm:grid-cols-2">
        <Reveal>
          <div className="h-full bg-card p-6">
            <div className="mb-3 tele text-[10px] text-accent">
              [ EDUCATION ]
            </div>
            <h3 className="text-base font-semibold">{education.school}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{education.degree}</p>
            <p className="mt-1 font-mono text-xs text-accent">{education.period}</p>
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
        </Reveal>

        <Reveal delay={0.05}>
          <div className="h-full bg-card p-6">
            <div className="mb-3 tele text-[10px] text-accent">
              [ CERTIFICATIONS ]
            </div>
            <ul className="space-y-2.5">
              {certifications.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-xs text-muted-foreground">
              AWS Cloud Engineer Talent Academy · 2024
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
