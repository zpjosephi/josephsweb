import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Bakery Kita — Case study",
  description:
    "Building a full-stack bakery storefront end to end: real accounts, live QRIS payments, signature-verified webhooks, and a role-gated admin on Postgres.",
};

const meta = [
  { k: "Role", v: "Solo · design · build · ship" },
  { k: "Type", v: "Full-stack / e-commerce" },
  { k: "Stack", v: "Next.js · Supabase · Midtrans" },
  { k: "Payments", v: "QRIS · Midtrans sandbox" },
];

const chapters = [
  {
    n: "01",
    label: "the brief",
    title: "A storefront that runs end to end",
    body: [
      "Bakery Kita is the most backend-heavy thing I've built: a full storefront where a customer browses a catalog, adds to a cart, checks out, pays by scanning a QR code, and then tracks the order, the whole way through. It runs on a real Postgres database, with real accounts and live QRIS payments.",
      "It isn't an actual shop. Payments run in Midtrans sandbox mode, so nothing charges real money. I wanted the engineering to be real even though the store isn't: the same flow, the same checks, the same failure cases a real one would have to survive.",
    ],
  },
  {
    n: "02",
    label: "the hard part",
    title: "Getting the payment result right",
    body: [
      "The hardest part was payments, and specifically trusting the result. When a customer pays, my server asks Midtrans to create a QRIS charge and the app renders the QR for them to scan. The catch is that the payment actually completes somewhere I don't control, on the customer's banking app, so my side has to find out that it happened.",
      "I handle that two ways at once. The app polls for status so the customer watches it update without refreshing, and Midtrans also calls a webhook on my server the moment a payment settles. The webhook is the source of truth, but a request from the open internet can be forged, so every call has to prove it really came from Midtrans before I act on it.",
    ],
  },
  {
    n: "03",
    label: "the trust part",
    title: "Treating test money like real money",
    body: [
      "Because everything hinges on money, I built it as if the money were real. Each webhook call is checked against its signature, a SHA-512 hash of the order id, status, and amount signed with my server key, and dropped if it doesn't match. That way nobody can POST a fake 'paid' to my endpoint and walk off with bread.",
      "Prices are never taken from the browser either. At checkout the server recomputes every total from the database, so tampering with a price in the page changes nothing. The keys that could do harm, the Midtrans server key and the admin credentials, stay server-side and never reach the client. And every table has Row-Level Security, so a signed-in customer can only ever read their own orders, enforced by Postgres itself instead of by my code remembering to filter.",
    ],
  },
  {
    n: "04",
    label: "the admin side",
    title: "The half the owner sees",
    body: [
      "Behind a role gate there's a dashboard for actually running the shop: create, edit, delete, reorder, and show or hide products, with image uploads going to Supabase Storage. An order queue lists incoming orders with the customer's contact and items, and one control moves each from processing to done.",
      "One piece I'm fond of: the shop is bilingual, Indonesian and English, and I didn't want to write every product twice. So when an admin saves a product, Google Gemini fills in whichever language is missing. You type it once, and both versions exist.",
    ],
  },
  {
    n: "05",
    label: "what it taught me",
    title: "End to end, for real",
    body: [
      "xEleven taught me I could pull data and put it in front of someone in a browser. Bakery Kita taught me the rest of it: auth, a database with its own rules, money, webhooks, an admin side, and all the small trust decisions that only surface when getting one wrong would actually cost something.",
      "It's the project where full-stack stopped being a word on a list and turned into something I had done. None of it is a tutorial I followed; each piece is a choice I had to make and defend. That's exactly why it's the one I keep pointing people to.",
    ],
  },
];

export default function BakeryKitaCaseStudy() {
  return (
    <div className="brutal relative flex min-h-screen flex-col">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 datasheet-grid" />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] noise-overlay" />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] scanlines" />

      {/* Top bar */}
      <header className="border-b-2 border-card-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <Link
            href="/#projects"
            className="tele inline-flex items-center gap-2 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Index / Work
          </Link>
          <span className="tele text-[10px] text-accent">CASE FILE · 002</span>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        {/* Masthead */}
        <section className="border-b-2 border-card-border">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <p className="tele mb-6 inline-flex items-center gap-2 border border-card-border px-2.5 py-1 text-[11px] text-muted-foreground">
              <span className="h-2 w-2 animate-blink bg-accent" />
              [ DOSSIER / BAKERY KITA ]
            </p>
            <h1
              className="display font-normal"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
            >
              Bakery Kita<span className="text-accent">.</span>
            </h1>
            <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              A full-stack bakery storefront with real accounts, live QRIS
              payments, and a role-gated admin, built end to end on Postgres.
              The shop is a demo; the engineering isn&apos;t.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-px border-2 border-card-border bg-card-border sm:grid-cols-4">
              {meta.map((m) => (
                <div key={m.k} className="bg-background px-4 py-4">
                  <div className="tele text-[10px] text-muted-foreground">{m.k}</div>
                  <div className="mt-1.5 text-sm font-semibold">{m.v}</div>
                </div>
              ))}
            </div>

            <a
              href="https://bakery-kita.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-accent px-6 py-3.5 tele text-xs font-bold text-accent-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Open the live app
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Hero screenshot */}
        <section className="border-b-2 border-card-border">
          <div className="mx-auto max-w-5xl px-6 py-10">
            <a
              href="https://bakery-kita.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-[1280/875] w-full overflow-hidden border-2 border-card-border bg-[#0a0a0a]"
            >
              <Image
                src="/projects/bakery.png"
                alt="Bakery Kita storefront screenshot"
                fill
                sizes="(max-width: 1024px) 100vw, 940px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                priority
              />
            </a>
          </div>
        </section>

        {/* Chapters */}
        <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <div className="border-t-2 border-card-border">
            {chapters.map((c) => (
              <Reveal key={c.n}>
                <article className="grid gap-6 border-b-2 border-card-border py-12 lg:grid-cols-[200px_1fr]">
                  <div>
                    <div className="tele text-[11px] text-accent">
                      {c.n} / {c.label}
                    </div>
                  </div>
                  <div className="max-w-[65ch]">
                    <h2 className="text-xl font-semibold sm:text-2xl">{c.title}</h2>
                    <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                      {c.body.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}

            {/* Footer CTA */}
            <div className="mt-12 flex flex-wrap items-center gap-px bg-card-border">
              <a
                href="https://bakery-kita.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 tele text-xs font-bold text-accent-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Open the live app
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 bg-background px-6 py-3.5 tele text-xs transition-colors hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all work
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
