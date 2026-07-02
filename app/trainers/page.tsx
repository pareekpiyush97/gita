import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/Container";
import { TrainerDirectoryClient } from "@/components/trainers/TrainerDirectoryClient";

export const metadata: Metadata = {
  title: "Trainer Directory",
  description:
    "Search GETA's verified directory of corporate trainers and executive coaches across Gujarat by city, industry, expertise and language.",
};

export default function TrainersPage() {
  return (
    <div className="bg-paper pb-24 pt-36">
      <Container>
        <SectionHeading
          eyebrow="Trainer Directory"
          title="Find a verified trainer across Gujarat"
          description="Every listing is a GETA member, vetted by the admin team before going live. Filter by city, industry, expertise or language, then book a session directly."
        />

        <div className="mt-14">
          <TrainerDirectoryClient />
        </div>
      </Container>
    </div>
  );
}
