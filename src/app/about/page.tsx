import AnnualReportsSection from "@/components/about/AnnualReport";
import FundAllocationSection from "@/components/about/FundAllocation";
import MissionSummarySection from "@/components/about/Mission";
import PartnerLogosSection from "@/components/about/Partner";
import TestimonialsSection from "@/components/about/Testimonials";

import Head from 'next/head';

<Head>
  <title>About Us - NGO Aid</title>
  <meta name="description" content="Learn about our mission, transparency, and impact." />
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NGO",
      name: "NGO Aid",
      description: "Empowering communities through humanitarian aid.",
    })}
  </script>
</Head>
export default function AboutPage() {
  return (
    <main className="flex flex-col">
        <MissionSummarySection />
        <AnnualReportsSection />
        <FundAllocationSection />
        <TestimonialsSection />
        <PartnerLogosSection />
    </main>
  );
}