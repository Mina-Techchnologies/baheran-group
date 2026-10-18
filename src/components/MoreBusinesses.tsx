import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { BusinessSlug } from "@/content/business-pages";
import { SKYLINE } from "@/content/company";
import { BUSINESS_ICONS } from "./business-icons";
import { stagger } from "./motion";

/** Links from one business page to the other five, so visitors and crawlers can move between them. */
export function MoreBusinesses({ current }: { current: BusinessSlug }) {
  const others = SKYLINE.filter((item) => item.href !== `#${current}`);

  return (
    <nav aria-labelledby="more-businesses" className="mt-20 lg:mt-24">
      <h2 id="more-businesses" data-reveal className="display-md">
        Our other businesses
      </h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {others.map((item, i) => {
          const Icon = BUSINESS_ICONS[item.href];
          return (
            <li key={item.href} data-reveal style={stagger(i)}>
              <Link
                href={`/${item.href.slice(1)}`}
                // Icon beside the text on phones, above it once the cards sit side by side.
                className="group flex h-full items-center gap-4 rounded-card border border-line bg-surface p-4 shadow-card transition-colors hover:border-primary sm:flex-col sm:items-start sm:p-5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  {Icon && <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />}
                </span>
                <span>
                  <span className="flex items-center gap-1.5 font-semibold">
                    {item.label}
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-muted">{item.summary}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
