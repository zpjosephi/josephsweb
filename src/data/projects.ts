export type ProjectCategory = "engineering" | "data";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** One-line summary of what it is */
  summary: string;
  /** Key features / what it does */
  highlights: string[];
  tech: string[];
  /** Optional small badge, e.g. "Demo" for sandbox/learning projects */
  badge?: string;
  liveUrl?: string;
  githubUrl?: string;
  /** Optional in-depth case study page (e.g. "/work/xeleven"). */
  caseStudyUrl?: string;
  /** Optional local screenshot in /public (e.g. "/projects/bakery.png").
   *  If omitted, a live screenshot of liveUrl is generated automatically. */
  image?: string;
  featured?: boolean;
};

// Real, shipped projects. Add more here as you finish them.
export const projects: Project[] = [
  {
    slug: "xeleven",
    title: "xEleven: Premier League Analytics",
    category: "data",
    summary:
      "The project I spent the most time on. It's a Premier League analytics and season-management app for the 2025/26 season that brings nine interactive tools together in one place, from live standings and player scouting to a full season Manager Mode.",
    highlights: [
      "Overview dashboard with full 20-club standings (P/W/D/L, GF/GA, GD, Pts) and recent form",
      "Top scorers and assist leaders, with goal contributions and club crests",
      "Interactive title-race chart showing cumulative points per matchday for the top 6",
      "Club profiles with squad breakdowns and per-season stats",
      "Compare and Head-to-Head tools for stat-by-stat player and matchup analysis",
      "Scout and Gems to find talent by performance profile and spot underrated players",
      "Aging curves that visualize player development over time",
      "Build XI for putting together a custom starting eleven",
      "Manager Mode for running a club through a full season",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Recharts",
      "football-data.org API",
      "Tailwind CSS",
    ],
    liveUrl: "https://epl-xeleven.vercel.app/",
    caseStudyUrl: "/work/xeleven",
    image: "/projects/xeleven.png",
    featured: true,
  },
  {
    slug: "bakery-kita",
    title: "Bakery Kita",
    category: "engineering",
    badge: "Demo",
    summary:
      "My most backend-heavy build: a full-stack e-commerce storefront on a real Postgres database (Supabase), with customer accounts, live QRIS payments, and a role-gated admin dashboard. It runs the whole ordering flow end to end — browse, add to cart, check out, pay by scanning a QR, then track the order. It isn't a real shop; payments run in Midtrans sandbox (test) mode.",
    highlights: [
      "Complete ordering flow: catalog → cart → checkout → QR payment → order tracking",
      "Real QRIS payments via Midtrans — the server creates the charge, the app renders a scannable QR, and order status updates live through polling plus a signature-verified webhook (sandbox / test mode)",
      "Customer accounts with email + password or Google sign-in (Supabase Auth), and a personal order-history page",
      "Postgres database (Supabase) for products, orders, and user profiles, with Row-Level Security on every table so customers only ever see their own orders",
      "Role-gated admin dashboard to create, edit, delete, reorder, and toggle products, including image uploads to Supabase Storage",
      "Admin order queue showing incoming orders with contact and items, and a control to mark each one processing or done",
      "AI auto-translation (Google Gemini) fills both Indonesian and English copy whenever a product is saved",
      "Bilingual interface (Indonesian / English) with the chosen language remembered per visitor",
      "Security-minded: prices are recomputed server-side at checkout to block tampering, webhook signatures are verified (SHA-512), and admin keys stay server-only",
    ],
    tech: [
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Supabase (Postgres, Auth, Storage)",
      "Midtrans (QRIS)",
      "Google Gemini",
    ],
    liveUrl: "https://bakery-kita.vercel.app/",
    image: "/projects/bakery.png",
  },
  {
    slug: "ceritabel",
    title: "ceritabel: AI Data Analysis",
    category: "data",
    summary:
      "A free, privacy-first web app that turns a raw spreadsheet into a readable analysis. You drop in a CSV or Excel file, it runs the full statistical workflow right in the browser, and an AI explains what the numbers mean in plain language.",
    highlights: [
      "Automatic EDA and data-shape detection (cross-section, time series, or panel)",
      "Statistical tests including t-test, ANOVA, chi-square, and correlation",
      "Regression with classical-assumption checks, plus panel models (Pooled/FE/RE with Hausman)",
      "Visualizations such as histograms, correlation heatmaps, and scatter plots",
      "Export-ready Python (pandas) and R code",
      "Files stay in memory and only summaries are sent to the AI",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "AI / LLM"],
    liveUrl: "https://ceritabel.vercel.app/",
    image: "/projects/ceritabel.png",
    featured: true,
  },
];
