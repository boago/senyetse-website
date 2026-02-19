-- Add extra images to event_media for each event
-- Run this AFTER insert-events.sql in Supabase SQL Editor
-- Uses event title to match (ensure event titles match exactly)

-- Dikoloti Festival 2026 - add all 19 images (main image already in events.image_url)
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/609152677_122257341974177133_5843049225200956723_n.jpeg', 0 FROM events WHERE title = 'Dikoloti Festival 2026';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/610668550_122257341746177133_4328928588203627523_n.jpeg', 1 FROM events WHERE title = 'Dikoloti Festival 2026';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/610677143_122257339682177133_3596877971635182396_n.jpeg', 2 FROM events WHERE title = 'Dikoloti Festival 2026';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/610702798_122257341038177133_1025112414099964073_n.jpeg', 3 FROM events WHERE title = 'Dikoloti Festival 2026';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/610756079_122257341740177133_3775652834962684937_n.jpeg', 4 FROM events WHERE title = 'Dikoloti Festival 2026';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/610808143_122257339886177133_6816691173125533141_n.jpeg', 5 FROM events WHERE title = 'Dikoloti Festival 2026';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/610822554_122257338926177133_249593696235846001_n.jpeg', 6 FROM events WHERE title = 'Dikoloti Festival 2026';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/610833750_122257164590177133_6231982805771618522_n.jpeg', 7 FROM events WHERE title = 'Dikoloti Festival 2026';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/610937118_122257341824177133_4236684484494538818_n.jpeg', 8 FROM events WHERE title = 'Dikoloti Festival 2026';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/610941071_122257339664177133_7706096529782719563_n.jpeg', 9 FROM events WHERE title = 'Dikoloti Festival 2026';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/610964400_122257339208177133_5036642300473653843_n.jpeg', 10 FROM events WHERE title = 'Dikoloti Festival 2026';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/611165619_122257338998177133_7100010991210555774_n.jpeg', 11 FROM events WHERE title = 'Dikoloti Festival 2026';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/611211011_122257339826177133_7164971753959540142_n.jpeg', 12 FROM events WHERE title = 'Dikoloti Festival 2026';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/611290769_122257339478177133_2225207069647714510_n.jpeg', 13 FROM events WHERE title = 'Dikoloti Festival 2026';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/611293954_122257340762177133_5293265412337547650_n.jpeg', 14 FROM events WHERE title = 'Dikoloti Festival 2026';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/611300565_122257341764177133_4439249503945279715_n.jpeg', 15 FROM events WHERE title = 'Dikoloti Festival 2026';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/611332925_122257340996177133_7334112436401806313_n.jpeg', 16 FROM events WHERE title = 'Dikoloti Festival 2026';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/611567274_122257341854177133_5932317279837937398_n.jpeg', 17 FROM events WHERE title = 'Dikoloti Festival 2026';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2026/611611121_122257339112177133_2368455997311411618_n.jpeg', 18 FROM events WHERE title = 'Dikoloti Festival 2026';

-- Dikoloti Festival 2025 - add all 6 images
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2025/476799785_122197821500177133_8848263504957386670_n.jpeg', 0 FROM events WHERE title = 'Dikoloti Festival 2025';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2025/477572513_122197823036177133_883439622949838269_n.jpeg', 1 FROM events WHERE title = 'Dikoloti Festival 2025';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2025/477574478_122197823204177133_8008735863287814711_n.jpeg', 2 FROM events WHERE title = 'Dikoloti Festival 2025';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2025/477707144_122197823120177133_3700250501073118312_n.jpeg', 3 FROM events WHERE title = 'Dikoloti Festival 2025';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2025/478698520_122197821968177133_5252594159595928793_n.jpeg', 4 FROM events WHERE title = 'Dikoloti Festival 2025';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/dikoloti-festival-2025/479549348_122197822904177133_3849248593893130637_n.jpeg', 5 FROM events WHERE title = 'Dikoloti Festival 2025';

-- Atang Wedding - add both images
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/atang-wedding/476300561_122196912368177133_992053082589293736_n.jpeg', 0 FROM events WHERE title = 'Atang Amgano Wedding';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/atang-wedding/476894894_122197066610177133_8269047145183865144_n.jpeg', 1 FROM events WHERE title = 'Atang Amgano Wedding';

-- Christmas 2024 - add all 4 images
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/christmas-2024/477286013_122197822922177133_22826044634891392_n.jpeg', 0 FROM events WHERE title = 'Christmas Celebration 2024';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/christmas-2024/477572407_122197823276177133_5483725864638363598_n.jpeg', 1 FROM events WHERE title = 'Christmas Celebration 2024';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/christmas-2024/479531545_122197822916177133_7968821431700126186_n.jpeg', 2 FROM events WHERE title = 'Christmas Celebration 2024';
INSERT INTO event_media (event_id, media_type, url, display_order)
SELECT id, 'image', '/events/christmas-2024/480116285_122197823060177133_735140147071448578_n.jpeg', 3 FROM events WHERE title = 'Christmas Celebration 2024';
