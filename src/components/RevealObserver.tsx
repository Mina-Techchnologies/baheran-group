"use client";

import { useEffect } from "react";

/**
 * Fades each [data-reveal] element up once, as it first scrolls into view. Anything already on
 * screen (or scrolled past) is left alone, and nothing is hidden until this has run, so the page is
 * fully visible without JavaScript or with reduced motion.
 */
export function RevealObserver() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "in";
          observer.unobserve(entry.target);
        }
      },
      // threshold 0 so elements taller than the viewport still reveal
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])")) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.dataset.revealed = "now";
      else observer.observe(el);
    }
    document.documentElement.dataset.motion = "";

    return () => observer.disconnect();
  }, []);

  return null;
}
