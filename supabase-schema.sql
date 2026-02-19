-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- This creates the tables for Senyetse Choir website

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Site content (About, etc.)
CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default content
INSERT INTO site_content (slug, title, content) VALUES
  ('about', 'About Senyetse Choir', 'Senyetse is a cultural organization dedicated to preserving and promoting Setswana cultural heritage through traditional singing and dance. Our mandate is to participate in community activities through folksongs as a way of encouraging and presenting our cultural heritage. We are committed to growing and nurturing young generations to be responsible members of society.'),
  ('home', 'Welcome', 'Welcome to Senyetse Choir – where Setswana heritage comes alive through song and dance.'),
  ('contact', 'Contact Us', 'Get in touch with Senyetse Choir.')
ON CONFLICT (slug) DO NOTHING;

-- Gallery (media)
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (optional - enable if you want strict access control)
-- For now, allow public read and authenticated write:

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Drop policies if they exist, then recreate (allows running script multiple times)
DROP POLICY IF EXISTS "site_content read" ON site_content;
DROP POLICY IF EXISTS "site_content write" ON site_content;
DROP POLICY IF EXISTS "gallery read" ON gallery;
DROP POLICY IF EXISTS "gallery write" ON gallery;

CREATE POLICY "site_content read" ON site_content FOR SELECT USING (true);
CREATE POLICY "site_content write" ON site_content FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "gallery read" ON gallery FOR SELECT USING (true);
CREATE POLICY "gallery write" ON gallery FOR ALL USING (auth.role() = 'authenticated');

-- News
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  story TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  location TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add story column if table already exists (for existing databases)
ALTER TABLE events ADD COLUMN IF NOT EXISTS story TEXT;

-- Event media (images and videos per event)
CREATE TABLE IF NOT EXISTS event_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  url TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE event_media ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "event_media read" ON event_media;
DROP POLICY IF EXISTS "event_media write" ON event_media;
CREATE POLICY "event_media read" ON event_media FOR SELECT USING (true);
CREATE POLICY "event_media write" ON event_media FOR ALL USING (auth.role() = 'authenticated');

-- Choir Members
CREATE TABLE IF NOT EXISTS choir_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
  preferred_name TEXT,
  voice_category TEXT,
  photo_url TEXT,
  role TEXT,
  committee_name TEXT,
  category TEXT NOT NULL DEFAULT 'artists' CHECK (category IN ('committee', 'artists', 'supporting_staff')),
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- If table already exists, update columns (run these if you already created the table)
-- ALTER TABLE choir_members ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'artists' CHECK (category IN ('committee', 'artists', 'supporting_staff'));
-- ALTER TABLE choir_members ADD COLUMN IF NOT EXISTS gender TEXT CHECK (gender IN ('Male', 'Female', 'Other'));
-- ALTER TABLE choir_members ADD COLUMN IF NOT EXISTS preferred_name TEXT;
-- ALTER TABLE choir_members ADD COLUMN IF NOT EXISTS voice_category TEXT;
-- ALTER TABLE choir_members DROP COLUMN IF EXISTS role;
-- ALTER TABLE choir_members DROP COLUMN IF EXISTS bio;

-- RLS for new tables
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE choir_members ENABLE ROW LEVEL SECURITY;

-- Drop policies if they exist, then recreate (allows running script multiple times)
DROP POLICY IF EXISTS "news read" ON news;
DROP POLICY IF EXISTS "news write" ON news;
DROP POLICY IF EXISTS "events read" ON events;
DROP POLICY IF EXISTS "events write" ON events;
DROP POLICY IF EXISTS "choir_members read" ON choir_members;
DROP POLICY IF EXISTS "choir_members write" ON choir_members;

CREATE POLICY "news read" ON news FOR SELECT USING (true);
CREATE POLICY "news write" ON news FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "events read" ON events FOR SELECT USING (true);
CREATE POLICY "events write" ON events FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "choir_members read" ON choir_members FOR SELECT USING (true);
CREATE POLICY "choir_members write" ON choir_members FOR ALL USING (auth.role() = 'authenticated');

-- STORAGE: Create bucket in Dashboard > Storage > New bucket
-- 1. Name: gallery
-- 2. Public: Yes (so images can be displayed on the site)
-- 3. Policies (Storage > gallery > Policies):
--    - SELECT (read): Policy for public access - allow all
--    - INSERT (upload): Policy for authenticated - allow if auth.role() = 'authenticated'

-- Add role and committee_name columns if table already exists
ALTER TABLE choir_members ADD COLUMN IF NOT EXISTS role TEXT;
ALTER TABLE choir_members ADD COLUMN IF NOT EXISTS committee_name TEXT;

-- Contact settings (single row, editable by admin)
CREATE TABLE IF NOT EXISTS contact_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  facebook_url TEXT,
  tiktok_url TEXT,
  physical_address TEXT,
  postal_address TEXT,
  phone_number TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "contact_settings read" ON contact_settings;
DROP POLICY IF EXISTS "contact_settings write" ON contact_settings;
CREATE POLICY "contact_settings read" ON contact_settings FOR SELECT USING (true);
CREATE POLICY "contact_settings write" ON contact_settings FOR ALL USING (auth.role() = 'authenticated');
