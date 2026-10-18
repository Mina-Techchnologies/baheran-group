"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";

import { SKYLINE } from "@/content/company";
import { BUSINESS_ICONS } from "./business-icons";

/** Opens on the cargo fleet: the most striking of the six photos. */
const INITIAL = SKYLINE.findIndex((item) => item.href === "#fleet");

/** How long each business stays on screen while the showcase plays on its own. */
const INTERVAL_MS = 6000;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Hero showcase: one large photo per business, switched by the round thumbnails below it.
 * Landscape photos fill a 16:10 frame (a light trim of their 16:9 source). Portrait photos are
 * shown whole as a framed print on a navy brand panel, so nothing important is cut off.
 *
 * It advances on its own every few seconds. Autoplay pauses while the pointer is over the
 * showcase or a keyboard user is inside it, and is off entirely for visitors who prefer reduced
 * motion.
 */
export function HeroShowcase() {
  const [selected, setSelected] = useState(INITIAL);
  const [hovering, setHovering] = useState(false);
  const [keyboardInside, setKeyboardInside] = useState(false);
  // Assume reduced motion on the server so nothing moves before the visitor's setting is known.
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );

  const running = !reducedMotion && !hovering && !keyboardInside;
  const active = SKYLINE[selected];
  const Icon = BUSINESS_ICONS[active.href];

  // A fresh interval after every change, so a pause or a manual pick never cuts the next one short.
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => setSelected((i) => (i + 1) % SKYLINE.length), INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [running, selected]);

  return (
    <div
      className="relative lg:col-span-6 lg:self-center"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovering(false)}
      onFocus={(e) => e.target.matches(":focus-visible") && setKeyboardInside(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node | null) && setKeyboardInside(false)}
    >
      <figure className="relative">
        {/* Signature: soft brand light spreading out from behind the photo (.photo-glow in globals.css). */}
        <div aria-hidden="true" className="photo-glow enter pointer-events-none [--i:1]">
          <span className="glow-ring" />
          <span className="glow-orb glow-orb--sky" />
          <span className="glow-orb glow-orb--blue" />
          <span className="glow-orb glow-orb--deep" />
        </div>

        <div className="skyline-slice media media-graded relative aspect-16/10 rounded-[1.75rem] bg-ink shadow-float">
          {SKYLINE.map((item, i) => {
            const shown = i === selected;
            const { feature } = item;
            return (
              <div
                key={item.href}
                aria-hidden={!shown}
                className={`absolute inset-0 transition-opacity duration-700 ${shown ? "opacity-100" : "opacity-0"} ${
                  feature.portrait ? "glow-dark" : ""
                }`}
              >
                {feature.portrait ? (
                  // Framed print on the right, clear of the caption card on the left.
                  <div
                    className="absolute top-1/2 right-[7%] h-[84%] -translate-y-1/2 overflow-hidden rounded-xl shadow-float ring-1 ring-white/25"
                    style={{ aspectRatio: `${feature.src.width} / ${feature.src.height}` }}
                  >
                    <Image
                      src={feature.src}
                      alt={feature.alt}
                      fill
                      quality={90}
                      sizes="(min-width: 1024px) 260px, 45vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <Image
                    src={feature.src}
                    // Hidden slides keep their alt for search engines; aria-hidden above keeps screen readers on the shown one.
                    alt={feature.alt}
                    fill
                    quality={90}
                    loading={i === INITIAL ? "eager" : undefined}
                    sizes="(min-width: 1024px) 640px, 100vw"
                    className="object-cover"
                    style={{ objectPosition: feature.focus }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <figcaption
          // Announce changes only when the visitor is driving them, not on every automatic advance.
          aria-live={running ? "off" : "polite"}
          className="enter relative z-10 mx-3 -mt-8 rounded-2xl border border-white/70 bg-white/92 px-4 py-3.5 shadow-float backdrop-blur-md [--i:5] sm:absolute sm:bottom-4 sm:left-4 sm:mx-0 sm:mt-0 sm:w-64"
        >
          {/* Keyed so the text crossfades on each change. */}
          <div key={selected} className="swap-in">
            <p className="eyebrow flex items-center gap-2 text-primary-dark">
              {Icon && <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />}
              {active.label}
            </p>
            <p className="mt-1.5 text-[0.9375rem] font-semibold leading-snug">{active.summary}</p>
            <a
              href={active.href}
              className="group mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-dark hover:underline hover:underline-offset-4"
            >
              Explore {active.label.toLowerCase()}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </a>
          </div>
        </figcaption>
      </figure>

      <div role="group" aria-label="Choose a business to preview" className="enter relative mt-6 grid grid-cols-6 gap-1.5 [--i:3] sm:gap-3">
        {SKYLINE.map((item, i) => {
          const shown = i === selected;
          return (
            <button
              key={item.href}
              type="button"
              aria-pressed={shown}
              onClick={() => setSelected(i)}
              onMouseEnter={() => setSelected(i)}
              onFocus={() => setSelected(i)}
              className="group flex flex-col items-center gap-2 rounded-xl py-1"
            >
              <span
                className={`relative block size-11 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-white transition-all sm:size-14 ${
                  shown ? "ring-primary" : "ring-transparent opacity-75 group-hover:opacity-100 group-hover:ring-line"
                }`}
              >
                <Image
                  src={item.photo.src}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover"
                  style={{ objectPosition: item.photo.focus }}
                />
              </span>
              <span
                className={`text-center text-[0.6875rem] font-semibold leading-tight sm:text-[0.8125rem] ${
                  shown ? "text-ink" : "text-muted"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
