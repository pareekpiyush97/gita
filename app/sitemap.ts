import type { MetadataRoute } from "next";
import { UPCOMING_EVENTS } from "@/lib/data/mock-data";

const STATIC_ROUTES = [
  "",
  "/about",
  "/leadership",
  "/membership",
  "/events",
  "/trainers",
  "/resources",
  "/gallery",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.geta.org.in";

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  // In production, replace this with a Supabase query:
  // const { data } = await supabase.from("events").select("slug, updated_at").eq("status", "published");
  const eventEntries: MetadataRoute.Sitemap = UPCOMING_EVENTS.map((event) => ({
    url: `${siteUrl}/events/${event.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...eventEntries];
}
