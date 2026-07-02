import type { Metadata } from "next";
import { CaseStudy } from "@/components/home/case-study";

export const metadata: Metadata = {
  title: "Bakery Kita case study",
  description:
    "Building a full-stack bakery storefront end to end: real accounts, live QRIS payments, signature-verified webhooks, and a role-gated admin on Postgres.",
};

const chapters = [
  {
    title: "A storefront that runs end to end",
    body: [
      "Bakery Kita is the most backend-heavy thing I've built: a full storefront where a customer browses a catalog, adds to a cart, checks out, pays by scanning a QR code, and then tracks the order, the whole way through. It runs on a real Postgres database, with real accounts and live QRIS payments.",
      "It isn't an actual shop. Payments run in Midtrans sandbox mode, so nothing charges real money. I wanted the engineering to be real even though the store isn't: the same flow, the same checks, the same failure cases a real one would have to survive.",
    ],
  },
  {
    title: "Getting the payment result right",
    body: [
      "The hardest part was payments, and specifically trusting the result. When a customer pays, my server asks Midtrans to create a QRIS charge and the app renders the QR for them to scan. The catch is that the payment actually completes somewhere I don't control, on the customer's banking app, so my side has to find out that it happened.",
      "I handle that two ways at once. The app polls for status so the customer watches it update without refreshing, and Midtrans also calls a webhook on my server the moment a payment settles. The webhook is the source of truth, but a request from the open internet can be forged, so every call has to prove it really came from Midtrans before I act on it.",
    ],
  },
  {
    title: "Treating test money like real money",
    body: [
      "Because everything hinges on money, I built it as if the money were real. Each webhook call is checked against its signature, a SHA-512 hash of the order id, status, and amount signed with my server key, and dropped if it doesn't match. That way nobody can POST a fake 'paid' to my endpoint and walk off with bread.",
      "Prices are never taken from the browser either. At checkout the server recomputes every total from the database, so tampering with a price in the page changes nothing. The keys that could do harm, the Midtrans server key and the admin credentials, stay server-side and never reach the client. And every table has Row-Level Security, so a signed-in customer can only ever read their own orders, enforced by Postgres itself instead of by my code remembering to filter.",
    ],
  },
  {
    title: "The half the owner sees",
    body: [
      "Behind a role gate there's a dashboard for actually running the shop: create, edit, delete, reorder, and show or hide products, with image uploads going to Supabase Storage. An order queue lists incoming orders with the customer's contact and items, and one control moves each from processing to done.",
      "One piece I'm fond of: the shop is bilingual, Indonesian and English, and I didn't want to write every product twice. So when an admin saves a product, Google Gemini fills in whichever language is missing. You type it once, and both versions exist.",
    ],
  },
  {
    title: "End to end, for real",
    body: [
      "xEleven taught me I could pull data and put it in front of someone in a browser. Bakery Kita taught me the rest of it: auth, a database with its own rules, money, webhooks, an admin side, and all the small trust decisions that only surface when getting one wrong would actually cost something.",
      "It's the project where full-stack stopped being a word on a list and turned into something I had done. None of it is a tutorial I followed; each piece is a choice I had to make and defend. That's exactly why it's the one I keep pointing people to.",
    ],
  },
];

export default function BakeryKitaCaseStudy() {
  return (
    <CaseStudy
      title="Bakery Kita"
      intro="A full-stack bakery storefront with real accounts, live QRIS payments, and a role-gated admin, built end to end on Postgres. The shop is a demo; the engineering isn't."
      facts={[
        { k: "Role", v: "Solo: design, build, ship" },
        { k: "Stack", v: "Next.js, Supabase, Midtrans" },
        { k: "Payments", v: "QRIS via Midtrans (sandbox)" },
      ]}
      image={{
        src: "/projects/bakery.png",
        alt: "Bakery Kita storefront catalog with products and cart",
      }}
      liveUrl="https://bakery-kita.vercel.app/"
      chapters={chapters}
    />
  );
}
