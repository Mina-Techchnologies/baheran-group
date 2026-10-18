import Image from "next/image";

import logoMark from "@/assets/brand/logo-mark.png";

/** The Baheran mark (from the company logo) beside the company name. */
export function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <span className="flex items-center gap-2.5">
      <Image src={logoMark} alt="" quality={90} loading="eager" className="h-10 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`text-xl font-extrabold tracking-[0.04em] ${light ? "text-white" : "text-ink"}`}>
          BAHERAN
        </span>
        <span className={`mt-1 text-xs font-medium ${light ? "text-subtle" : "text-muted"}`}>Trading PLC</span>
      </span>
    </span>
  );
}
