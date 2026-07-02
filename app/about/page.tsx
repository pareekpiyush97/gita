import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/Container";
import { VisionMission } from "@/components/home/VisionMission";
import { History } from "@/components/about/History";
import { CoreValues } from "@/components/about/CoreValues";
import { Objectives } from "@/components/about/Objectives";
import { PresidentMessage } from "@/components/about/PresidentMessage";
import { JourneyTimeline } from "@/components/about/JourneyTimeline";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The history, mission, vision, core values and leadership journey of the Gujarat Executive Trainers Association (GETA), founded in 2014.",
};

export default function AboutPage() {
  return (
    <div className="bg-white pb-4 pt-36">
      <Container>
        <SectionHeading
          eyebrow="About GETA"
          title="Gujarat's professional home for corporate trainers"
          description="GETA exists to give training and L&D professionals across Gujarat a credible, connected, continuously improving professional community."
        />
      </Container>

      <div className="mt-16">
        <History />
        <VisionMission />
        <CoreValues />
        <Objectives />
        <PresidentMessage />
        <JourneyTimeline />
      </div>
    </div>
  );
}
