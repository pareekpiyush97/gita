import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Lock, Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RESOURCES, RESOURCE_TYPE_LABELS } from "@/lib/data/mock-data";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function generateStaticParams() {
  return RESOURCES.map((resource) => ({ slug: resource.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const resource = RESOURCES.find((r) => r.slug === params.slug);
  if (!resource) return { title: "Resource Not Found" };
  return { title: resource.title, description: resource.summary };
}

const DOWNLOADABLE_TYPES = new Set(["download", "template", "video"]);

export default function ResourceDetailPage({ params }: { params: { slug: string } }) {
  const resource = RESOURCES.find((r) => r.slug === params.slug);
  if (!resource) notFound();

  const isDownloadable = DOWNLOADABLE_TYPES.has(resource.type);

  return (
    <div className="bg-paper pb-24 pt-36">
      <Container>
        <Link href="/resources" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 transition-colors hover:text-navy-900">
          <ArrowLeft size={15} />
          Back to Resources
        </Link>

        <div className="mx-auto mt-8 max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
              {RESOURCE_TYPE_LABELS[resource.type]}
            </span>
            {resource.memberOnly && (
              <span className="flex items-center gap-1 rounded-full bg-navy-900/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-navy-900">
                <Lock size={11} />
                Members Only
              </span>
            )}
          </div>

          <h1 className="mt-4 text-display-md text-balance text-navy-900">{resource.title}</h1>
          <p className="mt-3 text-sm text-ink-600">
            By {resource.author} · Published {formatDate(resource.publishedAt)}
          </p>

          <p className="mt-8 text-lg leading-relaxed text-ink-700">{resource.summary}</p>

          {isDownloadable ? (
            <div className="mt-10 rounded-xl2 bg-white p-7 shadow-soft">
              {resource.memberOnly ? (
                <>
                  <p className="font-display text-base font-semibold text-navy-900">Available to GETA members</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    Sign in to your member dashboard to access this {RESOURCE_TYPE_LABELS[resource.type].toLowerCase()}.
                  </p>
                  <Button href="/portal" className="mt-5">Member Login</Button>
                </>
              ) : (
                <>
                  <p className="font-display text-base font-semibold text-navy-900">Request this {RESOURCE_TYPE_LABELS[resource.type].toLowerCase()}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    Email our secretariat and we&apos;ll send it straight to your inbox.
                  </p>
                  <Button href={`mailto:connect@geta.org.in?subject=Resource request: ${resource.title}`} className="mt-5">
                    <Download size={16} />
                    Request via Email
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="mt-10 rounded-xl2 border-l-4 border-emerald-500 bg-white p-6 text-sm leading-relaxed text-ink-600 shadow-soft">
              Have a question about this {RESOURCE_TYPE_LABELS[resource.type].toLowerCase()}, or want to suggest a
              follow-up topic? <Link href="/contact" className="font-medium text-emerald-600 hover:text-emerald-700">Reach out to the GETA secretariat</Link>.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
