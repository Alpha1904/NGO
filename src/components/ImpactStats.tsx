'use client';

import React, { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup';

interface StatData {
  id: string;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

const ImpactStatsSection: React.FC = () => {
  const [stats] = useState<StatData[]>([
    { id: 'people-helped', value: 10000, label: 'People Helped' },
    { id: 'active-projects', value: 50, label: 'Active Projects' },
    { id: 'donations-raised', value: 1000000, label: 'Donations Raised', prefix: '$' }
  ]);
  
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
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
  }, [hasAnimated]);

  // Placeholder for future Strapi API integration
  useEffect(() => {
    // TODO: Replace with actual Strapi API call
    // const response = await fetch('/api/impact-stats');
    // const data = await response.json();
    // setStats(data);
    
    // For now, using placeholder data
    console.log('Future Strapi API integration point');
  }, []);

  const formatNumber = (value: number, prefix?: string, suffix?: string): string => {
    let formattedValue = '';
    
    if (value >= 1000000) {
      formattedValue = `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      formattedValue = `${(value / 1000).toFixed(0)}K`;
    } else {
      formattedValue = value.toString();
    }

    return `${prefix || ''}${formattedValue}${suffix || ''}`;
  };

  return (
    <section
      ref={sectionRef}
      className="bg-gray-100 py-16"
      aria-label="Impact Statistics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Together, we&apos;re making a difference in communities around the world. 
            See the real-time impact of your support.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`
                bg-white rounded-lg shadow-lg p-8 text-center
                transform transition-all duration-500 ease-out
                hover:shadow-xl hover:-translate-y-1
                ${isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
                }
              `}
              style={{
                transitionDelay: `${index * 200}ms`
              }}
            >
              {/* Animated Counter */}
              <div 
                className="text-4xl font-bold text-red-600 mb-4"
                aria-live="polite"
                aria-label={`${stat.label}: ${formatNumber(stat.value, stat.prefix)}`}
              >
                {isVisible ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2}
                    separator=","
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    formattingFn={(value) => {
                      const formatted = formatNumber(value, stat.prefix, stat.suffix);
                      return formatted;
                    }}
                  />
                ) : (
                  '0'
                )}
              </div>

              {/* Stat Label */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {stat.label}
              </h3>

              {/* Decorative Element */}
              <div className="w-12 h-1 bg-red-600 mx-auto rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Be part of our growing community of changemakers
          </p>
          <button className="
            bg-red-600 hover:bg-red-700 text-white font-semibold
            py-3 px-8 rounded-lg transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
          ">
            Join Our Mission
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImpactStatsSection;