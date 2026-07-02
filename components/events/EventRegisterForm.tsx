"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(8, "Enter a valid phone number"),
  organizationName: z.string().trim().optional(),
  message: z.string().trim().max(500).optional(),
  company_website: z.string().max(0).optional(), // honeypot
});

type FormValues = z.infer<typeof schema>;

const inputClasses =
  "w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-ink-400 focus:border-emerald-500";

export function EventRegisterForm({ eventSlug }: { eventSlug: string }) {
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
      const { error } = await supabase.from("event_registration_requests").insert({
        event_slug: eventSlug,
        full_name: values.fullName,
        email: values.email,
        phone: values.phone,
        organization_name: values.organizationName || null,
        message: values.message || null,
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
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-ink-700">Full name</label>
          <input id="fullName" className={inputClasses} {...register("fullName")} />
          {errors.fullName && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">Email address</label>
          <input id="email" type="email" className={inputClasses} {...register("email")} />
          {errors.email && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink-700">Phone</label>
          <input id="phone" className={inputClasses} {...register("phone")} />
          {errors.phone && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="organizationName" className="mb-1.5 block text-sm font-medium text-ink-700">
            Organization <span className="text-ink-400">(optional)</span>
          </label>
          <input id="organizationName" className={inputClasses} {...register("organizationName")} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-700">
          Anything we should know? <span className="text-ink-400">(optional)</span>
        </label>
        <textarea id="message" rows={3} className={inputClasses} {...register("message")} />
      </div>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
        {...register("company_website")}
      />

      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full sm:w-auto">
        {isSubmitting ? "Registering…" : "Confirm Registration"}
        <CalendarCheck size={16} />
      </Button>

      {status === "success" && (
        <p role="status" className="flex items-center gap-2 text-sm font-medium text-emerald-600">
          <CheckCircle2 size={16} /> Registration received — a confirmation email is on its way.
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
