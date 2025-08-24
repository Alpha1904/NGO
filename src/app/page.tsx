import { Metadata } from 'next';
import HeroSection from "@/components/Hero";
import ImpactStatsSection from "@/components/ImpactStats";
import LiveUpdatesSection from "@/components/LiveUpdate";
import StoryHighlightsSection from "@/components/story";
import WorldMapSection from "@/components/WorldMap";

export const metadata: Metadata = {
  title: "NGO Aid",
  description: "Learn about our mission, transparency, and impact.",
  openGraph: {
    title: "NGO Aid",
    description: "Learn about our mission, transparency, and impact.",
    type: "website",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "NGO Aid",
    description: "Empowering communities through humanitarian aid.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ImpactStatsSection />
      <StoryHighlightsSection />
      <WorldMapSection />
      <LiveUpdatesSection />
    </>
  );
}