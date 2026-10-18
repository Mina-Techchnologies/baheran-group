"use client";

import { useEffect, useState } from "react";

import { NAV } from "@/content/company";
import { Wordmark } from "./Wordmark";

/** Floating frosted-glass navigation bar, inset from the page edges. */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-5">
      <div className="mx-auto max-w-312 rounded-[1.75rem] border border-white/70 bg-white/85 shadow-float backdrop-blur-md">
        <div className="flex h-16 items-center justify-between gap-6 pl-4 pr-2.5 sm:pl-5">
          <a href="#top" aria-label="Baheran Trading PLC, back to top" onClick={() => setMenuOpen(false)}>
            <Wordmark />
          </a>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-8 text-[0.9375rem] font-semibold text-ink">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="decoration-primary decoration-2 underline-offset-[7px] transition-colors hover:text-primary-dark hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden h-11 items-center rounded-full bg-accent px-5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-accent-dark md:inline-flex"
            >
              Contact us
            </a>
            <button
              type="button"
              className="inline-flex h-11 items-center rounded-full border border-line bg-white px-5 text-[0.9375rem] font-semibold md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        <nav id="mobile-menu" aria-label="Main" hidden={!menuOpen} className="border-t border-line md:hidden">
          {/* menu-in replays on every open: an animation restarts when its element stops being hidden. */}
          <ul className="menu-in flex flex-col p-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-3 py-3 text-lg font-bold hover:bg-surface-2"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="flex h-12 items-center justify-center rounded-full bg-accent font-semibold text-white"
              >
                Contact us
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
