import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { AscendingMark } from "@/components/ui/AscendingMark";
import { ForgotPasswordForm } from "@/components/portal/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center bg-paper pb-24 pt-36">
      <Container>
        <div className="mx-auto w-full max-w-md rounded-xl2 bg-white p-8 shadow-soft lg:p-10">
          <div className="mb-8 flex flex-col items-center text-center">
            <AscendingMark />
            <h1 className="mt-4 font-display text-2xl font-semibold text-navy-900">Reset your password</h1>
            <p className="mt-2 text-sm text-ink-600">
              Enter the email on your GETA membership and we&apos;ll send you a reset link.
            </p>
          </div>

          <ForgotPasswordForm />

          <p className="mt-6 text-center text-sm text-ink-600">
            Remembered it?{" "}
            <Link href="/portal" className="font-medium text-emerald-600 hover:text-emerald-700">
              Back to Member Login
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
