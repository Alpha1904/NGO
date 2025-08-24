'use client';

import { useState, useEffect, useRef } from 'react';

interface FormData {
  name: string;
  email: string;
  event: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  event?: string;
}

const EventRegistrationSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    event: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
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

    if (!formData.event) {
      newErrors.event = 'Please select an event';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Mock submission - replace with actual API call later
      console.log('Registration Data:', formData);
      
      // Simulate API delay
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      
      // For now, show success alert
      alert(`Thank you, ${formData.name}! You've been registered for ${formData.event}. We'll send confirmation details to ${formData.email}.`);
      
      // Reset form
      setFormData({ name: '', email: '', event: '' });
      
      // Future implementation:
      // const response = await fetch('/api/registrations', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData)
      // });
      
    } catch (error) {
      console.error('Registration error:', error);
      alert('Sorry, there was an error processing your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Schema.org markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RegisterAction",
            "name": "Event Registration",
            "description": "Register for humanitarian events and volunteer opportunities",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://your-site.com/events/register",
              "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
            },
            "result": {
              "@type": "Reservation",
              "name": "Event Registration Confirmation"
            }
          })
        }}
      />
      
      <section 
        ref={sectionRef}
        className={`bg-gray-100 py-16 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ fontFamily: 'Roboto, sans-serif' }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Headline */}
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Register for an Event
            </h2>
            
            {/* Registration Form Card */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div>
                {/* Name Field */}
                <div className="mb-6">
                  <label 
                    htmlFor="name" 
                    className="block text-base font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                    aria-label="Full name"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={errors.name ? 'true' : 'false'}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-2 text-sm text-red-600" role="alert">
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
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                    aria-label="Email address"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Event Selection Field */}
                <div className="mb-8">
                  <label 
                    htmlFor="event" 
                    className="block text-base font-medium text-gray-700 mb-2"
                  >
                    Select Event *
                  </label>
                  <select
                    id="event"
                    name="event"
                    value={formData.event}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors ${
                      errors.event ? 'border-red-500' : 'border-gray-300'
                    }`}
                    aria-label="Event selection"
                    aria-describedby={errors.event ? 'event-error' : undefined}
                    aria-invalid={errors.event ? 'true' : 'false'}
                  >
                    <option value="">Choose an event...</option>
                    <option value="Fundraiser Gala">Annual Fundraiser Gala</option>
                    <option value="Volunteer Workshop">Community Volunteer Workshop</option>
                    <option value="Awareness Campaign">Global Awareness Campaign Launch</option>
                  </select>
                  {errors.event && (
                    <p id="event-error" className="mt-2 text-sm text-red-600" role="alert">
                      {errors.event}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-red-300 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  aria-label={isSubmitting ? 'Submitting registration' : 'Submit registration'}
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>
              </div>
              
              {/* Form Footer */}
              <p className="mt-6 text-sm text-gray-600 text-center">
                * Required fields. We respect your privacy and will only use your information for event coordination.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventRegistrationSection;