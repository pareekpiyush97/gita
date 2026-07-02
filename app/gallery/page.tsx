import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/Container";
import { GalleryClient } from "@/components/gallery/GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and videos from GETA events — awards, conferences and training programs across Gujarat.",
};

export default function GalleryPage({
  searchParams,
}: {
  searchParams: { event?: string };
}) {
  return (
    <div className="bg-paper pb-24 pt-36">
      <Container>
        <SectionHeading
          eyebrow="Gallery"
          title="Moments from across the GETA community"
          description="Awards, conferences and training programs — a running visual record of GETA's chapters in action."
        />

        <div className="mt-14">
          <GalleryClient eventSlug={searchParams.event} />
        </div>
      </Container>
    </div>
  );
}
