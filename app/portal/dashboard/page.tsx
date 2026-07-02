import type { Metadata } from "next";
import { DashboardClient } from "@/components/portal/DashboardClient";

export const metadata: Metadata = {
  title: "Member Dashboard",
  robots: { index: false, follow: false },
};

export default function PortalDashboardPage() {
  return <DashboardClient />;
}
