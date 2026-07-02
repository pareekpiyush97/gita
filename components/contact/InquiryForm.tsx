"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().optional(),
  subject: z.string().trim().optional(),
  message: z.string().trim().min(10, "Message should be at least 10 characters"),
  company_website: z.string().max(0).optional(), // honeypot — kept empty by real users
});

type FormValues = z.infer<typeof schema>;

const inputClasses =
  "w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-ink-400 focus:border-emerald-500";

export function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus("idle");

    // Honeypot — silently pretend success so bots don't learn they were caught.
    if (values.company_website) {
      setStatus("success");
      reset();
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.from("contact_submissions").insert({
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        subject: values.subject || null,
        message: values.message,
      });
      if (error) throw error;
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-700">
            Full name
          </label>
          <input id="name" className={inputClasses} placeholder="Your name" {...register("name")} />
          {errors.name && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
            Email address
          </label>
          <input id="email" type="email" className={inputClasses} placeholder="you@company.com" {...register("email")} />
          {errors.email && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink-700">
            Phone <span className="text-ink-400">(optional)</span>
          </label>
          <input id="phone" className={inputClasses} placeholder="+91 90000 00000" {...register("phone")} />
        </div>
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-ink-700">
            Subject <span className="text-ink-400">(optional)</span>
          </label>
          <input id="subject" className={inputClasses} placeholder="Membership, Events, Partnership…" {...register("subject")} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-700">
          Message
        </label>
        <textarea id="message" rows={5} className={inputClasses} placeholder="Tell us how we can help…" {...register("message")} />
        {errors.message && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      {/* Honeypot — visually hidden, never shown to real users */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
        {...register("company_website")}
      />

      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full sm:w-auto">
        {isSubmitting ? "Sending…" : "Send Message"}
        <Send size={16} />
      </Button>

      {status === "success" && (
        <p role="status" className="flex items-center gap-2 text-sm font-medium text-emerald-600">
          <CheckCircle2 size={16} /> Message sent — our team will respond within one business day.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="flex items-center gap-2 text-sm font-medium text-red-600">
          <AlertCircle size={16} /> Something went wrong. Please try again or email connect@geta.org.in directly.
        </p>
      )}
    </form>
  );
}
