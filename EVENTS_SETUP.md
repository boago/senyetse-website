# Example Events – Setup Guide

## What Was Done

1. **Images copied** to `public/events/`:
   - `dikoloti-festival-2026/` – 19 images
   - `dikoloti-festival-2025/` – 6 images
   - `atang-wedding/` – 2 images
   - `christmas-2024/` – 4 images

2. **Event stories written** – narrative content for the Event Story tab:
   - Dikoloti Festival 2026 – Tshweneyagae, New Year’s Day
   - Dikoloti Festival 2025 – Tsweneyagae, January
   - Atang Amgano Wedding – Kanye, Setswana wedding
   - Christmas 2024 – Molapo-Wa-Basadi, community celebration

3. **SQL scripts created**:
   - `insert-events.sql` – inserts 4 events with story and main image
   - `insert-event-media.sql` – adds all images to the Media tab (run after `insert-events.sql`)

---

## Events Summary

| Event | Date | Location | Images |
|-------|------|----------|--------|
| Dikoloti Festival 2026 | 2026-01-01 | Tshweneyagae, Southern District | 19 |
| Dikoloti Festival 2025 | 2025-01-02 | Tsweneyagae, Southern District | 6 |
| Atang Amgano Wedding | 2025-01-15 | Kanye | 2 |
| Christmas Celebration 2024 | 2024-12-25 | Molapo-Wa-Basadi | 4 |

---

## How to Insert

### Step 1: Run insert-events.sql
1. Open Supabase Dashboard → SQL Editor  
2. Copy the contents of `insert-events.sql`  
3. Paste and run it  
4. The 4 events will be inserted with title, description, story, date, location, and main image

### Step 2: Run insert-event-media.sql
1. In the same SQL Editor  
2. Copy the contents of `insert-event-media.sql`  
3. Paste and run it  
4. All extra images will be added to `event_media` for each event

---

## Prerequisites

- Schema includes `story` column and `event_media` table  
- If needed: run `add-event-story.sql` and `add-event-media.sql` before these inserts

---

## Editing Event Details

You can edit events in Admin → Manage Events. The story field is shown there as “Event Story (long narrative)”.  
Dates, locations, and stories can be updated from the admin panel.

---


## Event details (corrected)

- **Atang Amgano Wedding** – Jan 15, 2025, Kanye
- **Christmas Celebration 2024** – Dec 25, 2024, Molapo-Wa-Basadi
