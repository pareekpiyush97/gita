import { BadgeCheck, Network, GraduationCap, TrendingUp } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";

const REASONS = [
  {
    icon: BadgeCheck,
    title: "Verified Credibility",
    description: "Every member is vetted and issued a QR-verified digital ID recognized by corporates statewide.",
  },
  {
    icon: Network,
    title: "Statewide Network",
    description: "Direct access to 480+ trainers, HR leaders and institutions across 18 Gujarat cities.",
  },
  {
    icon: GraduationCap,
    title: "Continuous Upskilling",
    description: "Regular certification workshops keep members ahead of evolving corporate learning needs.",
  },
  {
    icon: TrendingUp,
    title: "Business Growth",
    description: "Trainer Directory listings and event partnerships that translate directly into new engagements.",
  },
];

export function WhyGETA() {
  return (
    <section className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow="Why GETA"
          title="Built for trainers who take their craft seriously"
          description="Membership is more than a certificate — it's infrastructure for your training practice."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="group rounded-xl2 border border-navy-900/8 p-7 transition-all hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-soft"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-900/5 transition-colors group-hover:bg-emerald-100">
                <reason.icon className="text-navy-900 transition-colors group-hover:text-emerald-600" size={20} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
