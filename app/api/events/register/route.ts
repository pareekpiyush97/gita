import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";

// Keep in sync with components/events/EventRegisterForm.tsx.
const registerSchema = z.object({
  eventSlug: z.string().trim().min(1).max(200),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().min(8).max(20),
  organizationName: z.string().trim().max(160).optional(),
  message: z.string().trim().max(500).optional(),
  // Honeypot field — real users never fill this in; bots often do.
  company_website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("event_registration_requests").insert({
    event_slug: parsed.data.eventSlug,
    full_name: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    organization_name: parsed.data.organizationName ?? null,
    message: parsed.data.message ?? null,
  });

  if (error) {
    console.error("event_registration_requests insert failed:", error.message);
    return NextResponse.json({ error: "Could not save your registration. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
