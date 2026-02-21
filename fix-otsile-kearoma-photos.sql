-- Point Otsile and Kearoma to -2 image URLs (run in Supabase SQL Editor after pushing images)
UPDATE choir_members SET photo_url = '/committee/otsile-2.jpeg' WHERE name = 'Otsile Mpitseng' AND committee_name = 'Executive Committee';
UPDATE choir_members SET photo_url = '/committee/kearoma-2.jpeg' WHERE name = 'Kearoma Tshakudu' AND committee_name = 'Executive Committee';
