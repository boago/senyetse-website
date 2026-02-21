-- Add photos for Otsile, Kabontle, Kearoma, Kenanao, Thabo + fix Kabontle name
-- Run in Supabase SQL Editor after pushing public/committee/ images

-- 1. Fix name: Kabontle Kgautlwe → Kabontle Kgautlhe
UPDATE choir_members SET name = 'Kabontle Kgautlhe' WHERE name = 'Kabontle Kgautlwe' AND committee_name = 'Youth Committee';

-- 2. Set photo_url for the five members
UPDATE choir_members SET photo_url = '/committee/otsile.jpeg' WHERE name = 'Otsile Mpitseng' AND committee_name = 'Executive Committee';
UPDATE choir_members SET photo_url = '/committee/kabontle.jpeg' WHERE name = 'Kabontle Kgautlhe' AND committee_name = 'Youth Committee';
UPDATE choir_members SET photo_url = '/committee/kearoma.jpeg' WHERE name = 'Kearoma Tshakudu' AND committee_name = 'Executive Committee';
UPDATE choir_members SET photo_url = '/committee/kenanao.jpeg' WHERE name = 'Kenanao Phoga' AND committee_name = 'Youth Committee';
UPDATE choir_members SET photo_url = '/committee/thabo.jpeg' WHERE name = 'Thabo Omphitlhetse' AND committee_name = 'Fundraising Committee';
