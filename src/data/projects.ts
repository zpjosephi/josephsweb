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
    image: "/projects/xeleven.png",
    featured: true,
  },
  {
    slug: "bakery-kita",
    title: "Bakery Kita",
    category: "engineering",
    badge: "Demo",
    summary:
      "A demo e-commerce storefront I built to practice a full online ordering flow, from catalog to digital payment, plus an admin dashboard for managing the store. It isn't a real shop; payments run in Midtrans sandbox (test) mode.",
    highlights: [
      "Product catalog with images and pricing",
      "Shopping cart and checkout flow",
      "QRIS payment via Midtrans (sandbox / test mode)",
      "Mobile-friendly ordering: choose, scan, pay",
      "Admin login and dashboard to edit products, menu, and store content live (access is granted per account through Supabase)",
      "Bilingual interface with automatic translation between Indonesian and English",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Midtrans (QRIS)",
      "Supabase (auth)",
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
