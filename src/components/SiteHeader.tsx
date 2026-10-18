"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { NAV, SKYLINE } from "@/content/company";
import { BUSINESS_ICONS } from "./business-icons";
import { Wordmark } from "./Wordmark";

/** The six businesses with their own page ("#fleet" → "/fleet") and icon, for the submenus. */
const BUSINESSES = SKYLINE.map((item) => ({
  ...item,
  page: `/${item.href.slice(1)}`,
  Icon: BUSINESS_ICONS[item.href],
}));

/** How long the businesses panel stays open after the pointer leaves, so it can cross the gap. */
const CLOSE_DELAY_MS = 150;

/** Floating frosted-glass navigation bar, inset from the page edges. */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [businessesOpen, setBusinessesOpen] = useState(false);
  const pathname = usePathname();
  // The section links point into the homepage; on a business page they lead back to it.
  const home = pathname === "/";
  const toHome = (href: string) => (home ? href : `/${href}`);

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
      {/* relative: the businesses panel drops from the bar's full width. */}
      <div className="relative mx-auto max-w-312 rounded-[1.75rem] border border-white/70 bg-white/85 shadow-float backdrop-blur-md">
        <div className="flex h-16 items-center justify-between gap-6 pl-4 pr-2.5 sm:pl-5">
          <a
            href={home ? "#top" : "/"}
            aria-label={home ? "Baheran Trading PLC, back to top" : "Baheran Trading PLC, home"}
            onClick={() => setMenuOpen(false)}
          >
            <Wordmark />
          </a>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-8 text-[0.9375rem] font-semibold text-ink">
              {NAV.map((item) =>
                item.businesses ? (
                  <BusinessesMenu key={item.href} label={item.label} pathname={pathname} overviewHref={toHome(item.href)} />
                ) : (
                  <li key={item.href}>
                    <a
                      href={toHome(item.href)}
                      className="decoration-primary decoration-2 underline-offset-[7px] transition-colors hover:text-primary-dark hover:underline"
                    >
                      {item.label}
                    </a>
                  </li>
                ),
              )}
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
            {NAV.map((item) =>
              item.businesses ? (
                <li key={item.href}>
                  <button
                    type="button"
                    aria-expanded={businessesOpen}
                    aria-controls="mobile-businesses"
                    onClick={() => setBusinessesOpen((open) => !open)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-lg font-bold hover:bg-surface-2"
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-5 text-primary-dark transition-transform ${businessesOpen ? "rotate-180" : ""}`}
                      strokeWidth={2}
                    />
                  </button>
                  <ul id="mobile-businesses" hidden={!businessesOpen} className="menu-in grid grid-cols-2 gap-1 px-1 pb-2">
                    {BUSINESSES.map(({ page, label, Icon }) => (
                      <li key={page}>
                        <Link
                          href={page}
                          aria-current={pathname === page ? "page" : undefined}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2.5 rounded-xl px-2 py-2.5 font-semibold hover:bg-surface-2 aria-[current=page]:bg-surface-2"
                        >
                          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                            <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
                          </span>
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <a
                    href={toHome(item.href)}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-3 text-lg font-bold hover:bg-surface-2"
                  >
                    {item.label}
                  </a>
                </li>
              ),
            )}
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

type BusinessesMenuProps = { label: string; pathname: string; overviewHref: string };

/**
 * Desktop "Businesses" item: a disclosure that drops a panel of the six businesses below the bar,
 * each linking to its own page. It opens on click, on keyboard, or when a mouse hovers it, and
 * closes on Escape, on a click outside, or when focus or the mouse leaves it. The panel stays in
 * the HTML while closed, so crawlers still find every business page.
 */
function BusinessesMenu({ label, pathname, overviewHref }: BusinessesMenuProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLLIElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  // A click right after hovering open keeps the panel open instead of toggling it shut.
  const openedByHover = useRef(false);
  const onBusinessPage = BUSINESSES.some((item) => item.page === pathname);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const close = () => {
    openedByHover.current = false;
    setOpen(false);
  };

  return (
    <li
      ref={root}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        clearTimeout(closeTimer.current);
        if (!open) {
          openedByHover.current = true;
          setOpen(true);
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        closeTimer.current = setTimeout(close, CLOSE_DELAY_MS);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          close();
          button.current?.focus();
        }
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="businesses-menu"
        onClick={() => {
          if (openedByHover.current) {
            openedByHover.current = false;
            return;
          }
          setOpen((value) => !value);
        }}
        className={`inline-flex items-center gap-1 transition-colors hover:text-primary-dark ${
          open || onBusinessPage ? "text-primary-dark" : ""
        }`}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.25}
        />
      </button>

      {/* Spans the bar so the panel centres under it; only the panel itself takes the pointer. */}
      <div id="businesses-menu" hidden={!open} className="pointer-events-none absolute inset-x-0 top-full pt-3">
        <div className="menu-in pointer-events-auto mx-auto max-w-176 rounded-[1.5rem] border border-line bg-white p-2.5 shadow-float">
          <ul className="grid grid-cols-2 gap-1">
            {BUSINESSES.map(({ page, label: name, summary, Icon }) => (
              <li key={page}>
                <Link
                  href={page}
                  aria-current={pathname === page ? "page" : undefined}
                  onClick={close}
                  className="group flex items-start gap-3.5 rounded-2xl p-3 transition-colors hover:bg-surface-2 aria-[current=page]:bg-surface-2"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block font-bold text-ink">{name}</span>
                    <span className="mt-0.5 block text-sm font-medium leading-snug text-muted">{summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={overviewHref}
            onClick={close}
            className="group mt-1.5 flex items-center justify-between gap-4 rounded-2xl bg-surface-2 px-4 py-3 text-sm font-semibold text-primary-dark transition-colors hover:bg-primary/10"
          >
            All six businesses at a glance
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </a>
        </div>
      </div>
    </li>
  );
}
