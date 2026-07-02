"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    // Replace with a call to /api/newsletter (see README for the API contract)
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitted(true);
    reset();
  }

  return (
    <section className="bg-emerald-600 py-16">
      <Container>
        <div className="flex flex-col items-center justify-between gap-8 rounded-xl3 bg-white p-10 shadow-lift lg:flex-row lg:p-12">
          <div className="max-w-md text-center lg:text-left">
            <h3 className="font-display text-2xl font-semibold text-navy-900">
              Stay ahead of the training calendar
            </h3>
            <p className="mt-2 text-sm text-ink-600">
              One monthly email with new events, resources and member
              opportunities. No spam, unsubscribe any time.
            </p>
          </div>

          {submitted ? (
            <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-5 py-3 text-sm font-medium text-emerald-700">
              <CheckCircle2 size={18} />
              You&apos;re subscribed — welcome aboard!
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:items-start"
              noValidate
            >
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="you@company.com"
                  className="h-12 w-full rounded-full border border-navy-900/15 px-5 text-sm text-navy-900 outline-none transition-colors focus:border-emerald-500"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "newsletter-error" : undefined}
                  {...register("email")}
                />
                {errors.email && (
                  <p id="newsletter-error" role="alert" className="mt-2 pl-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={isSubmitting} className="h-12 shrink-0">
                {isSubmitting ? "Sending…" : "Subscribe"}
                <Send size={16} />
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
