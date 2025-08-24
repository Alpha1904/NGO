'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface GalleryImage {
  id: number;
  url: string;
  alt: string;
  caption?: string;
}

interface PhotoGallerySectionProps {
  projectId?: string;
}

const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({ projectId }) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Placeholder images for now
  const placeholderImages: GalleryImage[] = [
    {
      id: 1,
      url: 'https://unsplash.com/photos/project-gallery1.jpg',
      alt: 'Humanitarian aid distribution in local community',
      caption: 'Community aid distribution'
    },
    {
      id: 2,
      url: 'https://unsplash.com/photos/project-gallery2.jpg',
      alt: 'Volunteers working together on humanitarian project',
      caption: 'Volunteer collaboration'
    },
    {
      id: 3,
      url: 'https://unsplash.com/photos/project-gallery3.jpg',
      alt: 'Children benefiting from humanitarian programs',
      caption: 'Children programs impact'
    },
    {
      id: 4,
      url: 'https://unsplash.com/photos/project-gallery4.jpg',
      alt: 'Healthcare services provided by humanitarian mission',
      caption: 'Healthcare outreach'
    }
  ];

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Fetch images from Strapi CMS (placeholder for future implementation)
  useEffect(() => {
    const fetchGalleryImages = async () => {
      if (projectId) {
        try {
          // TODO: Replace with actual Strapi API call
          // const response = await fetch(`/api/projects/${projectId}/gallery`);
          // const data = await response.json();
          // setImages(data.images);
          
          // For now, use placeholder images
          setImages(placeholderImages);
        } catch (error) {
          console.error('Error fetching gallery images:', error);
          setImages(placeholderImages);
        }
      } else {
        setImages(placeholderImages);
      }
    };

    fetchGalleryImages();
  }, [projectId]);

  // Schema.org structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Project Gallery',
    description: 'Photo gallery showcasing humanitarian project activities and impact',
    image: images.map(img => ({
      '@type': 'ImageObject',
      url: img.url,
      name: img.alt,
      caption: img.caption
    }))
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData)
        }}
      />
      
      <section
        ref={sectionRef}
        className={`bg-gray-100 py-16 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        aria-label="Project photo gallery showcasing humanitarian work and impact"
        role="region"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Project Gallery
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`group relative overflow-hidden rounded-lg shadow-md bg-white transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={85}
                  />
                  
                  {/* Overlay for better hover effect */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                
                {/* Caption */}
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm font-medium">
                      {image.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Loading State */}
          {images.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse"
                  role="img"
                  aria-label="Loading gallery image"
                />
              ))}
            </div>
          )}

          {/* Accessibility: Screen reader description */}
          <div className="sr-only">
            This gallery contains {images.length} images showcasing various aspects of our humanitarian project, including community outreach, volunteer activities, and project impact.
          </div>
        </div>
      </section>
    </>
  );
};

export default PhotoGallerySection;