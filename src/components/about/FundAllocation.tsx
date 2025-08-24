"use client";

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface FundAllocationData {
  programs: number;
  operations: number;
  fundraising: number;
}

const FundAllocationSection: React.FC = () => {
  const [fundData, setFundData] = useState<FundAllocationData>({
    programs: 80,
    operations: 15,
    fundraising: 5,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFundAllocation = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual Strapi CMS API call
        // const response = await fetch('/api/fund-allocation');
        // const data = await response.json();
        
        // Simulate API call with placeholder data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Placeholder data - replace with actual API response
        const data = {
          programs: 80,
          operations: 15,
          fundraising: 5,
        };
        
        setFundData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load fund allocation data');
        console.error('Error fetching fund allocation:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFundAllocation();
  }, []);

  const chartData = {
    labels: ['Programs', 'Operations', 'Fundraising'],
    datasets: [
      {
        data: [fundData.programs, fundData.operations, fundData.fundraising],
        backgroundColor: [
          '#dc2626', // red-600 for Programs
          '#60a5fa', // red-400 for Operations
          '#9ca3af', // gray-400 for Fundraising
        ],
        borderColor: [
          '#dc2626',
          '#60a5fa',
          '#9ca3af',
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          '#b91c1c', // red-700 for hover
          '#3b82f6', // red-500 for hover
          '#6b7280', // gray-500 for hover
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}%`;
          },
        },
      },
    },
    accessibility: {
      announceOnFocus: {
        enabled: true,
      },
    },
  };

  return (
    <section 
      className="bg-white py-16"
      itemScope
      itemType="https://schema.org/NGO"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How We Use Your Donations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your donations directly support our mission to create lasting change 
            in communities worldwide. Here's how every dollar makes a difference.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Chart Section */}
          <div className="order-1 md:order-1">
            <div className="relative h-80 mb-6">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full text-red-600">
                  <p>{error}</p>
                </div>
              ) : (
                <Pie 
                  data={chartData} 
                  options={chartOptions}
                  aria-describedby="fund-allocation-description"
                />
              )}
            </div>
            
            {/* Screen reader text summary */}
            <div id="fund-allocation-description" className="sr-only">
              Fund allocation breakdown: {fundData.programs}% goes to programs, 
              {fundData.operations}% to operations, and {fundData.fundraising}% to fundraising activities.
            </div>
          </div>

          {/* Content Section */}
          <div className="order-2 md:order-2">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Programs ({fundData.programs}%)
                  </h3>
                  <p className="text-gray-600">
                    The majority of your donation goes directly to our humanitarian programs, 
                    including emergency relief, education initiatives, healthcare services, 
                    and community development projects.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-red-400 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Operations ({fundData.operations}%)
                  </h3>
                  <p className="text-gray-600">
                    Essential operational costs including staff salaries, office expenses, 
                    technology infrastructure, and program administration to ensure 
                    effective delivery of our services.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Fundraising ({fundData.fundraising}%)
                  </h3>
                  <p className="text-gray-600">
                    A small portion supports fundraising activities to help us reach 
                    more donors and raise awareness about our mission, enabling us 
                    to expand our impact.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Trust Elements */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Our Commitment to Transparency
              </h4>
              <p className="text-gray-600 mb-4">
                We believe in complete financial transparency. Our annual reports 
                and financial statements are audited by independent accountants 
                and available for public review.
              </p>
              <button className="text-red-600 hover:text-red-700 font-medium underline">
                View Annual Report
              </button>
            </div>
          </div>
        </div>

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              "name": "Your NGO Name",
              "description": "Humanitarian organization focused on creating lasting change in communities worldwide",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://ngo-domain.org",
              "foundingDate": "YYYY-MM-DD", // Replace with actual founding date
              "areaServed": "Global",
              "seeks": {
                "@type": "Thing",
                "name": "Donations for humanitarian programs"
              }
            }),
          }}
        />
      </div>
    </section>
  );
};

export default FundAllocationSection;