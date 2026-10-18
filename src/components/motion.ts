import type { CSSProperties } from "react";

/** Sets the `--i` index that staggers an element's entrance (see the motion rules in globals.css). */
export const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** A section's showpiece entrance, set as data-reveal="<kind>"; plain reveals fade up. See globals.css. */
export type Entrance = "fly" | "doors" | "wipe" | "drive" | "splash";

/** The side a [data-reveal="fly"] element flies in from. */
export type FlyFrom = "left" | "right" | "top" | "bottom";
