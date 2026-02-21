-- Update Home page content (run in Supabase SQL Editor)
-- Inserts or updates the site_content row for slug 'home'

INSERT INTO site_content (slug, title, content, updated_at)
VALUES (
  'home',
  'Welcome',
  'Senyetse is a community-based cultural organization dedicated to preserving and promoting Setswana cultural heritage through traditional singing and dance, based in Kanye and Molapo wa Basadi cattle post in southern Botswana. With approximately 100 members, including around 60 artists (performers), we are a well-known traditional choir in Botswana, recognized as winners of the 2014 National Presidential Competition and organizers of the annual Battle of Dikhwaere event. Our mandate is to nurture cultural exchange and understanding, preserving and celebrating cultural heritage through music while promoting awareness, empowering members with skills and purpose, and inspiring our community. We are committed to growing and nurturing young generations to be responsible members of society, using cultural expression as a vehicle for community engagement and social development. We actively promote gender equality and inclusivity by ensuring equal participation of women and men in all our activities, supporting women''s leadership in traditional choirs, and addressing critical social issues such as gender-based violence through our artistic platform. As cultural professionals in the Global South, we work to strengthen the status of artists and advance artistic freedom, ensuring that traditional choirs (dikhwaere) have recognition, capacity-building opportunities, and platforms to participate fully in cultural life.',
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  updated_at = EXCLUDED.updated_at;
