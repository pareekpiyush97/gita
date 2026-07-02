"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "Who is eligible to join GETA?",
    answer:
      "Any practicing corporate trainer, executive coach, HR professional or L&D consultant based in or serving Gujarat can apply. Students in relevant postgraduate programs can apply under the Student tier.",
  },
  {
    question: "How long does approval take?",
    answer:
      "Applications are reviewed within 3–5 working days. You'll receive an email once your membership is approved, along with your digital ID card and QR code.",
  },
  {
    question: "Can I upgrade from Individual to Corporate later?",
    answer:
      "Yes — upgrades are prorated for the remainder of your membership year and can be requested from your member dashboard under Membership Renewal.",
  },
  {
    question: "Is the Trainer Directory listing automatic?",
    answer:
      "Individual and Corporate members can opt in to a directory listing after approval. Listings are reviewed by the admin team before going live to keep the directory credible.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "UPI, net banking, and all major cards. Corporate members can request a GST invoice and pay via bank transfer.",
  },
];

export function MembershipFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-navy-900/8 rounded-xl2 bg-white shadow-soft">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-display text-[15px] font-medium text-navy-900">{faq.question}</span>
              <ChevronDown
                size={18}
                className={cn("shrink-0 text-emerald-600 transition-transform duration-300", isOpen && "rotate-180")}
              />
            </button>
            <div
              id={`faq-panel-${index}`}
              className={cn(
                "grid overflow-hidden transition-all duration-300",
                isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden px-6">
                <p className="text-sm leading-relaxed text-ink-600">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
