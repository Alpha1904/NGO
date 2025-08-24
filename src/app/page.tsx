'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components
const HeroSection = dynamic(() => import("@/components/Hero"));
const ImpactStatsSection = dynamic(() => import("@/components/ImpactStats"));
const LiveUpdatesSection = dynamic(() => import("@/components/LiveUpdate"));
const StoryHighlightsSection = dynamic(() => import("@/components/story"));
const WorldMapSection = dynamic(() => import("@/components/WorldMap"), { ssr: false });

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "NGO Aid",
    description: "Empowering communities through humanitarian aid.",
  };

  // Show a simple loading state until client-side rendering is ready
  if (!isClient) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

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