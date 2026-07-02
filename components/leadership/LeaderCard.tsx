import { Linkedin, Mail } from "lucide-react";
import type { LeaderProfile } from "@/lib/data/mock-data";

function initials(name: string) {
  return name
    .replace(/^(Dr\.|Padma Shri|Ms\.|Mr\.)\s+/, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

export function LeaderCard({ leader }: { leader: LeaderProfile }) {
  return (
    <div className="group flex flex-col rounded-xl2 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy-800 to-navy-950 font-display text-lg font-semibold text-white shadow-soft">
          {initials(leader.name)}
        </div>
        <div>
          <h3 className="font-display text-base font-semibold text-navy-900">{leader.name}</h3>
          <p className="text-sm font-medium text-emerald-600">{leader.designation}</p>
        </div>
      </div>

      <p className="mt-5 flex-1 text-sm leading-relaxed text-ink-600">{leader.bio}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {leader.expertise.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-medium text-emerald-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex gap-2 border-t border-navy-900/8 pt-5">
        <a
          href={leader.linkedin}
          aria-label={`${leader.name} on LinkedIn`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/10 text-ink-600 transition-colors hover:border-emerald-500 hover:text-emerald-600"
        >
          <Linkedin size={15} />
        </a>
        <a
          href={`mailto:${leader.email}`}
          aria-label={`Email ${leader.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/10 text-ink-600 transition-colors hover:border-emerald-500 hover:text-emerald-600"
        >
          <Mail size={15} />
        </a>
      </div>
    </div>
  );
}
