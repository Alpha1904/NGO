'use client';

import { useState, useEffect, useRef } from 'react';
import Countdown from 'react-countdown';

interface Appeal {
  id: string;
  title: string;
  endDate: number;
  description?: string;
}

interface CountdownRendererProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const UrgencyIndicatorsSection = () => {
  const [appeals, setAppeals] = useState<Appeal[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  // Placeholder data - will be replaced with Strapi CMS data
  const placeholderAppeals: Appeal[] = [
    {
      id: '1',
      title: 'Emergency Relief Fund ends in',
      endDate: Date.now() + 3 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000 + 45 * 60 * 1000 + 30 * 1000, // 3d 12h 45m 30s
    },
    {
      id: '2',
      title: 'Critical Medical Supplies ends in',
      endDate: Date.now() + 7 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000 + 22 * 60 * 1000 + 15 * 1000, // 7d 8h 22m 15s
    },
  ];

  // IntersectionObserver for fade-in animation
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
        rootMargin: '50px',
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

  // Fetch appeals from Strapi CMS
  useEffect(() => {
    const fetchAppeals = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual Strapi CMS endpoint
        // const response = await fetch('/api/appeals');
        // const data = await response.json();
        // setAppeals(data);
        
        // For now, use placeholder data
        setTimeout(() => {
          setAppeals(placeholderAppeals);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching appeals:', error);
        // Fallback to placeholder data
        setAppeals(placeholderAppeals);
        setIsLoading(false);
      }
    };

    fetchAppeals();
  }, []);

  // Custom countdown renderer
  const countdownRenderer = ({ days, hours, minutes, seconds, completed }: CountdownRendererProps) => {
    if (completed) {
      return (
        <span className="text-red-800 font-bold text-lg">
          Appeal Ended
        </span>
      );
    }

    return (
      <div className="text-red-600 font-bold text-xl">
        <span className="inline-block min-w-[2ch]">{days}</span>d{' '}
        <span className="inline-block min-w-[2ch]">{hours}</span>h{' '}
        <span className="inline-block min-w-[2ch]">{minutes}</span>m{' '}
        <span className="inline-block min-w-[2ch]">{seconds}</span>s
      </div>
    );
  };

  // Schema.org structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'DonateAction',
    name: 'Time-Sensitive Appeals',
    description: 'Urgent humanitarian appeals with limited time remaining',
    timeLimited: true,
    target: appeals.map(appeal => ({
      '@type': 'EntryPoint',
      name: appeal.title,
      validUntil: new Date(appeal.endDate).toISOString(),
    })),
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <section
        ref={sectionRef}
        className={`bg-gray-100 py-16 transition-opacity duration-1000 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ fontFamily: 'Roboto, sans-serif' }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Time-Sensitive Appeals
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-md animate-pulse"
                >
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-8 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              role="region"
              aria-label="Urgent donation appeals"
            >
              {appeals.map((appeal, index) => (
                <div
                  key={appeal.id}
                  className={`bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform ${
                    isVisible ? 'translate-y-0' : 'translate-y-4'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">
                    {appeal.title}
                  </h3>
                  
                  <div 
                    className="text-center"
                    aria-live="polite"
                    aria-atomic="true"
                    role="timer"
                    aria-label={`Countdown timer for ${appeal.title}`}
                  >
                    <Countdown
                      date={appeal.endDate}
                      renderer={countdownRenderer}
                      intervalDelay={1000}
                      precision={3}
                    />
                  </div>
                  
                  {appeal.description && (
                    <p className="text-gray-600 text-sm mt-4 text-center">
                      {appeal.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {!isLoading && appeals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No urgent appeals at this time. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default UrgencyIndicatorsSection;