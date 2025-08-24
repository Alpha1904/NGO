'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface UserAccountsSectionProps {
  isVisible?: boolean;
}

const UserAccountsSection: React.FC<UserAccountsSectionProps> = ({ 
  isVisible = true 
}) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleLoginClick = () => {
    console.log('Login button clicked - redirecting to /login');
  };

  const handleSignUpClick = () => {
    console.log('Sign Up button clicked - redirecting to /signup');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Schema.org JSON-LD markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPageElement',
            name: 'User Account Section',
            description: 'User registration and login area for tracking donations and volunteer activities',
            mainEntity: {
              '@type': 'WebApplication',
              name: 'User Account Management',
              applicationCategory: 'Account',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              }
            }
          })
        }}
      />

      <section
        ref={sectionRef}
        className={`bg-gray-100 py-16 transition-all duration-1000 ease-out ${
          isAnimated 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
        aria-labelledby="track-impact-heading"
        role="region"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white shadow-md rounded-lg p-8">
              {/* Headline */}
              <h2 
                id="track-impact-heading"
                className="text-3xl font-bold text-center text-gray-800 mb-6"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Track Your Impact
              </h2>

              {/* Description */}
              <p 
                className="text-base text-gray-600 text-center mb-8 leading-relaxed"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Create an account to track donations, receive updates, and manage volunteer activities.
              </p>

              {/* Buttons Container */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* Login Button */}
                <Link
                  href="/login"
                  onClick={handleLoginClick}
                  className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-105 transition-transform"
                  aria-label="Login to your account to track your humanitarian impact"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Login
                </Link>

                {/* Sign Up Button */}
                <Link
                  href="/signup"
                  onClick={handleSignUpClick}
                  className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-105 transition-transform"
                  aria-label="Sign up for a new account to start tracking your humanitarian impact"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Sign Up
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Join our community of changemakers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Fonts Link - Add to your _document.tsx or layout */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
      `}</style>
    </>
  );
};

export default UserAccountsSection;