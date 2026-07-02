import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";

// Keep this schema in sync with the client-side form schema in
// components/contact/InquiryForm.tsx — server-side validation is the
// source of truth; never trust the client payload alone.
const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().max(20).optional(),
  subject: z.string().trim().max(160).optional(),
  message: z.string().trim().min(10).max(2000),
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

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // Silently accept but drop honeypot hits so bots don't learn they were caught.
  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("contact_submissions").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone ?? null,
    subject: parsed.data.subject ?? null,
    message: parsed.data.message,
  });

  if (error) {
    console.error("contact_submissions insert failed:", error.message);
    return NextResponse.json({ error: "Could not save your message. Please try again." }, { status: 500 });
  }

  // Deployment note: connect a transactional email provider (e.g. Resend)
  // here to notify connect@geta.org.in on new submissions. Left out of this
  // scaffold because it requires a live RESEND_API_KEY to actually send.

  return NextResponse.json({ ok: true });
}
