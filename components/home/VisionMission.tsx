import { Compass, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function VisionMission() {
  return (
    <section className="bg-paper py-24">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-xl3 bg-white p-10 shadow-soft transition-shadow hover:shadow-lift">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
              <Compass className="text-emerald-600" size={22} />
            </div>
            <h3 className="mt-6 font-display text-2xl font-semibold text-navy-900">Our Vision</h3>
            <p className="mt-4 leading-relaxed text-ink-600">
              To make Gujarat the most respected source of corporate training
              talent in India — where every certified trainer under the GETA
              banner is recognized as a mark of quality and integrity.
            </p>
          </div>

          <div className="rounded-xl3 bg-navy-900 p-10 shadow-soft transition-shadow hover:shadow-lift">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <Target className="text-gold-400" size={22} />
            </div>
            <h3 className="mt-6 font-display text-2xl font-semibold text-white">Our Mission</h3>
            <p className="mt-4 leading-relaxed text-white/70">
              To unite, upskill and represent independent and corporate
              trainers across the state — connecting them with organizations
              that need verified, high-caliber learning partners.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
