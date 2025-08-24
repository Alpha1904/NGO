"use client";
import React, { useState, useEffect, useRef } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface ContactDetail {
  type: 'email' | 'phone' | 'address';
  label: string;
  value: string;
  href?: string;
}

interface ContactData {
  headline: string;
  details: ContactDetail[];
}

const ContactDetailsSection: React.FC = () => {
  const [contactData] = useState<ContactData>({
    headline: 'Our Contact Information',
    details: [
      {
        type: 'email',
        label: 'Email',
        value: 'info@ngoaid.org',
        href: 'mailto:info@ngoaid.org'
      },
      {
        type: 'phone',
        label: 'Phone',
        value: '+1-555-123-4567',
        href: 'tel:+1-555-123-4567'
      },
      {
        type: 'address',
        label: 'Address',
        value: '123 Hope St, Global City, World'
      }
    ]
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Fetch contact details from Strapi CMS
  useEffect(() => {
    // TODO: Replace with actual Strapi API endpoint
    // const response = await fetch('/api/contact-details');
    // if (response.ok) {
    //   const data = await response.json();
    //   setContactData(data);
    // }
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <EnvelopeIcon className="w-6 h-6 text-red-600" aria-hidden="true" />;
      case 'phone':
        return <PhoneIcon className="w-6 h-6 text-red-600" aria-hidden="true" />;
      case 'address':
        return <MapPinIcon className="w-6 h-6 text-red-600" aria-hidden="true" />;
      default:
        return null;
    }
  };

  const getAriaLabel = (type: string, value: string) => {
    switch (type) {
      case 'email':
        return `Email us at ${value}`;
      case 'phone':
        return `Call us at ${value}`;
      case 'address':
        return `Visit us at ${value}`;
      default:
        return value;
    }
  };

  // Schema.org structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NGO Aid",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": contactData.details.find(d => d.type === 'email')?.value,
      "telephone": contactData.details.find(d => d.type === 'phone')?.value,
      "contactType": "customer service"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": contactData.details.find(d => d.type === 'address')?.value
    }
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <section
        ref={sectionRef}
        className={`bg-gray-100 py-16 transition-opacity duration-1000 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-labelledby="contact-heading"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2
            id="contact-heading"
            className="text-3xl font-bold text-gray-900 text-center mb-12"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            {contactData.headline}
          </h2>
          
          <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-8">
            {contactData.details.map((detail, index) => (
              <div
                key={index}
                className="flex items-center justify-center md:justify-start space-x-4 md:w-auto"
              >
                <div
                  className="flex-shrink-0"
                  aria-label={getAriaLabel(detail.type, detail.value)}
                >
                  {getIcon(detail.type)}
                </div>
                <div className="text-center md:text-left">
                  <dt className="sr-only">{detail.label}</dt>
                  {detail.href ? (
                    <dd>
                      <a
                        href={detail.href}
                        className="text-lg text-gray-700 hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                        aria-label={getAriaLabel(detail.type, detail.value)}
                      >
                        {detail.value}
                      </a>
                    </dd>
                  ) : (
                    <dd
                      className="text-lg text-gray-700"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      {detail.value}
                    </dd>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactDetailsSection;