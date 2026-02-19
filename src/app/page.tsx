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

export default async function HomePage() {
  const content = await getHomeContent();

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-senyetse-dark mb-6">
          Senyetse Choir
        </h1>
        <p className="text-senyetse-gold text-xl md:text-2xl font-medium mb-4">
          Setswana Heritage Through Song & Dance
        </p>
        <p className="text-senyetse-earth/90 text-lg leading-relaxed mb-10">
          {content || 'Welcome to Senyetse – where Setswana cultural heritage comes alive through traditional singing and dance. We participate in community activities through folksongs, encouraging and presenting our cultural heritage, and nurturing young generations.'}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
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
      </div>
    </section>
  );
}
