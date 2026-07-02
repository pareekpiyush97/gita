import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-6 lg:px-10", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]",
            dark ? "text-emerald-300" : "text-emerald-600",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-6 bg-current" />
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "text-display-md text-balance",
          dark ? "text-white" : "text-navy-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            dark ? "text-white/70" : "text-ink-600"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
