import { Ship } from "lucide-react";

import { CLEANING_PLANT, COMMODITIES } from "@/content/company";
import { Media } from "../Media";
import { type FlyFrom, stagger } from "../motion";
import { Accent, SectionHeading } from "../SectionHeading";

/* Where each card flies in from, left to right across the desktop row: the ends slide in from the
   sides and the middle ones drop and rise in turn, so the row comes together toward its centre. */
const ENTRANCE: FlyFrom[] = ["left", "top", "bottom", "top", "bottom", "top", "right"];

export function ExportSection() {
  return (
    // overflow-x-clip keeps cards that start off-screen from adding a horizontal scrollbar
    <section id="export" aria-labelledby="export-title" className="section-pad overflow-x-clip bg-surface-2">
      <div className="wrap">
        <SectionHeading
          id="export-title"
          eyebrow={{ icon: Ship, label: "Export" }}
          title={
            <>
              Sesame, pulses and beans for <Accent>buyers abroad</Accent>
            </>
          }
          lede="We export eight Ethiopian commodities, led by sesame, peas and beans. Seven of them are shown here."
        />

        {/* Commodity cards. Round masks read as sample trays. */}
        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-7">
          {COMMODITIES.map((item, i) => (
            <li
              key={item.name}
              data-reveal="fly"
              data-from={ENTRANCE[i % ENTRANCE.length]}
              style={stagger(i)}
              className="card lift p-3 text-center sm:p-4"
            >
              <Media
                photo={item.photo}
                rounded="rounded-full"
                sizes="(min-width: 1024px) 270px, (min-width: 640px) 40vw, 80vw"
                className="aspect-square"
              />
              <p className="mt-3 text-[0.9375rem] font-semibold leading-snug">{item.name}</p>
            </li>
          ))}
        </ul>

        <div data-reveal className="card mt-5 grid items-center gap-8 p-3 sm:p-4 lg:grid-cols-12 lg:gap-10">
          <Media
            photo={CLEANING_PLANT}
            sizes="(min-width: 1024px) 800px, 100vw"
            className="aspect-16/10 lg:col-span-7"
          />
          <div className="px-3 pb-4 lg:col-span-5 lg:px-0 lg:pb-0 lg:pr-8">
            <h3 className="display-md">Our own cleaning plant</h3>
            <p className="mt-4 text-muted">
              Sesame is cleaned and processed at our plant before it ships. The Ethiopian
              Standardization and Quality Authority certifies us for this work. We are also a member
              of the Ethiopian Commodity Exchange.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
