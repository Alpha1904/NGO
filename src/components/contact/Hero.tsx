'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ContactHeroData {
  headline: string;
  paragraph: string;
  backgroundImage: string;
}

const ContactHeroSection: React.FC = () => {
  const [heroData, setHeroData] = useState<ContactHeroData>({
    headline: 'Get in Touch',
    paragraph: "We're here to answer your questions and collaborate for global impact.",
    backgroundImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
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

  // Fetch data from CMS (placeholder for future Strapi integration)
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        // Future implementation: const response = await fetch('/api/contact-intro');
        // const data = await response.json();
        // setHeroData(data);
        
        // For now, using placeholder data
        console.log('Ready to integrate with Strapi CMS at /api/contact-intro');
      } catch (error) {
        console.error('Error fetching contact hero data:', error);
      }
    };

    fetchContactData();
  }, []);

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Us",
    "description": heroData.paragraph,
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "mainEntity": {
      "@type": "Organization",
      "name": "Humanitarian NGO",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "General Inquiry"
      }
    }
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
        className={`relative h-[50vh] min-h-96 w-full overflow-hidden transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        aria-label="Contact Us Hero Section"
        role="banner"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroData.backgroundImage}
            alt="Team collaboration - humanitarian workers discussing global impact projects"
            width={1200}
            height={400}
            priority={false}
            loading="lazy"
            quality={85}
            className="object-cover w-full h-full"
            sizes="100vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-20 h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex flex-col justify-center items-center h-full py-16 text-center">
              {/* Headline */}
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-roboto leading-tight"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                {heroData.headline}
                <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
              </h1>

              {/* Paragraph */}
              <p 
                className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed font-roboto"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                {heroData.paragraph}
              </p>

              {/* Optional CTA Button */}
              <div className="mt-8">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-transparent"
                  aria-label="Scroll to contact form"
                  onClick={() => {
                    const contactForm = document.getElementById('contact-form');
                    contactForm?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Start the Conversation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactHeroSection;