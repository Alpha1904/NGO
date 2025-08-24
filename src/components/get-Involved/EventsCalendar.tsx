'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Initialize the localizer
const localizer = momentLocalizer(moment);

// Event interface
interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
  registrationUrl?: string;
}

// Placeholder events
const placeholderEvents: Event[] = [
  {
    id: '1',
    title: 'Fundraiser Gala',
    start: new Date(2025, 9, 15, 18, 0), // October 15, 2025, 6:00 PM
    end: new Date(2025, 9, 15, 22, 0),   // October 15, 2025, 10:00 PM
    description: 'Join us for an elegant evening of dining, entertainment, and fundraising for our humanitarian missions.',
    location: 'Grand Ballroom, Downtown Convention Center',
    registrationUrl: '/register/fundraiser-gala'
  },
  {
    id: '2',
    title: 'Community Volunteer Day',
    start: new Date(2025, 9, 22, 9, 0),  // October 22, 2025, 9:00 AM
    end: new Date(2025, 9, 22, 16, 0),   // October 22, 2025, 4:00 PM
    description: 'Help us pack care packages and prepare supplies for distribution to families in need.',
    location: 'NGO Headquarters Warehouse',
    registrationUrl: '/register/volunteer-day'
  },
  {
    id: '3',
    title: 'Educational Workshop: Crisis Response',
    start: new Date(2025, 10, 5, 14, 0), // November 5, 2025, 2:00 PM
    end: new Date(2025, 10, 5, 17, 0),   // November 5, 2025, 5:00 PM
    description: 'Learn about effective crisis response strategies and how communities can prepare for emergencies.',
    location: 'Community Center, Room A',
    registrationUrl: '/register/crisis-workshop'
  },
  {
    id: '4',
    title: 'Annual Board Meeting',
    start: new Date(2025, 10, 18, 10, 0), // November 18, 2025, 10:00 AM
    end: new Date(2025, 10, 18, 15, 0),   // November 18, 2025, 3:00 PM
    description: 'Annual meeting of the board of directors and key stakeholders.',
    location: 'NGO Headquarters Conference Room',
    registrationUrl: '/register/board-meeting'
  },
  {
    id: '5',
    title: 'Holiday Charity Drive Kickoff',
    start: new Date(2025, 11, 1, 11, 0), // December 1, 2025, 11:00 AM
    end: new Date(2025, 11, 1, 13, 0),   // December 1, 2025, 1:00 PM
    description: 'Launch of our annual holiday charity drive to support families during the holiday season.',
    location: 'City Park Pavilion',
    registrationUrl: '/register/holiday-drive'
  }
];

// Modal component
interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 id="event-modal-title" className="text-2xl font-bold text-gray-900 mb-4 pr-8">
          {event.title}
        </h2>
        
        <div className="space-y-3 text-gray-700">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{moment(event.start).format('MMMM Do, YYYY')}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}
            </span>
          </div>
          
          {event.location && (
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location}</span>
            </div>
          )}
          
          {event.description && (
            <p className="text-gray-600 mt-4">{event.description}</p>
          )}
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              console.log('Register for event:', event.title);
              // In production: window.location.href = event.registrationUrl;
            }}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Register Now
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const EventsCalendarSection: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(placeholderEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Future: Fetch events from Strapi CMS
  useEffect(() => {
    // TODO: Replace with actual API call
    // const fetchEvents = async () => {
    //   try {
    //     const response = await fetch('/api/events');
    //     const data = await response.json();
    //     setEvents(data);
    //   } catch (error) {
    //     console.error('Failed to fetch events:', error);
    //   }
    // };
    // fetchEvents();
  }, []);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    console.log('Event clicked:', event.title);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Custom event style getter
  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: '#dc2626', // red-600
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  return (
    <>
      <section
        ref={sectionRef}
        className={`bg-white py-16 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Upcoming Events Calendar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join us in our humanitarian efforts. Discover upcoming events, workshops, and volunteer opportunities 
              that make a difference in our community.
            </p>
          </div>

          <div 
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ height: '500px' }}
          >
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              onSelectEvent={handleEventClick}
              eventPropGetter={eventStyleGetter}
              views={['month', 'week', 'day']}
              defaultView="month"
              popup
              showMultiDayTimes
              step={60}
              showAllEvents
              components={{
                toolbar: ({ label, onNavigate, onView }) => (
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigate('PREV')}
                        className="p-2 hover:bg-gray-100 rounded-md"
                        aria-label="Previous month"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <h3 className="text-lg font-semibold text-gray-900 min-w-0">{label}</h3>
                      <button
                        onClick={() => onNavigate('NEXT')}
                        className="p-2 hover:bg-gray-100 rounded-md"
                        aria-label="Next month"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex gap-2">
                      {['month', 'week', 'day'].map((view) => (
                        <button
                          key={view}
                          onClick={() => onView(view as any)}
                          className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md capitalize"
                        >
                          {view}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              }}
              messages={{
                next: "Next",
                previous: "Previous",
                today: "Today",
                month: "Month",
                week: "Week",
                day: "Day",
                agenda: "Agenda",
                date: "Date",
                time: "Time",
                event: "Event",
                noEventsInRange: "No events in this range",
                showMore: (total: number) => `+${total} more`
              }}
            />
          </div>

          {/* Call to action */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Want to stay updated on all our events?
            </p>
            <button 
              className="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700 transition-colors font-medium"
              onClick={() => console.log('Subscribe to newsletter')}
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </section>

      {/* Event Modal */}
      <EventModal 
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Upcoming Events",
            "itemListElement": events.map((event, index) => ({
              "@type": "Event",
              "position": index + 1,
              "name": event.title,
              "startDate": event.start.toISOString(),
              "endDate": event.end.toISOString(),
              "description": event.description || "",
              "location": {
                "@type": "Place",
                "name": event.location || ""
              },
              "organizer": {
                "@type": "Organization",
                "name": "Humanitarian NGO"
              },
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
            }))
          })
        }}
      />
    </>
  );
};

export default EventsCalendarSection;