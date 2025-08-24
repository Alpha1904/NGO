import DonationFormSection from "@/components/ProjectsDetails/DonationForm";
import FullStorySection from "@/components/ProjectsDetails/FullStory";
import ProjectHeroSection from "@/components/ProjectsDetails/Hero";
import PhotoGallerySection from "@/components/ProjectsDetails/PhotoGallery";
import SocialShareSection from "@/components/ProjectsDetails/ShareMedia";
import StatusUpdatesSection from "@/components/ProjectsDetails/StatusUpdate";
import VideoSection from "@/components/ProjectsDetails/Video";

import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: 'Clean Water Initiative - NGO Aid',
    description: 'Learn about our clean water project in Africa.',
    openGraph: {
      title: 'Clean Water Initiative - NGO Aid',
      description: 'Discover how we provide clean water to communities.',
      type: 'article',
    },
  };
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Project",
    name: "Clean Water Initiative",
    description: "Providing clean water to rural communities.",
    url: `https://your-site.com/projects/${params.id}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-col">
        <ProjectHeroSection />
        <FullStorySection />
        <PhotoGallerySection />
        <VideoSection />
        <DonationFormSection />
        <StatusUpdatesSection />
        <SocialShareSection />
      </main>
    </>
  );
}