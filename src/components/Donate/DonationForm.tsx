'use client';

import { useState, useEffect, useRef } from 'react';

const DonationFormSection = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState<{ amount?: string }>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  const presetAmounts = [10, 25, 50, 100];

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

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setErrors({});
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(null);
    }
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: { amount?: string } = {};
    
    if (!selectedAmount && !customAmount) {
      newErrors.amount = 'Please select or enter a donation amount';
    } else if (customAmount && (parseFloat(customAmount) < 1 || isNaN(parseFloat(customAmount)))) {
      newErrors.amount = 'Custom amount must be at least $1';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    
    if (!validateForm()) {
      return;
    }

    const donationAmount = selectedAmount || parseFloat(customAmount);
    console.log('Donation submitted:', { amount: donationAmount });
    alert(`Thank you! Your donation of ${donationAmount} is being processed.`);
  };

  const handlePaymentMethod = (method: string) => {
    if (!validateForm()) {
      return;
    }
    
    const donationAmount = selectedAmount || parseFloat(customAmount);
    console.log(`${method} payment initiated:`, { amount: donationAmount });
    alert(`Redirecting to ${method} for $${donationAmount} donation...`);
  };

  const PaymentMethodIcon = ({ method }: { method: string }) => {
    const iconPaths = {
      'Apple Pay': 'M17.5 12.5c0-2.5-2-4.5-4.5-4.5s-4.5 2-4.5 4.5 2 4.5 4.5 4.5 4.5-2 4.5-4.5z',
      'Google Pay': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
      'PayPal': 'M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.79A.859.859 0 0 1 5.78 2h8.538c2.62 0 4.64.808 5.834 2.335 1.194 1.527 1.194 3.62.22 5.71-.22.473-.473.916-.759 1.33l-.286.407c-.88 1.527-2.335 2.62-4.64 3.186l-.66.154H10.95l-1.012 5.615z',
      'Credit Card': 'M2 4h20v16H2V4zm2 2v12h16V6H4zm2 2h4v2H6V8zm6 0h4v1h-4V8zm-6 4h12v1H6v-1z'
    };

    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
        <path d={iconPaths[method as keyof typeof iconPaths]} />
      </svg>
    );
  };

  return (
    <div className="bg-gray-50 py-16">
      <div 
        ref={sectionRef}
        className={`max-w-md mx-auto transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        itemScope
        itemType="https://schema.org/DonateAction"
      >
        {/* Schema.org metadata */}
        <meta itemProp="name" content="Make a Donation" />
        <meta itemProp="description" content="Support our humanitarian mission with your donation" />
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 
            className="text-3xl font-bold text-center text-gray-900 mb-8 font-roboto"
            itemProp="name"
          >
            Choose Your Donation
          </h2>

          <div className="space-y-6">
            {/* Preset Amount Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Amount
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handlePresetClick(amount)}
                    className={`py-3 px-4 rounded-lg border-2 transition-all duration-200 font-semibold ${
                      selectedAmount === amount
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-red-300 hover:bg-red-50'
                    }`}
                    aria-pressed={selectedAmount === amount}
                    aria-label={`Select $${amount} donation`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div>
              <label 
                htmlFor="customAmount" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Custom Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  id="customAmount"
                  min="1"
                  step="0.01"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                    errors.amount ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter amount"
                  aria-label="Enter custom donation amount"
                  aria-describedby={errors.amount ? 'amount-error' : undefined}
                />
              </div>
              {errors.amount && (
                <p id="amount-error" className="mt-2 text-sm text-red-600" role="alert">
                  {errors.amount}
                </p>
              )}
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Payment Methods
              </h3>
              
              {/* 1-Click Payment Options */}
              <div className="grid grid-cols-2 gap-3">
                {['Apple Pay', 'Google Pay', 'PayPal', 'Credit Card'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => handlePaymentMethod(method)}
                    className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
                    aria-label={`Pay with ${method}`}
                  >
                    <PaymentMethodIcon method={method} />
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-red-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-200 transition-all duration-200 transform hover:scale-105 active:scale-95"
              aria-label="Submit donation securely"
              itemProp="actionStatus"
              itemType="https://schema.org/PotentialActionStatus"
            >
              Donate Securely
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              🔒 Your donation is secure and encrypted
            </p>
          </div>
        </div>
      </div>

      {/* Add Google Fonts link - you'll need to add this to your _document.tsx or layout */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
        
        .font-roboto {
          font-family: 'Roboto', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default DonationFormSection;