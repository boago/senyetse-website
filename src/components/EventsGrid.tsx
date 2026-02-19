'use client';

import { useState } from 'react';
import EventDetailModal from './EventDetailModal';

type EventItem = {
  id: string;
  title: string;
  description: string | null;
  story: string | null;
  event_date: string;
  event_time: string | null;
  location: string | null;
  image_url: string | null;
};

type EventsGridProps = {
  upcoming: EventItem[];
  past: EventItem[];
};

export default function EventsGrid({ upcoming, past }: EventsGridProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  function EventCard({
    event,
    isPast,
  }: {
    event: EventItem;
    isPast?: boolean;
  }) {
    const formattedDate = new Date(event.event_date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return (
      <button
        onClick={() => setSelectedEvent(event)}
        className={`w-full text-left bg-white rounded-xl shadow-md overflow-hidden border border-senyetse-gold/20 hover:shadow-lg hover:border-senyetse-gold/40 transition group ${
          isPast ? 'opacity-80' : ''
        }`}
      >
        <div className="aspect-[4/3] relative bg-senyetse-cream overflow-hidden">
          {event.image_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={event.image_url}
              alt={event.title}
              className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-senyetse-earth/20">
              <span className="text-5xl font-display">♪</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
          <div className="absolute bottom-2 left-2 right-2">
            <span className="text-white text-sm font-medium drop-shadow">
              {formattedDate}
              {event.event_time && ` • ${event.event_time}`}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-display font-bold text-senyetse-dark text-lg group-hover:text-senyetse-gold transition">
            {event.title}
          </h3>
          {event.location && (
            <p className="text-senyetse-earth/70 text-sm mt-1">📍 {event.location}</p>
          )}
          {event.description && (
            <p className="text-senyetse-earth/70 text-sm mt-2 line-clamp-2">
              {event.description}
            </p>
          )}
        </div>
      </button>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-12">
        {upcoming.length > 0 && (
          <div>
            <h2 className="text-2xl font-display font-bold text-senyetse-dark mb-6">
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {past.length > 0 && (
          <div>
            <h2 className="text-2xl font-display font-bold text-senyetse-dark mb-6">
              Past Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event) => (
                <EventCard key={event.id} event={event} isPast />
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}
