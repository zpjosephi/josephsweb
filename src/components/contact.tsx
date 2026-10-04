import { CopyEmail } from "@/components/copy-email";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <footer id="contact" className="bg-stage text-on-stage">
      <div className="shell grid grid-cols-1 gap-y-10 pb-12 pt-24 lg:grid-cols-12 lg:gap-x-10 lg:pt-32">
        <div className="lg:col-span-7">
          <h2 className="font-display text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
            Got an analyst seat open?
          </h2>
          <p className="mt-6 max-w-[44ch] text-[18px] leading-relaxed text-on-stage-soft">
            Email works best. LinkedIn works too.
          </p>
        </div>

        <div className="flex flex-col justify-end gap-3 lg:col-span-5 lg:items-end">
          <CopyEmail email={site.email} />
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[16px] lg:justify-end">
            <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="underline underline-offset-4 decoration-on-stage-faint hover:decoration-mark">
              LinkedIn
            </a>
            <a href={site.socials.github} target="_blank" rel="noreferrer" className="underline underline-offset-4 decoration-on-stage-faint hover:decoration-mark">
              GitHub
            </a>
            <a href={site.cvUrl} className="underline underline-offset-4 decoration-on-stage-faint hover:decoration-mark">
              CV (PDF)
            </a>
          </div>
        </div>

        <p className="border-t border-on-stage-faint/30 pt-6 text-[13px] text-on-stage-faint lg:col-span-12">
          Joseph Irawan, Jakarta, 2026. Football data from Transfermarkt and Football Manager, used for
          research.
        </p>
      </div>
    </footer>
  );
}
