import { FileText, Download, LayoutTemplate, FlaskConical, PlayCircle, Newspaper, Lock, ArrowUpRight } from "lucide-react";
import type { ResourceItem, ResourceType } from "@/lib/data/mock-data";
import { RESOURCE_TYPE_LABELS } from "@/lib/data/mock-data";

const TYPE_ICONS: Record<ResourceType, typeof FileText> = {
  blog: Newspaper,
  article: FileText,
  download: Download,
  template: LayoutTemplate,
  research_paper: FlaskConical,
  video: PlayCircle,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function ResourceCard({ resource }: { resource: ResourceItem }) {
  const Icon = TYPE_ICONS[resource.type];

  return (
    <a
      href={`/resources/${resource.slug}`}
      className="group flex flex-col rounded-xl2 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100">
          <Icon className="text-emerald-600" size={20} />
        </div>
        {resource.memberOnly && (
          <span className="flex items-center gap-1 rounded-full bg-navy-900/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-navy-900">
            <Lock size={11} />
            Members
          </span>
        )}
      </div>

      <span className="mt-5 text-xs font-semibold uppercase tracking-wide text-emerald-600">
        {RESOURCE_TYPE_LABELS[resource.type]}
      </span>
      <h3 className="mt-2 font-display text-lg font-semibold text-navy-900">{resource.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{resource.summary}</p>

      <div className="mt-5 flex items-center justify-between border-t border-navy-900/8 pt-4 text-xs text-ink-600">
        <span>{resource.author} · {formatDate(resource.publishedAt)}</span>
        <ArrowUpRight size={16} className="text-emerald-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </a>
  );
}
