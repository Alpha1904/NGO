'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Story {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  donationLink: string;
  altText: string;
}

const StoryHighlightsSection = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder stories for fallback
    const placeholderStories: Story[] = [
      {
        id: 1,
        title: 'Rebuilding After Disaster',
        description: 'After the devastating earthquake, Maria\'s community came together to rebuild their school. With your support, 200 children now have a safe place to learn and grow.',
        imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop&crop=center',
        donationLink: '/donate/disaster-relief',
        altText: 'Children playing in a newly rebuilt school courtyard'
      },
      {
        id: 2,
        title: 'Clean Water for All',
        description: 'Ahmed\'s village now has access to clean drinking water thanks to a new well system. This life-changing project has reduced waterborne diseases by 90% in the community.',
        imageUrl: 'https://smileindiatrust.org/wp-content/uploads/2022/06/15.jpg',
        donationLink: '/donate/clean-water',
        altText: 'Community members gathering around a new water well'
      },
      {
        id: 3,
        title: 'Education Changes Lives',
        description: 'Young Fatima is the first in her family to learn to read and write. Our literacy program has empowered over 500 women and girls in rural communities.',
        imageUrl: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop&crop=center',
        donationLink: '/donate/education',
        altText: 'A young girl reading a book in a classroom setting'
      }
    ];

    const fetchStories = async () => {
      try {
        setLoading(true);
        
        // Replace with your actual Strapi API endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/stories?populate=*`, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          
          // Transform Strapi data to match our Story interface
          const transformedStories: Story[] = data.data.map((item: any) => ({
            id: item.id,
            title: item.attributes.title,
            description: item.attributes.description,
            imageUrl: item.attributes.image?.data?.attributes?.url 
              ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.attributes.image.data.attributes.url}`
              : placeholderStories[0].imageUrl,
            donationLink: item.attributes.donationLink || '/donate',
            altText: item.attributes.image?.data?.attributes?.alternativeText || item.attributes.title
          }));

          setStories(transformedStories.slice(0, 3)); // Limit to 3 stories
        } else {
          // Fallback to placeholder stories if API fails
          setStories(placeholderStories);
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
        // Fallback to placeholder stories
        setStories(placeholderStories);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stories of Hope and Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how your support creates lasting change in communities around the world
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg shadow-md animate-pulse">
                <div className="w-full h-64 bg-gray-300 rounded-t-lg"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-6"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stories of Hope and Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how your support creates lasting change in communities around the world
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              {/* Story Image */}
              <div className="relative h-64 w-full">
                <Image
                  src={story.imageUrl}
                  alt={story.altText}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
              </div>

              {/* Story Content */}
              <div className="p-6">
                <h3 className="font-bold text-2xl text-gray-900 mb-4">
                  {story.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {story.description}
                </p>

                {/* Donation Button */}
                <Link
                  href={story.donationLink}
                  className="inline-block w-full text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
                >
                  Donate to this cause
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link
            href="/stories"
            className="inline-link text-red-600 hover:text-red-800 font-semibold text-lg hover:underline transition-colors duration-200"
          >
            View all stories →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StoryHighlightsSection;