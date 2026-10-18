import type { Metadata } from "next";
import { Noto_Sans_Ethiopic, Plus_Jakarta_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Baheran Trading PLC | Addis Ababa",
  description:
    "Baheran Trading PLC exports Ethiopian sesame and pulses, imports machinery and vehicles, runs an 80-truck cargo fleet, rents heavy equipment, makes Tsehay Paints and owns Eyor Tower in Addis Ababa.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${notoEthiopic.variable} antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
