# Artists – Extracted from Member Photos

All information extracted from the "KNOW YOUR CHOIR MEMBERS" graphics.  
**Gender rule used:** Bass & Tenor = Male | First Part & Second Part = Female

---

## Complete List (21 Artists)

| # | Name | Preferred Name | Voice Category | Gender | Photo File |
|---|------|----------------|----------------|--------|------------|
| 1 | Abaleng Magano | Mbali | First Part | Female | Abaleng Magano.jpeg |
| 2 | Amantle Mongwegi | Smah | First Part | Female | Amantle Mongwegi.jpeg |
| 3 | Boago Okgetheng | Besty | Tenor | Male | Boago Okgetheng.jpeg |
| 4 | Bontle Morwaagae | Mma-Honorable | Second Part | Female | Bontle Morwaagae.jpeg |
| 5 | Dintle Mosalakatane | Mandle | Second Part | Female | Dintle Mosalakatane.jpeg |
| 6 | Gaamangwe Tshukudu | Proper | Tenor | Male | Gaamangwe Tshukudu.jpeg |
| 7 | Gorata Magano | Nazo | First Part | Female | Gorata Magano.jpeg |
| 8 | Gorataone Setsiba | Tsibaman | Tenor | Male | Gorataone Setsiba.jpeg |
| 9 | Ishmael Keatlholetswe | Major | Tenor | Male | Ishmael Keatlholetswe.jpeg |
| 10 | Keabetswe Diphofu | MmagoBisto | Second Part | Female | Keabetswe Diphofu.jpeg |
| 11 | Keemenao Diphofu | Nochar | First Part | Female | Keemenao Diphofu.jpeg |
| 12 | Kenole Tshukudu | Cozila | Second Part | Female | Kenole Tshukudu.jpeg |
| 13 | Kereng Bame Mojako | Ma-eyezah | First Part | Female | Kereng Bame Mojako.jpeg |
| 14 | Lorato Omphitlhetse | Letty | Second Part | Female | Lorato Omphitlhetse.jpeg |
| 15 | Ofentse Dithato | Style | Tenor | Male | Ofentse Dithato.jpeg |
| 16 | Ofentse Jim | Faras | Tenor | Male | Ofentse Jim.jpeg |
| 17 | Otsile Mpitsang | Oats | Bass | Male | Otsile Mpitsang.jpeg |
| 18 | Phuthego Ramaribeng | Phucks | Tenor | Male | Phuthego Ramaribeng.jpeg |
| 19 | Ponalo Tshukudu | Sponah | First Part | Female | Ponalo Tshukudu.jpeg |
| 20 | Thapelo Malope | Stober | Tenor | Male | Thapelo Malope.jpeg |
| 21 | Tshepho Odirile | Sbatana | Tenor | Male | Tshepho Odirile.jpeg |
| 22 | Tshepo Tshukudu | Dama | Tenor | Male | Tshepo Tshukudu.jpeg |

---

## By Voice Category

**Male (Bass/Tenor):** 10  
- Bass: Otsile Mpitsang  
- Tenor: Boago Okgetheng, Gaamangwe Tshukudu, Gorataone Setsiba, Ishmael Keatlholetswe, Ofentse Dithato, Ofentse Jim, Phuthego Ramaribeng, Thapelo Malope, Tshepho Odirile, Tshepo Tshukudu  

**Female (First/Second Part):** 12  
- First Part: Abaleng Magano, Amantle Mongwegi, Gorata Magano, Keemenao Diphofu, Kereng Bame Mojako, Ponalo Tshukudu  
- Second Part: Bontle Morwaagae, Dintle Mosalakatane, Keabetswe Diphofu, Kenole Tshukudu, Lorato Omphitlhetse  

---

## What Was Done

1. **Photos copied** to `public/members/` – served by the website
2. **SQL insert created** in `insert-artists.sql` – includes photo URLs
3. **Gender set** from voice category (Bass/Tenor = Male, First/Second Part = Female)

---

## Next Step

Run `insert-artists.sql` in Supabase SQL Editor to add all 21 artists with their photos.

**Note:** If you deploy to Vercel or another host, the images in `public/members/` will be included. For Supabase-hosted photos, upload to the `gallery` bucket and update the `photo_url` values in the database.
