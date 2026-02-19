-- Add story column to events (long narrative about the event)
-- Run this in Supabase SQL Editor if you already ran the main schema

ALTER TABLE events ADD COLUMN IF NOT EXISTS story TEXT;
