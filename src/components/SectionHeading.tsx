import type { LucideIcon } from "lucide-react";

type Tone = "light" | "dark";

/** Highlights the key phrase of a headline in brand blue. */
export function Accent({ children, tone = "light" }: { children: React.ReactNode; tone?: Tone }) {
  return <span className={tone === "dark" ? "text-primary-light" : "text-primary"}>{children}</span>;
}

/** Thin line icon + uppercase label. Identifies which business a section belongs to at a glance. */
export function Eyebrow({ icon: Icon, label, tone = "light" }: { icon?: LucideIcon; label: string; tone?: Tone }) {
  const dark = tone === "dark";
  return (
    <p className={`eyebrow flex items-center gap-3 ${dark ? "text-primary-light" : "text-primary-dark"}`}>
      {Icon ? (
        <span
          className={`grid size-9 place-items-center rounded-xl ${dark ? "bg-white/10 text-primary-light" : "bg-primary/10 text-primary"}`}
        >
          <Icon aria-hidden="true" className="size-4.5" strokeWidth={1.75} />
        </span>
      ) : (
        <span aria-hidden="true" className={`h-px w-8 ${dark ? "bg-primary-light" : "bg-primary"}`} />
      )}
      {label}
    </p>
  );
}

type SectionHeadingProps = {
  id: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  eyebrow: { icon?: LucideIcon; label: string };
  tone?: Tone;
};

/** Shared section header: eyebrow, headline on the left, lede on the right. */
export function SectionHeading({ id, title, lede, eyebrow, tone = "light" }: SectionHeadingProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
      <div data-reveal className="lg:col-span-7">
        <Eyebrow icon={eyebrow.icon} label={eyebrow.label} tone={tone} />
        <h2 id={id} className="display-lg mt-5 max-w-[20ch]">
          {title}
        </h2>
      </div>
      {lede && (
        <p data-reveal className={`lede lg:col-span-5 [--i:1] ${tone === "dark" ? "text-subtle" : "text-muted"}`}>
          {lede}
        </p>
      )}
    </div>
  );
}
