import { Container, SectionHeading } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/components/events/EventCard";
import { UPCOMING_EVENTS } from "@/lib/data/mock-data";

export function UpcomingEvents() {
  return (
    <section className="bg-paper py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="What's On"
            title="Upcoming events"
            description="Workshops, summits and chapter meetups happening across Gujarat."
          />
          <Button href="/events" variant="outline-dark" size="sm" className="shrink-0">
            View All Events
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {UPCOMING_EVENTS.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </Container>
    </section>
  );
}
