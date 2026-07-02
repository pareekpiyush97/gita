import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { MEMBERSHIP_TIERS } from "@/lib/data/mock-data";
import { ApplicationForm } from "@/components/membership/ApplicationForm";
import { MembershipFAQ } from "@/components/membership/MembershipFAQ";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Join the Gujarat Executive Trainers Association — Individual, Corporate and Student membership tiers, benefits, pricing and online application.",
};

export default function MembershipPage() {
  return (
    <div className="bg-paper pb-24 pt-36">
      <Container>
        <SectionHeading
          eyebrow="Membership"
          title="Join Gujarat's most credible trainers' network"
          description="Three tiers, one standard of credibility. Choose the plan that matches where you are in your training practice."
        />

        {/* Pricing */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {MEMBERSHIP_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "flex flex-col rounded-xl3 bg-white p-8 shadow-soft",
                tier.featured && "relative border-2 border-emerald-500 lg:-translate-y-3"
              )}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-semibold text-navy-900">{tier.name}</h3>
              <p className="mt-2 text-sm text-ink-600">{tier.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold text-navy-900">{tier.price}</span>
                <span className="text-sm text-ink-400">{tier.period}</span>
              </div>
              <ul className="mt-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-700">
                    <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Application */}
        <div className="mt-24 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Apply Online"
              title="Start your application"
              description="Submit your details below. Our team reviews every application within 3–5 working days."
            />
            <div className="mt-8 rounded-xl2 bg-navy-900 p-6 text-sm leading-relaxed text-white/70">
              <p className="font-display text-base font-semibold text-white">What happens next?</p>
              <ol className="mt-3 list-decimal space-y-2 pl-4">
                <li>Your application is reviewed by the GETA secretariat.</li>
                <li>On approval, you receive an email invite to set up your member dashboard.</li>
                <li>Your digital membership card and QR code are issued automatically.</li>
              </ol>
            </div>
          </div>
          <div className="rounded-xl2 bg-white p-8 shadow-soft lg:p-10">
            <ApplicationForm />
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24">
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" align="center" />
          <div className="mx-auto mt-10 max-w-2xl">
            <MembershipFAQ />
          </div>
        </div>
      </Container>
    </div>
  );
}
