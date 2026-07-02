"use client";

import { motion } from "framer-motion";
import { Container, SectionHeading } from "@/components/ui/Container";
import { JOURNEY_TIMELINE } from "@/lib/data/mock-data";

export function JourneyTimeline() {
  return (
    <section className="bg-paper py-24">
      <Container>
        <SectionHeading
          eyebrow="Our Journey"
          title="Twelve years of building Gujarat's trainer community"
          align="center"
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-navy-900/10 sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-10">
            {JOURNEY_TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col gap-2 pl-8 sm:w-1/2 sm:pl-0 ${
                  i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"
                }`}
              >
                <span
                  className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-emerald-500 bg-paper sm:top-1.5 ${
                    i % 2 === 0 ? "sm:-right-2 sm:left-auto" : "sm:-left-2"
                  }`}
                />
                <span className="font-display text-2xl font-semibold text-emerald-600">{item.year}</span>
                <h3 className="font-display text-lg font-semibold text-navy-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
