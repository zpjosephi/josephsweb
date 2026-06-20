import type { Metadata } from "next";
import { Archivo, Archivo_Black, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Cursor } from "@/components/cursor";
import { site } from "@/lib/site";

// Body / structural sans — neo-grotesque with heavy weights available.
const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Macro display — single black weight, used for oversized uppercase headers.
const archivoBlack = Archivo_Black({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

// Micro telemetry / metadata — monospace matrix.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.shortName} · Computer Science × Statistics`,
    template: `%s · ${site.shortName}`,
  },
  description: site.blurb,
  keywords: [
    "Joseph Irawan",
    "Computer Science",
    "Statistics",
    "Data Science",
    "Full-stack Developer",
    "Next.js",
    "Machine Learning",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.shortName} · Computer Science × Statistics`,
    description: site.blurb,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.shortName} · Computer Science × Statistics`,
    description: site.blurb,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body
        className={`${archivo.variable} ${archivoBlack.variable} ${jetbrainsMono.variable} min-h-full flex flex-col`}
      >
        {/* Keyboard skip link — first focusable element, visible only on focus. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border-2 focus:border-card-border focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
