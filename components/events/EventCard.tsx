import { CalendarDays, MapPin, ArrowUpRight, Users } from "lucide-react";
import type { EventItem } from "@/lib/data/mock-data";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function EventCard({ event }: { event: EventItem }) {
  const isPast = event.status === "past";

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl2 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
      <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-navy-800 to-navy-950">
        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-emerald-300">
          {event.category}
        </span>
        {isPast && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-navy-900">
            Concluded
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs text-ink-600">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={14} className="text-emerald-600" />
            {formatDate(event.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-emerald-600" />
            {event.city}
          </span>
          {isPast && event.attendees && (
            <span className="flex items-center gap-1.5">
              <Users size={14} className="text-emerald-600" />
              {event.attendees} attended
            </span>
          )}
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold text-navy-900">{event.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{event.excerpt}</p>
        <a
          href={`/events/${event.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
        >
          {isPast ? "View Recap" : "Register Now"}
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </article>
  );
}
