import Image from "next/image";
import { activities, certification, languages } from "@/data/work";

const PHOTOS = [
  {
    src: "/photos/matic-committee.webp",
    alt: "The HIMSTAT committee lined up in front of the MaTiC competition banner",
    caption: "The MaTiC competition committee, HIMSTAT",
    className: "col-span-6 aspect-[4/3] lg:col-span-7 lg:row-span-2 lg:aspect-auto",
  },
  {
    src: "/photos/graduation-selfie.webp",
    alt: "A crowded selfie of graduates in blue gowns and caps",
    caption: "Graduation, 2026",
    className: "col-span-3 aspect-[4/3] lg:col-span-5",
  },
  {
    src: "/photos/eximbank-afterhours.webp",
    alt: "Colleagues around a round wooden table in a garden courtyard",
    caption: "Eximbank colleagues, after work",
    className: "col-span-3 aspect-[4/3] lg:col-span-5",
  },
];

export function About() {
  return (
    <section aria-labelledby="about-title" className="bg-paper text-ink">
      <div className="shell grid grid-cols-1 gap-y-12 border-t border-rule py-24 lg:grid-cols-12 lg:gap-x-10 lg:py-32">
        <div className="lg:col-span-5">
          <h2
            id="about-title"
            className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.025em]"
          >
            I&apos;m rarely the only one in the photo.
          </h2>
          <div className="mt-8 max-w-[52ch] space-y-5 text-[17px] leading-relaxed text-ink-soft">
            <p>
              I&apos;m usually the one holding the mic at the event, and always somewhere in the
              group photo after. Football is the other constant: I spent years on Transfermarkt
              before it was ever thesis data, which is why the numbers above felt worth checking.
            </p>
          </div>

          <ul className="mt-10 space-y-6">
            {activities.map((a) => (
              <li key={a.org}>
                <p className="text-[16px] font-semibold text-ink">
                  {a.role}, {a.org}
                </p>
                <p className="text-[14px] text-ink-soft">{a.period}</p>
                <p className="mt-1.5 max-w-[56ch] text-[15px] leading-relaxed text-ink-soft">
                  {a.body}
                </p>
              </li>
            ))}
          </ul>

          <dl className="mt-10 space-y-2 text-[15px]">
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-semibold">Languages</dt>
              <dd className="text-ink-soft">{languages}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-semibold">Certified</dt>
              <dd className="text-ink-soft">{certification}</dd>
            </div>
          </dl>
        </div>

        <div className="grid grid-cols-6 gap-3 self-start lg:col-span-7 lg:grid-cols-12 lg:grid-rows-2 lg:gap-4">
          {PHOTOS.map((p) => (
            <figure key={p.src} className={p.className}>
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-rule">
                <Image src={p.src} alt={p.alt} fill quality={90} sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover" />
              </div>
              <figcaption className="sr-only">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
