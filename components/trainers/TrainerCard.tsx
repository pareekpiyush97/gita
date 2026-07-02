"use client";

import { useState } from "react";
import { Briefcase, MapPin, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { BookingForm } from "@/components/trainers/BookingForm";
import type { TrainerDirectoryProfile } from "@/lib/data/mock-data";

function initials(name: string) {
  return name
    .replace(/^(Dr\.|Ms\.|Mr\.)\s+/, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

export function TrainerCard({ trainer }: { trainer: TrainerDirectoryProfile }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="group flex flex-col rounded-xl2 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy-800 to-navy-950 font-display text-lg font-semibold text-white shadow-soft">
            {initials(trainer.name)}
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-navy-900">{trainer.name}</h3>
            <p className="flex items-center gap-1.5 text-sm text-ink-600">
              <MapPin size={13} className="text-emerald-600" />
              {trainer.city}
            </p>
          </div>
        </div>

        <p className="mt-5 flex-1 text-sm leading-relaxed text-ink-600">{trainer.headline}</p>

        <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-ink-600">
          <Briefcase size={13} className="text-emerald-600" />
          {trainer.yearsExperience} years experience
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {trainer.specializations.map((tag) => (
            <span key={tag} className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-medium text-emerald-700">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 space-y-1.5 border-t border-navy-900/8 pt-4">
          {trainer.certifications.map((cert) => (
            <p key={cert} className="flex items-center gap-1.5 text-xs text-ink-600">
              <BadgeCheck size={13} className="text-emerald-600" />
              {cert}
            </p>
          ))}
        </div>

        <Button onClick={() => setOpen(true)} className="mt-6 w-full">
          Book Session
        </Button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={`Book a session with ${trainer.name}`}>
        <BookingForm trainerName={trainer.name} onSuccess={() => setTimeout(() => setOpen(false), 1800)} />
      </Modal>
    </>
  );
}
