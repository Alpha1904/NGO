'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);

  // Placeholder images for mobile slider
  const heroImages = [
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
  ];

  // Auto-rotate images on mobile every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToDonation = () => {
    // Only run on client side
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      const donationSection = document.getElementById('donation-form');
      if (donationSection) {
        donationSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback: scroll to a position if section doesn't exist
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      role="banner"
      aria-label="Hero section - Empowering Communities Through Humanitarian Aid"
    >
      {/* Desktop Video Background */}
      <div className="absolute inset-0 hidden md:block">
        {!videoError ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onError={() => setVideoError(true)}
            onLoadedData={() => {/* Video loaded successfully */}}
            aria-hidden="true"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            <source src="/videos/hero-video.webm" type="video/webm" />
          </video>
        ) : (
          // Fallback YouTube video iframe
          <div className="absolute inset-0 w-full h-full">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0&showinfo=0&rel=0&modestbranding=1&vq=hd1080"
              title="Humanitarian Aid Background Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              aria-hidden="true"
            />
          </div>
        )}
        
        {/* Fallback image if both video sources fail */}
        <Image 
          src={heroImages[0]} 
          alt="Humanitarian aid work in communities"
          fill
          className={`object-cover ${videoError ? 'hidden' : 'opacity-0'}`}
          onError={() => setVideoError(true)}
          priority
        />
      </div>

      {/* Mobile Image Slider Background */}
      <div className="absolute inset-0 md:hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Humanitarian aid work scene ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay for Text Readability */}
      <div 
        className="absolute inset-0 bg-black/50"
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="block">Empowering Communities</span>
          <span className="block">Through Humanitarian Aid</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Join us in making a lasting impact on lives around the world. 
          Together, we can build stronger, more resilient communities.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToDonation}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-50"
            aria-label="Donate now to support humanitarian aid"
          >
            <span className="relative z-10">Donate Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <svg 
              className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          <Link
            href="/about"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-gray-900 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
            aria-label="Learn more about our humanitarian work"
          >
            Learn More
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
          <div className="flex flex-col items-center text-white animate-bounce">
            <span className="text-sm mb-2 font-medium">Scroll to explore</span>
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Image Slider Dots (Mobile Only) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 md:hidden">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Accessibility: Screen reader content */}
      <div className="sr-only">
        This hero section features a video background on desktop and image slider on mobile, 
        showcasing our humanitarian aid work around the world. The main call-to-action 
        allows you to donate and support our mission.
      </div>
    </section>
  );
};

export default HeroSection;