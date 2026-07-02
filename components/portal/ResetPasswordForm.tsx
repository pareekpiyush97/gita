"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, CheckCircle2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

const schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your new password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

const inputClasses =
  "w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-ink-400 focus:border-emerald-500";

export function ResetPasswordForm() {
  const router = useRouter();
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
      const { error } = await supabase.auth.updateUser({ password: values.password });
      if (error) throw error;
      setStatus("success");
      setTimeout(() => router.push("/portal/dashboard"), 1500);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="flex items-center gap-2 text-sm font-medium text-emerald-600">
        <CheckCircle2 size={16} /> Password updated — taking you to your dashboard…
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-700">
          New password
        </label>
        <input id="password" type="password" autoComplete="new-password" className={inputClasses} {...register("password")} />
        {errors.password && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-ink-700">
          Confirm new password
        </label>
        <input id="confirmPassword" type="password" autoComplete="new-password" className={inputClasses} {...register("confirmPassword")} />
        {errors.confirmPassword && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.confirmPassword.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
        {isSubmitting ? "Updating…" : "Update Password"}
        <KeyRound size={16} />
      </Button>

      {status === "error" && (
        <p role="alert" className="flex items-center gap-2 text-sm font-medium text-red-600">
          <AlertCircle size={16} /> This reset link may have expired. Request a new one and try again.
        </p>
      )}
    </form>
  );
}
