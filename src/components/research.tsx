import { research } from "@/data/work";

export function Research() {
  return (
    <section aria-labelledby="research-title" className="bg-paper text-ink">
      <div className="shell border-t border-rule py-24 lg:py-28">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-10">
          <h2
            id="research-title"
            className="font-display text-[clamp(2rem,3.8vw,3.2rem)] font-semibold leading-[1.04] tracking-[-0.025em] lg:col-span-4"
          >
            Group projects at BINUS.
          </h2>
          <p className="max-w-[52ch] text-[17px] leading-relaxed text-ink-soft lg:col-span-6 lg:col-start-6 lg:pt-2">
            Team projects, so the credit is shared. My own solo work is the thesis above.
          </p>
        </div>

        <ul className="mt-14">
          {research.map((r) => (
            <li
              key={r.title}
              className="grid grid-cols-1 gap-y-3 border-t border-rule py-8 lg:grid-cols-12 lg:gap-x-10"
            >
              <div className="lg:col-span-4">
                <h3 className="text-[19px] font-semibold leading-snug">{r.title}</h3>
                <p className="mt-1.5 text-[15px] text-ink-soft">
                  {r.context}. {r.team}.
                </p>
              </div>
              <p className="max-w-[62ch] text-[16px] leading-relaxed lg:col-span-4 lg:col-start-6">
                {r.finding}
              </p>
              <ul aria-label="Methods" className="flex flex-wrap content-start gap-1.5 lg:col-span-3 lg:col-start-10">
                {r.methods.map((m) => (
                  <li
                    key={m}
                    className="rounded-full bg-stage/8 px-2.5 py-1 text-[13px] font-medium text-stage"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
