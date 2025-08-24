'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ProjectsIntroData {
  headline: string;
  description: string;
  backgroundImage: string;
}

const ProjectsHeroSection: React.FC = () => {
  const [data] = useState<ProjectsIntroData>({
    headline: 'Our Global Projects',
    description: 'Discover our initiatives transforming lives worldwide through sustainable aid and crisis relief.',
    backgroundImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=400&fit=crop&crop=center'
  });
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Future CMS integration
  useEffect(() => {
    const fetchProjectsIntro = async () => {
      try {
        // Placeholder for Strapi CMS integration
        // const response = await fetch('/api/projects-intro');
        // const cmsData = await response.json();
        // setData(cmsData);
        
        // For now, using static placeholder data
        console.log('Ready for CMS integration at /api/projects-intro');
      } catch (error) {
        console.error('Error fetching projects intro data:', error);
      }
    };

    fetchProjectsIntro();
  }, []);

  return (
    <>
      {/* Schema.org JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Project",
            "name": data.headline,
            "description": data.description,
            "url": "https://www.ngoAid.org/projects",
            "provider": {
              "@type": "NGO",
              "name": "Humanitarian NGO"
            }
          })
        }}
      />
      
      <section 
        ref={heroRef}
        className={`relative h-96 w-full overflow-hidden transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Projects Overview Hero Section"
      >
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0">
          <Image
            src={data.backgroundImage}
            alt="Humanitarian projects worldwide - volunteers working in community development"
            width={1200}
            height={400}
            priority={false}
            loading="lazy"
            className="h-full w-full object-cover"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA"
            quality={85}
          />
          
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 py-16">
          <div className="text-center text-white">
            {/* Main Headline */}
            <h1 
              className={`mb-6 font-bold text-4xl md:text-5xl transition-transform duration-1000 ${
                isVisible ? 'translate-y-0' : 'translate-y-8'
              }`}
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              {data.headline}
              <span className="block mt-2 mx-auto w-24 h-1 bg-red-600"></span>
            </h1>

            {/* Description Paragraph */}
            <p 
              className={`max-w-2xl text-lg leading-relaxed transition-transform duration-1000 delay-200 ${
                isVisible ? 'translate-y-0' : 'translate-y-8'
              }`}
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              {data.description}
            </p>
          </div>
        </div>

        {/* Subtle Gradient Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
      </section>
    </>
  );
};

export default ProjectsHeroSection;