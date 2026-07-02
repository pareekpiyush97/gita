"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Award, Presentation, GraduationCap, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";
import {
  GALLERY_ITEMS,
  GALLERY_CATEGORY_LABELS,
  EVENTS,
  type GalleryItem,
  type GalleryCategory,
} from "@/lib/data/mock-data";

const CATEGORY_STYLES: Record<GalleryCategory, { gradient: string; icon: typeof Award }> = {
  awards: { gradient: "from-gold-500 to-navy-950", icon: Award },
  conferences: { gradient: "from-navy-800 to-navy-950", icon: Presentation },
  training_programs: { gradient: "from-emerald-600 to-navy-950", icon: GraduationCap },
};

function GalleryTile({ item, onSelect }: { item: GalleryItem; onSelect: () => void }) {
  const { gradient, icon: Icon } = CATEGORY_STYLES[item.category];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative flex aspect-[4/3] flex-col items-center justify-center gap-3 overflow-hidden rounded-xl2 bg-gradient-to-br p-6 text-center shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift",
        gradient
      )}
    >
      <Icon className="text-white/70" size={28} />
      <p className="line-clamp-2 text-sm font-medium text-white">{item.title}</p>
      {item.mediaType === "video" && (
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
          <PlayCircle className="text-white" size={16} />
        </span>
      )}
    </button>
  );
}

export function GalleryClient() {
  const searchParams = useSearchParams();
  const eventSlug = searchParams.get("event") ?? undefined;
  const [category, setCategory] = useState<GalleryCategory | "all">("all");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const baseItems = useMemo(
    () => (eventSlug ? GALLERY_ITEMS.filter((item) => item.eventSlug === eventSlug) : GALLERY_ITEMS),
    [eventSlug]
  );

  const results = useMemo(
    () => (category === "all" ? baseItems : baseItems.filter((item) => item.category === category)),
    [baseItems, category]
  );

  const filteredEvent = eventSlug ? EVENTS.find((e) => e.slug === eventSlug) : undefined;

  return (
    <div>
      {filteredEvent && (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl2 bg-white p-5 shadow-soft">
          <p className="text-sm text-ink-700">
            Showing gallery items from <span className="font-semibold text-navy-900">{filteredEvent.title}</span>
          </p>
          <Link href="/gallery" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
            View Full Gallery
          </Link>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {(["all", "awards", "conferences", "training_programs"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setCategory(key)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              category === key ? "bg-emerald-500 text-white" : "bg-white text-ink-600 shadow-soft hover:text-navy-900"
            )}
          >
            {key === "all" ? "All" : GALLERY_CATEGORY_LABELS[key]}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <p className="mt-10 rounded-xl2 bg-white p-8 text-center text-sm text-ink-600 shadow-soft">
          No gallery items in this category yet.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((item) => (
            <GalleryTile key={item.id} item={item} onSelect={() => setSelected(item)} />
          ))}
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title ?? ""}>
        {selected && (
          <div>
            <div
              className={cn(
                "flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br",
                CATEGORY_STYLES[selected.category].gradient
              )}
            >
              {selected.mediaType === "video" ? (
                <PlayCircle className="text-white/80" size={48} />
              ) : (
                (() => {
                  const Icon = CATEGORY_STYLES[selected.category].icon;
                  return <Icon className="text-white/70" size={48} />;
                })()
              )}
            </div>
            <p className="mt-4 text-sm text-ink-600">
              {GALLERY_CATEGORY_LABELS[selected.category]}
              {selected.eventSlug && (
                <>
                  {" · "}
                  <Link href={`/events/${selected.eventSlug}`} className="font-medium text-emerald-600 hover:text-emerald-700">
                    View event
                  </Link>
                </>
              )}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
