import HeroSection from "@/components/Hero";
import ImpactStatsSection from "@/components/ImpactStats";
import LiveUpdatesSection from "@/components/LiveUpdate";
import StoryHighlightsSection from "@/components/story";
import WorldMapSection from "@/components/WorldMap";

export default function Home() {
return (
  <>
    <HeroSection />
    <ImpactStatsSection />
    <StoryHighlightsSection />
    <WorldMapSection />
    <LiveUpdatesSection />
  </>
);
}
