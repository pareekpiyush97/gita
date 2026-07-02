import { Container } from "@/components/ui/Container";

export function History() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              <span className="h-px w-6 bg-current" />
              Our History
            </div>
            <h2 className="text-display-md text-balance text-navy-900">
              From 22 founding trainers to Gujarat&apos;s largest verified training network
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-600">
              <p>
                GETA was formed in 2014 when a small group of independent corporate
                trainers and HR consultants in Ahmedabad recognized a shared problem:
                there was no credible, state-recognized way for organizations to
                identify vetted training talent. Great facilitators were working in
                isolation, with no professional body to represent their standards or
                interests.
              </p>
              <p>
                What began as an informal peer network quickly formalized into a
                registered professional association, built around a simple premise —
                that trainers who commit to a shared code of conduct, ongoing
                certification, and peer accountability create more value for
                organizations and for each other than they ever could alone.
              </p>
              <p>
                Over a decade later, that premise has scaled into chapters across
                Gujarat, a certification pathway trusted by corporates and government
                skilling missions alike, and a membership that spans independent
                coaches, corporate L&amp;D teams, and postgraduate students entering
                the profession.
              </p>
            </div>
          </div>

          <div className="rounded-xl3 bg-navy-900 p-8 shadow-soft lg:p-10">
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-emerald-300">
              GETA at a glance
            </p>
            <dl className="mt-6 space-y-6">
              {[
                { label: "Founded", value: "2014" },
                { label: "Registered as", value: "Professional Association" },
                { label: "Active members", value: "480+" },
                { label: "Cities represented", value: "18 across Gujarat" },
              ].map((item) => (
                <div key={item.label} className="flex items-baseline justify-between border-b border-white/10 pb-4">
                  <dt className="text-sm text-white/60">{item.label}</dt>
                  <dd className="font-display text-lg font-semibold text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
