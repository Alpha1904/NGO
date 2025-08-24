'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  status: 'Active' | 'Completed' | 'Urgent';
  imageUrl: string;
  imageAlt: string;
  startDate: string;
}

interface ProjectHeroSectionProps {
  projectId?: string;
}

const ProjectHeroSection: React.FC<ProjectHeroSectionProps> = ({ projectId }) => {
  const [project, setProject] = useState<ProjectData>({
    id: 'water-initiative-africa',
    title: 'Clean Water Initiative in Africa',
    description: 'Providing clean water to rural communities since 2023.',
    status: 'Active',
    imageUrl: 'https://unsplash.com/photos/water-project.jpg',
    imageAlt: 'Clean water well installation in rural African village',
    startDate: '2023-03-15'
  });

  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (projectId) {
      fetchProjectData(projectId);
    }
  }, [projectId]);

  const fetchProjectData = async (id: string) => {
    setLoading(true);
    try {
      // Future Strapi CMS integration
      // const response = await fetch(`/api/projects/${id}`);
      // const data = await response.json();
      // setProject(data);
      
      // For now, using placeholder data
      console.log(`Fetching project data for ID: ${id}`);
    } catch (error) {
      console.error('Error fetching project data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500 text-white';
      case 'Completed':
        return 'bg-blue-500 text-white';
      case 'Urgent':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name: project.title,
    description: project.description,
    startDate: project.startDate,
    status: project.status,
    image: project.imageUrl
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <section
        ref={ref}
        className={`relative w-full h-96 min-h-[50vh] flex flex-col justify-center items-center py-16 transition-opacity duration-700 ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label={`Project details for ${project.title}`}
        style={{ fontFamily: 'Roboto, sans-serif' }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={project.imageUrl}
            alt={project.imageAlt}
            width={1200}
            height={400}
            className="object-cover w-full h-full"
            priority={false}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Status Tag */}
        <div className="absolute top-4 right-4 z-20">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(
              project.status
            )}`}
          >
            {project.status}
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {project.title}
            <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
          </h1>
          
          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </section>
    </>
  );
};

export default ProjectHeroSection;