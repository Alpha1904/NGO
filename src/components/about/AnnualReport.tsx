"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Report {
  id: string;
  title: string;
  year: string;
  description: string;
  pdfUrl: string;
  publishedDate: string;
}

const AnnualReportsSection: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Placeholder data - replace with actual API call to Strapi CMS
    const placeholderReports: Report[] = [
      {
        id: '1',
        title: '2024 Annual Report',
        year: '2024',
        description: 'See how we made a difference in 2024, reaching thousands of lives across our humanitarian programs.',
        pdfUrl: '/pdfs/report-2024.pdf',
        publishedDate: '2024-12-31'
      },
      {
        id: '2',
        title: '2023 Annual Report',
        year: '2023',
        description: 'Discover our achievements and impact throughout 2023, building stronger communities together.',
        pdfUrl: '/pdfs/report-2023.pdf',
        publishedDate: '2023-12-31'
      }
    ];

    const fetchReports = async () => {
      try {
        setLoading(true);
        
        // TODO: Replace with actual Strapi CMS API call
        // const response = await fetch('/api/reports');
        // if (!response.ok) {
        //   throw new Error('Failed to fetch reports');
        // }
        // const data = await response.json();
        // setReports(data);
        
        // Simulate API call delay for now
        await new Promise(resolve => setTimeout(resolve, 500));
        setReports(placeholderReports);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Fallback to placeholder data on error
        setReports(placeholderReports);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Annual Impact Reports",
      "description": "Humanitarian NGO annual reports showing our impact and achievements",
      "itemListElement": reports.map((report, index) => ({
        "@type": "Report",
        "position": index + 1,
        "name": report.title,
        "description": report.description,
        "datePublished": report.publishedDate,
        "url": report.pdfUrl,
        "author": {
          "@type": "Organization",
          "name": "Your NGO Name"
        }
      }))
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    );
  };

  if (loading) {
    return (
      <section className="bg-gray-100 py-16" aria-label="Annual Reports Section">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Impact Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-8 animate-pulse"
              >
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-6 w-3/4"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error && reports.length === 0) {
    return (
      <section className="bg-gray-100 py-16" aria-label="Annual Reports Section">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Impact Reports
          </h2>
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Unable to load reports at this time. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {generateStructuredData()}
      <section className="bg-gray-100 py-16" aria-label="Annual Reports Section">
        <div className="max-w-7xl mx-auto px-4">
          <header className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Impact Reports
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our annual reports to see the measurable impact of your support 
              and our humanitarian efforts around the world.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reports.map((report) => (
              <article
                key={report.id}
                className="bg-white rounded-lg shadow-md p-8 hover:bg-gray-50 transition-colors duration-200 hover:shadow-lg"
                itemScope
                itemType="https://schema.org/Report"
              >
                <div className="mb-6">
                  <h3 
                    className="text-xl font-semibold text-gray-900 mb-3"
                    itemProp="name"
                  >
                    {report.title}
                  </h3>
                  <p 
                    className="text-gray-600 leading-relaxed mb-4"
                    itemProp="description"
                  >
                    {report.description}
                  </p>
                  <time 
                    className="text-sm text-gray-500"
                    dateTime={report.publishedDate}
                    itemProp="datePublished"
                  >
                    Published: {new Date(report.publishedDate).getFullYear()}
                  </time>
                </div>

                <Link
                  href={report.pdfUrl}
                  className="inline-flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label={`Download ${report.title} PDF`}
                  target="_blank"
                  rel="noopener noreferrer"
                  itemProp="url"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download PDF
                </Link>
              </article>
            ))}
          </div>

          {reports.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No reports available at this time. Please check back later.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AnnualReportsSection;