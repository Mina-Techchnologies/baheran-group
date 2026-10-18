import Image from "next/image";
import { BadgeCheck, PaintBucket } from "lucide-react";

import { PAINT_CERTIFICATIONS, PAINTS } from "@/content/company";
import { Media } from "../Media";
import { stagger } from "../motion";
import { Accent, Eyebrow } from "../SectionHeading";

export function PaintsSection() {
  return (
    <section id="paints" aria-labelledby="paints-title" className="section-pad bg-surface-2">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div data-reveal className="lg:col-span-7">
            <Eyebrow icon={PaintBucket} label="Tsehay Paints" />
            {/* The brand name exactly as printed on the buckets: "Tsehay Kelem", sun paint. */}
            <p
              lang="am"
              className="mt-6 font-ethiopic text-[clamp(2.75rem,6vw,4.75rem)] font-extrabold leading-[1.05] text-primary"
            >
              ፀሐይ ቀለም
            </p>
            <h2 id="paints-title" className="display-lg mt-3 max-w-[18ch]">
              Tsehay Paints, made in <Accent>our own factory</Accent>
            </h2>
          </div>
          <p data-reveal className="lede text-muted lg:col-span-5 [--i:1]">
            The factory produces more than 500 kinds of paint and paint-related products, up to 10
            million litres a year. Tsehay supplies households, large construction companies and real
            estate developers.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {PAINTS.map((paint, i) => (
            // Each card spreads open like a drop of paint, then its bucket drops onto its base.
            <li key={paint.photo.alt} data-reveal="splash" style={stagger(i)} className="card lift p-3">
              {/* Packshots stay ungraded so the product colours are true. */}
              <Media
                photo={paint.photo}
                graded={false}
                className="aspect-4/5"
                sizes="(min-width: 1024px) 190px, (min-width: 640px) 30vw, 46vw"
              />
              <p className="mt-3 px-1 text-lg font-bold leading-tight tracking-[-0.01em]">{paint.name}</p>
              <p className="mt-1 px-1 pb-1 text-[0.875rem] leading-snug text-muted">{paint.kind}</p>
            </li>
          ))}
        </ul>

        <div data-reveal className="card mt-5 flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-8">
          <Image
            src={PAINT_CERTIFICATIONS.src}
            alt={PAINT_CERTIFICATIONS.alt}
            quality={90}
            sizes="160px"
            className="h-auto w-36 shrink-0"
          />
          <p className="flex items-start gap-3 font-medium">
            <BadgeCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={1.75} />
            Tsehay products carry ISOQAR registration and UKAS-accredited product certification.
          </p>
        </div>
      </div>
    </section>
  );
}
