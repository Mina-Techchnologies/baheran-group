import type { Metadata } from "next";
import { Noto_Sans_Ethiopic, Plus_Jakarta_Sans } from "next/font/google";

import { JsonLd } from "@/components/JsonLd";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_NAME, SITE_URL, siteJsonLd } from "@/lib/seo";
import "./globals.css";

// One family for everything: ExtraBold headlines, regular body.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

// Only used for the Amharic "Tsehay" mark below the fold, so it is not preloaded.
const notoEthiopic = Noto_Sans_Ethiopic({
  variable: "--font-noto-ethiopic",
  weight: ["800"],
  preload: false,
});

// Ownership tokens from Google Search Console and Bing Webmaster Tools, if verified by meta tag. They are
// public (every page shows them), so Bing's lives here. Google is verified by a DNS TXT record instead.
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.BING_SITE_VERIFICATION ?? "362D2A8584B570C11E0BAEAB904F33E3";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: `%s | ${SITE_NAME}` },
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "business",
  twitter: { card: "summary_large_image" },
  // Allow large image previews and full-length snippets in search results.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    google: googleVerification,
    other: bingVerification ? { "msvalidate.01": bingVerification } : undefined,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Lets Next.js jump straight to the top on page changes despite the smooth in-page scrolling in globals.css.
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${notoEthiopic.variable} antialiased`}
    >
      <body className="min-h-full">
        {children}
        <JsonLd data={siteJsonLd()} />
      </body>
    </html>
  );
}
