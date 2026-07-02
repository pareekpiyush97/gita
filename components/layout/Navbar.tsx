"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AscendingMark } from "@/components/ui/AscendingMark";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Leadership", href: "/leadership" },
  { label: "Membership", href: "/membership" },
  { label: "Events", href: "/events" },
  { label: "Trainer Directory", href: "/trainers" },
  { label: "Resources", href: "/resources" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-light shadow-soft py-3" : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5" aria-label="GETA home">
          <AscendingMark />
          <span className={cn("font-display text-lg font-semibold leading-none", scrolled ? "text-navy-900" : "text-navy-900")}>
            GETA
            <span className="block text-[10px] font-body font-medium tracking-[0.15em] text-ink-600">
              LEARN · LEAD · INSPIRE
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-ink-700 transition-colors hover:text-emerald-600",
                pathname === link.href && "text-emerald-600"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/portal" variant="ghost" size="sm">
            Member Login
          </Button>
          <Button href="/membership" variant="primary" size="sm">
            Join GETA
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-navy-900 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="glass-light mt-3 flex flex-col gap-1 px-6 py-4 shadow-soft lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-navy-900/5 hover:text-emerald-600"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2 px-3">
            <Button href="/portal" variant="outline-dark" size="sm" className="flex-1">
              Member Login
            </Button>
            <Button href="/membership" variant="primary" size="sm" className="flex-1">
              Join GETA
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
