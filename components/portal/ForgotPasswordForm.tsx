"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

const inputClasses =
  "w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-ink-400 focus:border-emerald-500";

export function ForgotPasswordForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    try {
      const supabase = createClient();
      const resetPath = window.location.pathname.replace(/forgot-password\/?$/, "reset-password");
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}${resetPath}`,
      });
      if (error) throw error;
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="flex items-center gap-2 text-sm font-medium text-emerald-600">
        <CheckCircle2 size={16} /> If that email is registered, a reset link is on its way.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
          Email address
        </label>
        <input id="email" type="email" autoComplete="email" className={inputClasses} {...register("email")} />
        {errors.email && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
        {isSubmitting ? "Sending…" : "Send Reset Link"}
        <Send size={16} />
      </Button>

      {status === "error" && (
        <p role="alert" className="flex items-center gap-2 text-sm font-medium text-red-600">
          <AlertCircle size={16} /> Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
