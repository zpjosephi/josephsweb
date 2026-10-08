import type { Metadata } from "next";
import { Funnel_Display, Funnel_Sans, Geist, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
});

// night-lab home: Cabinet Grotesk display (variable wght, the kinetic title
// animates it), Geist body, JetBrains Mono for live readouts only
const cabinet = localFont({
  src: "../fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-cabinet",
  weight: "100 900",
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://josephirawan.vercel.app"),
  title: {
    default: site.shortName,
    template: `%s - ${site.shortName}`,
  },
  description: site.blurb,
  authors: [{ name: site.name }],
  openGraph: {
    title: site.shortName,
    description: site.blurb,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.shortName,
    description: site.blurb,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${funnelDisplay.variable} ${funnelSans.variable} ${cabinet.variable} ${geist.variable} ${jetbrains.variable} antialiased`}>
      <body className="min-h-dvh">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-mark focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-mark-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
