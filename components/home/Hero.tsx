"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const barGrow = {
  hidden: { scaleY: 0 },
  show: (i: number) => ({
    scaleY: 1,
    transition: { delay: 0.4 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-24 pt-36 lg:pb-32 lg:pt-44">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-noise" />
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-emerald-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-gold-400/10 blur-[110px]" />

      <Container className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: message */}
        <div>
          <motion.div
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-emerald-300"
          >
            <ShieldCheck size={14} />
            Gujarat&apos;s Official Trainers&apos; Association
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={0.1}
            variants={fadeUp}
            className="text-display-xl text-balance text-white"
          >
            Learn.{" "}
            <span className="text-emerald-400">Lead.</span>{" "}
            <span className="text-gold-400">Inspire.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={0.22}
            variants={fadeUp}
            className="mt-6 max-w-lg text-lg leading-relaxed text-white/70"
          >
            GETA unites Gujarat&apos;s corporate trainers, executive coaches
            and L&amp;D leaders under one credible, state-recognized body —
            raising the standard of learning across every boardroom.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={0.34}
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="/membership" size="lg" className="group">
              Become a Member
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href="/events" variant="outline" size="lg">
              Explore Events
            </Button>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            custom={0.46}
            variants={fadeUp}
            className="mt-12 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8"
          >
            <div>
              <p className="font-display text-2xl font-semibold text-white">480+</p>
              <p className="text-xs uppercase tracking-wide text-white/50">Certified Members</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-white">18</p>
              <p className="text-xs uppercase tracking-wide text-white/50">Cities Represented</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-white">Est. 2014</p>
              <p className="text-xs uppercase tracking-wide text-white/50">State-Registered Body</p>
            </div>
          </motion.div>
        </div>

        {/* Right: signature ascending-bars graphic */}
        <div className="relative mx-auto flex h-[380px] w-full max-w-sm items-end justify-center gap-6 lg:h-[440px]">
          {[
            { h: "38%", color: "bg-emerald-400", label: "Learn" },
            { h: "68%", color: "bg-gold-400", label: "Lead" },
            { h: "100%", color: "bg-white", label: "Inspire" },
          ].map((bar, i) => (
            <div key={bar.label} className="flex h-full w-20 flex-col items-center justify-end gap-3">
              <motion.div
                custom={i}
                initial="hidden"
                animate="show"
                variants={barGrow}
                style={{ height: bar.h, transformOrigin: "bottom" }}
                className={`w-full origin-bottom rounded-t-2xl ${bar.color} shadow-lift`}
              />
              <motion.span
                initial="hidden"
                animate="show"
                custom={0.9 + i * 0.1}
                variants={fadeUp}
                className="text-xs font-medium uppercase tracking-[0.2em] text-white/60"
              >
                {bar.label}
              </motion.span>
            </div>
          ))}

          {/* Floating glass credential card */}
          <motion.div
            initial={{ opacity: 0, y: 30, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass animate-float-slow absolute -left-6 top-4 w-52 rounded-2xl p-4 shadow-lift"
          >
            <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-300">Digital Member ID</p>
            <p className="mt-2 font-display text-sm font-semibold text-white">Verified Trainer</p>
            <p className="mt-1 text-[11px] text-white/50">GETA-2026-04821</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
