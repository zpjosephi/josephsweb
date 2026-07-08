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
      "The project I spent the most time on. It's a Premier League analytics and season-management app that brings nine interactive tools together in one place, from standings and player scouting to a full season Manager Mode, built on ten seasons of match data (2016/17 to 2025/26).",
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
      "My most backend-heavy build: a full-stack e-commerce storefront on a real Postgres database (Supabase), with customer accounts, live QRIS payments, and a role-gated admin dashboard. It runs the whole ordering flow end to end: browse, add to cart, check out, pay by scanning a QR, then track the order. It isn't a real shop; payments run in Midtrans sandbox (test) mode.",
    highlights: [
      "Complete ordering flow: catalog → cart → checkout → QR payment → order tracking",
      "Real QRIS payments via Midtrans: the server creates the charge, the app renders a scannable QR, and order status updates live through polling plus a signature-verified webhook (sandbox / test mode)",
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
    caseStudyUrl: "/work/bakery-kita",
    image: "/projects/bakery.png",
  },
  {
    slug: "ceritabel",
    title: "ceritabel: AI Data Analysis",
    category: "data",
    summary:
      "A free, privacy-first web app that turns a raw spreadsheet into a readable statistical analysis. Drop in a CSV or Excel file and the full workflow (cleaning, EDA, hypothesis tests, regression, and panel or time-series analysis) runs entirely in your browser, then an AI explains what the numbers mean in plain language. The inference engine is hand-built, with p-values unit-tested against R.",
    highlights: [
      "Guided flow from upload to insight: a 0-100 data-quality scan, one-click auto-clean, and a reversible cleaning log where any step can be undone",
      "Detects whether the data is cross-sectional, a time series, or a panel and tailors the analysis accordingly (with manual override)",
      "Hand-built inference engine (Welch t-test, one-way ANOVA, chi-square, and correlation), each with exact p-values, confidence intervals, and effect sizes (Cohen's d, η², Cramér's V)",
      "Multiple OLS regression with a full coefficient table (per-term t-tests, adjusted R², overall F) and the four classical assumption checks: Jarque-Bera, VIF, Breusch-Pagan, and Durbin-Watson",
      "Panel models (Pooled / Fixed Effects / Random Effects with a Hausman test) and time-series analysis (trend, moving average, period-over-period change, autocorrelation)",
      "About 80 unit tests cover the engine, with the hypothesis-test p-values verified against R output (t.test, aov, chisq.test, cor.test)",
      "Charts: histograms, a correlation heatmap, scatter plots with a fitted regression line, and time-series lines",
      "Exports ready-to-run Python (pandas / statsmodels) and R scripts that reproduce the exact session: same cleaning steps, same models",
      "Privacy-first: files are parsed and every statistic is computed in your browser; only a compact summary, never the raw rows, is sent to the AI",
      "The AI explains each result in plain language but only interprets the numbers the app computed, never inventing its own; switchable between Gemini and Groq, fully bilingual (Indonesian / English)",
      "One click exports the whole analysis as a clean printable report: highlights, per-column stats, correlations, the fitted models (Pooled/FE/RE with a Hausman test for panel data), and the AI reading",
      "Accessibility-minded charts: a colorblind-safe mode swaps the correlation heatmap to a scale everyone can read",
    ],
    tech: [
      "Next.js (App Router)",
      "TypeScript",
      "simple-statistics",
      "Recharts",
      "Vitest",
      "Gemini / Groq",
      "Tailwind CSS",
    ],
    liveUrl: "https://ceritabel.vercel.app/analyze?sample=siswa",
    image: "/projects/ceritabel.png",
    featured: true,
  },
  {
    slug: "after-hours",
    title: "After hours",
    category: "engineering",
    badge: "Experiment",
    summary:
      "A real-time 3D scene I built for the fun of it: a lone coder on a floating island above the clouds, with a day/night toggle the whole world reacts to. Not a product, more a place to push what a browser can render in real time.",
    highlights: [
      "A full real-time scene in the browser with react-three-fiber: a floating island, a waterfall pouring into the cloud sea, drifting clouds, and a rigged figure typing on a laptop",
      "A day/night toggle that eases the whole scene at once: sun into moon, golden sky into stars, with paper lanterns, fireflies, an owl, and the occasional shooting star coming out at night",
      "Hand-written GLSL shaders for the water, the grass, and the waterfall",
      "Built to keep frames up: thousands of grass blades drawn with instancing and a render resolution that adapts to the GPU",
    ],
    tech: ["Three.js", "react-three-fiber", "GLSL", "Next.js", "TypeScript"],
    liveUrl: "https://afterhours-3d.vercel.app/",
    image: "/projects/after-hours.png",
  },
];
