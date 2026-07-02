import { Container, SectionHeading } from "@/components/ui/Container";
import { OBJECTIVES } from "@/lib/data/mock-data";

export function Objectives() {
  return (
    <section className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow="Our Objectives"
          title="What we're building toward"
          description="Six commitments that guide GETA's programs, partnerships and chapter growth every year."
        />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl2 bg-navy-900/8 sm:grid-cols-2">
          {OBJECTIVES.map((objective, i) => (
            <div key={objective} className="flex gap-5 bg-white p-7">
              <span className="font-display text-2xl font-semibold text-emerald-500/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-ink-700">{objective}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
