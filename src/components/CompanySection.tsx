import { BadgeCheck, CalendarDays, Coins, Handshake, Landmark, Wheat, type LucideIcon } from "lucide-react";

import { ABOUT, SKYLINE } from "@/content/company";
import { BUSINESS_ICONS } from "./business-icons";
import { CountUp } from "./CountUp";
import { Media } from "./Media";
import { stagger } from "./motion";
import { Accent, Eyebrow } from "./SectionHeading";

const CREDENTIAL_ICONS: Record<string, LucideIcon> = {
  trade: Landmark,
  esqa: BadgeCheck,
  ecx: Wheat,
  chamber: Handshake,
};

const etb = (value: number) => `ETB ${value.toLocaleString("en-US")}`;

/**
 * About, as a bento grid: the story beside tiles that each carry one fact — the founding year,
 * the capital growth, where it started, the six businesses and the licences.
 */
export function CompanySection() {
  return (
    <section id="company" aria-labelledby="company-title" className="section-pad">
      <div className="wrap grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        <div data-reveal className="pb-6 sm:col-span-2 lg:col-span-6 lg:row-span-2 lg:pr-10 lg:pb-0">
          <Eyebrow label="About Baheran" />
          <h2 id="company-title" className="display-lg mt-5 max-w-[16ch]">
            Started in grain export. <Accent>Six businesses today.</Accent>
          </h2>
          <p className="lede mt-7">
            Baheran Trading PLC was founded in October 2009 to export Ethiopian grain and oilseeds,
            building on our managing director&rsquo;s years of trading cereals, oilseeds and pulses.
          </p>
          <p className="mt-5 text-muted">
            The company is owned by shareholders from one family. Since 2009 they have grown its
            paid-up capital from ETB 5 million to ETB 211.8 million and added import, cargo
            transport, equipment rental, paint manufacturing and real estate.
          </p>
          <p className="mt-5 text-muted">
            In every business we invest in modern equipment and trained people, to win a larger
            share of the market and to make a bigger contribution to the Ethiopian economy.
          </p>
        </div>

        <FoundedTile />

        <CapitalTile />

        {/* 16:9 matches the 800×450 source, so the photo is shown whole and never enlarged. */}
        <Media
          photo={ABOUT.startPhoto}
          caption="Where it started: grain and oilseed export"
          rounded="rounded-card"
          className="aspect-video shadow-card sm:col-span-2 lg:col-span-6"
          sizes="(min-width: 1024px) 620px, 100vw"
          reveal={0}
        />

        <nav aria-labelledby="six-businesses" data-reveal className="card flex flex-col p-5 sm:col-span-2 sm:p-6 lg:col-span-6">
          <h3 id="six-businesses" className="display-md">
            Our six businesses
          </h3>
          {/* auto-rows-fr + flex-1 stretch the links to match the height of the tile beside it */}
          <ul className="mt-5 grid flex-1 auto-rows-fr gap-2.5 sm:grid-cols-2">
            {SKYLINE.map((item) => {
              const Icon = BUSINESS_ICONS[item.href];
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group flex h-full items-center gap-3 rounded-2xl border border-line p-3 transition-colors hover:border-primary hover:bg-primary/5"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      {Icon && <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold leading-snug">{item.label}</span>
                      <span className="block text-sm leading-snug text-muted">{item.summary}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div data-reveal className="card p-5 sm:col-span-2 sm:p-6 lg:col-span-6 lg:[--i:1]">
          <h3 className="display-md">Licences and memberships</h3>
          <dl className="mt-3">
            {ABOUT.credentials.map((item) => {
              const Icon = CREDENTIAL_ICONS[item.id];
              return (
                <div key={item.id} className="flex gap-3.5 border-b border-line py-3.5 last:border-b-0 last:pb-0">

                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    {Icon && <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />}
                  </span>
                  <div>
                    <dt className="text-sm font-semibold text-muted">{item.term}</dt>
                    <dd className="mt-0.5 font-medium leading-snug">{item.detail}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}

function FoundedTile() {
  return (
    <div data-reveal className="on-dark glow-dark flex flex-col rounded-card p-6 text-white shadow-float [--i:1] lg:col-span-3">
      <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-primary-light">
        <CalendarDays aria-hidden="true" className="size-5" strokeWidth={1.75} />
      </span>
      <p className="mt-6 text-6xl font-extrabold leading-none tracking-[-0.04em]">{ABOUT.founded.year}</p>
      <p className="mt-3 font-semibold leading-snug">{ABOUT.founded.detail}</p>
      <p className="mt-3 text-sm leading-snug text-subtle">{ABOUT.legalForm}</p>
    </div>
  );
}

/** Paid-up capital at founding vs now: one series, two shades of the brand blue, labelled directly. */
function CapitalTile() {
  const { atFounding, now } = ABOUT.capital;
  const multiple = Math.floor(now / atFounding);
  const rows = [
    { label: "At founding", value: atFounding, bar: "bg-primary-soft" },
    { label: "Today", value: now, bar: "bg-primary-dark" },
  ];

  return (
    <figure data-reveal className="card flex flex-col p-6 [--i:2] lg:col-span-3">
      <figcaption className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-muted">Paid-up capital</span>
        <Coins aria-hidden="true" className="size-5 text-primary" strokeWidth={1.75} />
      </figcaption>
      <p className="mt-3 text-5xl font-extrabold leading-none tracking-[-0.04em]">
        <CountUp value={`${multiple}×`} />
      </p>
      <p className="mt-2 text-sm text-muted">larger than at founding</p>

      <dl className="mt-auto space-y-4 pt-6">
        {rows.map((row, i) => (
          <div key={row.label} title={`${row.label}: ${etb(row.value)}`}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <dt className="text-muted">{row.label}</dt>
              <dd className="whitespace-nowrap font-semibold">{etb(row.value)}</dd>
            </div>
            {/* Bar anchored at the left baseline; only the data end is rounded. */}
            <div aria-hidden="true" className="mt-2 h-2.5 rounded-r-sm bg-surface-2">
              <div
                data-reveal="grow"
                className={`h-full min-w-1 rounded-r-sm ${row.bar}`}
                style={{ width: `${(row.value / now) * 100}%`, ...stagger(i) }}
              />
            </div>
          </div>
        ))}
      </dl>
    </figure>
  );
}
