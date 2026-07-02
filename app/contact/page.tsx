import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Container";
import { InquiryForm } from "@/components/contact/InquiryForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Gujarat Executive Trainers Association — office details, phone, email and inquiry form.",
};

const CONTACT_DETAILS = [
  { icon: MapPin, label: "Office", value: "GETA House, C.G. Road, Ahmedabad, Gujarat 380009" },
  { icon: Phone, label: "Phone", value: "+91 79 4000 1234" },
  { icon: Mail, label: "Email", value: "connect@geta.org.in" },
  { icon: MessageCircle, label: "WhatsApp", value: "+91 90000 12345" },
  { icon: Clock, label: "Office Hours", value: "Mon–Sat, 10:00 AM – 6:30 PM IST" },
];

export default function ContactPage() {
  return (
    <div className="bg-paper pb-24 pt-36">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="We'd love to hear from you"
          description="Membership questions, event partnerships, media inquiries — reach the GETA secretariat directly."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-xl2 shadow-soft">
              <iframe
                title="GETA office location"
                src="https://www.google.com/maps?q=Ahmedabad,Gujarat&output=embed"
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="space-y-5 rounded-xl2 bg-white p-7 shadow-soft">
              {CONTACT_DETAILS.map((item) => (
                <div key={item.label} className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <item.icon size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{item.label}</p>
                    <p className="text-sm text-ink-700">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl2 bg-white p-8 shadow-soft lg:p-10">
            <h2 className="font-display text-xl font-semibold text-navy-900">Send an inquiry</h2>
            <p className="mt-1 text-sm text-ink-600">Fields marked required must be filled in before sending.</p>
            <div className="mt-6">
              <InquiryForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
