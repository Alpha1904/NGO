'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface StoryData {
  headline: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
}

interface FullStorySectionProps {
  projectId?: string;
}

const FullStorySection: React.FC<FullStorySectionProps> = ({ projectId }) => {
  const [story, setStory] = useState<StoryData>({
    headline: 'Our Story',
    content: `This project began in 2023 to address water scarcity in remote communities across sub-Saharan Africa. What started as a small initiative to install solar-powered water pumps in three villages has grown into a comprehensive program reaching over 50,000 people.

Our team recognized that access to clean water is not just about infrastructure—it's about empowering communities to maintain and operate these systems independently. We partnered with local leaders and trained community members in pump maintenance, water quality testing, and basic repair techniques.

The impact has been transformative. Children who once spent hours walking to distant water sources now attend school regularly. Women have gained time to pursue income-generating activities and participate in community leadership roles. Healthcare outcomes have improved dramatically with reduced waterborne illnesses.

Moving forward, we're expanding our approach to include water storage solutions, drought-resistant agriculture training, and microfinance programs. Our goal is to create resilient, self-sustaining water systems that will serve these communities for generations to come.`,
    imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0c4a3a78d62?w=500&h=400&fit=crop&crop=center&q=80',
    imageAlt: 'Community members working together on water infrastructure project'
  });

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
        rootMargin: '50px 0px -50px 0px'
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

  useEffect(() => {
    const fetchStory = async () => {
      if (!projectId) return;
      
      try {
        // TODO: Replace with actual Strapi CMS API call
        // const response = await fetch(`/api/projects/${projectId}/story`);
        // const data = await response.json();
        // setStory(data);
      } catch (error) {
        console.error('Failed to fetch story data:', error);
      }
    };

    fetchStory();
  }, [projectId]);

  // Split content into paragraphs
  const paragraphs = story.content.split('\n\n').filter(p => p.trim());

  return (
    <>
      {/* Schema.org JSON-LD markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: story.headline,
            articleBody: story.content,
            author: {
              '@type': 'Organization',
              name: 'Humanitarian NGO'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Humanitarian NGO'
            },
            image: story.imageUrl,
            datePublished: new Date().toISOString()
          })
        }}
      />
      
      <section 
        ref={sectionRef}
        className={`bg-white py-16 transition-opacity duration-1000 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-labelledby="story-headline"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Text Content */}
            <div className="space-y-6">
              <h2 
                id="story-headline"
                className="text-3xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                {story.headline}
              </h2>
              
              <div 
                className="prose prose-lg max-w-none"
                aria-describedby="story-content"
                id="story-content"
              >
                {paragraphs.map((paragraph, index) => (
                  <p 
                    key={index}
                    className="text-base text-gray-700 leading-relaxed mb-4 last:mb-0"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative order-first md:order-last">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={story.imageUrl}
                  alt={story.imageAlt}
                  width={500}
                  height={400}
                  className="object-cover w-full h-auto transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 500px"
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              
              {/* Optional caption */}
              <p className="mt-3 text-sm text-gray-600 italic text-center">
                Community members collaborating on sustainable water infrastructure
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FullStorySection;