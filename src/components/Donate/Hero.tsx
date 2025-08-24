"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';

interface DonateContent {
  headline: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

const DonateHeroSection: React.FC = () => {
  const [content, setContent] = useState<DonateContent>({
    headline: 'Make a Difference Today',
    description: 'Your donation empowers communities and saves lives. Join us in creating lasting change.',
    imageUrl: 'https://unsplash.com/photos/donation-impact.jpg',
    imageAlt: 'Communities receiving humanitarian aid and support'
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Fetch content from Strapi CMS (placeholder for future implementation)
  useEffect(() => {
    const fetchDonateContent = async () => {
      try {
        // Future implementation: Replace with actual Strapi API call
        // const response = await fetch('/api/donate-intro');
        // const data = await response.json();
        // setContent(data);
        
        // For now, using placeholder content
        console.log('Using placeholder content - integrate with Strapi CMS later');
      } catch (error) {
        console.error('Error fetching donate content:', error);
        // Fallback to default content
      }
    };

    fetchDonateContent();
  }, []);

  // Intersection Observer for fade-in animation
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
        rootMargin: '0px 0px -50px 0px'
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

  // Schema.org structured data for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    "name": content.headline,
    "description": content.description,
    "recipient": {
      "@type": "NGO",
      "name": "Humanitarian NGO"
    },
    "url": typeof window !== 'undefined' ? window.location.href : ''
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" 
          rel="stylesheet" 
        />
      </Head>
      
      <section
        ref={sectionRef}
        className={`relative h-96 md:h-[50vh] min-h-[400px] w-full overflow-hidden transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        aria-label="Donation hero section"
        role="banner"
        style={{ fontFamily: 'Roboto, sans-serif' }}
      >
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0">
          <Image
            src={content.imageUrl}
            alt={content.imageAlt}
            width={1200}
            height={400}
            priority={false}
            loading="lazy"
            className="object-cover w-full h-full"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            {/* Headline */}
            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {content.headline}
              <span className="block w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
            </h1>

            {/* Description */}
            <p 
              className={`text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {content.description}
            </p>

            {/* Call to Action Button */}
            <div 
              className={`mt-8 transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500/50"
                aria-label="Start donating to support humanitarian efforts"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>

        {/* Gradient Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/10 to-transparent" />
      </section>
    </>
  );
};

export default DonateHeroSection;