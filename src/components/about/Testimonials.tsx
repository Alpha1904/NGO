"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatarUrl: string;
}

const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Placeholder data - will be replaced with Strapi CMS API call
  const placeholderTestimonials: Testimonial[] = [
    {
      id: 1,
      quote:
        "This NGO changed my life with clean water access. My family no longer has to walk hours to fetch water, and my children can now attend school regularly.",
      name: "John Mukasa",
      role: "Beneficiary",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 2,
      quote:
        "Supporting this organization has been incredibly rewarding. Seeing the direct impact of our donations on communities gives me hope for a better world.",
      name: "Sarah Chen",
      role: "Donor",
      avatarUrl:
        "data:image/jpeg;base64,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",
    },
    {
      id: 3,
      quote:
        "Our partnership has enabled us to reach remote communities we couldn't access alone. Together, we're making sustainable change that lasts.",
      name: "Dr. Ahmed Hassan",
      role: "Partner Organization",
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
  ];

  useEffect(() => {
    // Simulate API call to Strapi CMS
    // TODO: Replace with actual API call to GET /api/testimonials
    const fetchTestimonials = async () => {
      try {
        setLoading(true);

        // Simulated API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // TODO: Replace with actual fetch call
        // const response = await fetch('/api/testimonials');
        // const data = await response.json();
        // setTestimonials(data);

        // Using placeholder data for now
        setTestimonials(placeholderTestimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // Fallback to placeholder data
        setTestimonials(placeholderTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Generate JSON-LD schema markup for SEO
  const generateSchemaMarkup = () => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Humanitarian NGO",
      review: testimonials.map((testimonial) => ({
        "@type": "Review",
        reviewBody: testimonial.quote,
        author: {
          "@type": "Person",
          name: testimonial.name,
          jobTitle: testimonial.role,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      })),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    );
  };

  if (loading) {
    return (
      <section className="bg-gray-100 py-16" aria-label="Testimonials loading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Voices of Impact
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-md animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {generateSchemaMarkup()}
      <section
        className="bg-gray-100 py-16"
        aria-label="Testimonials from beneficiaries, donors, and partners"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Voices of Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from the people whose lives have been touched by our
              humanitarian work
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                itemScope
                itemType="https://schema.org/Review"
              >
                {/* Quote */}
                <blockquote
                  className="italic text-lg text-gray-700 mb-6 leading-relaxed"
                  aria-label={`Testimonial quote from ${testimonial.name}`}
                  itemProp="reviewBody"
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author Info */}
                <div
                  className="flex items-center"
                  itemScope
                  itemType="https://schema.org/Person"
                  itemProp="author"
                >
                  <div className="flex-shrink-0 mr-4">
                    <Image
                      src={testimonial.avatarUrl}
                      alt={`Portrait of ${testimonial.name}, ${testimonial.role}`}
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900" itemProp="name">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600" itemProp="jobTitle">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                {/* Hidden rating for schema */}
                <div
                  itemProp="reviewRating"
                  itemScope
                  itemType="https://schema.org/Rating"
                  className="sr-only"
                >
                  <span itemProp="ratingValue">5</span>
                  <span itemProp="bestRating">5</span>
                </div>
              </article>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Want to share your story or learn how you can make an impact?
            </p>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              aria-label="Get involved with our humanitarian mission"
            >
              Get Involved
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
