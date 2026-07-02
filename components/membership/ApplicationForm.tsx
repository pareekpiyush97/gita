"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(8, "Enter a valid phone number"),
  city: z.string().trim().min(2, "Enter your city"),
  tier: z.enum(["individual", "corporate", "student"], {
    errorMap: () => ({ message: "Select a membership tier" }),
  }),
  organizationName: z.string().trim().optional(),
  message: z.string().trim().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;

const inputClasses =
  "w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-ink-400 focus:border-emerald-500";

export function ApplicationForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const selectedTier = watch("tier");

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    try {
      // Membership applications are inserted with status "pending" and
      // reviewed from the Admin Panel → Manage Members before activation.
      const res = await fetch("/api/membership/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
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
          <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-ink-700">City</label>
          <input id="city" className={inputClasses} {...register("city")} />
          {errors.city && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.city.message}</p>}
        </div>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink-700">Membership tier</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {(["individual", "corporate", "student"] as const).map((tier) => (
            <label
              key={tier}
              className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-medium capitalize transition-colors ${
                selectedTier === tier
                  ? "border-emerald-500 bg-emerald-100 text-emerald-700"
                  : "border-navy-900/15 text-ink-700 hover:border-emerald-400"
              }`}
            >
              <input type="radio" value={tier} className="sr-only" {...register("tier")} />
              {tier}
            </label>
          ))}
        </div>
        {errors.tier && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.tier.message}</p>}
      </fieldset>

      {selectedTier === "corporate" && (
        <div>
          <label htmlFor="organizationName" className="mb-1.5 block text-sm font-medium text-ink-700">
            Organization name
          </label>
          <input id="organizationName" className={inputClasses} {...register("organizationName")} />
        </div>
      )}

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-700">
          Anything we should know? <span className="text-ink-400">(optional)</span>
        </label>
        <textarea id="message" rows={4} className={inputClasses} {...register("message")} />
      </div>

      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full sm:w-auto">
        {isSubmitting ? "Submitting…" : "Submit Application"}
        <ArrowRight size={16} />
      </Button>

      {status === "success" && (
        <p role="status" className="flex items-center gap-2 text-sm font-medium text-emerald-600">
          <CheckCircle2 size={16} /> Application received — you&apos;ll get a confirmation email shortly.
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
