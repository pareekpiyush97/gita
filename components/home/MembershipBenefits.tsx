import { Check } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MEMBERSHIP_TIERS } from "@/lib/data/mock-data";
import { cn } from "@/lib/utils";

export function MembershipBenefits() {
  return (
    <section className="bg-navy-950 py-24">
      <Container>
        <SectionHeading
          eyebrow="Membership"
          title="Choose the plan that fits your practice"
          description="Transparent annual pricing. Cancel or upgrade any time from your member dashboard."
          align="center"
          dark
        />

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
          {MEMBERSHIP_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "flex flex-col rounded-xl3 p-8",
                tier.featured
                  ? "relative border-2 border-gold-400 bg-navy-900 shadow-lift lg:-translate-y-3"
                  : "border border-white/10 bg-navy-900/50"
              )}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-navy-950">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-semibold text-white">{tier.name}</h3>
              <p className="mt-2 text-sm text-white/60">{tier.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold text-white">{tier.price}</span>
                <span className="text-sm text-white/50">{tier.period}</span>
              </div>
              <ul className="mt-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-white/75">
                    <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                href="/membership"
                variant={tier.featured ? "gold" : "outline"}
                className="mt-8 w-full"
              >
                Apply for {tier.name}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
