"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1400;
const easeOut = (t: number) => 1 - (1 - t) ** 3;

/**
 * A figure such as "80" or "500+" that counts up from 0 the first time it scrolls into view.
 * Renders the final value on the server; an invisible copy reserves its width so nothing beside
 * it moves while it counts, and screen readers only ever hear the final value.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const match = /^(\d+)(.*)$/.exec(value);
    const el = ref.current;
    if (!match || !el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = Number(match[1]);
    const suffix = match[2];
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION, 1);
          setShown(`${Math.round(easeOut(t) * target)}${suffix}`);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      // Same margin as RevealObserver, so a figure starts counting as its card fades in.
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="inline-grid">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {shown}
      </span>
    </span>
  );
}
