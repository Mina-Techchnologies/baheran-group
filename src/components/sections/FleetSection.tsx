import { Truck } from "lucide-react";

import { FLEET_PHOTOS } from "@/content/company";
import { Media } from "../Media";
import { RouteLines } from "../RouteLines";
import { Accent, SectionHeading } from "../SectionHeading";

export function FleetSection() {
  const { dumpTrucks, tippers, heavyTruck } = FLEET_PHOTOS;
  const photos = [
    { photo: dumpTrucks, caption: "Dump trucks" },
    { photo: heavyTruck, caption: "Heavy-duty trucks" },
    { photo: tippers, caption: "Tipper trucks" },
  ];

  return (
    <section
      id="fleet"
      aria-labelledby="fleet-title"
      className="on-dark glow-dark section-pad relative overflow-hidden text-white"
    >
      {/* Signature echo, kept to the empty top-right corner so it never crosses text. */}
      <RouteLines tone="onDark" className="top-0 right-0 hidden h-[19%] w-[30%] lg:block" />

      <div className="wrap relative">
        <SectionHeading
          id="fleet-title"
          tone="dark"
          eyebrow={{ icon: Truck, label: "Cargo fleet" }}
          title={
            <>
              Dry and bulk cargo, moved by our own <Accent tone="dark">fleet of 80 trucks</Accent>
            </>
          }
          lede="We run a transport service for dry and bulk cargo with dump trucks, tippers and heavy-duty trucks of our own."
        />

        {/* A convoy: the lead truck on the right drives in first and the others follow it from the left. */}
        <div className="mt-14 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {photos.map(({ photo, caption }, i) => (
            <Media
              key={caption}
              photo={photo}
              caption={caption}
              reveal={photos.length - 1 - i}
              entrance="drive"
              className="aspect-4/3 ring-1 ring-white/10"
              sizes="(min-width: 640px) 45vw, 100vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
