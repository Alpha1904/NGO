"use client";
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface ImpactItem {
  id: number;
  amount: string;
  description: string;
  icon: string;
  altText: string;
}

const ImpactPerAmountSection: React.FC = () => {
  const [impactItems, setImpactItems] = useState<ImpactItem[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Fetch data from Strapi CMS
  useEffect(() => {
    // Placeholder data - will be replaced with CMS data
    const placeholderData: ImpactItem[] = [
      {
        id: 1,
        amount: '$10',
        description: '5 nutritious meals',
        icon: '/images/meal-icon.svg',
        altText: 'Nutritious meal icon'
      },
      {
        id: 2,
        amount: '$25',
        description: 'School supplies for one child',
        icon: '/images/school-icon.svg',
        altText: 'School supplies icon'
      },
      {
        id: 3,
        amount: '$50',
        description: 'Clean water for a family',
        icon: '/images/water-icon.svg',
        altText: 'Clean water icon'
      },
      {
        id: 4,
        amount: '$100',
        description: 'Emergency medical kit',
        icon: '/images/medical-icon.svg',
        altText: 'Medical kit icon'
      }
    ];

    const fetchImpactData = async () => {
      try {
        // TODO: Replace with actual Strapi endpoint
        const response = await fetch('/api/impact-levels');
        if (response.ok) {
          const data = await response.json();
          setImpactItems(data);
        } else {
          // Fallback to placeholder data if API fails
          setImpactItems(placeholderData);
        }
      } catch (error) {
        console.error('Failed to fetch impact data:', error);
        // Use placeholder data as fallback
        setImpactItems(placeholderData);
      }
    };

    fetchImpactData();
  }, []);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
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

  // Schema.org structured data for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": "Donation Impact Levels",
    "description": "What your donation achieves for humanitarian aid",
    "offers": impactItems.map(item => ({
      "@type": "Offer",
      "price": item.amount.replace('$', ''),
      "priceCurrency": "USD",
      "description": item.description,
      "category": "Humanitarian Aid"
    }))
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData)
        }}
      />
      
      <section
        ref={sectionRef}
        className={`bg-gray-100 py-16 transition-opacity duration-1000 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-labelledby="impact-section-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              id="impact-section-title"
              className="text-3xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              What Your Donation Achieves
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every donation makes a real difference in people&lsquo;s lives. See the direct impact of your contribution.
            </p>
          </div>

          <ul 
            className="flex flex-col md:flex-row md:flex-wrap justify-center items-stretch gap-6 lg:gap-8"
            role="list"
            aria-label="Donation impact levels"
          >
            {impactItems.map((item, index) => (
              <li
                key={item.id}
                className={`flex-1 min-w-[280px] max-w-[300px] bg-white rounded-lg shadow-md p-6 transform transition-all duration-500 ease-in-out hover:shadow-lg hover:scale-105 ${
                  isVisible 
                    ? `translate-y-0 opacity-100` 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
                aria-label={`${item.amount} donation provides ${item.description}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 relative">
                    <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                      <Image
                        src={item.icon}
                        alt={item.altText}
                        width={24}
                        height={24}
                        className="text-red-600"
                        onError={(e) => {
                          // Fallback to checkmark icon if image fails to load
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <CheckCircleIcon 
                        className="w-6 h-6 text-red-600 hidden" 
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-baseline space-x-2 mb-2">
                      <span 
                        className="text-2xl font-bold text-red-600"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        {item.amount}
                      </span>
                      <span className="text-gray-500 text-sm">=</span>
                    </div>
                    
                    <p 
                      className="text-lg text-gray-800 font-medium leading-relaxed"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-center mt-12">
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              All donations go directly to our humanitarian programs. 
              Administrative costs are covered by separate funding.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ImpactPerAmountSection;