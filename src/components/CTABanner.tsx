"use client";
import React from 'react';

interface PersistentCTABannerProps {
  /** Optional custom text for the CTA button */
  ctaText?: string;
  /** Optional custom donation section ID to scroll to */
  donationSectionId?: string;
}

const PersistentCTABanner: React.FC<PersistentCTABannerProps> = ({
  ctaText = "Donate Now",
  donationSectionId = "donation-form"
}) => {
  const handleDonateClick = () => {
    const donationSection = document.getElementById(donationSectionId);
    if (donationSection) {
      donationSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div 
      className="fixed bottom-0 left-0 w-full bg-red-600 text-white shadow-lg z-50"
      role="banner"
      aria-label="Donation call-to-action banner"
    >
      <div className="flex justify-center items-center py-4 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <p className="text-sm sm:text-base font-medium text-center sm:text-left">
            Help us make a difference in lives around the world
          </p>
          <button
            onClick={handleDonateClick}
            className="px-6 py-3 bg-white text-red-600 font-bold rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600 transition-colors duration-200"
            aria-label="Donate now - scroll to donation form"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersistentCTABanner;