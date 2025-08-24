'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

// Type definitions for mission data
interface MissionData {
  headline: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

const MissionSummarySection: React.FC = () => {
  const [missionData, setMissionData] = useState<MissionData>({
    headline: 'Our Mission',
    description: 'We empower communities worldwide through humanitarian aid, focusing on sustainable development and crisis relief.',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Community members working together on humanitarian aid project'
  });

  const [loading, setLoading] = useState(false);

  // Intersection Observer hook for fade-in animation
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Future CMS integration
  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        setLoading(true);
        // Uncomment when Strapi CMS is ready
        // const response = await fetch('/api/mission');
        // const data = await response.json();
        // setMissionData(data);
        
        // Placeholder - simulate API delay
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Failed to fetch mission data:', error);
        setLoading(false);
      }
    };

    fetchMissionData();
  }, []);

  // Schema.org structured data for SEO (stable for SSR)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Humanitarian NGO",
    "description": missionData.description,
    "mission": missionData.description,
    "sameAs": []
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      <section
        ref={ref}
        className={`bg-white py-16 transition-opacity duration-1000 mt-4 ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Our Mission Section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image Column */}
            <div className="order-1 md:order-1">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={missionData.imageUrl}
                  alt={missionData.imageAlt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  priority={false}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </div>
            </div>

            {/* Text Column */}
            <div className="order-2 md:order-2">
              <div className="space-y-6">
                <h2 
                  className="text-4xl font-bold text-gray-900 leading-tight"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  {loading ? (
                    <div className="animate-pulse bg-gray-200 h-12 w-3/4 rounded"></div>
                  ) : (
                    missionData.headline
                  )}
                </h2>
                
                <div 
                  className="text-lg text-gray-700 leading-relaxed"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  {loading ? (
                    <div className="animate-pulse space-y-2">
                      <div className="bg-gray-200 h-6 w-full rounded"></div>
                      <div className="bg-gray-200 h-6 w-5/6 rounded"></div>
                      <div className="bg-gray-200 h-6 w-4/6 rounded"></div>
                    </div>
                  ) : (
                    <p>{missionData.description}</p>
                  )}
                </div>

                {/* Optional: Add a call-to-action button */}
                <div className="pt-4">
                  <button
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                    aria-label="Learn more about our mission"
                  >
                    Learn More
                    <svg 
                      className="ml-2 -mr-1 w-4 h-4" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MissionSummarySection;