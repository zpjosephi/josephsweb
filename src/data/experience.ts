// Real career history, pulled from the CV. Keep it honest and quantified.
export type Role = {
  company: string;
  title: string;
  location: string;
  period: string;
  /** What you actually did, with impact where possible. */
  bullets: string[];
  /** Tools / methods used in this role. */
  tools: string[];
};

export const roles: Role[] = [
  {
    company: "Indonesia Eximbank (LPEI)",
    title: "Data Analyst Intern",
    location: "South Jakarta, ID",
    period: "Mar 2025 - Feb 2026",
    bullets: [
      "Wrote market-research reports (Kajian) on export commodities, tracking export trends, market shifts, and macroeconomic drivers to inform business strategy.",
      "Automated the leads-generation workflow that mapped and routed 1,000+ prospective debtor companies to the right business units.",
      "Built interactive Tableau dashboards that auto-generated the charts for those economic reports, removing manual reporting work.",
      "Scraped macroeconomic data from the BPS (Statistics Indonesia) portal into Excel pivot tables for faster analysis.",
      "Cleaned and validated the full company database so the numbers were reliable before management acted on them.",
    ],
    tools: ["Tableau", "Python", "Excel", "SQL", "Web scraping", "Figma"],
  },
  {
    company: "Nusatalent",
    title: "UI/UX Designer Intern",
    location: "West Jakarta, ID",
    period: "Aug 2023",
    bullets: [
      "Designed an interactive website prototype for the platform's Events section, focused on easy event discovery.",
      "Produced end-to-end design deliverables: user flows, wireframes, and high-fidelity mockups in Figma.",
      "Ran a one-month design sprint, turning business requirements into a developer-ready product.",
    ],
    tools: ["Figma", "Wireframing", "UI/UX"],
  },
];

export type EducationEntry = {
  school: string;
  degree: string;
  period: string;
  coursework: string[];
};

export const education: EducationEntry = {
  school: "Bina Nusantara University",
  degree: "B.Sc. Computer Science & Statistics",
  period: "Expected Aug 2026",
  coursework: [
    "Machine Learning",
    "Deep Learning (TensorFlow, Keras)",
    "Artificial Intelligence",
    "Data Analysis",
    "Text & Data Mining",
    "Computational Biology (BioPython)",
    "Software Engineering",
    "Object-Oriented Programming (Java)",
    "Web Programming",
    "UI/UX",
  ],
};

export const certifications: string[] = [
  "AWS Certified Cloud Practitioner (through 2027)",
  "Progate · JavaScript Fundamental",
  "Progate · Python Fundamental",
];

// Leadership and communication. The differentiator most engineers lack.
// Reframes campus MC / committee / mentoring work as professional evidence
// that Joseph can present, lead, and explain (the "communicates data" half).
export type Activity = {
  org: string;
  role: string;
  period: string;
  bullets: string[];
};

export const activities: Activity[] = [
  {
    org: "HIMSTAT, BINUS Statistics Student Association",
    role: "HR & Development Staff · Event MC & Chief Committee",
    period: "Mar 2022 - Mar 2024",
    bullets: [
      "Master of Ceremony for the association's flagship events: seminars, anniversaries, the Shopee company visit, MATIC, and P2M.",
      "Chief Committee for HIMSTAT Gathering 2022 & 2023, leading the organizing team end to end.",
    ],
  },
  {
    org: "First Year Program, BINUS University",
    role: "Freshmen Partner (Mentor)",
    period: "Aug 2022 - Jul 2023",
    bullets: [
      "Mentored first-year students through their transition into university life across the year.",
      "Guided new students during the 5-day Orientation & Transition Program.",
    ],
  },
];

export type Language = { name: string; level: string };

export const languages: Language[] = [
  { name: "Bahasa Indonesia", level: "Native" },
  { name: "Javanese", level: "Fluent" },
  { name: "English", level: "Professional working" },
];
