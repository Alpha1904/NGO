"use client"
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

interface Campaign {
  id: string;
  name: string;
  goal: number;
  raised: number;
  description: string;
  startDate: string;
  endDate: string;
}

const CampaignProgressSection: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Placeholder data - will be replaced with Strapi CMS fetch
  const placeholderCampaigns: Campaign[] = [
    {
      id: '1',
      name: 'Clean Water Project',
      goal: 50000,
      raised: 30000,
      description: 'Providing clean water access to rural communities',
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    },
    {
      id: '2',
      name: 'Emergency Food Relief',
      goal: 75000,
      raised: 45000,
      description: 'Emergency food assistance for displaced families',
      startDate: '2024-02-15',
      endDate: '2024-08-15'
    },
    {
      id: '3',
      name: 'Education Support Program',
      goal: 25000,
      raised: 22000,
      description: 'Supporting education for underprivileged children',
      startDate: '2024-03-01',
      endDate: '2024-11-30'
    }
  ];

  useEffect(() => {
    // TODO: Replace with actual Strapi CMS API call
    // const fetchCampaigns = async () => {
    //   try {
    //     const response = await fetch('/api/campaigns');
    //     const data = await response.json();
    //     setCampaigns(data);
    //   } catch (error) {
    //     console.error('Failed to fetch campaigns:', error);
    //     setCampaigns(placeholderCampaigns);
    //   }
    // };
    
    // For now, use placeholder data
    setCampaigns(placeholderCampaigns);
    
    // Trigger animation after component mounts
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const calculatePercentage = (raised: number, goal: number): number => {
    return Math.min((raised / goal) * 100, 100);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Schema.org structured data for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Current Humanitarian Campaigns",
    "description": "Active fundraising campaigns for humanitarian causes",
    "itemListElement": campaigns.map((campaign, index) => ({
      "@type": "Event",
      "position": index + 1,
      "name": campaign.name,
      "description": campaign.description,
      "startDate": campaign.startDate,
      "endDate": campaign.endDate,
      "organizer": {
        "@type": "Organization",
        "name": "Humanitarian NGO"
      },
      "offers": {
        "@type": "Offer",
        "price": campaign.goal,
        "priceCurrency": "USD"
      }
    }))
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" 
          rel="stylesheet" 
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <section 
        className="bg-white py-16"
        style={{ fontFamily: 'Roboto, sans-serif' }}
        aria-labelledby="campaigns-heading"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 
            id="campaigns-heading"
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Current Campaigns
          </h2>
          
          <div className="space-y-8">
            {campaigns.map((campaign) => {
              const percentage = calculatePercentage(campaign.raised, campaign.goal);
              
              return (
                <div 
                  key={campaign.id}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
                  itemScope
                  itemType="https://schema.org/Event"
                >
                  <div className="mb-4">
                    <h3 
                      className="text-xl font-bold text-gray-900 mb-2"
                      itemProp="name"
                    >
                      {campaign.name}
                    </h3>
                    <p 
                      className="text-base text-gray-600 mb-4"
                      itemProp="description"
                    >
                      {campaign.description}
                    </p>
                    <div className="flex justify-between items-center text-base text-gray-700 mb-3">
                      <span>
                        <strong>{formatCurrency(campaign.raised)}</strong> raised of{' '}
                        <strong>{formatCurrency(campaign.goal)}</strong> goal
                      </span>
                      <span className="font-semibold text-red-600">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div 
                      className="w-full bg-gray-200 rounded-full h-6 overflow-hidden"
                      role="progressbar"
                      aria-valuenow={percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${campaign.name} progress: ${percentage.toFixed(0)}% complete`}
                    >
                      <div
                        className="bg-red-600 h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                        style={{ 
                          width: isLoaded ? `${percentage}%` : '0%',
                          minWidth: percentage > 15 ? 'auto' : '0%'
                        }}
                      >
                        {percentage > 15 && (
                          <span className="text-white text-sm font-semibold">
                            {percentage.toFixed(0)}%
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {percentage <= 15 && (
                      <div className="absolute top-0 left-2 h-full flex items-center">
                        <span className="text-gray-700 text-sm font-semibold">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Hidden schema.org properties */}
                  <meta itemProp="startDate" content={campaign.startDate} />
                  <meta itemProp="endDate" content={campaign.endDate} />
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-base text-gray-600 mb-4">
              Every donation makes a difference in someone's life.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Donate Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CampaignProgressSection;