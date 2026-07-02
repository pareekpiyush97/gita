"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { RESOURCES, RESOURCE_TYPE_LABELS, type ResourceType } from "@/lib/data/mock-data";

const FILTERS: Array<{ label: string; value: ResourceType | "all" }> = [
  { label: "All", value: "all" },
  ...(Object.entries(RESOURCE_TYPE_LABELS) as Array<[ResourceType, string]>).map(([value, label]) => ({
    label: `${label}s`,
    value,
  })),
];

export function ResourcesClient() {
  const [filter, setFilter] = useState<ResourceType | "all">("all");

  const results = useMemo(
    () => (filter === "all" ? RESOURCES : RESOURCES.filter((r) => r.type === filter)),
    [filter]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setFilter(item.value)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              filter === item.value ? "bg-emerald-500 text-white" : "bg-white text-ink-600 shadow-soft hover:text-navy-900"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((resource) => (
          <ResourceCard key={resource.slug} resource={resource} />
        ))}
      </div>
    </div>
  );
}
