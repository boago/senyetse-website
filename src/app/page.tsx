import Link from 'next/link';
import { supabase, hasSupabase } from '@/lib/supabase';

async function getHomeContent() {
  try {
    if (!hasSupabase()) return null;
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('slug', 'home')
      .maybeSingle();
    if (error) return null;
    return data?.content;
  } catch {
    return null;
  }
}

// Split long paragraph into readable chunks (by sentence, ~2 sentences per paragraph)
function splitIntoParagraphs(text: string): string[] {
  if (!text?.trim()) return [];
  const trimmed = text.trim();
  const sentences = trimmed.split(/(?<=[.!?])\s+/).filter(Boolean);
  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    paragraphs.push(sentences.slice(i, i + 2).join(' '));
  }
  return paragraphs.length ? paragraphs : [trimmed];
}

export default async function HomePage() {
  const content = await getHomeContent();
  const paragraphs = content ? splitIntoParagraphs(content) : [];

  const fallback = 'Welcome to Senyetse – where Setswana cultural heritage comes alive through traditional singing and dance. We participate in community activities through folksongs, encouraging and presenting our cultural heritage, and nurturing young generations.';

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      {/* Hero: headline + tagline */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-senyetse-dark mb-3">
          Senyetse Choir
        </h1>
        <p className="text-senyetse-gold text-xl md:text-2xl font-medium">
          Setswana Heritage Through Song & Dance
        </p>
      </div>

      {/* Video */}
      <div className="max-w-4xl mx-auto mb-14">
        <div className="rounded-2xl overflow-hidden border border-senyetse-gold/20 shadow-lg bg-senyetse-cream aspect-video">
          <video
            src="/welcome_video.mp4"
            controls
            className="w-full h-full object-contain"
            poster="/logo.jpeg"
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* About text: clean, readable blocks */}
      <div className="max-w-2xl mx-auto">
        <div className="space-y-6 text-senyetse-earth/90 text-base md:text-lg leading-relaxed">
          {paragraphs.length > 0 ? (
            paragraphs.map((para, i) => (
              <p key={i} className="text-left">
                {para}
              </p>
            ))
          ) : (
            <p className="text-left">{fallback}</p>
          )}
        </div>
      </div>

      {/* CTAs */}
      <div className="max-w-2xl mx-auto mt-12 flex flex-wrap gap-4 justify-center">
        <Link
          href="/about"
          className="px-6 py-3 bg-senyetse-gold text-senyetse-dark font-medium rounded-lg hover:bg-senyetse-terracotta hover:text-white transition"
        >
          Learn About Us
        </Link>
        <Link
          href="/gallery"
          className="px-6 py-3 border-2 border-senyetse-gold text-senyetse-dark font-medium rounded-lg hover:bg-senyetse-gold hover:text-white transition"
        >
          View Gallery
        </Link>
      </div>
    </section>
  );
}
