import { Container } from "@/components/ui/Container";
import { PARTNERS } from "@/lib/data/mock-data";

export function Partners() {
  return (
    <section className="border-y border-navy-900/8 bg-white py-14">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
          Trusted by institutions across Gujarat
        </p>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {PARTNERS.map((partner) => (
            <div
              key={partner}
              className="flex h-14 items-center justify-center px-2 text-center text-xs font-medium leading-snug text-ink-600 opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            >
              {partner}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
