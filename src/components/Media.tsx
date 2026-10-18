import Image from "next/image";

import type { Photo } from "@/content/company";
import { type Entrance, stagger } from "./motion";

type MediaProps = {
  photo: Photo;
  sizes: string;
  /** Aspect ratio and layout classes, e.g. "aspect-4/3". */
  className?: string;
  /** Mask shape. Rounded rectangle by default; "rounded-full" for circles. */
  rounded?: string;
  /** Backdrop shown while loading and behind contained cut-outs. */
  surface?: string;
  /** Brand colour grade. Off for product packshots so their colours stay true. */
  graded?: boolean;
  /** Fit the whole photo inside the frame instead of cropping (for cut-out product shots). */
  contain?: boolean;
  caption?: React.ReactNode;
  /** Fade up on first scroll into view, staggered by this index within its group. */
  reveal?: number;
  /** With reveal: play this entrance instead of fading up. */
  entrance?: Entrance;
};

/** A company photo in the shared treatment: rounded mask, brand grade, optional legible caption. */
export function Media({
  photo,
  sizes,
  className = "",
  rounded = "rounded-media",
  surface = "bg-surface-2",
  graded = true,
  contain = false,
  caption,
  reveal,
  entrance,
}: MediaProps) {
  const revealed = reveal !== undefined;
  return (
    <figure
      data-reveal={revealed ? (entrance ?? true) : undefined}
      style={revealed ? stagger(reveal) : undefined}
      className={`media ${graded ? "media-graded" : ""} ${rounded} ${surface} ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        quality={90}
        sizes={sizes}
        placeholder="blur"
        // multiply lets a cut-out's white backdrop take on the surface colour behind it
        className={contain ? "object-contain p-6 pb-10 mix-blend-multiply" : "object-cover"}
        style={{ objectPosition: photo.focus }}
      />
      {caption && (
        <figcaption className={`media-caption ${contain ? "media-caption--plain" : ""}`}>{caption}</figcaption>
      )}
    </figure>
  );
}
