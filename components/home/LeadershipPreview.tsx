import { Linkedin, Mail } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LEADERSHIP_PREVIEW } from "@/lib/data/mock-data";

export function LeadershipPreview() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Governance"
            title="Meet the leadership"
            description="Elected volunteers guiding GETA's chapters, standards and statewide programs."
          />
          <Button href="/leadership" variant="outline-dark" size="sm" className="shrink-0">
            Full Committee
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERSHIP_PREVIEW.map((leader) => (
            <div key={leader.name} className="group text-center">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-navy-800 to-navy-950 text-2xl font-display font-semibold text-white shadow-soft transition-transform group-hover:-translate-y-1">
                {leader.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="mt-5 font-display text-base font-semibold text-navy-900">{leader.name}</h3>
              <p className="text-sm font-medium text-emerald-600">{leader.designation}</p>
              <p className="mt-1 text-xs text-ink-600">{leader.expertise}</p>
              <div className="mt-3 flex justify-center gap-2">
                <a
                  href="#"
                  aria-label={`${leader.name} on LinkedIn`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-navy-900/10 text-ink-600 transition-colors hover:border-emerald-500 hover:text-emerald-600"
                >
                  <Linkedin size={14} />
                </a>
                <a
                  href="#"
                  aria-label={`Email ${leader.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-navy-900/10 text-ink-600 transition-colors hover:border-emerald-500 hover:text-emerald-600"
                >
                  <Mail size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
