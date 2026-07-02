import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";

const applicationSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().min(8).max(20),
  city: z.string().trim().min(2).max(80),
  tier: z.enum(["individual", "corporate", "student"]),
  organizationName: z.string().trim().max(160).optional(),
  message: z.string().trim().max(500).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = applicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const supabase = createServiceClient();

  // Applications land in `membership_applications` — a public-insertable,
  // admin-readable table. Approving one (Admin Panel -> Manage Members)
  // is what creates the actual `memberships` row and invites the applicant.
  const { error } = await supabase.from("membership_applications").insert({
    full_name: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    city: parsed.data.city,
    tier: parsed.data.tier,
    organization_name: parsed.data.organizationName ?? null,
    message: parsed.data.message ?? null,
  });

  if (error) {
    console.error("membership application insert failed:", error.message);
    return NextResponse.json({ error: "Could not submit your application. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
