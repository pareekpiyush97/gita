import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.geta.org.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GETA — Gujarat Executive Trainers Association",
    template: "%s | GETA",
  },
  description:
    "The official association of corporate trainers, executive coaches and L&D professionals in Gujarat. Learn. Lead. Inspire.",
  keywords: [
    "Gujarat Executive Trainers Association",
    "corporate trainers Gujarat",
    "executive coaching India",
    "L&D professionals",
    "leadership training Gujarat",
  ],
  openGraph: {
    title: "GETA — Gujarat Executive Trainers Association",
    description:
      "The official association of corporate trainers, executive coaches and L&D professionals in Gujarat.",
    url: siteUrl,
    siteName: "GETA",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GETA — Gujarat Executive Trainers Association",
    description: "Learn. Lead. Inspire.",
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalAssociation",
  name: "Gujarat Executive Trainers Association",
  alternateName: "GETA",
  url: siteUrl,
  slogan: "Learn. Lead. Inspire.",
  areaServed: {
    "@type": "State",
    name: "Gujarat",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-navy-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
