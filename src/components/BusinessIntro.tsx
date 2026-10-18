import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

import { BUSINESS_PAGES, type BusinessSlug } from "@/content/business-pages";
import { CONTACT_TOPICS, SKYLINE, mailto } from "@/content/company";
import { BUSINESS_ICONS } from "./business-icons";
import { Accent, Eyebrow } from "./SectionHeading";

/** Top of a business page: breadcrumb, the page's one h1, a short introduction and its key figures. */
export function BusinessIntro({ slug }: { slug: BusinessSlug }) {
  const page = BUSINESS_PAGES[slug];
  const { label } = SKYLINE.find((item) => item.href === `#${slug}`)!;
  const topic = CONTACT_TOPICS.find((item) => item.id === slug)!;

  return (
    <section aria-labelledby="page-title" className="glow-light relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-20">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-14">
        <div className="lg:col-span-7">
          {/* Load sequence: .enter elements fade up in --i order (globals.css). */}
          <nav aria-label="Breadcrumb" className="enter [--i:0]">
            <ol className="flex items-center gap-1.5 text-sm font-semibold text-muted">
              <li>
                <Link href="/" className="underline-offset-4 hover:text-primary-dark hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" strokeWidth={2} />
              </li>
              <li aria-current="page" className="text-ink">
                {label}
              </li>
            </ol>
          </nav>
          <div className="enter mt-8 [--i:0]">
            <Eyebrow icon={BUSINESS_ICONS[`#${slug}`]} label={label} />
          </div>
          <h1 id="page-title" className="display-xl enter mt-5 max-w-[16ch] [--i:1]">
            {page.heading.lead} <Accent>{page.heading.accent}</Accent>
          </h1>
          <p className="lede enter mt-6 text-muted [--i:2]">{page.intro}</p>
          <div className="enter mt-9 flex flex-wrap items-center gap-3 [--i:3]">
            <a
              href={mailto(topic.subject)}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-white shadow-float transition hover:bg-primary-dark active:scale-[0.98]"
            >
              {topic.label}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </a>
            <a
              href={`#${slug}`}
              className="inline-flex h-12 items-center rounded-full border-2 border-primary px-6 font-semibold text-primary-dark transition hover:bg-primary hover:text-white active:scale-[0.98]"
            >
              See the details
            </a>
          </div>
        </div>

        <dl className="glow-dark enter rounded-[1.75rem] p-6 text-white shadow-float [--i:4] sm:p-8 lg:col-span-5">
          {page.facts.map((fact) => (
            // flex-col-reverse shows the figure above its label while dt stays first, as a dl needs
            <div key={fact.label} className="flex flex-col-reverse gap-1.5 border-b border-white/12 py-5 first:pt-0 last:border-b-0 last:pb-0">
              <dt className="text-[0.9375rem] leading-snug text-subtle">{fact.label}</dt>
              <dd className="text-4xl font-extrabold tracking-[-0.03em] lg:text-[2.75rem]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
