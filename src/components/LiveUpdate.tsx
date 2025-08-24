"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Update {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  slug: string;
  type: 'article' | 'social';
  socialEmbed?: string;
}

const LiveUpdatesSection: React.FC = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock data for MVP - replace with API call later
    const mockUpdates: Update[] = [
      {
        id: '1',
        title: 'Emergency Relief Reaches Remote Villages in Crisis Zone',
        date: '2024-08-20',
        excerpt: 'Our emergency response team successfully delivered essential supplies to 15 remote villages affected by recent flooding, providing immediate relief to over 3,000 families.',
        image: '/images/emergency-relief.jpg',
        slug: 'emergency-relief-remote-villages',
        type: 'article'
      },
      {
        id: '2',
        title: 'New School Opens in Refugee Camp',
        date: '2024-08-18',
        excerpt: 'Thanks to generous donors, we opened our 50th educational facility, providing hope and learning opportunities for 500 refugee children.',
        image: '/images/school-opening.jpg',
        slug: 'new-school-refugee-camp',
        type: 'article'
      },
      {
        id: '3',
        title: 'Clean Water Initiative Milestone Reached',
        date: '2024-08-15',
        excerpt: 'Our water sanitation project has now provided clean drinking water access to over 100,000 people across 25 communities in the region.',
        image: '/images/water-initiative.jpg',
        slug: 'clean-water-milestone',
        type: 'article'
      },
      {
        id: '4',
        title: 'Medical Team Provides Critical Healthcare',
        date: '2024-08-12',
        excerpt: 'Our mobile medical units treated over 800 patients this week, providing essential healthcare services in areas with limited medical infrastructure.',
        image: '/images/medical-team.jpg',
        slug: 'medical-team-healthcare',
        type: 'article'
      },
      {
        id: '5',
        title: 'Community Volunteers Make a Difference',
        date: '2024-08-10',
        excerpt: 'Local volunteers joined our food distribution program, helping us reach 50% more families in need while strengthening community bonds.',
        image: '/images/volunteers.jpg',
        slug: 'community-volunteers',
        type: 'social',
        socialEmbed: 'Amazing to see the community come together! 💪 #HumanitarianWork #CommunitySupport #MakeADifference'
      }
    ];

    const fetchUpdates = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call to Strapi
        // const response = await fetch('/api/updates');
        // if (!response.ok) throw new Error('Failed to fetch updates');
        // const data = await response.json();
        // setUpdates(data);
        
        // Simulate API delay for now
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUpdates(mockUpdates);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load updates');
        // Fallback to mock data on error
        setUpdates(mockUpdates);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="bg-white py-16" aria-labelledby="updates-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="updates-title" className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Latest Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg shadow-md p-6 animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-300 h-6 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded mb-4 w-1/3"></div>
                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded mb-4 w-2/3"></div>
                <div className="bg-gray-300 h-8 rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16" aria-labelledby="updates-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="updates-title" className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Latest Updates
        </h2>
        
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-8" role="alert">
            <p className="text-yellow-800">
              <strong>Notice:</strong> {error}. Showing cached updates below.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {updates.map((update) => (
            <article
              key={update.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={update.image}
                  alt={`Image for ${update.title}`}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className="p-6">
                <header className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {update.title}
                  </h3>
                  <time 
                    dateTime={update.date}
                    className="text-sm text-gray-500"
                  >
                    {formatDate(update.date)}
                  </time>
                </header>
                
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {update.excerpt}
                </p>
                
                {update.type === 'social' && update.socialEmbed && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-4 rounded">
                    <p className="text-sm text-red-800 italic">
                      &quot;{update.socialEmbed}&quot;
                    </p>
                  </div>
                )}
                
                <footer>
                  <Link
                    href={`/updates/${update.slug}`}
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    aria-label={`Read more about ${update.title}`}
                  >
                    Read More
                    <svg 
                      className="ml-2 h-4 w-4" 
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
                </footer>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/updates"
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-900 text-lg font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
          >
            View All Updates
            <svg 
              className="ml-2 h-5 w-5" 
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
      </div>
    </section>
  );
};

export default LiveUpdatesSection;