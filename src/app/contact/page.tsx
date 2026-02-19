import { supabase, hasSupabase } from '@/lib/supabase';
import Link from 'next/link';

async function getContactContent() {
  try {
    if (!hasSupabase()) return null;
    const { data, error } = await supabase
      .from('site_content')
      .select('title, content')
      .eq('slug', 'contact')
      .maybeSingle();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

async function getContactSettings() {
  try {
    if (!hasSupabase()) return null;
    const { data, error } = await supabase
      .from('contact_settings')
      .select('facebook_url, tiktok_url, physical_address, postal_address, phone_number')
      .eq('id', 'default')
      .maybeSingle();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

function ContactItem({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string | null;
  href?: string;
  icon: string;
}) {
  if (!value?.trim()) return null;
  const content = href ? (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-senyetse-gold hover:underline"
    >
      {value}
    </Link>
  ) : (
    <span>{value}</span>
  );
  return (
    <div className="flex items-start gap-3">
      <span className="text-xl" aria-hidden>{icon}</span>
      <div>
        <p className="text-sm font-medium text-senyetse-earth/70">{label}</p>
        <p className="text-senyetse-dark">{content}</p>
      </div>
    </div>
  );
}

export default async function ContactPage() {
  const [data, settings] = await Promise.all([
    getContactContent(),
    getContactSettings(),
  ]);

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-senyetse-dark mb-8">
          {data?.title || 'Contact Us'}
        </h1>
        <div className="text-lg text-senyetse-earth/90 leading-relaxed whitespace-pre-wrap space-y-4 mb-12">
          {data?.content || `Get in touch with Senyetse Choir.

We welcome enquiries about performances, workshops, and community engagements.

Southern Botswana`}
        </div>

        <div className="space-y-6 p-6 bg-senyetse-cream/50 rounded-xl border border-senyetse-gold/20">
          <h2 className="text-lg font-display font-bold text-senyetse-dark mb-4">
            Contact Details
          </h2>
          <ContactItem
            label="Facebook"
            value={settings?.facebook_url}
            href={settings?.facebook_url || undefined}
            icon="📘"
          />
          <ContactItem
            label="TikTok"
            value={settings?.tiktok_url}
            href={settings?.tiktok_url || undefined}
            icon="🎵"
          />
          <ContactItem
            label="Physical Address"
            value={settings?.physical_address}
            icon="📍"
          />
          <ContactItem
            label="Postal Address"
            value={settings?.postal_address}
            icon="✉️"
          />
          <ContactItem
            label="Phone"
            value={settings?.phone_number}
            href={settings?.phone_number ? `tel:${settings.phone_number.replace(/\s/g, '')}` : undefined}
            icon="📞"
          />
        </div>
      </div>
    </section>
  );
}
