"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserCircle, ShieldCheck, CalendarClock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SignOutButton } from "@/components/portal/SignOutButton";
import { createClient } from "@/lib/supabase/client";

interface Profile {
  full_name: string | null;
  email: string | null;
  role: string | null;
  city: string | null;
}

interface Membership {
  tier: string | null;
  status: string | null;
  membership_number: string | null;
  expires_at: string | null;
}

export function DashboardClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [membership, setMembership] = useState<Membership | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/portal");
        return;
      }

      setUserEmail(user.email ?? null);

      const [{ data: profileData }, { data: membershipData }] = await Promise.all([
        supabase.from("profiles").select("full_name, email, role, city").eq("id", user.id).single(),
        supabase
          .from("memberships")
          .select("tier, status, membership_number, expires_at")
          .eq("profile_id", user.id)
          .maybeSingle(),
      ]);

      setProfile(profileData);
      setMembership(membershipData);
      setLoading(false);
    }

    loadDashboard();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper pb-24 pt-36">
        <p className="text-sm text-ink-600">Loading your dashboard…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper pb-24 pt-36">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-display text-2xl font-semibold text-navy-900">
              Welcome, {profile?.full_name || userEmail}
            </h1>
            <p className="mt-1 text-sm text-ink-600">Your GETA membership at a glance.</p>
          </div>
          <SignOutButton />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl2 bg-white p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <UserCircle size={18} className="text-emerald-600" />
              </div>
              <h2 className="font-display text-base font-semibold text-navy-900">Profile</h2>
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-500">Email</dt>
                <dd className="text-right text-ink-700">{profile?.email || userEmail}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-500">City</dt>
                <dd className="text-right text-ink-700">{profile?.city || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-500">Role</dt>
                <dd className="text-right capitalize text-ink-700">{profile?.role || "member"}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl2 bg-white p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <ShieldCheck size={18} className="text-emerald-600" />
              </div>
              <h2 className="font-display text-base font-semibold text-navy-900">Membership</h2>
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-500">Tier</dt>
                <dd className="text-right capitalize text-ink-700">{membership?.tier || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-500">Status</dt>
                <dd className="text-right capitalize text-ink-700">{membership?.status || "Not activated"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-500">Membership No.</dt>
                <dd className="text-right text-ink-700">{membership?.membership_number || "—"}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl2 bg-white p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <CalendarClock size={18} className="text-emerald-600" />
              </div>
              <h2 className="font-display text-base font-semibold text-navy-900">Renewal</h2>
            </div>
            <p className="mt-4 text-sm text-ink-600">
              {membership?.expires_at
                ? `Your membership is valid until ${new Date(membership.expires_at).toLocaleDateString()}.`
                : "No active membership on file yet. Contact GETA if you believe this is an error."}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
