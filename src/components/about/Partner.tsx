'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Slider to avoid SSR issues
const Slider = dynamic(() => import('react-slick'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-24 rounded-lg"></div>
});

interface Partner {
  id: number;
  name: string;
  logo: string;
  website?: string;
}

const PartnerLogosSection: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  // Placeholder data - will be replaced by Strapi CMS data
  const placeholderPartners: Partner[] = [
    {
      id: 1,
      name: 'Partner 1',
      logo: 'https://via.placeholder.com/150x50/CCCCCC/666666?text=Partner+1',
      website: 'https://partner1.org'
    },
    {
      id: 2,
      name: 'Partner 2',
      logo: 'https://via.placeholder.com/150x50/CCCCCC/666666?text=Partner+2',
      website: 'https://partner2.org'
    },
    {
      id: 3,
      name: 'Partner 3',
      logo: 'https://via.placeholder.com/150x50/CCCCCC/666666?text=Partner+3',
      website: 'https://partner3.org'
    },
    {
      id: 4,
      name: 'Partner 4',
      logo: 'https://via.placeholder.com/150x50/CCCCCC/666666?text=Partner+4',
      website: 'https://partner4.org'
    },
    {
      id: 5,
      name: 'Partner 5',
      logo: 'https://via.placeholder.com/150x50/CCCCCC/666666?text=Partner+5',
      website: 'https://partner5.org'
    }
  ];

  useEffect(() => {
    setMounted(true);
    
    const fetchPartners = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual Strapi CMS API call
        // const response = await fetch('/api/partners');
        // const data = await response.json();
        // setPartners(data);
        
        // Simulate API delay and use placeholder data
        setTimeout(() => {
          setPartners(placeholderPartners);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching partners:', error);
        // Fallback to placeholder data
        setPartners(placeholderPartners);
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    accessibility: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  };

  // Generate schema.org structured data
  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Our Organization",
      "partner": partners.map(partner => ({
        "@type": "Organization",
        "name": partner.name,
        "url": partner.website || "",
        "logo": partner.logo
      }))
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
    );
  };

  // Don't render until mounted (prevents hydration issues)
  if (!mounted) {
    return (
      <section className="bg-white py-16" aria-label="Partner logos loading">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Trusted Partners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-24 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="bg-white py-16" aria-label="Partner logos loading">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Trusted Partners
          </h2>
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback to simple grid if slider fails
  const renderSimpleGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {partners.map((partner) => (
        <div key={partner.id} className="flex justify-center items-center">
          <div className="bg-gray-50 rounded-lg p-4 h-24 w-full flex items-center justify-center transition-all duration-300 hover:bg-gray-100 hover:shadow-md">
            {partner.website ? (
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                aria-label={`Visit ${partner.name} website`}
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={150}
                  height={50}
                  loading="lazy"
                  className="max-h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </a>
            ) : (
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={150}
                height={50}
                loading="lazy"
                className="max-h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {generateStructuredData()}
      <section 
        className="bg-white py-16" 
        aria-label="Our trusted partners section"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Trusted Partners
          </h2>
          
          {partners.length > 0 ? (
            <div className="partner-carousel" aria-label="Partner logos carousel">
              <Slider {...sliderSettings}>
                {partners.map((partner) => (
                  <div 
                    key={partner.id} 
                    className="px-4 focus:outline-none"
                  >
                    <div className="flex justify-center items-center h-24 bg-gray-50 rounded-lg p-4 transition-all duration-300 hover:bg-gray-100 hover:shadow-md">
                      {partner.website ? (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                          aria-label={`Visit ${partner.name} website`}
                        >
                          <img
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            width={150}
                            height={50}
                            loading="lazy"
                            className="max-h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                          />
                        </a>
                      ) : (
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          width={150}
                          height={50}
                          loading="lazy"
                          className="max-h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No partner information available at this time.</p>
            </div>
          )}
        </div>
        
        <style jsx global>{`
          .partner-carousel .slick-dots {
            bottom: -50px;
          }
          
          .partner-carousel .slick-dots li button:before {
            color: #374151;
            font-size: 12px;
          }
          
          .partner-carousel .slick-dots li.slick-active button:before {
            color: #1f2937;
          }
          
          .partner-carousel .slick-slide {
            outline: none;
          }
          
          .partner-carousel .slick-slide:focus {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
          }
          
          .slick-track {
            display: flex !important;
            align-items: center;
          }
          
          .slick-slide {
            height: inherit !important;
          }
        `}</style>
      </section>
    </>
  );
};

export default PartnerLogosSection;