# Events Page Troubleshooting

## Issues Fixed

1. ✅ Added `story` field to EventItem types (was missing)
2. ✅ Fixed date comparison (now compares dates properly, ignoring time)
3. ✅ Added error logging (check browser console)
4. ✅ Added `force-dynamic` export (ensures fresh data)
5. ✅ Added debug info (shows event counts in development)

---

## How to Debug

### 1. Check Browser Console
Open browser DevTools (F12) → Console tab. Look for:
- "Events fetched: X" - shows how many events were loaded
- "Error fetching events:" - shows database errors
- "Supabase not configured" - means `.env.local` is missing or wrong

### 2. Check Network Tab
- Open DevTools → Network tab
- Refresh the events page
- Look for requests to Supabase
- Check if they return 200 OK or errors

### 3. Verify Database
Run this in Supabase SQL Editor:
```sql
SELECT COUNT(*) FROM events;
SELECT id, title, event_date FROM events ORDER BY event_date;
```

### 4. Check Environment Variables
Verify `.env.local` has:
```
NEXT_PUBLIC_SUPABASE_URL=https://vshmnncukcsrvzwsqvhe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Important:** Restart `npm run dev` after changing `.env.local`

---

## Common Issues

### Events not showing
1. **Database empty?** Run `insert-events.sql` in Supabase SQL Editor
2. **Wrong dates?** Events from 2024/2025 will be in "Past Events" section (scroll down)
3. **Supabase not connected?** Check `.env.local` and restart dev server
4. **RLS policies?** Make sure events table has "events read" policy allowing SELECT

### Events show but images broken
- Images are in `public/events/` - check if files exist
- URLs should be `/events/dikoloti-festival-2026/filename.jpeg`
- Check browser console for 404 errors on images

### Modal doesn't open
- Check browser console for JavaScript errors
- Make sure EventDetailModal component is imported correctly

---

## Quick Test

1. Go to `/events` page
2. Check browser console for "Events fetched: X"
3. If X = 0, check database
4. If X > 0 but nothing shows, check date filtering (events might be in Past section)

---

## Expected Behavior

- **Upcoming Events**: Events with `event_date >= today`
- **Past Events**: Events with `event_date < today`
- **2026-01-01** (Dikoloti Festival 2026) → Upcoming (if today < Jan 1, 2026)
- **2025-01-02** (Dikoloti Festival 2025) → Past
- **2025-01-15** (Atang Wedding) → Past
- **2024-12-25** (Christmas) → Past

If today is Feb 15, 2026, only the 2026-01-01 event will be "upcoming", rest will be "past".
