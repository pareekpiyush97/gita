"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { TrainerCard } from "@/components/trainers/TrainerCard";
import {
  TRAINER_DIRECTORY,
  TRAINER_CITIES,
  TRAINER_INDUSTRIES,
  TRAINER_SPECIALIZATIONS,
  TRAINER_LANGUAGES,
} from "@/lib/data/mock-data";

const selectClasses =
  "w-full rounded-xl border border-navy-900/15 bg-white px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-emerald-500";

export function TrainerDirectoryClient() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [industry, setIndustry] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [language, setLanguage] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TRAINER_DIRECTORY.filter((trainer) => {
      const matchesQuery =
        !q ||
        trainer.name.toLowerCase().includes(q) ||
        trainer.headline.toLowerCase().includes(q) ||
        trainer.specializations.some((s) => s.toLowerCase().includes(q));
      const matchesCity = !city || trainer.city === city;
      const matchesIndustry = !industry || trainer.industries.includes(industry);
      const matchesSpecialization = !specialization || trainer.specializations.includes(specialization);
      const matchesLanguage = !language || trainer.languages.includes(language);
      return matchesQuery && matchesCity && matchesIndustry && matchesSpecialization && matchesLanguage;
    });
  }, [query, city, industry, specialization, language]);

  const hasActiveFilters = Boolean(query || city || industry || specialization || language);

  return (
    <div>
      <div className="rounded-xl2 bg-white p-6 shadow-soft">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, headline or specialization…"
            className="w-full rounded-xl border border-navy-900/15 bg-white py-3 pl-11 pr-4 text-sm text-navy-900 outline-none transition-colors placeholder:text-ink-400 focus:border-emerald-500"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <select className={selectClasses} value={city} onChange={(e) => setCity(e.target.value)} aria-label="Filter by city">
            <option value="">All Cities</option>
            {TRAINER_CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select className={selectClasses} value={industry} onChange={(e) => setIndustry(e.target.value)} aria-label="Filter by industry">
            <option value="">All Industries</option>
            {TRAINER_INDUSTRIES.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          <select className={selectClasses} value={specialization} onChange={(e) => setSpecialization(e.target.value)} aria-label="Filter by expertise">
            <option value="">All Expertise</option>
            {TRAINER_SPECIALIZATIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select className={selectClasses} value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Filter by language">
            <option value="">All Languages</option>
            {TRAINER_LANGUAGES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCity("");
              setIndustry("");
              setSpecialization("");
              setLanguage("");
            }}
            className="mt-4 text-xs font-medium text-emerald-600 hover:text-emerald-700"
          >
            Clear all filters
          </button>
        )}
      </div>

      <p className="mt-6 text-sm text-ink-600">
        {results.length} trainer{results.length === 1 ? "" : "s"} found
      </p>

      {results.length === 0 ? (
        <p className="mt-10 rounded-xl2 bg-white p-8 text-center text-sm text-ink-600 shadow-soft">
          No trainers match those filters. Try broadening your search.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((trainer) => (
            <TrainerCard key={trainer.slug} trainer={trainer} />
          ))}
        </div>
      )}
    </div>
  );
}
