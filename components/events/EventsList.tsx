"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { EventCard } from "@/components/events/EventCard";
import type { EventItem } from "@/lib/data/mock-data";

export function EventsList({
  upcomingEvents,
  pastEvents,
}: {
  upcomingEvents: EventItem[];
  pastEvents: EventItem[];
}) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const events = tab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <div>
      <div className="inline-flex rounded-full bg-white p-1 shadow-soft">
        {(["upcoming", "past"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium capitalize transition-colors",
              tab === key ? "bg-emerald-500 text-white" : "text-ink-600 hover:text-navy-900"
            )}
          >
            {key === "upcoming" ? "Upcoming Events" : "Past Events"}
          </button>
        ))}
      </div>

      {events.length === 0 ? (
        <p className="mt-10 text-sm text-ink-600">No {tab} events to show right now.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
