import { RingArt } from "./Icons";

const tones = {
  warm: "bg-[radial-gradient(ellipse_at_70%_35%,#f3e4d3_0%,#e2c8ab_38%,#b98e69_100%)]",
  blush: "bg-[radial-gradient(ellipse_at_60%_40%,#f7ebe1_0%,#e9d2c0_45%,#c79f84_100%)]",
  sand: "bg-[radial-gradient(ellipse_at_65%_30%,#f6efe5_0%,#e6d7c3_45%,#bfa487_100%)]",
  dusk: "bg-[radial-gradient(ellipse_at_70%_40%,#eadbcb_0%,#c9a88a_45%,#7d5b43_100%)]",
} as const;

export type PlaceholderTone = keyof typeof tones;

/** Stand-in for real photography until product/brand images are available.
 *  Callers set positioning (relative/absolute) via className. */
export function ImagePlaceholder({
  tone = "warm",
  label,
  className = "",
}: {
  tone?: PlaceholderTone;
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label ?? "Image placeholder"}
      className={`overflow-hidden ${tones[tone]} ${className}`}
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.05)_0_2px,transparent_2px_14px)]" />
      <RingArt className="absolute top-1/2 left-1/2 w-[28%] max-w-56 min-w-24 -translate-x-1/2 -translate-y-1/2 text-white/55" />
    </div>
  );
}
