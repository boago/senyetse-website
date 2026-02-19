-- Add event_media table for multiple images/videos per event
-- Run this in Supabase SQL Editor if you already ran the main schema

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
