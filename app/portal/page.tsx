import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { AscendingMark } from "@/components/ui/AscendingMark";
import { LoginForm } from "@/components/portal/LoginForm";

export const metadata: Metadata = {
  title: "Member Login",
  description: "Sign in to the GETA Member Portal to access your membership card, certificates and event registrations.",
};

export default function PortalLoginPage() {
  return (
    <div className="flex min-h-screen items-center bg-paper pb-24 pt-36">
      <Container>
        <div className="mx-auto w-full max-w-md rounded-xl2 bg-white p-8 shadow-soft lg:p-10">
          <div className="mb-8 flex flex-col items-center text-center">
            <AscendingMark />
            <h1 className="mt-4 font-display text-2xl font-semibold text-navy-900">Member Login</h1>
            <p className="mt-2 text-sm text-ink-600">
              Sign in with the email and password from your GETA membership invite.
            </p>
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-ink-600">
            Not a member yet?{" "}
            <Link href="/membership" className="font-medium text-emerald-600 hover:text-emerald-700">
              Apply for membership
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
