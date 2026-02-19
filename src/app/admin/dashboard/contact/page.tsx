'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type ContactSettings = {
  facebook_url: string;
  tiktok_url: string;
  physical_address: string;
  postal_address: string;
  phone_number: string;
};

const defaults: ContactSettings = {
  facebook_url: 'https://www.facebook.com/profile.php?id=61555314010057',
  tiktok_url: '',
  physical_address: '',
  postal_address: '',
  phone_number: '',
};

export default function AdminContactPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<ContactSettings>(defaults);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/admin');
        return;
      }
      loadSettings();
    });
  }, [router]);

  async function loadSettings() {
    try {
      const { data } = await supabase
        .from('contact_settings')
        .select('facebook_url, tiktok_url, physical_address, postal_address, phone_number')
        .eq('id', 'default')
        .maybeSingle();
      if (data) {
        setSettings({
          facebook_url: data.facebook_url || '',
          tiktok_url: data.tiktok_url || '',
          physical_address: data.physical_address || '',
          postal_address: data.postal_address || '',
          phone_number: data.phone_number || '',
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    setSaving(true);
    try {
      await supabase
        .from('contact_settings')
        .upsert(
          {
            id: 'default',
            facebook_url: settings.facebook_url || null,
            tiktok_url: settings.tiktok_url || null,
            physical_address: settings.physical_address || null,
            postal_address: settings.postal_address || null,
            phone_number: settings.phone_number || null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        );
      alert('Contact details saved.');
    } catch (e) {
      console.error(e);
      alert('Failed to save');
    } finally {
      setSaving(false);
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
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Link href="/admin/dashboard" className="text-senyetse-gold hover:underline mb-6 inline-block">
        ← Back to Dashboard
      </Link>

      <h1 className="text-2xl font-display font-bold text-senyetse-dark mb-8">
        Contact Details
      </h1>
      <p className="text-senyetse-earth/70 mb-8">
        Edit the contact information shown on the Contact page. Leave fields empty to hide them.
      </p>

      <div className="space-y-6 p-6 bg-white rounded-xl shadow-md border border-senyetse-gold/20">
        <div>
          <label className="block text-sm font-medium text-senyetse-dark mb-1">Facebook Page URL</label>
          <input
            type="url"
            value={settings.facebook_url}
            onChange={(e) => setSettings((p) => ({ ...p, facebook_url: e.target.value }))}
            placeholder="https://www.facebook.com/..."
            className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-senyetse-dark mb-1">TikTok URL</label>
          <input
            type="url"
            value={settings.tiktok_url}
            onChange={(e) => setSettings((p) => ({ ...p, tiktok_url: e.target.value }))}
            placeholder="https://www.tiktok.com/@..."
            className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-senyetse-dark mb-1">Physical Address</label>
          <input
            type="text"
            value={settings.physical_address}
            onChange={(e) => setSettings((p) => ({ ...p, physical_address: e.target.value }))}
            placeholder="e.g. Kanye, Southern District, Botswana"
            className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-senyetse-dark mb-1">Postal Address</label>
          <input
            type="text"
            value={settings.postal_address}
            onChange={(e) => setSettings((p) => ({ ...p, postal_address: e.target.value }))}
            placeholder="e.g. P.O. Box 123, Kanye"
            className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-senyetse-dark mb-1">Phone Number</label>
          <input
            type="tel"
            value={settings.phone_number}
            onChange={(e) => setSettings((p) => ({ ...p, phone_number: e.target.value }))}
            placeholder="e.g. +267 123 4567"
            className="w-full px-4 py-2 rounded-lg border border-senyetse-earth/20"
          />
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-2 bg-senyetse-gold text-senyetse-dark rounded-lg hover:bg-senyetse-terracotta disabled:opacity-50 font-medium"
        >
          {saving ? 'Saving...' : 'Save Contact Details'}
        </button>
      </div>
    </div>
  );
}
