"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Interactive Map Component (defined separately to avoid type issues)
const InteractiveMap: React.FC = () => {

  // Import react-leaflet components and leaflet
  const { MapContainer, TileLayer, Marker, Popup } = require('react-leaflet');
  const L = require('leaflet');

  // Custom marker icons based on status
  const createCustomIcon = (status: ProjectLocation['status']) => {
    const colors = {
      active: '#10B981', // green
      completed: '#3B82F6', // blue
      urgent: '#EF4444' // red
    };

    return new L.DivIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${colors[status]};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 8px;
            height: 8px;
            background-color: white;
            border-radius: 50%;
          "></div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  };

  const getStatusColor = (status: ProjectLocation['status']) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'completed': return 'text-blue-600 bg-blue-50';
      case 'urgent': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <MapContainer
      center={[20, 0] as [number, number]}
      zoom={2}
      style={{ height: '100%', width: '100%', overflow: 'hidden', transform: 'scale(0.5)' }}
      className="rounded-lg shadow-lg"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {projectLocations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng] as [number, number]}
          icon={createCustomIcon(location.status)}

        >
          <Popup
            closeOnEscapeKey={true}
            className="custom-popup"
          >
            <div className="p-2 min-w-[280px]" role="dialog" aria-labelledby={`popup-title-${location.id}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 id={`popup-title-${location.id}`} className="font-bold text-lg text-gray-900">
                  {location.name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(location.status)}`}>
                  {location.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {location.country}
                </div>
                
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  {formatNumber(location.beneficiaries)} beneficiaries
                </div>
                
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Started {location.startDate}
                </div>
              </div>
              
              <p className="text-gray-700 mt-3 leading-relaxed">
                {location.description}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

// Dynamic import to disable SSR for the map component
const MapComponent = dynamic(
  () => Promise.resolve(InteractiveMap),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center">
        <div className="text-gray-600">Loading map...</div>
      </div>
    )
  }
);

// Project location data structure
export interface ProjectLocation {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  status: 'active' | 'completed' | 'urgent';
  description: string;
  beneficiaries: number;
  startDate: string;
}

// Placeholder project locations
const projectLocations: ProjectLocation[] = [
  {
    id: '1',
    name: 'Clean Water Initiative',
    country: 'Kenya',
    lat: -1.2921,
    lng: 36.8219,
    status: 'active',
    description: 'Providing clean water access to rural communities through well construction and water purification systems.',
    beneficiaries: 15000,
    startDate: '2024'
  },
  {
    id: '2',
    name: 'Education for All',
    country: 'Bangladesh',
    lat: 23.6850,
    lng: 90.3563,
    status: 'completed',
    description: 'Built 12 schools and trained 200 teachers, reaching over 8,000 children in rural areas.',
    beneficiaries: 8000,
    startDate: '2023'
  },
  {
    id: '3',
    name: 'Emergency Relief',
    country: 'Ukraine',
    lat: 50.4501,
    lng: 30.5234,
    status: 'urgent',
    description: 'Providing emergency shelter, food, and medical supplies to displaced families.',
    beneficiaries: 25000,
    startDate: '2024'
  },
  {
    id: '4',
    name: 'Healthcare Access',
    country: 'Peru',
    lat: -12.0464,
    lng: -77.0428,
    status: 'active',
    description: 'Mobile clinics bringing essential healthcare services to remote mountain communities.',
    beneficiaries: 5500,
    startDate: '2024'
  },
  {
    id: '5',
    name: 'Agricultural Training',
    country: 'Cambodia',
    lat: 11.5564,
    lng: 104.9282,
    status: 'completed',
    description: 'Sustainable farming techniques training program helping families increase crop yields.',
    beneficiaries: 3200,
    startDate: '2023'
  }
];

// Component is now defined above the dynamic import

// Fallback static map component
const StaticMapFallback: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-100 to-green-100 rounded-lg shadow-lg overflow-hidden">
      {/* World map SVG or background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Map Loading</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Our interactive world map is currently loading. Please wait while we prepare your global impact visualization.
          </p>
        </div>
      </div>
      
      {/* Static markers for fallback */}
      <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-2/5 left-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};

// Main WorldMapSection component
const WorldMapSection: React.FC = () => {
  const [mapError, setMapError] = useState(true);

  const handleMapError = () => {
    setMapError(true);
  };

  return (
    <section className="py-16 bg-gray-50" aria-labelledby="global-impact-title">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 id="global-impact-title" className="text-4xl font-bold text-gray-900 mb-4">
            Our Global Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the communities we're supporting worldwide. Click on any marker to learn more about our ongoing projects and their impact.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm mr-2"></div>
            <span className="text-sm font-medium text-gray-700">Active Projects</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm mr-2"></div>
            <span className="text-sm font-medium text-gray-700">Completed Projects</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-sm mr-2"></div>
            <span className="text-sm font-medium text-gray-700">Urgent Projects</span>
          </div>
        </div>

        {/* Map Container */}
        <div className="w-full h-[500px] relative">
          <div 
            className="w-full h-full"
            role="application" 
            aria-label="Interactive world map showing humanitarian project locations"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Focus handling for accessibility
              }
            }}
          >
            {mapError ? (
              <StaticMapFallback />
            ) : (
              <div onError={handleMapError}>
                <MapComponent />
              </div>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {projectLocations.length}
            </div>
            <div className="text-gray-600">Active Locations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {formatNumber(projectLocations.reduce((sum, loc) => sum + loc.beneficiaries, 0))}
            </div>
            <div className="text-gray-600">People Helped</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {projectLocations.filter(loc => loc.status === 'completed').length}
            </div>
            <div className="text-gray-600">Completed Projects</div>
          </div>
        </div>
      </div>

      {/* Custom styles for react-leaflet */}
      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .leaflet-popup-tip {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .leaflet-container {
          font-family: inherit;
        }
        
        .leaflet-popup-close-button {
          font-size: 18px !important;
          padding: 4px 8px !important;
        }
        
        .leaflet-popup-close-button:hover {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

// Helper function to format numbers
const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num);
};

export default WorldMapSection;