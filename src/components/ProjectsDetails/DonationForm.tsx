'use client';

import React, { useState, useEffect, useRef } from 'react';

interface DonationFormSectionProps {
  projectTitle?: string;
}

const DonationFormSection: React.FC<DonationFormSectionProps> = ({ 
  projectTitle = "this project" 
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState<{ amount?: string }>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  const presetAmounts = [
    { value: 10, impact: "provides clean water for 5 people" },
    { value: 25, impact: "feeds a family for 3 days" },
    { value: 50, impact: "supplies medical care for 2 children" },
    { value: 100, impact: "builds a school desk for 4 students" }
  ];

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

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setErrors({});
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(null);
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: { amount?: string } = {};
    const finalAmount = selectedAmount || parseFloat(customAmount);

    if (!finalAmount || finalAmount <= 0) {
      newErrors.amount = "Please select or enter a valid donation amount";
    } else if (finalAmount < 1) {
      newErrors.amount = "Minimum donation amount is $1";
    } else if (finalAmount > 10000) {
      newErrors.amount = "Maximum donation amount is $10,000";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const finalAmount = selectedAmount || parseFloat(customAmount);
    
    // Mock submission - replace with actual payment gateway integration
    console.log('Donation submitted:', {
      amount: finalAmount,
      projectTitle,
      timestamp: new Date().toISOString()
    });
    
    // Mock success feedback
    alert(`Thank you for your $${finalAmount} donation to ${projectTitle}! This is a mock submission for MVP.`);
  };

  const getCurrentImpact = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount) return null;
    
    // Find the closest preset amount for impact text
    const closest = presetAmounts.reduce((prev, curr) => 
      Math.abs(curr.value - amount) < Math.abs(prev.value - amount) ? curr : prev
    );
    
    if (amount === closest.value) {
      return `$${amount} ${closest.impact}`;
    } else {
      // Scale the impact proportionally
      const ratio = amount / closest.value;
      const scaledImpact = Math.round(ratio * parseInt(closest.impact.match(/\d+/)?.[0] || '1'));
      return `$${amount} ${closest.impact.replace(/\d+/, scaledImpact.toString())}`;
    }
  };

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    "name": "Support This Project",
    "description": "Make a donation to support humanitarian efforts",
    "recipient": {
      "@type": "Organization",
      "name": "Humanitarian NGO"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <section 
        ref={sectionRef}
        className={`bg-gray-100 py-16 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-labelledby="donation-heading"
      >
        <div className="max-w-2xl mx-auto px-4">
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0' : 'translate-y-8'
          }`}>
            <h2 
              id="donation-heading"
              className="text-3xl font-bold text-center mb-8 text-gray-900"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Support This Project
            </h2>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-6">
                  <fieldset>
                    <legend className="text-lg font-semibold mb-4 text-gray-900">
                      Choose Amount
                    </legend>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                      {presetAmounts.map((preset) => (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={() => handleAmountSelect(preset.value)}
                          className={`p-3 rounded-md border-2 transition-all duration-200 font-medium ${
                            selectedAmount === preset.value
                              ? 'border-red-600 bg-red-50 text-red-700'
                              : 'border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50'
                          }`}
                          aria-pressed={selectedAmount === preset.value}
                          aria-describedby={`impact-${preset.value}`}
                        >
                          ${preset.value}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="mb-6">
                  <label 
                    htmlFor="custom-amount" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Custom Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      $
                    </span>
                    <input
                      id="custom-amount"
                      type="number"
                      min="1"
                      max="10000"
                      step="0.01"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className={`w-full pl-8 pr-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        errors.amount ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter amount"
                      aria-describedby={errors.amount ? 'amount-error' : 'current-impact'}
                      aria-invalid={!!errors.amount}
                    />
                  </div>
                  {errors.amount && (
                    <p id="amount-error" className="mt-2 text-sm text-red-600" role="alert">
                      {errors.amount}
                    </p>
                  )}
                </div>

                {getCurrentImpact() && (
                  <div 
                    id="current-impact"
                    className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md"
                  >
                    <p className="text-sm text-blue-800 font-medium">
                      💧 Your Impact: {getCurrentImpact()}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Donate Now
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  🔒 Secure donation processing • Tax-deductible receipt provided
                </p>
              </div>
            </div>

            {/* Hidden impact descriptions for screen readers */}
            <div className="sr-only">
              {presetAmounts.map((preset) => (
                <p key={preset.value} id={`impact-${preset.value}`}>
                  ${preset.value} {preset.impact}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DonationFormSection;