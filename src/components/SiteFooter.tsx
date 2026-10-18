import Link from "next/link";

import { CONTACT, SKYLINE } from "@/content/company";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  return (
    <footer className="on-dark glow-dark relative overflow-hidden text-white">
      {/* Oversized, near-invisible company name as a watermark. */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-0.18em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[clamp(6rem,19vw,17rem)] font-extrabold leading-none tracking-[-0.04em] text-white/4"
      >
        BAHERAN
      </p>

      <div className="wrap relative grid gap-12 pt-20 pb-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Wordmark tone="light" />
          <p className="mt-6 max-w-104 text-[0.9375rem] text-subtle">
            Baheran Trading PLC is an Ethiopian import, export and manufacturing company, founded in
            Addis Ababa in 2009. Licensed by the Ministry of Trade for import and export.
            Member of the Ethiopian Commodity Exchange and the Addis Ababa Chamber of Commerce and
            Sectoral Association.
          </p>
        </div>

        <nav aria-labelledby="footer-businesses" className="md:col-span-3 md:col-start-7">
          <h2 id="footer-businesses" className="eyebrow text-primary-light">
            Businesses
          </h2>
          <ul className="mt-5 space-y-2.5">
            {/* Each business's own page, so every page links to all six. */}
            {SKYLINE.map((item) => (
              <li key={item.href}>
                <Link href={`/${item.href.slice(1)}`} className="text-white/90 decoration-primary-light underline-offset-4 hover:text-white hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="eyebrow text-primary-light">Contact</h2>
          <ul className="mt-5 space-y-2.5">
            <li>
              <a href={CONTACT.phoneHref} className="text-white/90 decoration-primary-light underline-offset-4 hover:text-white hover:underline">
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="text-white/90 decoration-primary-light underline-offset-4 hover:text-white hover:underline">
                {CONTACT.email}
              </a>
            </li>
            <li className="text-subtle">{CONTACT.addressLines.slice(0, 2).join(", ")}</li>
          </ul>
        </div>
      </div>
      <div className="wrap relative">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/12 py-6 text-sm text-subtle">
          <p>&copy; Baheran Trading PLC</p>
          <p>
            Developed by{" "}
            <a
              href="https://www.minatechnologies.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/90 decoration-primary-light underline-offset-4 hover:text-white hover:underline"
            >
              Mina Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
