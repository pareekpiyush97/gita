import { ShieldCheck, Award, Users, Heart, Lightbulb, CheckCircle2 } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { CORE_VALUES } from "@/lib/data/mock-data";

const ICONS = [ShieldCheck, Award, Users, Heart, Lightbulb, CheckCircle2];

export function CoreValues() {
  return (
    <section className="bg-paper py-24">
      <Container>
        <SectionHeading
          eyebrow="Core Values"
          title="What GETA membership stands for"
          description="These aren't wall plaques — they're the standard every application, workshop and directory listing is measured against."
          align="center"
        />

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((value, i) => {
            const Icon = ICONS[i] ?? ShieldCheck;
            return (
              <div
                key={value.title}
                className="group rounded-xl2 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 transition-colors group-hover:bg-emerald-500">
                  <Icon className="text-emerald-600 transition-colors group-hover:text-white" size={20} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
