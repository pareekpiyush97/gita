import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/Container";
import { ResourcesClient } from "@/components/resources/ResourcesClient";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Blogs, articles, downloads, templates, research papers and videos from GETA — practical resources for corporate trainers and L&D professionals.",
};

export default function ResourcesPage() {
  return (
    <div className="bg-paper pb-24 pt-36">
      <Container>
        <SectionHeading
          eyebrow="Resources"
          title="Practical resources for the training profession"
          description="Research, templates and field notes from GETA's own members — not generic content, but what's actually working in Gujarat's boardrooms and training rooms."
        />

        <div className="mt-14">
          <ResourcesClient />
        </div>
      </Container>
    </div>
  );
}
