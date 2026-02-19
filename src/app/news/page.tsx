import { supabase, hasSupabase } from '@/lib/supabase';
import NewsGrid from '@/components/NewsGrid';

export const dynamic = 'force-dynamic';

async function getNews() {
  try {
    if (!hasSupabase()) return [];
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false });
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-display font-bold text-senyetse-dark mb-12 text-center">
        News
      </h1>
      {news.length > 0 ? (
        <NewsGrid news={news} />
      ) : (
        <p className="text-center text-senyetse-earth/70 py-12">
          No news yet. Check back soon!
        </p>
      )}
    </section>
  );
}
