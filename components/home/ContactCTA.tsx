import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AscendingMark } from "@/components/ui/AscendingMark";

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-24">
      <div className="pointer-events-none absolute inset-0 bg-noise" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[120px]" />
      <Container className="relative flex flex-col items-center text-center">
        <AscendingMark tone="mono-light" className="h-10 w-12" />
        <h2 className="mt-6 text-display-md text-balance text-white">
          Ready to bring your organization&apos;s training up to GETA standard?
        </h2>
        <p className="mt-4 max-w-xl text-white/70">
          Whether you&apos;re hiring verified trainers or joining as one — our
          team responds within one business day.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact" size="lg">
            Get in Touch
            <ArrowRight size={18} />
          </Button>
          <Button href="tel:+917940001234" variant="outline" size="lg">
            <Phone size={16} />
            +91 79 4000 1234
          </Button>
        </div>
      </Container>
    </section>
  );
}
