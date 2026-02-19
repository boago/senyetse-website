# ✅ Database Setup - Ready to Execute

## Your Supabase Project
- **URL:** `https://vshmnncukcsrvzwsqvhe.supabase.co`
- **Credentials:** Saved in `.env.local`

---

## Step-by-Step Setup (5 minutes)

### 1. Run SQL Schema (2 minutes)
1. Go to https://supabase.com/dashboard/project/vshmnncukcsrvzwsqvhe
2. Click **SQL Editor** (left sidebar)
3. Click **New query**
4. Open `supabase-schema.sql` from this folder
5. Copy **ALL** contents (Cmd+A, Cmd+C)
6. Paste into SQL Editor
7. Click **Run** (or Cmd+Enter)
8. ✅ Should see "Success. No rows returned"

### 2. Create Storage Bucket (1 minute)
1. Click **Storage** (left sidebar)
2. Click **New bucket**
3. Name: `gallery`
4. ✅ Check **Public bucket**
5. Click **Create bucket**

### 3. Add Storage Policies (1 minute)
1. Click on `gallery` bucket
2. Go to **Policies** tab
3. Click **New policy** → **For full customization**
   - Name: `Allow public read`
   - Operation: `SELECT`
   - Expression: `true`
   - Save
4. Click **New policy** again
   - Name: `Allow authenticated upload`
   - Operation: `INSERT`
   - Target: `authenticated`
   - Expression: `true`
   - Save

### 4. Create Admin User (1 minute)
1. Click **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter email and password (save these!)
4. Click **Create user**

---

## Test Your Setup

### Option 1: Visit Admin Panel
1. Restart your dev server: `npm run dev`
2. Go to http://localhost:3000/admin
3. Sign in with the email/password you created
4. ✅ If you see the dashboard, setup is complete!

### Option 2: Run Test Script
```bash
node scripts/test-connection.js
```

---

## What Gets Created

✅ **Tables:**
- `site_content` (home, about, contact pages)
- `gallery` (image gallery)
- `news` (news articles)
- `events` (upcoming events)
- `choir_members` (member profiles)

✅ **Storage:**
- `gallery` bucket (for image uploads)

✅ **Security:**
- Public read access (anyone can view)
- Authenticated write access (only logged-in admins can edit)

---

## Troubleshooting

| Error | Solution |
|-------|----------|
| "relation does not exist" | Run `supabase-schema.sql` in SQL Editor |
| "bucket not found" | Create `gallery` bucket in Storage |
| "Invalid API key" | Check `.env.local` has correct anon key |
| Can't upload images | Check storage policies are set |
| Can't sign in | Create user in Authentication > Users |

---

## Next Steps After Setup

1. ✅ Add members via Admin → Manage Members
2. ✅ Upload images via Admin → Manage Gallery
3. ✅ Add news/events via Admin dashboard
4. ✅ Customize content via Admin → Manage Content

Your website is ready! 🎉
