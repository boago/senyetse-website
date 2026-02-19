import { supabase, hasSupabase } from '@/lib/supabase';

async function getAboutContent() {
  try {
    if (!hasSupabase()) return null;
    const { data, error } = await supabase
      .from('site_content')
      .select('title, content')
      .eq('slug', 'about')
      .maybeSingle();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export default async function AboutPage() {
  const data = await getAboutContent();

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-senyetse-dark mb-8">
          {data?.title || 'About Senyetse Choir'}
        </h1>
        <div className="text-lg text-senyetse-earth/90 leading-relaxed whitespace-pre-wrap space-y-4">
          {data?.content || `Senyetse is a cultural organization dedicated to preserving and promoting Setswana cultural heritage through traditional singing and dance.

Our mandate is to participate in community activities through folksongs as a way of encouraging and presenting our cultural heritage. We are committed to growing and nurturing young generations to be responsible members of society, using cultural expression as a vehicle for community engagement and social development.

We sing and dance in Setswana, celebrating the richness of our culture and sharing it with our communities and beyond.`}
        </div>
      </div>
    </section>
  );
}
