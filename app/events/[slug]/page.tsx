import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, IndianRupee, Users, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { EventRegisterForm } from "@/components/events/EventRegisterForm";
import { EVENTS } from "@/lib/data/mock-data";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
}

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const event = EVENTS.find((e) => e.slug === params.slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.title,
    description: event.excerpt,
  };
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = EVENTS.find((e) => e.slug === params.slug);
  if (!event) notFound();

  const isPast = event.status === "past";
  const paragraphs = event.description.split("\n\n");

  return (
    <div className="bg-white pb-24 pt-36">
      <section className="relative overflow-hidden bg-navy-950 py-16">
        <div className="pointer-events-none absolute inset-0 bg-noise" />
        <Container className="relative">
          <a href="/events" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white">
            <ArrowLeft size={15} />
            Back to Events
          </a>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-emerald-300">
              {event.category}
            </span>
            {isPast && (
              <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-navy-900">
                Concluded
              </span>
            )}
          </div>

          <h1 className="mt-4 max-w-3xl text-display-md text-balance text-white">{event.title}</h1>

          <div className="mt-8 flex flex-wrap gap-8 border-t border-white/10 pt-6 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <CalendarDays size={16} className="text-emerald-400" />
              {formatDate(event.date)}, {formatTime(event.date)}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-emerald-400" />
              {event.venue}, {event.city}
            </span>
            <span className="flex items-center gap-2">
              <IndianRupee size={16} className="text-emerald-400" />
              {event.price > 0 ? `₹${event.price.toLocaleString("en-IN")}` : "Free"}
            </span>
            <span className="flex items-center gap-2">
              <Users size={16} className="text-emerald-400" />
              {isPast && event.attendees ? `${event.attendees} attended` : `Capacity: ${event.capacity}`}
            </span>
          </div>
        </Container>
      </section>

      <Container>
        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="space-y-4 text-base leading-relaxed text-ink-600">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-12">
              <h2 className="font-display text-xl font-semibold text-navy-900">
                {isPast ? "What happened on the day" : "Agenda"}
              </h2>
              <div className="mt-6 space-y-4">
                {event.agenda.map((item) => (
                  <div key={item.time} className="flex gap-5 border-b border-navy-900/8 pb-4">
                    <span className="w-28 shrink-0 text-sm font-semibold text-emerald-600">{item.time}</span>
                    <span className="text-sm text-ink-700">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h2 className="font-display text-xl font-semibold text-navy-900">
                {isPast ? "Highlights from the event" : "Why attend"}
              </h2>
              <ul className="mt-5 space-y-3">
                {event.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm leading-relaxed text-ink-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            {isPast ? (
              <div className="rounded-xl2 bg-navy-900 p-8 text-white shadow-soft">
                <p className="font-display text-lg font-semibold">This event has concluded</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Photos and recap videos from this event are available in the gallery.
                </p>
                <Button href={`/gallery?event=${event.slug}`} variant="outline" className="mt-6 w-full">
                  View Event Gallery
                </Button>
              </div>
            ) : (
              <div id="register" className="rounded-xl2 bg-white p-7 shadow-soft ring-1 ring-navy-900/8 sm:p-8">
                <p className="font-display text-lg font-semibold text-navy-900">Register for this event</p>
                <p className="mt-1 text-sm text-ink-600">
                  {event.price > 0 ? `₹${event.price.toLocaleString("en-IN")} per seat — ` : ""}
                  confirmation sent by email within one business day.
                </p>
                <div className="mt-6">
                  <EventRegisterForm eventSlug={event.slug} />
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
