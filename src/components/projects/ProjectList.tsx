"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define types for project data
interface Project {
  id: string;
  title: string;
  description: string;
  status: 'Active' | 'Completed' | 'Urgent';
  imageUrl: string;
  imageAlt: string;
  location: string;
  startDate: string;
}

const ProjectListSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading (replace with actual API call to Strapi CMS)
  useEffect(() => {
    // Placeholder project data (later to be fetched from Strapi CMS)
    const placeholderProjects: Project[] = [
      {
        id: '1',
        title: 'Clean Water Initiative',
        description: 'Providing safe drinking water to rural communities in East Africa. Our comprehensive program includes well construction, water purification systems, and community education on hygiene practices.',
        status: 'Active',
        imageUrl: 'https://images.unsplash.com/photo-1541919329513-35f7af297129?w=800&h=600&fit=crop&auto=format',
        imageAlt: 'Children collecting clean water from a newly installed well in a rural African village',
        location: 'Kenya',
        startDate: '2024-01-15'
      },
      {
        id: '2',
        title: 'Emergency Food Relief',
        description: 'Delivering nutritious meals and food supplies to families affected by natural disasters. We work with local partners to ensure culturally appropriate and sustainable food distribution programs.',
        status: 'Urgent',
        imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop&auto=format',
        imageAlt: 'Volunteers distributing food packages to families in need during emergency relief operation',
        location: 'Philippines',
        startDate: '2024-03-01'
      },
      {
        id: '3',
        title: 'Education for All',
        description: 'Building schools and training teachers in underserved communities across South America. This initiative focuses on providing quality primary education and educational resources to children in remote areas.',
        status: 'Active',
        imageUrl: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop&auto=format',
        imageAlt: 'Children in a newly built classroom studying with educational materials and books',
        location: 'Peru',
        startDate: '2023-09-10'
      },
      {
        id: '4',
        title: 'Healthcare Access Program',
        description: 'Establishing mobile medical clinics to reach remote communities without healthcare access. Our medical teams provide essential healthcare services, vaccinations, and health education programs.',
        status: 'Completed',
        imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&auto=format',
        imageAlt: 'Medical professionals providing healthcare services in a mobile clinic to rural community members',
        location: 'Bangladesh',
        startDate: '2023-05-20'
      },
      {
        id: '5',
        title: 'Refugee Shelter Construction',
        description: 'Building temporary and permanent housing solutions for displaced families fleeing conflict zones. We provide safe, dignified shelter while supporting community integration and self-reliance programs.',
        status: 'Urgent',
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format',
        imageAlt: 'Construction of temporary housing structures for refugee families with volunteers working together',
        location: 'Jordan',
        startDate: '2024-02-12'
      },
      {
        id: '6',
        title: 'Sustainable Agriculture Training',
        description: 'Teaching climate-resilient farming techniques to rural communities affected by drought and climate change. Our program includes seed distribution, irrigation training, and market access support.',
        status: 'Active',
        imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop&auto=format',
        imageAlt: 'Farmers learning sustainable agriculture techniques in a training demonstration field',
        location: 'Ethiopia',
        startDate: '2023-11-08'
      }
    ];

    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        
        // TODO: Replace with actual API call to Strapi CMS
        // const response = await fetch('/api/projects');
        // const data = await response.json();
        // setProjects(data);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProjects(placeholderProjects);
        
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        // Fallback to placeholder data
        setProjects(placeholderProjects);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Get status styling
  const getStatusStyle = (status: Project['status']) => {
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

  // Loading skeleton component
  const ProjectCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="h-16 bg-gray-200 rounded mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 w-16 bg-gray-200 rounded"></div>
          <div className="h-10 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-white py-16" itemScope itemType="https://schema.org/ItemList">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Active Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our ongoing humanitarian initiatives making a difference in communities worldwide. 
            Each project represents our commitment to creating lasting positive impact.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))
            : projects.map((project, index) => (
                <article
                  key={project.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 hover:shadow-lg"
                  itemScope
                  itemType="https://schema.org/Project"
                  itemProp="itemListElement"
                >
                  {/* Project Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.imageAlt}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      priority={index < 3}
                      itemProp="image"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(project.status)}`}
                        itemProp="projectStatus"
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    {/* Project Title */}
                    <h3 
                      className="text-xl font-bold text-gray-900 mb-2 font-roboto"
                      itemProp="name"
                    >
                      {project.title}
                    </h3>

                    {/* Project Description */}
                    <p 
                      className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3"
                      itemProp="description"
                    >
                      {project.description}
                    </p>

                    {/* Project Meta Information */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <span itemProp="location">{project.location}</span>
                      <time 
                        dateTime={project.startDate}
                        itemProp="startDate"
                      >
                        Started: {new Date(project.startDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short' 
                        })}
                      </time>
                    </div>

                    {/* Learn More Button */}
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center justify-center w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      aria-label={`Learn more about ${project.title} project`}
                      itemProp="url"
                    >
                      Learn More
                      <svg 
                        className="ml-2 w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                    </Link>
                  </div>

                  {/* Structured Data */}
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Project",
                        "name": project.title,
                        "description": project.description,
                        "image": project.imageUrl,
                        "location": {
                          "@type": "Place",
                          "name": project.location
                        },
                        "startDate": project.startDate,
                        "projectStatus": project.status,
                        "url": `/projects/${project.id}`,
                        "organizer": {
                          "@type": "Organization",
                          "@id": "#humanitarian-ngo"
                        }
                      })
                    }}
                  />
                </article>
              ))
          }
        </div>

        {/* View All Projects Button */}
        {!isLoading && projects.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              aria-label="View all humanitarian projects"
            >
              View All Projects
              <svg 
                className="ml-2 w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* Overall Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Humanitarian Projects",
            "description": "Active humanitarian aid projects worldwide",
            "numberOfItems": projects.length,
            "itemListOrder": "https://schema.org/ItemListUnordered"
          })
        }}
      />

      {/* Add Google Font Roboto */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
        .font-roboto {
          font-family: 'Roboto', sans-serif;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ProjectListSection;