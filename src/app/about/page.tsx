import AnnualReportsSection from "@/components/about/AnnualReport";
import FundAllocationSection from "@/components/about/FundAllocation";
import MissionSummarySection from "@/components/about/Mission";
import PartnerLogosSection from "@/components/about/Partner";
import TestimonialsSection from "@/components/about/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - NGO Aid",
  description: "Learn about our mission, transparency, and impact.",
  openGraph: {
    title: "About Us - NGO Aid",
    description: "Learn about our mission, transparency, and impact.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - NGO Aid",
    description: "Learn about our mission, transparency, and impact.",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "NGO Aid",
    description: "Empowering communities through humanitarian aid.",
  };
  return (
    <main className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MissionSummarySection />
      <AnnualReportsSection />
      <FundAllocationSection />
      <TestimonialsSection />
      <PartnerLogosSection />
    </main>
  );
}
