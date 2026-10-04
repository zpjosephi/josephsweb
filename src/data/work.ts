// Every claim here matches the CV in Documents\Joseph. If one changes, change both.

export const eximbank = {
  company: "Indonesia Eximbank",
  legalName: "Lembaga Pembiayaan Ekspor Indonesia",
  role: "Data Analyst Intern",
  period: "Mar 2025 to Feb 2026",
  place: "South Jakarta",
  highlights: [
    {
      lead: "1,000+",
      title: "prospective debtor companies profiled",
      body: "Other divisions sent Leads Requests; I turned each one into an Excel export profile (buyers, three-year export growth, HS-code breakdown) and a PowerPoint deck.",
    },
    {
      lead: "Kajian",
      title: "market studies by HS code",
      body: "Processed trade data into chart packs (world and Indonesian exports, top exporters, destination growth) and dug into the reasons behind each movement.",
    },
    {
      lead: "Tableau",
      title: "dashboards that draw the report charts",
      body: "Built interactive dashboards that generated the charts for those economic reports, so nobody had to rebuild them by hand.",
    },
    {
      lead: "10M+",
      title: "rows of BPS export-import data",
      body: "Scraped Indonesia's export-import data from the BPS portal into Excel pivot tables, so chart data no longer had to be downloaded manually.",
    },
    {
      lead: "Clean",
      title: "nationwide company database",
      body: "Cleaned and validated the database the bank uses to screen prospective debtors, before management acted on it.",
    },
  ],
  tools: ["Excel", "PowerPoint", "Tableau", "Python", "SQL", "Figma"],
} as const;

export const earlier = {
  company: "Nusatalent",
  role: "UI/UX Designer Intern",
  period: "Aug 2023",
  body: "Turned business requirements for the platform's Events section into user flows, wireframes and Figma mockups in a one-month sprint.",
} as const;

export type Research = {
  title: string;
  context: string;
  team: string;
  finding: string;
  methods: string[];
};

// Group projects stay labelled as group work. Joseph co-authored these, he
// didn't do them alone, and the site never suggests otherwise.
export const research: Research[] = [
  {
    title: "Health services and socioeconomic conditions in Indonesia",
    context: "Multivariate Statistics, BINUS",
    team: "Team of 3",
    finding:
      "Across 34 provinces (BPS 2023), two of three canonical functions were significant, with household expenditure carrying the most weight on the socioeconomic side.",
    methods: ["Canonical correlation", "Shapiro-Wilk", "VIF", "BPS open data"],
  },
  {
    title: "Classifying cancer literature: SVC vs LSTM vs BERT",
    context: "Research paper with two faculty co-authors",
    team: "Team of 3",
    finding:
      "On 7,569 biomedical papers, LSTM reached 98% test accuracy. BERT, the heaviest model, scored 87%, barely above a plain SVC at 86%.",
    methods: ["NLP", "SVC", "LSTM", "BERT", "Python"],
  },
  {
    title: "Serenity, a mental health education and consultation platform",
    context: "Software Engineering, BINUS",
    team: "Team of 5",
    finding:
      "Gathered user needs with a 5-point Likert questionnaire, then wrote the functional requirements and wireframes for tests, articles, webinars and psychologist booking.",
    methods: ["Requirements", "Questionnaire design", "Wireframes", "Waterfall"],
  },
];

export type Build = {
  name: string;
  line: string;
  url: string;
  image: string;
  stack: string;
  size: "large" | "small";
};

export const builds: Build[] = [
  {
    name: "ceritabel",
    line: "A full statistical workflow in the browser: EDA, hypothesis tests, OLS with assumption checks, panel and time-series models. About 80 unit tests, p-values checked against R.",
    url: "https://ceritabel.vercel.app/analyze?sample=siswa",
    image: "/projects/ceritabel.png",
    stack: "Next.js, TypeScript, Vitest",
    size: "large",
  },
  {
    name: "xEleven",
    line: "Where the thesis went next. Nine Premier League tools over ten seasons of data: standings, scouting, title races, aging curves and a full Manager Mode.",
    url: "https://epl-xeleven.vercel.app/",
    image: "/projects/xeleven.png",
    stack: "Next.js, Recharts",
    size: "large",
  },
  {
    name: "satumusim",
    line: "The 2018/19 title race, 98 points to 97, told as a scroll-driven data story.",
    url: "https://satumusim.vercel.app/",
    image: "/projects/satumusim.png",
    stack: "Next.js, GSAP",
    size: "small",
  },
  {
    name: "Bakery Kita",
    line: "An ordering system on Postgres: row-level security, an admin dashboard and QRIS checkout through Midtrans (sandbox).",
    url: "https://bakery-kita.vercel.app/",
    image: "/projects/bakery.png",
    stack: "Next.js, Supabase, Midtrans",
    size: "small",
  },
  {
    name: "Juragan Gorengan",
    line: "An idle game about running a street-food empire, with five stalls that each have their own economy.",
    url: "https://juragangorengan.vercel.app/",
    image: "/projects/juragan.png",
    stack: "Next.js, TypeScript, GSAP",
    size: "small",
  },
  {
    name: "After hours",
    line: "A first go at real-time 3D, out of pure curiosity: a coder on a floating island with a day and night toggle.",
    url: "https://afterhours-3d.vercel.app/",
    image: "/projects/after-hours.png",
    stack: "Three.js, GLSL",
    size: "small",
  },
];

export const activities = [
  {
    org: "HIMSTAT, the BINUS statistics student association",
    role: "HR & Development staff",
    period: "2022 to 2024",
    body: "MC for the flagship events, from MaTiC to the Shopee company visit, and chief committee of HIMSTAT Gathering two years running.",
  },
  {
    org: "First Year Program, BINUS",
    role: "Freshmen Partner",
    period: "2022 to 2023",
    body: "Mentored a group of first-year students through orientation and their whole first year.",
  },
] as const;

export const languages = "Bahasa Indonesia (native), Javanese (fluent), English (professional working)";
export const certification = "AWS Certified Cloud Practitioner, valid through 2027";
