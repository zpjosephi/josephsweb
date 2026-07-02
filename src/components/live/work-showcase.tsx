"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Big poster rows; on fine-pointer desktops a screenshot preview chases the
// cursor while a row is hovered. Below lg (and for touch), each row shows its
// screenshot inline instead, so nothing depends on hover.

type Entry = {
  slug: string;
  title: string;
  blurb: string;
  stack: string;
  image: string;
  alt: string;
  liveUrl: string;
  caseStudyUrl?: string;
};

const entries: Entry[] = [
  {
    slug: "ceritabel",
    title: "ceritabel",
    blurb:
      "Full statistical workflow in the browser: EDA, hypothesis tests, OLS with assumption checks, panel and time-series models. Unit-tested against R, about 80 tests.",
    stack: "Next.js, TypeScript, Vitest, Gemini / Groq",
    image: "/projects/ceritabel.png",
    alt: "ceritabel: regression output with assumption checks and AI explanation",
    liveUrl: "https://ceritabel.vercel.app/",
  },
  {
    slug: "xeleven",
    title: "xEleven",
    blurb:
      "Premier League analytics and season management: nine tools over a live football-data API, including a full Manager Mode. Born as my thesis.",
    stack: "Next.js, TypeScript, Recharts",
    image: "/projects/xeleven.png",
    alt: "xEleven: Premier League standings dashboard",
    liveUrl: "https://epl-xeleven.vercel.app/",
    caseStudyUrl: "/work/xeleven",
  },
  {
    slug: "bakery-kita",
    title: "Bakery Kita",
    blurb:
      "Full-stack e-commerce on Postgres: catalog to QRIS payment (Midtrans sandbox) with row-level security, server-side price checks, and an admin dashboard.",
    stack: "Next.js, Supabase, Midtrans",
    image: "/projects/bakery.png",
    alt: "Bakery Kita: e-commerce storefront catalog",
    liveUrl: "https://bakery-kita.vercel.app/",
    caseStudyUrl: "/work/bakery-kita",
  },
  {
    slug: "after-hours",
    title: "After hours",
    blurb:
      "Real-time 3D experiment: a coder on a floating island, hand-written GLSL shaders, a day/night toggle, all models under 1MB.",
    stack: "Three.js, react-three-fiber, GLSL",
    image: "/projects/after-hours.png",
    alt: "After hours: 3D floating island scene at night",
    liveUrl: "https://afterhours-3d.vercel.app/",
  },
];

export function WorkShowcase() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.6 });
  const y = useSpring(my, { stiffness: 260, damping: 28, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    mx.set(e.clientX + 28);
    my.set(e.clientY - 110);
  };

  return (
    <div ref={sectionRef} onPointerMove={reduce ? undefined : onMove}>
      <ul className="border-t border-card-border">
        {entries.map((entry, i) => (
          <li key={entry.slug} className="border-b border-card-border">
            <article
              className="group relative py-8 sm:py-10"
              onPointerEnter={() => {
                if (!reduce) setActive(i);
              }}
              onPointerLeave={() => setActive((a) => (a === i ? null : a))}
            >
              {/* inline screenshot for touch / narrow screens */}
              <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-lg border border-card-border bg-muted lg:hidden">
                <Image
                  src={entry.image}
                  alt={entry.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 0px"
                  className="object-cover object-top"
                />
              </div>

              <div className="grid gap-4 lg:grid-cols-[1fr_360px] lg:items-end lg:gap-10">
                <a
                  href={entry.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                  aria-label={`${entry.title}, open the live app`}
                >
                  <span className="live-display block text-[clamp(2.6rem,7vw,5.2rem)] transition-colors duration-200 group-hover:text-accent">
                    {entry.title}
                    <ArrowUpRight
                      aria-hidden
                      className="mb-2 ml-3 inline-block h-[0.5em] w-[0.5em] -translate-x-1 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                    />
                  </span>
                </a>
                <div>
                  <p className="max-w-[46ch] text-[14.5px] leading-[1.6] text-muted-foreground">
                    {entry.blurb}
                  </p>
                  <p className="mono mt-3 text-[12px] text-muted-foreground">
                    {entry.stack}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                    <a
                      href={entry.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="link text-[13.5px] font-medium"
                    >
                      Open live app
                    </a>
                    {entry.caseStudyUrl && (
                      <Link
                        href={entry.caseStudyUrl}
                        className="link text-[13.5px] font-medium"
                      >
                        Read the case study
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {/* cursor-chasing preview, desktop pointer only. Always rendered so the
          server and a reduced-motion client agree on the tree; under reduced
          motion `active` simply never gets set. */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
      >
        <AnimatePresence>
          {active !== null && (
              <motion.div
              key={entries[active].slug}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[16/10] w-[360px] overflow-hidden rounded-lg border border-card-border bg-muted shadow-[0_18px_50px_oklch(0.05_0.01_145/0.55)]"
            >
              <Image
                src={entries[active].image}
                alt=""
                fill
                sizes="360px"
                className="object-cover object-top"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
