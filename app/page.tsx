import { Hero } from "@/components/home/Hero";
import { StatsCounter } from "@/components/home/StatsCounter";
import { VisionMission } from "@/components/home/VisionMission";
import { WhyGETA } from "@/components/home/WhyGETA";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { LeadershipPreview } from "@/components/home/LeadershipPreview";
import { MembershipBenefits } from "@/components/home/MembershipBenefits";
import { Testimonials } from "@/components/home/Testimonials";
import { Partners } from "@/components/home/Partners";
import { Newsletter } from "@/components/home/Newsletter";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <VisionMission />
      <WhyGETA />
      <UpcomingEvents />
      <LeadershipPreview />
      <MembershipBenefits />
      <Testimonials />
      <Partners />
      <Newsletter />
      <ContactCTA />
    </>
  );
}
