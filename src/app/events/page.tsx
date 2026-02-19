import { supabase, hasSupabase } from '@/lib/supabase';
import EventsGrid from '@/components/EventsGrid';

export const dynamic = 'force-dynamic';

async function getEvents() {
  try {
    if (!hasSupabase()) return [];
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to midnight for proper date comparison
  
  const upcoming = events.filter((e: { event_date: string }) => {
    const eventDate = new Date(e.event_date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  });
  
  const past = events.filter((e: { event_date: string }) => {
    const eventDate = new Date(e.event_date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate < today;
  });

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl font-display font-bold text-senyetse-dark mb-12 text-center">
        Events
      </h1>
      {events.length > 0 ? (
        <EventsGrid upcoming={upcoming} past={past} />
      ) : (
        <p className="text-center text-senyetse-earth/70 py-12">
          No events scheduled yet. Check back soon!
        </p>
      )}
    </section>
  );
}
