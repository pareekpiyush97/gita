import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-medium transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-emerald-500 text-white hover:bg-emerald-600 shadow-soft hover:shadow-lift hover:-translate-y-0.5",
        outline:
          "border border-white/30 text-white hover:bg-white/10 hover:border-white/60",
        "outline-dark":
          "border border-navy-900/20 text-navy-900 hover:bg-navy-900/5 hover:border-navy-900/40",
        ghost: "text-navy-900 hover:bg-navy-900/5",
        gold: "bg-gold-400 text-navy-950 hover:bg-gold-500 shadow-soft hover:shadow-lift hover:-translate-y-0.5",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-6 text-[15px]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  href?: string;
}

export function Button({ className, variant, size, href, children, ...props }: ButtonProps) {
  const classes = cn(buttonStyles({ variant, size }), className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
