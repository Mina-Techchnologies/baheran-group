import { ArrowRight, Building2, MapPin } from "lucide-react";

import { EYOR_TOWER, mailto } from "@/content/company";
import { Media } from "../Media";
import { Accent, Eyebrow } from "../SectionHeading";

export function RealEstateSection() {
  return (
    <section
      id="real-estate"
      aria-labelledby="real-estate-title"
      className="on-dark glow-dark section-pad text-white"
    >
      <div className="wrap grid gap-12 md:grid-cols-12 md:items-center md:gap-10">
        <Media
          photo={EYOR_TOWER}
          className="mx-auto aspect-3/4 w-full max-w-88 ring-1 ring-white/10 md:col-span-5 md:mx-0 lg:col-span-4"
          rounded="rounded-card"
          sizes="(min-width: 768px) 352px, 90vw"
          reveal={0}
        />

        <div data-reveal className="md:col-span-7 lg:col-start-6 [--i:1]">
          <Eyebrow icon={Building2} label="Real estate" tone="dark" />
          <h2 id="real-estate-title" className="display-xl mt-5">
            Eyor <Accent tone="dark">Tower</Accent>
          </h2>
          <p className="lede mt-6 text-subtle">
            Our newly completed commercial building stands on Churchill Road at Tewodros Square, in
            the centre of Addis Ababa.
          </p>
          <address className="mt-8 flex items-start gap-4 rounded-2xl border border-white/12 bg-white/5 p-5 not-italic">
            {/* Red as a small point of emphasis: the one location the site is about. */}
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-white">
              <MapPin aria-hidden="true" className="size-5" strokeWidth={1.75} />
            </span>
            <span>
              <span className="block font-semibold">Eyor Tower</span>
              <span className="block text-subtle">Churchill Road, Tewodros Square</span>
              <span className="block text-subtle">Addis Ababa, Ethiopia</span>
            </span>
          </address>
          <a
            href={mailto("Eyor Tower enquiry")}
            className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-white transition hover:bg-primary-dark active:scale-[0.98]"
          >
            Ask about Eyor Tower
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
