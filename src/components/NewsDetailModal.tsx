'use client';

import { useState } from 'react';

type NewsItem = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  published_at: string;
};

type NewsDetailModalProps = {
  news: NewsItem;
  onClose: () => void;
};

export default function NewsDetailModal({ news, onClose }: NewsDetailModalProps) {
  const formattedDate = new Date(news.published_at).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
          {news.image_url ? (
            <div className="aspect-video bg-senyetse-cream">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={news.image_url}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-video bg-senyetse-gold/20 flex items-center justify-center">
              <span className="text-senyetse-earth/40 text-6xl font-display">📰</span>
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
            {news.title}
          </h2>
          <p className="text-senyetse-gold font-medium text-sm mb-6">
            {formattedDate}
          </p>

          {/* Story content */}
          <div className="text-senyetse-earth/90 leading-relaxed prose prose-senyetse max-w-none">
            <div className="whitespace-pre-wrap">{news.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
