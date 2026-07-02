import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { HomeNav } from "@/components/home/nav";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export type Chapter = {
  title: string;
  body: string[];
};

export type CaseStudyProps = {
  title: string;
  intro: string;
  facts: { k: string; v: string }[];
  image: { src: string; alt: string };
  liveUrl: string;
  chapters: Chapter[];
};

export function CaseStudy({
  title,
  intro,
  facts,
  image,
  liveUrl,
  chapters,
}: CaseStudyProps) {
  return (
    <div className="home relative flex min-h-screen flex-col">
      <HomeNav />

      <main id="main-content" className="flex-1">
        <article className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
          <Link
            href="/#work"
            className="link inline-flex items-center gap-1.5 text-[14px] font-medium text-muted-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to the work
          </Link>

          <h1 className="home-display mt-8 text-[clamp(2.1rem,5vw,3.2rem)]">
            {title}
          </h1>
          <p className="mt-5 max-w-[58ch] text-[16.5px] leading-[1.65] text-muted-foreground">
            {intro}
          </p>

          <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 border-y border-card-border py-5">
            {facts.map((f) => (
              <div key={f.k}>
                <dt className="text-[13px] font-medium text-muted-foreground">
                  {f.k}
                </dt>
                <dd className="mono mt-1 text-[13px]">{f.v}</dd>
              </div>
            ))}
          </dl>

          <div className="relative mt-10 aspect-[1280/875] overflow-hidden rounded-[10px] border border-card-border bg-muted">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 768px) 92vw, 720px"
              className="object-cover object-top"
            />
          </div>

          <div className="mt-4">
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="link inline-flex items-center gap-1 text-[14.5px] font-medium"
            >
              Open live app
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-14 space-y-12 sm:mt-16">
            {chapters.map((c) => (
              <Reveal key={c.title}>
                <section>
                  <h2 className="text-[21px] font-semibold tracking-tight">
                    {c.title}
                  </h2>
                  <div className="mt-3.5 space-y-4 text-[15.5px] leading-[1.7] text-muted-foreground">
                    {c.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-card-border pt-8">
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-[10px] bg-foreground px-5 py-2.5 text-[14px] font-medium text-background transition-transform hover:-translate-y-px active:translate-y-0"
            >
              Open live app
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              href="/#work"
              className="inline-flex items-center gap-1.5 rounded-[10px] border border-hairline px-5 py-2.5 text-[14px] font-medium transition-colors hover:bg-card"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to the work
            </Link>
          </div>
        </article>
      </main>

      <footer className="border-t border-card-border">
        <div className="mx-auto max-w-3xl px-6 py-8 text-[13px] text-muted-foreground">
          © {new Date().getFullYear()} {site.shortName}
        </div>
      </footer>
    </div>
  );
}
