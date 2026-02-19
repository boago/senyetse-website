'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminDashboardPage() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/admin');
      } else {
        setUser({ email: session.user.email || '' });
      }
      setLoading(false);
    });
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/admin');
    router.refresh();
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-senyetse-earth/70">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-2xl font-display font-bold text-senyetse-dark">
            Admin Dashboard
          </h1>
          <p className="text-senyetse-earth/70 text-sm">{user?.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 text-sm text-senyetse-earth/70 hover:text-senyetse-dark"
        >
          Sign out
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/dashboard/content"
          className="block p-6 bg-white rounded-xl shadow-md border border-senyetse-gold/20 hover:border-senyetse-gold/50 transition"
        >
          <h2 className="text-lg font-display font-bold text-senyetse-dark mb-2">
            Edit Content
          </h2>
          <p className="text-sm text-senyetse-earth/70">
            Update Home, About, and Contact page text
          </p>
        </Link>
        <Link
          href="/admin/dashboard/contact"
          className="block p-6 bg-white rounded-xl shadow-md border border-senyetse-gold/20 hover:border-senyetse-gold/50 transition"
        >
          <h2 className="text-lg font-display font-bold text-senyetse-dark mb-2">
            Contact Details
          </h2>
          <p className="text-sm text-senyetse-earth/70">
            Edit address, social links, and phone number
          </p>
        </Link>
        <Link
          href="/admin/dashboard/news"
          className="block p-6 bg-white rounded-xl shadow-md border border-senyetse-gold/20 hover:border-senyetse-gold/50 transition"
        >
          <h2 className="text-lg font-display font-bold text-senyetse-dark mb-2">
            Manage News
          </h2>
          <p className="text-sm text-senyetse-earth/70">
            Add and manage news articles
          </p>
        </Link>
        <Link
          href="/admin/dashboard/events"
          className="block p-6 bg-white rounded-xl shadow-md border border-senyetse-gold/20 hover:border-senyetse-gold/50 transition"
        >
          <h2 className="text-lg font-display font-bold text-senyetse-dark mb-2">
            Manage Events
          </h2>
          <p className="text-sm text-senyetse-earth/70">
            Add and manage upcoming events
          </p>
        </Link>
        <Link
          href="/admin/dashboard/members"
          className="block p-6 bg-white rounded-xl shadow-md border border-senyetse-gold/20 hover:border-senyetse-gold/50 transition"
        >
          <h2 className="text-lg font-display font-bold text-senyetse-dark mb-2">
            Manage Members
          </h2>
          <p className="text-sm text-senyetse-earth/70">
            Add and manage choir members
          </p>
        </Link>
        <Link
          href="/admin/dashboard/gallery"
          className="block p-6 bg-white rounded-xl shadow-md border border-senyetse-gold/20 hover:border-senyetse-gold/50 transition"
        >
          <h2 className="text-lg font-display font-bold text-senyetse-dark mb-2">
            Manage Gallery
          </h2>
          <p className="text-sm text-senyetse-earth/70">
            Add, edit, or remove photos and media
          </p>
        </Link>
        <Link
          href="/"
          className="block p-6 bg-white rounded-xl shadow-md border border-senyetse-gold/20 hover:border-senyetse-gold/50 transition"
        >
          <h2 className="text-lg font-display font-bold text-senyetse-dark mb-2">
            View Website
          </h2>
          <p className="text-sm text-senyetse-earth/70">
            See how your changes look to visitors
          </p>
        </Link>
      </div>
    </div>
  );
}
