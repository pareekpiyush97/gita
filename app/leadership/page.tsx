import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/Container";
import { LeaderCard } from "@/components/leadership/LeaderCard";
import { LEADERSHIP_FULL } from "@/lib/data/mock-data";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet the patrons, president, vice president, secretary, treasurer, executive committee and core members leading the Gujarat Executive Trainers Association.",
};

const byCategory = (cats: string[]) => LEADERSHIP_FULL.filter((l) => cats.includes(l.category));

export default function LeadershipPage() {
  const patrons = byCategory(["patron"]);
  const officeBearers = byCategory(["president", "vice_president", "secretary", "treasurer"]);
  const executiveCommittee = byCategory(["executive_committee"]);
  const coreMembers = byCategory(["core_member"]);

  return (
    <div className="bg-paper pb-24 pt-36">
      <Container>
        <SectionHeading
          eyebrow="Leadership"
          title="The volunteers governing GETA"
          description="Elected and appointed leaders responsible for GETA's standards, chapters, certification pathway and statewide programs."
        />

        <div className="mt-16">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-ink-400">Patrons</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-3xl">
            {patrons.map((leader) => (
              <LeaderCard key={leader.email} leader={leader} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-ink-400">Office Bearers</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {officeBearers.map((leader) => (
              <LeaderCard key={leader.email} leader={leader} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-ink-400">Executive Committee</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {executiveCommittee.map((leader) => (
              <LeaderCard key={leader.email} leader={leader} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-ink-400">Core Members</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreMembers.map((leader) => (
              <LeaderCard key={leader.email} leader={leader} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
