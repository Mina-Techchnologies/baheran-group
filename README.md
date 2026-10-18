# Baheran Trading PLC website

A single-page company website for Baheran Trading PLC, built with Next.js 16 (App Router), React 19 and
Tailwind CSS 4. It is built from the company profile, `Profile Baheran Trading Plc(1).pdf`, which sits in
this folder.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also type-checks)
npm run lint
```

## Where things live

| Path | What it holds |
|---|---|
| `src/content/company.ts` | All copy, figures, people, image imports and contact details |
| `src/components/` | Page sections (`Hero`, `CompanySection`, `LeadershipSection`, `ContactSection`, …) |
| `src/components/sections/` | One file per business: export, import, fleet, rental, paints, real estate |
| `src/app/globals.css` | Colour and type tokens, the hero skyline animation, the org chart lines |
| `src/assets/images/` | Photos from the company profile, grouped by business |

## Before going live

- **Contact details are placeholders.** The profile has no phone number, email or head-office address.
  Replace `CONTACT` in `src/content/company.ts`. Every "Start an email" and "Ask about…" link uses that
  email address.
- **Photos.** The photos come from the Word version of the profile, which stores them at about twice the
  PDF's resolution. They are still small (400–1000px wide), so the layout never shows any of them very
  large. Sharper originals can be swapped in at the same paths under `src/assets/images/` without
  changing any code.
- **Export commodities.** The profile says there are eight export items but shows only seven. The
  label "Niger seed" was identified from the photo and should be confirmed.

## Design notes

- **Logo.** `src/assets/images/logo1.jpg` and `logo2.jpg` are the originals as supplied.
  `src/assets/brand/logo-mark.png` is the mark cut out of `logo1.jpg` on a transparent background, used in
  the header and footer. `src/app/icon.png` and `apple-icon.png` are the favicons. `logo2.jpg` was not
  used because its swooshes are cropped at the left edge. The mark is only 117px, so a vector (SVG) logo
  would be sharper if one exists.
- **Colour.** The palette is set as CSS variables at the top of `src/app/globals.css`:
  - `--brand-primary` is the logo blue `#3776BA`, used for buttons, icons, eyebrows and the highlighted
    phrase in each headline.
  - `--brand-base` is a deep navy `#0B2440`, used for headings, the dark sections, the stats card and the
    footer.
  - `--brand-accent` is the swoosh red `#AD3839`. It is kept to the two main calls to action ("Contact
    us", "Start an email") and small emphasis: the route origin dot and the map pin.

  Every text and icon pairing passes WCAG AA.
- **Type and layout.** Plus Jakarta Sans for everything. The layout is light and airy: a floating
  frosted-glass navigation bar, white cards with soft shadows, and navy sections with soft blue glows.
- **Hero showcase.** `src/components/HeroShowcase.tsx` shows one large photo per business in a 16:10
  frame, with a frosted caption card that links to that business's section.
  - **Switching:** six round thumbnails below the frame switch the photo on click, hover or keyboard
    focus. It opens on the cargo fleet.
  - **Photos:** each business's large photo is the `feature` field in `SKYLINE` in
    `src/content/company.ts`. Portrait photos (the paint bucket and Eyor Tower) are marked `portrait` and
    shown whole as a framed print on a navy panel instead of being cropped.
  - **Autoplay:** it advances every 6 seconds (`INTERVAL_MS`). It pauses on hover or keyboard focus and
    is off for visitors who prefer reduced motion.
  - **Glow:** soft brand-colour light flows round the photo all the time: a ring whose blue arcs turn
    once every 12 seconds, plus three colour orbs circling the frame at their own pace
    (`.photo-glow`, `.glow-ring` and `.glow-orb` in `globals.css`). It rests in place for visitors
    who prefer reduced motion. The dotted trade routes now appear only in the fleet section.
- **Photos.** Every photo goes through `src/components/Media.tsx`. It gives them consistent aspect ratios,
  rounded masks, a subtle blue-to-navy colour grade and dark caption gradients. Product packshots are left
  ungraded so the paint colours stay true.
