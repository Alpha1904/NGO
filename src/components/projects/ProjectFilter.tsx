"use client";
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

// Define types for filter options
interface FilterOption {
  value: string;
  label: string;
}

interface FilterState {
  location: FilterOption | null;
  status: FilterOption | null;
}

const ProjectFiltersSection: React.FC = () => {
  // State for selected filters
  const [filters, setFilters] = useState<FilterState>({
    location: null,
    status: null,
  });

  // Placeholder filter options (later to be fetched from Strapi CMS)
  const [locationOptions] = useState<FilterOption[]>([
    { value: 'all', label: 'All' },
    { value: 'africa', label: 'Africa' },
    { value: 'asia', label: 'Asia' },
    { value: 'europe', label: 'Europe' },
    { value: 'americas', label: 'Americas' },
  ]);

  const [statusOptions] = useState<FilterOption[]>([
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'urgent', label: 'Urgent' },
  ]);

  // Future implementation: Fetch filter options from Strapi CMS
  useEffect(() => {
    // TODO: Replace with actual API calls to Strapi CMS
    // const locationResponse = await fetch('/api/filters/locations');
    // const statusResponse = await fetch('/api/filters/statuses');
    // const locations = await locationResponse.json();
    // const statuses = await statusResponse.json();
    // setLocationOptions(locations);
    // setStatusOptions(statuses);
  }, []);

  // Handle filter changes
  const handleLocationChange = (selectedOption: FilterOption | null) => {
    setFilters(prev => ({ ...prev, location: selectedOption }));
    console.log('Location filter changed:', selectedOption?.value);
  };

  const handleStatusChange = (selectedOption: FilterOption | null) => {
    setFilters(prev => ({ ...prev, status: selectedOption }));
    console.log('Status filter changed:', selectedOption?.value);
  };

  // Custom styles for react-select
  const customSelectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? '#dc2626' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 1px #dc2626' : 'none',
      '&:hover': {
        borderColor: '#dc2626',
      },
      borderRadius: '0.375rem',
      minHeight: '42px',
      fontSize: '16px',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#dc2626' 
        : state.isFocused 
        ? '#fee2e2' 
        : 'white',
      color: state.isSelected ? 'white' : '#374151',
      '&:hover': {
        backgroundColor: state.isSelected ? '#dc2626' : '#fee2e2',
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#9ca3af',
    }),
  };

  return (
    <section 
      className="bg-gray-100 py-8"
      itemScope 
      itemType="https://schema.org/SearchAction"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Filter Projects
          </h2>
          <p className="text-gray-600">
            Find projects by location and status to explore our humanitarian work worldwide.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location Filter */}
          <div className="space-y-2">
            <label 
              htmlFor="location-filter" 
              className="block text-sm font-medium text-gray-700"
            >
              Filter by Location
            </label>
            <Select
              id="location-filter"
              instanceId="location-filter"
              value={filters.location}
              onChange={handleLocationChange}
              options={locationOptions}
              placeholder="Select a location..."
              styles={customSelectStyles}
              isSearchable={false}
              isClearable
              aria-label="Filter projects by location"
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label 
              htmlFor="status-filter" 
              className="block text-sm font-medium text-gray-700"
            >
              Filter by Status
            </label>
            <Select
              id="status-filter"
              instanceId="status-filter"
              value={filters.status}
              onChange={handleStatusChange}
              options={statusOptions}
              placeholder="Select a status..."
              styles={customSelectStyles}
              isSearchable={false}
              isClearable
              aria-label="Filter projects by status"
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        {/* Active Filters Display */}
        {(filters.location || filters.status) && (
          <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h3>
            <div className="flex flex-wrap gap-2">
              {filters.location && filters.location.value !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Location: {filters.location.label}
                  <button
                    onClick={() => handleLocationChange(null)}
                    className="ml-2 text-red-600 hover:text-red-800"
                    aria-label={`Remove ${filters.location.label} location filter`}
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.status && filters.status.value !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Status: {filters.status.label}
                  <button
                    onClick={() => handleStatusChange(null)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                    aria-label={`Remove ${filters.status.label} status filter`}
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "/projects?location={location}&status={status}",
              "description": "Filter humanitarian projects by location and status"
            },
            "query-input": [
              {
                "@type": "PropertyValueSpecification",
                "valueName": "location",
                "description": "Filter projects by geographic location"
              },
              {
                "@type": "PropertyValueSpecification", 
                "valueName": "status",
                "description": "Filter projects by current status"
              }
            ],
            "object": {
              "@type": "WebSite",
              "url": "/projects",
              "name": "Humanitarian Projects",
              "description": "Browse and filter humanitarian aid projects worldwide"
            }
          })
        }}
      />
    </section>
  );
};

export default ProjectFiltersSection;