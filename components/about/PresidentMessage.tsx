import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PRESIDENT_MESSAGE } from "@/lib/data/mock-data";

export function PresidentMessage() {
  const paragraphs = PRESIDENT_MESSAGE.message.split("\n\n");

  return (
    <section className="relative overflow-hidden bg-navy-950 py-24">
      <div className="pointer-events-none absolute inset-0 bg-noise" />
      <div className="pointer-events-none absolute -right-32 top-10 h-[380px] w-[380px] rounded-full bg-emerald-500/15 blur-[120px]" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            <span className="h-px w-6 bg-current" />
            President&apos;s Message
          </div>
          <Quote className="mx-auto text-gold-400/60" size={36} />
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-5 text-center text-lg leading-relaxed text-white/80">
          {paragraphs.map((para, i) => (
            <p key={i} className={i === 0 ? "text-balance text-xl text-white" : undefined}>
              {para}
            </p>
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl items-center justify-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-navy-700 font-display text-lg font-semibold text-white shadow-lift">
            {PRESIDENT_MESSAGE.name
              .split(" ")
              .slice(-2)
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="text-left">
            <p className="font-display text-base font-semibold text-white">{PRESIDENT_MESSAGE.name}</p>
            <p className="text-sm text-white/60">{PRESIDENT_MESSAGE.designation}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
