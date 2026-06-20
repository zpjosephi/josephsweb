import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t-2 border-card-border">
      <div aria-hidden className="hazard-stripe h-1.5 w-full opacity-80" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row">
        <p className="tele text-[10px] text-muted-foreground">
          © {site.shortName} <span className="text-accent">™</span> — END OF
          TRANSMISSION · BUILT W/ NEXT.JS
        </p>
        <div className="flex items-center gap-px bg-card-border">
          <a
            href={site.socials.github}
            target="_blank"
            rel="noreferrer"
            className="tele bg-background px-3 py-1.5 text-[10px] text-muted-foreground transition-colors hover:bg-muted hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={site.socials.email}
            className="tele bg-background px-3 py-1.5 text-[10px] text-muted-foreground transition-colors hover:bg-muted hover:text-accent"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
