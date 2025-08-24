'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TwitterShareButton, FacebookShareButton, LinkedinShareButton } from 'react-share';
import { TwitterIcon, FacebookIcon, LinkedinIcon } from 'react-share';

interface SocialShareSectionProps {
  projectTitle?: string;
  projectDescription?: string;
}

const SocialShareSection: React.FC<SocialShareSectionProps> = ({
  projectTitle = "Support Our Humanitarian Project",
  projectDescription = "Help us make a difference in communities around the world."
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set current URL on client side
    setCurrentUrl(window.location.href);

    // Intersection Observer for fade-in animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
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

  const shareText = `${projectTitle} - ${projectDescription}`;

  return (
    <>
      {/* Schema.org JSON-LD markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ShareAction",
            "agent": {
              "@type": "Person",
              "name": "Website Visitor"
            },
            "object": {
              "@type": "WebPage",
              "name": projectTitle,
              "description": projectDescription,
              "url": currentUrl
            },
            "target": [
              {
                "@type": "EntryPoint",
                "urlTemplate": `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`,
                "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
              },
              {
                "@type": "EntryPoint",
                "urlTemplate": `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
                "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
              },
              {
                "@type": "EntryPoint",
                "urlTemplate": `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
                "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
              }
            ]
          })
        }}
      />

      <section 
        ref={sectionRef}
        className={`bg-gray-100 py-8 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        aria-labelledby="share-heading"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h2 
              id="share-heading"
              className="text-3xl font-bold text-gray-900 mb-8 font-['Roboto',sans-serif]"
            >
              Share This Project
            </h2>
            
            <div className="flex justify-center items-center gap-6 flex-wrap">
              {/* Twitter/X Share Button */}
              <TwitterShareButton
                url={currentUrl}
                title={shareText}
                hashtags={['humanitarian', 'charity', 'help']}
                className="transform transition-all duration-200 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full"
                aria-label={`Share ${projectTitle} on Twitter`}
                onFocus={(e) => e.currentTarget.classList.add('ring-4', 'ring-blue-300')}
                onBlur={(e) => e.currentTarget.classList.remove('ring-4', 'ring-blue-300')}
              >
                <div className="flex items-center gap-3 bg-white hover:bg-blue-50 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-blue-300">
                  <TwitterIcon size={24} round />
                  <span className="font-semibold text-gray-700 hover:text-blue-600 font-['Roboto',sans-serif]">
                    Share on X
                  </span>
                </div>
              </TwitterShareButton>

              {/* Facebook Share Button */}
              <FacebookShareButton
                url={currentUrl}
                className="transform transition-all duration-200 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full"
                aria-label={`Share ${projectTitle} on Facebook`}
                onFocus={(e) => e.currentTarget.classList.add('ring-4', 'ring-blue-300')}
                onBlur={(e) => e.currentTarget.classList.remove('ring-4', 'ring-blue-300')}
              >
                <div className="flex items-center gap-3 bg-white hover:bg-blue-50 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-blue-300">
                  <FacebookIcon size={24} round />
                  <span className="font-semibold text-gray-700 hover:text-blue-600 font-['Roboto',sans-serif]">
                    Share on Facebook
                  </span>
                </div>
              </FacebookShareButton>

              {/* LinkedIn Share Button */}
              <LinkedinShareButton
                url={currentUrl}
                title={projectTitle}
                summary={projectDescription}
                source="Humanitarian NGO"
                className="transform transition-all duration-200 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full"
                aria-label={`Share ${projectTitle} on LinkedIn`}
                onFocus={(e) => e.currentTarget.classList.add('ring-4', 'ring-blue-300')}
                onBlur={(e) => e.currentTarget.classList.remove('ring-4', 'ring-blue-300')}
              >
                <div className="flex items-center gap-3 bg-white hover:bg-blue-50 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-blue-300">
                  <LinkedinIcon size={24} round />
                  <span className="font-semibold text-gray-700 hover:text-blue-600 font-['Roboto',sans-serif]">
                    Share on LinkedIn
                  </span>
                </div>
              </LinkedinShareButton>
            </div>

            {/* Call to action text */}
            <p className="mt-6 text-gray-600 font-['Roboto',sans-serif] max-w-2xl mx-auto">
              Help us spread the word about this important humanitarian project. 
              Your share can make a real difference in reaching more supporters.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SocialShareSection;