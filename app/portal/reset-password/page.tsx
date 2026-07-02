import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AscendingMark } from "@/components/ui/AscendingMark";
import { ResetPasswordForm } from "@/components/portal/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center bg-paper pb-24 pt-36">
      <Container>
        <div className="mx-auto w-full max-w-md rounded-xl2 bg-white p-8 shadow-soft lg:p-10">
          <div className="mb-8 flex flex-col items-center text-center">
            <AscendingMark />
            <h1 className="mt-4 font-display text-2xl font-semibold text-navy-900">Set a new password</h1>
            <p className="mt-2 text-sm text-ink-600">Choose a new password for your GETA member account.</p>
          </div>

          <ResetPasswordForm />
        </div>
      </Container>
    </div>
  );
}
