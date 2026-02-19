-- Insert default Contact Settings for Senyetse Choir
-- Run this in Supabase SQL Editor (after supabase-schema.sql)
-- Admin can edit these via Admin Dashboard > Contact Settings

INSERT INTO contact_settings (id, facebook_url, tiktok_url, physical_address, postal_address, phone_number) VALUES (
  'default',
  'https://www.facebook.com/profile.php?id=61555314010057',
  '',  -- Add TikTok URL when available
  '',  -- Physical address (e.g. Kanye, Southern District, Botswana)
  '',  -- Postal address (e.g. P.O. Box 123, Kanye)
  ''   -- Phone number
) ON CONFLICT (id) DO NOTHING;
