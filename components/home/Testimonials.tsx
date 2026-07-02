import { Quote } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { TESTIMONIALS } from "@/lib/data/mock-data";

export function Testimonials() {
  return (
    <section className="bg-paper py-24">
      <Container>
        <SectionHeading eyebrow="Voices" title="What our members and partners say" align="center" />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-xl2 bg-white p-8 shadow-soft">
              <Quote className="text-emerald-500" size={28} />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-navy-900/8 pt-4">
                <p className="font-display text-sm font-semibold text-navy-900">{t.name}</p>
                <p className="text-xs text-ink-600">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
