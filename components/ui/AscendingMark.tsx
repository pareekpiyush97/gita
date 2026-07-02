import { cn } from "@/lib/utils";

/**
 * The GETA signature mark: three ascending bars representing
 * Learn -> Lead -> Inspire. Used as the logo glyph, section dividers,
 * and the hero's animated centerpiece.
 */
export function AscendingMark({
  className,
  tone = "brand",
}: {
  className?: string;
  tone?: "brand" | "mono-light" | "mono-dark";
}) {
  const fills =
    tone === "brand"
      ? ["#12A66B", "#C6A15B", "#0A1B33"]
      : tone === "mono-light"
      ? ["#ffffff", "#ffffff", "#ffffff"]
      : ["#0A1B33", "#0A1B33", "#0A1B33"];

  return (
    <svg
      viewBox="0 0 40 32"
      className={cn("h-8 w-10", className)}
      aria-hidden="true"
    >
      <rect x="0" y="18" width="9" height="14" rx="2" fill={fills[0]} opacity={tone === "mono-light" ? 0.5 : 1} />
      <rect x="15.5" y="9" width="9" height="23" rx="2" fill={fills[1]} opacity={tone === "mono-light" ? 0.75 : 1} />
      <rect x="31" y="0" width="9" height="32" rx="2" fill={fills[2]} />
    </svg>
  );
}
