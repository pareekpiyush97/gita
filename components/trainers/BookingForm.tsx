"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
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

export function BookingForm({ trainerName, onSuccess }: { trainerName: string; onSuccess?: () => void }) {
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
      onSuccess?.();
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.from("trainer_booking_requests").insert({
        trainer_name: trainerName,
        full_name: values.fullName,
        email: values.email,
        phone: values.phone,
        organization_name: values.organizationName || null,
        message: values.message || null,
      });
      if (error) throw error;
      setStatus("success");
      reset();
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-700">
          What do you need this session for? <span className="text-ink-400">(optional)</span>
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

      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
        {isSubmitting ? "Sending…" : "Send Booking Request"}
        <Send size={16} />
      </Button>

      {status === "success" && (
        <p role="status" className="flex items-center gap-2 text-sm font-medium text-emerald-600">
          <CheckCircle2 size={16} /> Request sent — {trainerName.split(" ")[0]} will follow up within one business day.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="flex items-center gap-2 text-sm font-medium text-red-600">
          <AlertCircle size={16} /> Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
