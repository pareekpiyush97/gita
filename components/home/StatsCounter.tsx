"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { STATS } from "@/lib/data/mock-data";
import { Container } from "@/components/ui/Container";

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <p ref={ref} className="font-display text-4xl font-semibold text-white lg:text-5xl">
      {value.toLocaleString("en-IN")}
      {suffix}
    </p>
  );
}

export function StatsCounter() {
  return (
    <section className="bg-navy-900 py-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="border-l-2 border-emerald-500/40 pl-5">
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
