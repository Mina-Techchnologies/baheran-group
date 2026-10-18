import { stagger } from "./motion";

/**
 * Signature echo: dotted trade routes fanning out from one origin (Addis Ababa) at the bottom
 * left, curving like the swooshes in the logo. Purely decorative. The dots drift slowly outward,
 * each route at its own pace (.route-flow in globals.css).
 */
const ROUTES = [
  "M0 540 C 15 420, 90 190, 270 0",
  "M0 540 C 30 380, 200 150, 470 0",
  "M0 540 C 40 300, 250 60, 600 0",
];

export function RouteLines({ className = "", tone = "onLight" }: { className?: string; tone?: "onLight" | "onDark" }) {
  const stroke = tone === "onLight" ? "rgb(55 118 186 / 0.55)" : "rgb(143 187 232 / 0.4)";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 540"
      preserveAspectRatio="none"
      className={`route-flow pointer-events-none absolute ${className}`}
    >
      {ROUTES.map((d, i) => (
        <path
          key={d}
          d={d}
          style={stagger(i)}
          fill="none"
          stroke={stroke}
          strokeWidth={2}
          strokeDasharray="0 9"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
