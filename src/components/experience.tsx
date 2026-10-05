import { PhotoRotator, type Slide } from "@/components/photo-rotator";
import { earlier, eximbank } from "@/data/work";

const EXIM_PHOTOS: Slide[] = [
  {
    src: "/photos/exim-1-farewell.webp",
    alt: "The Eximbank team posing in front of the Indonesia Eximbank logo",
    caption: "Last day at Eximbank, with the team.",
  },
  {
    src: "/photos/exim-2-lobby.webp",
    alt: "A group sitting together in front of the Indonesia Eximbank sign in the lobby",
    caption: "In the Eximbank lobby.",
    focus: "50% 60%",
  },
  {
    src: "/photos/exim-3-seminar.webp",
    alt: "A group in batik seated in front of a Trade Expo Indonesia backdrop for a BRICS business forum",
    caption: "At a BRICS business forum during Trade Expo Indonesia.",
    focus: "50% 62%",
  },
  {
    src: "/photos/exim-4-office.webp",
    alt: "Colleagues standing in a row in the office",
    caption: "The division, in the office.",
  },
  {
    src: "/photos/exim-5-gbk.webp",
    alt: "A group in Indonesia national team shirts outside Gelora Bung Karno stadium at night",
    caption: "Watching Indonesia play at GBK with the Eximbank crew.",
    focus: "50% 52%",
  },
  {
    src: "/photos/exim-6-division.webp",
    alt: "A group of colleagues in batik crouching together for a photo among plants",
    caption: "With the division, after work.",
    focus: "50% 36%",
  },
];

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

        <div className="lg:col-span-8 lg:col-start-5">
          <PhotoRotator label="Photos from Eximbank" slides={EXIM_PHOTOS} />
        </div>

        <p className="text-[15px] leading-relaxed text-ink-soft lg:col-span-8 lg:col-start-5">
          <span className="font-semibold text-ink">Before that:</span> {earlier.role} at{" "}
          {earlier.company}, {earlier.period}. {earlier.body}
        </p>
      </div>
    </section>
  );
}
