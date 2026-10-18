"use client";

import Image from "next/image";
import { ArrowRight, KeyRound } from "lucide-react";
import { useState } from "react";

import { RENTAL_MACHINES, mailto } from "@/content/company";
import { Accent, SectionHeading } from "../SectionHeading";

export function RentalSection() {
  const [selected, setSelected] = useState(0);
  const machine = RENTAL_MACHINES[selected];

  return (
    <section id="rental" aria-labelledby="rental-title" className="section-pad soft-glow">
      <div className="wrap">
        <SectionHeading
          id="rental-title"
          eyebrow={{ icon: KeyRound, label: "Equipment rental" }}
          title={
            <>
              Heavy equipment to rent <Accent>for construction</Accent>
            </>
          }
          lede="We rent heavy-duty machines to the construction sector. Choose one to see it."
        />

        {/* grid-cols-1 keeps the sideways-scrolling machine list from widening the column on phones. */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <ul data-reveal className="flex gap-3 overflow-x-auto pb-3 lg:col-span-5 lg:flex-col lg:overflow-visible lg:pb-0">
            {RENTAL_MACHINES.map((item, i) => {
              const active = i === selected;
              return (
                <li key={item.name} className="w-60 shrink-0 lg:w-auto">
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelected(i)}
                    className={`h-full w-full rounded-2xl border p-4 text-left transition-colors lg:px-5 ${
                      active
                        ? "border-primary bg-primary text-white shadow-float"
                        : "border-line bg-surface hover:border-primary"
                    }`}
                  >
                    <span className="block text-lg font-bold tracking-[-0.01em]">{item.name}</span>
                    <span className={`mt-0.5 block text-[0.9375rem] ${active ? "text-white" : "text-muted"}`}>
                      {item.use}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div data-reveal className="lg:col-span-7 [--i:1]">
            <figure className="media media-graded aspect-16/10 rounded-card bg-surface-2 shadow-card">
              {RENTAL_MACHINES.map((item, i) => (
                <Image
                  key={item.name}
                  src={item.photo.src}
                  // Every photo keeps its alt for search engines; aria-hidden keeps screen readers on the shown one.
                  alt={item.photo.alt}
                  aria-hidden={i !== selected}
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 800px, 100vw"
                  // scale too, for the shared hover zoom on .media photos
                  className={`object-cover transition-[opacity,scale] duration-500 ${i === selected ? "opacity-100" : "opacity-0"}`}
                  style={{ objectPosition: item.photo.focus }}
                />
              ))}
              <figcaption aria-live="polite" className="media-caption text-lg">
                <span key={selected} className="swap-in block">
                  {machine.name}
                </span>
              </figcaption>
            </figure>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
              <a
                href={mailto(`Rental enquiry: ${machine.name}`)}
                className="group inline-flex items-center gap-2 font-semibold text-primary-dark hover:underline hover:underline-offset-4"
              >
                Ask about renting {machine.name.toLowerCase()}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </a>
              <p className="text-[0.9375rem] text-muted">Excavators and dump trucks are also available to rent.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
