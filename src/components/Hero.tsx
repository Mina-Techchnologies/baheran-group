import { ArrowRight } from "lucide-react";

import { HERO_STATS } from "@/content/company";
import { CountUp } from "./CountUp";
import { HeroShowcase } from "./HeroShowcase";
import { Accent } from "./SectionHeading";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="glow-light relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-6">
          {/* Load sequence: .enter elements fade up in --i order (globals.css). */}
          <h1 id="hero-title" className="display-xl enter max-w-[14ch] [--i:0]">
            From sesame fields to the <Accent>Addis skyline</Accent>
          </h1>
          <p className="lede enter mt-6 max-w-136 text-muted [--i:1]">
            Baheran Trading PLC exports Ethiopian sesame and pulses, imports the machinery that
            builds roads, runs 80 cargo trucks, rents out heavy equipment, makes Tsehay Paints and
            owns Eyor Tower on Churchill Road. A family-owned company, founded in Addis Ababa in
            2009.
          </p>
          <div className="enter mt-9 flex flex-wrap items-center gap-3 [--i:2]">
            <a
              href="#export"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-white shadow-float transition hover:bg-primary-dark active:scale-[0.98]"
            >
              See our businesses
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center rounded-full border-2 border-primary px-6 font-semibold text-primary-dark transition hover:bg-primary hover:text-white active:scale-[0.98]"
            >
              Contact us
            </a>
          </div>
        </div>

        <HeroShowcase />
      </div>

      <div className="wrap relative mt-14 pb-4 lg:mt-16">
        <dl className="glow-dark enter grid grid-cols-2 gap-x-6 gap-y-8 rounded-[1.75rem] px-6 py-8 text-white shadow-float [--i:4] sm:px-10 lg:grid-cols-4 lg:gap-0 lg:py-10">
          {HERO_STATS.map((stat, i) => (
            <div
              key={stat.label}
              // justify-end packs the reversed column to the top, so numbers line up across a row
              className={`flex flex-col-reverse justify-end gap-2 lg:flex-row-reverse lg:items-center lg:gap-4 lg:px-8 ${
                i > 0 ? "lg:border-l lg:border-white/15" : "lg:pl-0"
              }`}
            >
              <dt className="max-w-[16rem] text-[0.875rem] leading-snug text-subtle">{stat.label}</dt>
              <dd className="text-4xl font-extrabold tracking-[-0.03em] lg:text-[2.75rem]">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
