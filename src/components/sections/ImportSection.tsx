import { Car, Container, Disc3, FlaskConical, Forklift, Grid3x3, type LucideIcon } from "lucide-react";

import { IMPORT_LINES, IMPORT_PHOTOS } from "@/content/company";
import { Media } from "../Media";
import { stagger } from "../motion";
import { Accent, SectionHeading } from "../SectionHeading";

const LINE_ICONS: Record<string, LucideIcon> = {
  "Heavy-duty machinery": Forklift,
  "Motor vehicles": Car,
  Tyres: Disc3,
  "Reinforcement steel": Grid3x3,
  "Industrial chemicals": FlaskConical,
};

export function ImportSection() {
  return (
    <section id="import" aria-labelledby="import-title" className="section-pad">
      <div className="wrap">
        <SectionHeading
          id="import-title"
          eyebrow={{ icon: Container, label: "Import" }}
          title={
            <>
              Machinery and materials, <Accent>brought into Ethiopia</Accent>
            </>
          }
          lede="Our import portfolio covers 15 products. We are best known for heavy-duty construction machinery."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-12 lg:gap-6">
          <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {IMPORT_LINES.map((line, i) => {
              const Icon = LINE_ICONS[line.name];
              return (
                // Each row's contents are written in from the left, like a shipping list.
                <li key={line.name} data-reveal="wipe" style={stagger(i)} className="card lift flex items-center gap-4 p-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    {Icon && <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />}
                  </span>
                  <span>
                    <span className="block font-semibold">{line.name}</span>
                    {line.note && <span className="block text-[0.9375rem] text-muted">{line.note}</span>}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* The photos open from the middle like container doors. */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
            <Media photo={IMPORT_PHOTOS.loader} caption="Wheel loaders" className="aspect-4/3 shadow-card" sizes="(min-width: 1024px) 480px, 70vw" reveal={0} entrance="doors" />
            <Media photo={IMPORT_PHOTOS.pickup} caption="Pickups" className="aspect-4/3 shadow-card" sizes="(min-width: 1024px) 480px, 70vw" reveal={1} entrance="doors" />
            <Media photo={IMPORT_PHOTOS.tyre} caption="Truck tyres" className="aspect-4/3 shadow-card" sizes="(min-width: 1024px) 480px, 70vw" graded={false} contain reveal={2} entrance="doors" />
            <Media photo={IMPORT_PHOTOS.rebar} caption="Reinforcement steel" className="aspect-4/3 shadow-card" sizes="(min-width: 1024px) 480px, 70vw" reveal={3} entrance="doors" />
          </div>
        </div>
      </div>
    </section>
  );
}
