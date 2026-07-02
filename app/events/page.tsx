import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/Container";
import { EventsList } from "@/components/events/EventsList";
import { UPCOMING_EVENTS, PAST_EVENTS } from "@/lib/data/mock-data";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past GETA events — summits, workshops and chapter conclaves for corporate trainers and HR leaders across Gujarat.",
};

export default function EventsPage() {
  return (
    <div className="bg-paper pb-24 pt-36">
      <Container>
        <SectionHeading
          eyebrow="Events"
          title="Workshops, summits and chapter meetups"
          description="From the flagship Leadership Summit to regional certification workshops — find where GETA is showing up next."
        />

        <div className="mt-14">
          <EventsList upcomingEvents={UPCOMING_EVENTS} pastEvents={PAST_EVENTS} />
        </div>
      </Container>
    </div>
  );
}
