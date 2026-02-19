'use client';

import { useState, useEffect } from 'react';
import { supabase, hasSupabase } from '@/lib/supabase';

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

type EventMediaItem = {
  id: string;
  media_type: 'image' | 'video';
  url: string;
  display_order: number;
};

type EventDetailModalProps = {
  event: EventItem;
  onClose: () => void;
};

export default function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'story' | 'media'>('story');
  const [media, setMedia] = useState<EventMediaItem[]>([]);
  const [mediaLoading, setMediaLoading] = useState(true);

  useEffect(() => {
    if (hasSupabase()) {
      supabase
        .from('event_media')
        .select('id, media_type, url, display_order')
        .eq('event_id', event.id)
        .order('display_order', { ascending: true })
        .then(({ data }: { data: EventMediaItem[] | null }) => {
          setMedia(data || []);
        })
        .finally(() => setMediaLoading(false));
    } else {
      setMediaLoading(false);
    }
  }, [event.id]);

  const formattedDate = new Date(event.event_date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Build full media list: event_media + main image_url if not already in event_media
  const allMedia = [...media];
  if (event.image_url && !allMedia.some((m) => m.url === event.image_url)) {
    allMedia.unshift({
      id: 'main',
      media_type: 'image',
      url: event.image_url,
      display_order: -1,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative">
          {event.image_url ? (
            <div className="aspect-video bg-senyetse-cream">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-video bg-senyetse-gold/20 flex items-center justify-center">
              <span className="text-senyetse-earth/40 text-6xl font-display">♪</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="p-6 flex-1 overflow-auto">
          <h2 className="text-2xl font-display font-bold text-senyetse-dark mb-2">
            {event.title}
          </h2>
          <p className="text-senyetse-gold font-medium text-sm mb-6">
            {formattedDate}
            {event.event_time && ` • ${event.event_time}`}
            {event.location && ` • 📍 ${event.location}`}
          </p>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-senyetse-gold/20 mb-6">
            <button
              onClick={() => setActiveTab('story')}
              className={`px-4 py-2 font-medium transition ${
                activeTab === 'story'
                  ? 'text-senyetse-gold border-b-2 border-senyetse-gold -mb-px'
                  : 'text-senyetse-earth/70 hover:text-senyetse-dark'
              }`}
            >
              Event Story
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`px-4 py-2 font-medium transition ${
                activeTab === 'media'
                  ? 'text-senyetse-gold border-b-2 border-senyetse-gold -mb-px'
                  : 'text-senyetse-earth/70 hover:text-senyetse-dark'
              }`}
            >
              Media
            </button>
          </div>

          {/* Tab 1: Event Story - long narrative about the event */}
          {activeTab === 'story' && (
            <div className="text-senyetse-earth/90 leading-relaxed prose prose-senyetse max-w-none">
              {event.story ? (
                <div className="whitespace-pre-wrap">{event.story}</div>
              ) : (
                <p className="text-senyetse-earth/60 italic">
                  No event story has been added yet.
                </p>
              )}
            </div>
          )}

          {/* Tab 2: Media - images and videos */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              {mediaLoading ? (
                <p className="text-senyetse-earth/60 text-center py-8">Loading media...</p>
              ) : allMedia.length > 0 ? (
                <div className="grid gap-4">
                  {allMedia.map((item) =>
                    item.media_type === 'image' ? (
                      <div key={item.id} className="rounded-xl overflow-hidden border border-senyetse-gold/20">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.url}
                          alt={event.title}
                          className="w-full h-auto"
                        />
                      </div>
                    ) : (
                      <div key={item.id} className="rounded-xl overflow-hidden border border-senyetse-gold/20 aspect-video">
                        <video
                          src={item.url}
                          controls
                          className="w-full h-full object-contain"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-senyetse-earth/60 italic py-8 text-center">
                  No photos or videos for this event yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
