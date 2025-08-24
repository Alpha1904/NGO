'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface HeroContent {
  headline: string;
  paragraph: string;
  backgroundImage: string;
}

const GetInvolvedHeroSection: React.FC = () => {
  const [content] = useState<HeroContent>({
    headline: 'Join Our Mission',
    paragraph: 'Get involved through events or volunteering to make a global impact.',
    backgroundImage: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80'
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Fetch content from Strapi CMS (placeholder for future integration)
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // TODO: Replace with actual Strapi API endpoint
        // const response = await fetch('/api/get-involved-intro');
        // const data = await response.json();
        // setContent(data);
        
        // For now, using placeholder content
        console.log('Content fetched from placeholder data');
      } catch (error) {
        console.error('Error fetching hero content:', error);
      }
    };

    fetchContent();
  }, []);

  // Schema.org structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Community Engagement Opportunities",
    "description": content.paragraph,
    "organizer": {
      "@type": "Organization",
      "name": "Humanitarian NGO"
    },
    "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled"
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <section
        ref={sectionRef}
        className={`
          relative h-96 md:h-[50vh] w-full overflow-hidden
          transition-opacity duration-1000 ease-out
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        aria-label="Get Involved Hero Section"
        role="banner"
      >
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={content.backgroundImage}
            alt="Community members working together on humanitarian projects, showing hands joining in unity and collaboration"
            width={1200}
            height={400}
            className="w-full h-full object-cover"
            priority={false}
            loading="lazy"
            quality={85}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex flex-col justify-center items-center h-full py-16 text-center">
              {/* Main Headline */}
              <h1 
                className={`
                  text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6
                  transition-transform duration-1000 ease-out
                  ${isVisible ? 'translate-y-0' : 'translate-y-8'}
                `}
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                {content.headline}
                <span className="block w-24 h-1 bg-red-600 mx-auto mt-4"></span>
              </h1>

              {/* Paragraph */}
              <p 
                className={`
                  text-lg md:text-xl text-white max-w-2xl leading-relaxed
                  transition-transform duration-1000 ease-out delay-200
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                `}
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                {content.paragraph}
              </p>

              {/* Call-to-Action Buttons (Optional Enhancement) */}
              <div 
                className={`
                  mt-8 flex flex-col sm:flex-row gap-4
                  transition-transform duration-1000 ease-out delay-400
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                `}
              >
                <button 
                  className="
                    bg-red-600 hover:bg-red-700 text-white font-semibold
                    px-8 py-3 rounded-lg transition-colors duration-300
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                  "
                  aria-label="Learn about volunteering opportunities"
                >
                  Start Volunteering
                </button>
                <button 
                  className="
                    border-2 border-white text-white hover:bg-white hover:text-gray-900
                    font-semibold px-8 py-3 rounded-lg transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
                  "
                  aria-label="View upcoming community events"
                >
                  View Events
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator (Optional Enhancement) */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetInvolvedHeroSection;