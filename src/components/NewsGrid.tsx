'use client';

import { useState } from 'react';
import NewsDetailModal from './NewsDetailModal';

type NewsItem = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  published_at: string;
};

type NewsGridProps = {
  news: NewsItem[];
};

export default function NewsGrid({ news }: NewsGridProps) {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  function NewsCard({ item }: { item: NewsItem }) {
    const formattedDate = new Date(item.published_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return (
      <button
        onClick={() => setSelectedNews(item)}
        className="w-full text-left bg-white rounded-xl shadow-md overflow-hidden border border-senyetse-gold/20 hover:shadow-lg hover:border-senyetse-gold/40 transition group"
      >
        <div className="aspect-[4/3] relative bg-senyetse-cream overflow-hidden">
          {item.image_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.image_url}
              alt={item.title}
              className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-senyetse-earth/20">
              <span className="text-5xl font-display">📰</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
          <div className="absolute bottom-2 left-2 right-2">
            <span className="text-white text-sm font-medium drop-shadow">
              {formattedDate}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-display font-bold text-senyetse-dark text-lg group-hover:text-senyetse-gold transition">
            {item.title}
          </h3>
          {item.content && (
            <p className="text-senyetse-earth/70 text-sm mt-2 line-clamp-2">
              {item.content}
            </p>
          )}
        </div>
      </button>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {selectedNews && (
        <NewsDetailModal
          news={selectedNews}
          onClose={() => setSelectedNews(null)}
        />
      )}
    </>
  );
}
