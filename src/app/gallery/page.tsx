import { supabase, hasSupabase } from '@/lib/supabase';

async function getGallery() {
  try {
    if (!hasSupabase()) return [];
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-display font-bold text-senyetse-dark mb-12 text-center">
        Gallery
      </h1>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: { id: string; title: string; description: string | null; image_url: string }) => (
            <article key={item.id} className="rounded-xl overflow-hidden shadow-lg bg-white">
              <div className="aspect-[4/3] relative bg-senyetse-cream overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h2 className="font-display font-bold text-senyetse-dark">{item.title}</h2>
                {item.description && (
                  <p className="text-senyetse-earth/80 text-sm mt-1">{item.description}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-center text-senyetse-earth/70 py-12">
          No images yet. Check back soon or contact us to share our performances.
        </p>
      )}
    </section>
  );
}
