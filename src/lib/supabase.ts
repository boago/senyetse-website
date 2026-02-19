import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key-for-build';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export function hasSupabase() {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export type SiteContent = {
  id: string;
  slug: string;
  title: string;
  content: string;
  updated_at: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  display_order: number;
  created_at: string;
};

export type NewsItem = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  published_at: string;
  created_at: string;
};

export type EventItem = {
  id: string;
  title: string;
  description: string | null;
  story: string | null;
  event_date: string;
  event_time: string | null;
  location: string | null;
  image_url: string | null;
  created_at: string;
};

export type ChoirMember = {
  id: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other' | null;
  preferred_name: string | null;
  voice_category: string | null;
  photo_url: string | null;
  role: string | null;
  committee_name: string | null;
  category: 'committee' | 'artists' | 'supporting_staff';
  display_order: number;
  created_at: string;
};
