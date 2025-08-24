'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ProjectUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  datePublished: string;
}

interface StatusUpdatesSectionProps {
  projectId?: string;
}

const StatusUpdatesSection: React.FC<StatusUpdatesSectionProps> = ({ projectId }) => {
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // IntersectionObserver for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch updates from API (placeholder implementation)
  useEffect(() => {
    // Placeholder data - will be replaced with API call
    const placeholderUpdates: ProjectUpdate[] = [
      {
        id: '1',
        date: 'Oct 2025',
        title: 'Water Infrastructure Milestone',
        description: 'Successfully installed 10 water pumps across remote villages, providing clean water access to over 2,000 community members.',
        datePublished: '2025-10-15T10:00:00Z'
      },
      {
        id: '2',
        date: 'Sep 2025',
        title: 'Community Training Program',
        description: 'Completed comprehensive training sessions for 50 local technicians on pump maintenance and water quality testing procedures.',
        datePublished: '2025-09-20T14:30:00Z'
      },
      {
        id: '3',
        date: 'Aug 2025',
        title: 'Solar Panel Installation',
        description: 'Installed solar-powered systems for 8 water pumps, ensuring sustainable and environmentally friendly operation in off-grid areas.',
        datePublished: '2025-08-10T09:15:00Z'
      }
    ];

    const fetchUpdates = async () => {
      try {
        if (projectId) {
          // TODO: Replace with actual API call
          // const response = await fetch(`/api/projects/${projectId}/updates`);
          // const data = await response.json();
          // setUpdates(data);
          
          // For now, use placeholder data
          setUpdates(placeholderUpdates);
        } else {
          setUpdates(placeholderUpdates);
        }
      } catch (error) {
        console.error('Failed to fetch project updates:', error);
        // Fallback to placeholder data
        setUpdates(placeholderUpdates);
      }
    };

    fetchUpdates();
  }, [projectId]);



  return (
    <section 
      ref={sectionRef}
      className={`bg-white py-16 transition-opacity duration-1000 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-labelledby="project-updates-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            id="project-updates-heading"
            className="text-3xl font-bold text-gray-900 font-roboto"
          >
            Project Updates
          </h2>
        </div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          role="list"
          aria-describedby="updates-description"
        >
          <div id="updates-description" className="sr-only">
            Latest updates and milestones for this humanitarian project
          </div>
          
          {updates.map((update, index) => (
            <article
              key={update.id}
              className={`bg-white border border-gray-300 rounded-lg p-6 hover:bg-gray-50 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 ${
                isVisible ? `animate-fade-in-up animation-delay-${index * 200}` : ''
              }`}
              role="listitem"
              itemScope
              itemType="https://schema.org/NewsArticle"
            >
              <div className="flex flex-col h-full">
                <div className="mb-3">
                  <time 
                    className="text-sm font-semibold text-blue-600 font-roboto"
                    dateTime={update.datePublished}
                    itemProp="datePublished"
                  >
                    {update.date}
                  </time>
                </div>
                
                <h3 
                  className="text-lg font-bold text-gray-900 mb-3 font-roboto"
                  itemProp="headline"
                >
                  {update.title}
                </h3>
                
                <p 
                  className="text-base text-gray-700 leading-relaxed font-roboto flex-grow"
                  itemProp="description"
                >
                  {update.description}
                </p>

                {/* Hidden schema.org metadata */}
                <meta itemProp="dateModified" content={update.datePublished} />
                <div itemProp="author" itemScope itemType="https://schema.org/Organization" className="sr-only">
                  <span itemProp="name">Humanitarian NGO</span>
                </div>
                <div itemProp="publisher" itemScope itemType="https://schema.org/Organization" className="sr-only">
                  <span itemProp="name">Humanitarian NGO</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700;900&display=swap');
        
        .font-roboto {
          font-family: 'Roboto', sans-serif;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animation-delay-0 {
          animation-delay: 0ms;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Screen reader only class */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </section>
  );
};

export default StatusUpdatesSection;