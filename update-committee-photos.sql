-- Update Committee Members: fix name spelling and add photo URLs
-- Run this in Supabase SQL Editor after committee members exist
-- Photos are in public/committee/ (served at /committee/...)

-- 1. Fix name: Kebabetswe Diphofu → Keabetswe Diphofu
UPDATE choir_members
SET name = 'Keabetswe Diphofu'
WHERE name = 'Kebabetswe Diphofu' AND committee_name = 'Executive Committee';

-- 2. Set photo_url for committee members (match by name and committee)
UPDATE choir_members SET photo_url = '/committee/keabetswe.jpeg' WHERE name = 'Keabetswe Diphofu' AND committee_name = 'Executive Committee';
UPDATE choir_members SET photo_url = '/committee/abaleng.jpeg' WHERE name = 'Abaleng Mogono' AND committee_name = 'Executive Committee';
UPDATE choir_members SET photo_url = '/committee/orebotse.jpeg' WHERE name = 'Orebotse Tshukudu' AND committee_name = 'Executive Committee';
UPDATE choir_members SET photo_url = '/committee/tshepho-odirile.jpeg' WHERE name = 'Tshepho Odirile' AND committee_name = 'Executive Committee';

UPDATE choir_members SET photo_url = '/committee/thusego.jpeg' WHERE name = 'Thusego Wemaklubu' AND committee_name = 'Youth Committee';
UPDATE choir_members SET photo_url = '/committee/bontle.jpeg' WHERE name = 'Bontle Morwaagae' AND committee_name = 'Youth Committee';
UPDATE choir_members SET photo_url = '/committee/ponalo.jpeg' WHERE name = 'Ponalo Tshukudu' AND committee_name = 'Youth Committee';
UPDATE choir_members SET photo_url = '/committee/tlholego.jpeg' WHERE name = 'Tlholego Tshukudu' AND committee_name = 'Youth Committee';

UPDATE choir_members SET photo_url = '/committee/botsile.jpeg' WHERE name = 'Botsile Moilametsi' AND committee_name = 'Fundraising Committee';
UPDATE choir_members SET photo_url = '/committee/boago.jpeg' WHERE name = 'Boago Okgetleng' AND committee_name = 'Fundraising Committee';
UPDATE choir_members SET photo_url = '/committee/kegorogile.jpeg' WHERE name = 'Kegorogile Motlapele' AND committee_name = 'Fundraising Committee';
