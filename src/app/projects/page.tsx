
import Head from 'next/head';
import ProjectsHeroSection from "@/components/projects/Hero";
import ProjectFiltersSection from "@/components/projects/ProjectFilter";
import ProjectListSection from "@/components/projects/ProjectList";


<Head>
  <title>Our Projects - NGO Aid</title>
  <meta name="description" content="Explore our global initiatives transforming lives." />
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "NGO Aid Projects",
      description: "Discover our humanitarian projects worldwide.",
    })}
  </script>
</Head>
export default function ProjectsPage() {
  return <main className="flex flex-col">
    <ProjectsHeroSection />
    <ProjectFiltersSection />
    <ProjectListSection />
  </main>;
}
