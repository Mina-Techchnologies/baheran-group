# Baheran Trading PLC website

A company website for Baheran Trading PLC, built with Next.js 16 (App Router), React 19 and Tailwind CSS 4.
The homepage shows all six businesses; each business also has its own page (`/export`, `/import`, `/fleet`,
`/rental`, `/paints`, `/real-estate`) so search engines can rank it on its own. It is built from the company profile, `Profile Baheran Trading Plc(1).pdf`, which sits in
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
| `src/content/business-pages.ts` | Search titles, descriptions, headlines, key figures and questions for each business page |
| `src/lib/seo.ts` | Site address, page metadata and schema.org structured data |
| `src/app/<business>/` | One folder per business page and its share image, all built from `src/components/BusinessPage.tsx` |
| `src/components/` | Page sections (`Hero`, `CompanySection`, `LeadershipSection`, `ContactSection`, …) |
| `src/components/sections/` | One file per business: export, import, fleet, rental, paints, real estate |
| `src/app/globals.css` | Colour and type tokens, the hero skyline animation, the org chart lines |
| `src/assets/images/` | Photos from the company profile, grouped by business |

## Before going live

- **Domain.** Links in the sitemap, canonical tags and structured data use `https://baherangroup.com`. If the
  site goes live on another address, set `NEXT_PUBLIC_SITE_URL` (for example `https://www.baherangroup.com`)
  in the hosting environment.
- **Get indexed.** Once the site is live:
  1. Add the site in [Google Search Console](https://search.google.com/search-console) and
     [Bing Webmaster Tools](https://www.bing.com/webmasters). Bing also feeds ChatGPT search and Copilot.
     Verify ownership by DNS record, or put the meta-tag codes in `GOOGLE_SITE_VERIFICATION` and
     `BING_SITE_VERIFICATION`.
  2. Submit `https://baherangroup.com/sitemap.xml` in both.
  3. Use URL Inspection in Search Console to request indexing of the homepage and the six business pages.
  4. Add the company to [Google Business Profile](https://business.google.com) with the same name and
     address, so it shows in Maps and local results.

- **The phone number is a placeholder.** The email (support@baherangroup.com) and head-office address
  (Delta Complex, Akaki Kaliti) are real. Replace `phone` and `phoneHref` in `CONTACT` in
  `src/content/company.ts`. Every "Start an email" and "Ask about…" link uses the `CONTACT` email address.
  While the number is all zeros it is left out of the structured data and `llms.txt`; it is added
  automatically once it is real.
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
- **Header menu.** "Businesses" in `src/components/SiteHeader.tsx` opens a panel listing the six
  businesses (icon, name and the `summary` from `SKYLINE`), each linking to its own page. On desktop it
  opens on hover, click or keyboard. In the phone menu it expands in place.
- **Type and layout.** Plus Jakarta Sans for everything. The layout is light and airy: a floating
  frosted-glass navigation bar, white cards with soft shadows, and navy sections with soft blue glows.
  Three white sections (about, rental, leadership) carry two soft, slowly drifting blue glows
  (`soft-glow` in `globals.css`) so the page isn't flat white.
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

## Search and AI

- **Pages.** Every page has its own title, description, canonical link and share image. The homepage and the
  six business pages are listed in `/sitemap.xml`, with their main photos for image search.
- **Business pages.** Each one opens with a single `h1` and key figures, reuses the business's homepage
  section, then answers common questions and links to the other five. The questions and answers use only
  facts from the company profile, and are edited in `src/content/business-pages.ts`.
- **Structured data.** Every page describes the company (`Organization`) and the site (`WebSite`) in
  schema.org JSON-LD. Business pages add the page, the service (or, for Eyor Tower, the place), a breadcrumb
  and their questions (`FAQPage`). Check a page with Google's
  [Rich Results Test](https://search.google.com/test/rich-results).
- **AI assistants.** `/robots.txt` allows all crawlers and names the main AI ones (GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended and others), so a later rule can't shut them out by accident.
  `/llms.txt` gives AI tools a plain-text summary of the company with links to every page. It is built
  from the same content files, so it stays in sync.
- **Share images.** `src/lib/share-card.tsx` draws the 1200×630 card shown when a link is shared on
  Telegram, WhatsApp, LinkedIn or X: the logo and headline on navy, beside the business's showcase photo at
  its own aspect ratio. The font comes from `@fontsource/plus-jakarta-sans`.
