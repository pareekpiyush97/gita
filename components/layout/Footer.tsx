import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, MessageCircle } from "lucide-react";
import { AscendingMark } from "@/components/ui/AscendingMark";
import { Container } from "@/components/ui/Container";

const FOOTER_COLUMNS = [
  {
    title: "Association",
    links: [
      { label: "About GETA", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Membership Plans", href: "/membership" },
      { label: "Trainer Directory", href: "/trainers" },
      { label: "Upcoming Events", href: "/events" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Member Access",
    links: [
      { label: "Member Login", href: "/portal" },
      { label: "Membership Renewal", href: "/portal/renew" },
      { label: "Download Certificates", href: "/portal/certificates" },
      { label: "Admin Panel", href: "/admin" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-noise" />
      <Container className="relative py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <AscendingMark tone="mono-light" />
              <span className="font-display text-lg font-semibold">GETA</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              The official association of corporate trainers, executive coaches
              and L&amp;D professionals across Gujarat — building a state-wide
              community of learning excellence.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Youtube, label: "YouTube", href: "#" },
                { icon: MessageCircle, label: "WhatsApp", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-emerald-400 hover:text-emerald-400"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-emerald-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 text-sm text-white/60 sm:grid-cols-3">
          <div className="flex items-center gap-2.5">
            <MapPin size={16} className="shrink-0 text-emerald-400" />
            <span>GETA House, C.G. Road, Ahmedabad, Gujarat 380009</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone size={16} className="shrink-0 text-emerald-400" />
            <span>+91 79 4000 1234</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Mail size={16} className="shrink-0 text-emerald-400" />
            <span>connect@geta.org.in</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Gujarat Executive Trainers Association. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white/70">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/70">Terms of Use</Link>
            <Link href="/sitemap.xml" className="hover:text-white/70">Sitemap</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
