'use client';

import React, { useState, useEffect, useRef } from 'react';

// Dynamic import for ReactPlayer to avoid SSR issues
const ReactPlayerComponent = React.lazy(() => import('react-player'));

interface VideoData {
  url: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  duration?: string;
}

interface VideoSectionProps {
  projectId?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({ projectId }) => {
  const [videoData, setVideoData] = useState<VideoData>({
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Project Impact Video',
    description: 'See the direct impact of our humanitarian work in communities around the world.',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px',
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Fetch video data from Strapi CMS
  useEffect(() => {
    const fetchVideoData = async () => {
      if (!projectId) return;

      setIsLoading(true);
      setVideoError(false);
      
      try {
        const response = await fetch(`/api/projects/${projectId}/video`);
        if (response.ok) {
          const data = await response.json();
          setVideoData(prevData => ({
            ...prevData,
            ...data,
          }));
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
        setVideoError(true);
        // Keep placeholder data on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoData();
  }, [projectId]);

  // Schema.org structured data for SEO
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: videoData.title || 'Project Impact Video',
    description: videoData.description || 'Humanitarian project video showcasing our impact',
    contentUrl: videoData.url,
    embedUrl: videoData.url,
    thumbnailUrl: videoData.thumbnailUrl || undefined,
    uploadDate: new Date().toISOString(),
    duration: videoData.duration || undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Humanitarian NGO',
      url: 'https://your-site.com',
    },
  };

  const handleVideoError = (error: any) => {
    console.error('Video player error:', error);
    setVideoError(true);
  };

  const handleVideoReady = () => {
    setIsLoading(false);
    setVideoError(false);
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      
      <section
        ref={sectionRef}
        className={`bg-white py-16 transition-all duration-1000 ease-out transform ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
        aria-labelledby="video-section-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <header className="text-center mb-12">
            <h2 
              id="video-section-heading"
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Project Video
            </h2>
            {videoData.description && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {videoData.description}
              </p>
            )}
          </header>

          {/* Video Player Container */}
          <div className="relative mb-8">
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">Loading video...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {videoError && (
              <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center z-10">
                <div className="text-center p-8">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium mb-2">Video temporarily unavailable</p>
                  <p className="text-sm text-gray-500">Please try refreshing the page</p>
                </div>
              </div>
            )}
            
            {/* Video Player */}
            <div 
              className="relative w-full overflow-hidden rounded-lg shadow-lg bg-gray-900"
              style={{ aspectRatio: '16/9' }}
            >
              <React.Suspense 
                fallback={
                  <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
                    <div className="text-gray-500">Loading video player...</div>
                  </div>
                }
              >
                <ReactPlayerComponent
                  {...{
                    url: videoData.url,
                    width: "100%",
                    height: "100%",
                    controls: true,
                    light: videoData.thumbnailUrl || true,
                    playing: false,
                    pip: true,
                    stopOnUnmount: false,
                    config: {
                      youtube: {
                        rel: 0,
                        cc_load_policy: 1,
                      },
                      vimeo: {
                        byline: false,
                        portrait: false,
                        title: false,
                      },
                    },
                    className: "absolute top-0 left-0",
                    onError: handleVideoError,
                    onReady: handleVideoReady,
                    style: { pointerEvents: 'auto' }
                  } as any}
                />
              </React.Suspense>
            </div>

            {/* Video Metadata */}
            {videoData.title && (
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {videoData.title}
                </h3>
                {videoData.duration && (
                  <p className="text-sm text-gray-600">
                    Duration: {videoData.duration}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Accessibility Information */}
          <footer className="text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>
                Video includes captions when available. Use keyboard controls: Space to play/pause, Arrow keys to seek.
              </span>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
};

export default VideoSection;