import Image from "next/image";
import { earlier, eximbank } from "@/data/work";

export function Experience() {
  return (
    <section id="work" aria-labelledby="work-title" className="bg-paper text-ink">
      <div className="shell grid grid-cols-1 gap-y-12 py-24 lg:grid-cols-12 lg:gap-x-10 lg:py-32">
        <div className="lg:sticky lg:top-10 lg:col-span-4 lg:self-start">
          <h2
            id="work-title"
            className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.025em]"
          >
            A year inside an export bank.
          </h2>
          <dl className="mt-8 space-y-1 text-[16px]">
            <div>
              <dt className="sr-only">Role</dt>
              <dd className="font-semibold">{eximbank.role}</dd>
            </div>
            <div>
              <dt className="sr-only">Company</dt>
              <dd>
                {eximbank.company}{" "}
                <span className="text-ink-soft">({eximbank.legalName})</span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">When and where</dt>
              <dd className="text-ink-soft">
                {eximbank.period}, {eximbank.place}
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-[15px] text-ink-soft">{eximbank.tools.join(", ")}</p>
        </div>

        <ol className="lg:col-span-8">
          {eximbank.highlights.map((h) => (
            <li
              key={h.lead}
              className="grid grid-cols-1 gap-x-8 gap-y-2 border-t border-rule py-7 first:border-t-0 first:pt-0 sm:grid-cols-[minmax(9rem,13rem)_1fr]"
            >
              <p className="font-display text-[clamp(2rem,3.4vw,2.8rem)] font-semibold leading-none tracking-[-0.02em] text-stage">
                {h.lead}
              </p>
              <div>
                <p className="text-[18px] font-semibold leading-snug">{h.title}</p>
                <p className="mt-1.5 max-w-[60ch] text-[16px] leading-relaxed text-ink-soft">
                  {h.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <figure className="lg:col-span-8 lg:col-start-5">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-rule">
            <Image
              src="/photos/eximbank-team.webp"
              alt="The Eximbank team posing in front of the Indonesia Eximbank logo in the office lobby"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-[14px] text-ink-soft">
            With the team I worked alongside, in the Eximbank lobby.
          </figcaption>
        </figure>

        <p className="text-[15px] leading-relaxed text-ink-soft lg:col-span-8 lg:col-start-5">
          <span className="font-semibold text-ink">Before that:</span> {earlier.role} at{" "}
          {earlier.company}, {earlier.period}. {earlier.body}
        </p>
      </div>
    </section>
  );
}
