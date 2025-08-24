'use client';

import React, { useState, useEffect, useRef } from 'react';

interface FormData {
  name: string;
  email: string;
  skills: string;
  availability: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  skills?: string;
  availability?: string;
}

const VolunteerSignUpSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    skills: '',
    availability: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.skills.trim()) {
      newErrors.skills = 'Please describe your skills or interests';
    }

    if (!formData.availability) {
      newErrors.availability = 'Please select your availability';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock submission - replace with actual Strapi API call
      console.log('Volunteer signup data:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful submission
      alert('Thank you for volunteering! We will contact you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        skills: '',
        availability: ''
      });

      // Future Strapi integration:
      // const response = await fetch('/api/volunteers', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     data: formData
      //   })
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Submission failed');
      // }
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Schema.org JSON-LD markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JoinAction",
            "agent": {
              "@type": "Organization",
              "name": "Humanitarian NGO"
            },
            "object": {
              "@type": "VolunteerAction",
              "name": "Volunteer Program"
            },
            "instrument": {
              "@type": "WebPage",
              "name": "Volunteer Sign Up Form"
            }
          })
        }}
      />
      
      <section 
        ref={sectionRef}
        className={`bg-white py-16 px-4 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ fontFamily: 'Roboto, sans-serif' }}
      >
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Become a Volunteer
          </h2>
          
          <div className="bg-white shadow-md rounded-lg p-8">
            <form onSubmit={handleSubmit} noValidate>
              {/* Name Field */}
              <div className="mb-6">
                <label 
                  htmlFor="name"
                  className="block text-base font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  aria-label="Enter your full name"
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={!!errors.name}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-red-600'
                  }`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label 
                  htmlFor="email"
                  className="block text-base font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  aria-label="Enter your email address"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={!!errors.email}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-red-600'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Skills/Interests Field */}
              <div className="mb-6">
                <label 
                  htmlFor="skills"
                  className="block text-base font-medium text-gray-700 mb-2"
                >
                  Skills & Interests
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  rows={4}
                  value={formData.skills}
                  onChange={handleInputChange}
                  aria-label="Describe your skills and interests"
                  aria-describedby={errors.skills ? "skills-error" : undefined}
                  aria-invalid={!!errors.skills}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 resize-vertical transition-colors ${
                    errors.skills 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-red-600'
                  }`}
                  placeholder="Tell us about your skills, interests, and how you'd like to help..."
                />
                {errors.skills && (
                  <p id="skills-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.skills}
                  </p>
                )}
              </div>

              {/* Availability Field */}
              <div className="mb-8">
                <label 
                  htmlFor="availability"
                  className="block text-base font-medium text-gray-700 mb-2"
                >
                  Availability
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  aria-label="Select your availability"
                  aria-describedby={errors.availability ? "availability-error" : undefined}
                  aria-invalid={!!errors.availability}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    errors.availability 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-red-600'
                  }`}
                >
                  <option value="">Select your availability</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Occasional">Occasional</option>
                </select>
                {errors.availability && (
                  <p id="availability-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.availability}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-md text-white font-medium text-base transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
                aria-label={isSubmitting ? "Submitting your application" : "Submit volunteer application"}
              >
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default VolunteerSignUpSection;