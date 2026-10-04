import Image from "next/image";
import { builds, type Build } from "@/data/work";

export function Builds() {
  const large = builds.filter((b) => b.size === "large");
  const small = builds.filter((b) => b.size === "small");

  return (
    <section aria-labelledby="builds-title" className="bg-ink text-paper">
      <div className="shell py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-10">
          <h2
            id="builds-title"
            className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.025em] lg:col-span-5"
          >
            Things I built along the way.
          </h2>
          <p className="max-w-[52ch] text-[17px] leading-relaxed text-paper/75 lg:col-span-6 lg:col-start-7 lg:pt-2">
            Six web apps, all live. I build them with AI-assisted development: I decide what they
            do, design them, wire up the data and APIs, and ship them.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          {large.map((b) => (
            <Card key={b.name} build={b} big />
          ))}
        </div>
        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {small.map((b) => (
            <Card key={b.name} build={b} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ build, big }: { build: Build; big?: boolean }) {
  return (
    <a
      href={build.url}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl focus-visible:outline-offset-8"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-paper/10">
        <Image
          src={build.image}
          alt={`Screenshot of ${build.name}`}
          fill
          sizes={big ? "(min-width: 768px) 45vw, 100vw" : "(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"}
          className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className={big ? "font-display text-[26px] font-semibold" : "font-display text-[20px] font-semibold"}>
          {build.name}
        </h3>
        <span
          aria-hidden="true"
          className="text-paper/60 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mark"
        >
          ↗
        </span>
      </div>
      <p className={`mt-2 leading-relaxed text-paper/75 ${big ? "max-w-[56ch] text-[16px]" : "text-[15px]"}`}>
        {build.line}
      </p>
      <p className="mt-2 text-[13px] text-paper/55">{build.stack}</p>
    </a>
  );
}
