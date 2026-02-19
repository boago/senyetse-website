'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type ContentSlug = 'home' | 'about' | 'contact';

export default function AdminContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [content, setContent] = useState<Record<ContentSlug, { title: string; content: string }>>({
    home: { title: 'Welcome', content: '' },
    about: { title: 'About Senyetse Choir', content: '' },
    contact: { title: 'Contact Us', content: '' },
  });
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/admin');
        return;
      }
      loadContent();
    });
  }, [router]);

  async function loadContent() {
    try {
      const { data } = await supabase.from('site_content').select('slug, title, content');
      if (data) {
        const map: Record<string, { title: string; content: string }> = {};
        data.forEach((row) => {
          if (['home', 'about', 'contact'].includes(row.slug)) {
            map[row.slug] = { title: row.title, content: row.content || '' };
          }
        });
        setContent((prev) => ({ ...prev, ...map }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function save(slug: ContentSlug) {
    setSaving(slug);
    try {
      await supabase
        .from('site_content')
        .upsert(
          { slug, title: content[slug].title, content: content[slug].content, updated_at: new Date().toISOString() },
          { onConflict: 'slug' }
        );
    } catch (e) {
      console.error(e);
      alert('Failed to save');
    } finally {
      setSaving(null);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-senyetse-earth/70">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/admin/dashboard" className="text-senyetse-gold hover:underline mb-6 inline-block">
        ← Back to Dashboard
      </Link>

      <h1 className="text-2xl font-display font-bold text-senyetse-dark mb-8">
        Edit Content
      </h1>

      {(['home', 'about', 'contact'] as ContentSlug[]).map((slug) => (
        <div key={slug} className="mb-12 p-6 bg-white rounded-xl shadow-md border border-senyetse-gold/20">
          <h2 className="text-lg font-bold text-senyetse-dark mb-4 capitalize">{slug}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-senyetse-dark mb-1">Title</label>
              <input
                type="text"
                value={content[slug].title}
                onChange={(e) => setContent((p) => ({ ...p, [slug]: { ...p[slug], title: e.target.value } }))}
                className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-senyetse-dark mb-1">Content</label>
              <textarea
                value={content[slug].content}
                onChange={(e) => setContent((p) => ({ ...p, [slug]: { ...p[slug], content: e.target.value } }))}
                rows={8}
                className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
              />
            </div>
            <button
              onClick={() => save(slug)}
              disabled={saving === slug}
              className="px-4 py-2 bg-senyetse-gold text-senyetse-dark rounded-lg hover:bg-senyetse-terracotta disabled:opacity-50"
            >
              {saving === slug ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
