# Committee Members Setup - Complete ✅

## What Was Done

1. ✅ **Updated Database Schema**
   - Added `role` field to store positions (Chairperson, Treasurer, etc.)
   - Added `committee_name` field to distinguish between the 3 committees
   - Updated `supabase-schema.sql` with these new fields

2. ✅ **Updated Website Display**
   - Members page now shows **role** prominently below the name
   - Committee name is displayed for committee members
   - Three committees are shown separately:
     - Executive Committee
     - Youth Committee
     - Fundraising Committee

3. ✅ **Created SQL Insert Script**
   - All 21 committee members are ready to insert
   - File: `insert-committee-members.sql`

---

## How to Add Committee Members to Database

### Step 1: Update Database Schema (if not done already)
1. Go to Supabase Dashboard → SQL Editor
2. Run `supabase-schema.sql` (this adds the `role` and `committee_name` columns)

### Step 2: Insert Committee Members
1. In Supabase SQL Editor, open `insert-committee-members.sql`
2. Copy all contents
3. Paste into SQL Editor
4. Click **Run**
5. ✅ All 21 members should now be in the database

### Step 3: Add Photos (via Admin Panel)
1. Go to `http://localhost:3000/admin`
2. Sign in
3. Go to **Manage Members**
4. For each member:
   - Find their name in the list
   - Click **Edit**
   - Upload their photo
   - Save

**OR** upload photos directly to Supabase Storage:
1. Go to Supabase Dashboard → Storage → `gallery` bucket
2. Upload member photos
3. Copy the public URL
4. Update each member's `photo_url` in the database

---

## Members Added

### Executive Committee (8 members)
- Otsile Mpitseng (Chairperson, Male)
- Kebabetswe Diphofu (Deputy Chair, Female)
- Ofentse Dithato (Treasurer, Male)
- Abaleng Mogono (Secretary, Female)
- Orebotse Tshukudu (Deputy Sec, Female)
- Thapelo Matope (Add member 1, Male)
- Kearoma Tshakudu (Add member 2, Female)
- Tshepho Odirile (PRO, Male)

### Youth Committee (7 members)
- Thusego Wemaklubu (Chairperson, Male)
- Kabontle Kgautlwe (Deputy Chair, Female)
- Bontle Morwaagae (Treasurer, Female)
- Lorato Omphitlhetse (Secretary, Female)
- Ponalo Tshukudu (Deputy Sec, Female)
- Tlholego Tshukudu (Add member 1, Male)
- Kenanao Phoga (Add member 2, Male)

### Fundraising Committee (6 members)
- Botsile Moilametsi (Female)
- Mmaogolo Tshukudu (Female)
- Thabo Omphitlhetse (Male)
- Boago Okgetleng (Male)
- Kegorogile Motlapele (Male)
- Ishmael Diplofu (Male)

**Total: 21 committee members**

---

## Display Format on Website

Each member card shows:
1. **Photo** (if uploaded) or initial letter
2. **Name** (large, bold)
3. **Role** (in gold color, e.g., "Chairperson", "Treasurer")
4. **Committee Name** (small text, e.g., "Executive Committee")
5. **Gender** (if available)

---

## Next Steps

1. ✅ Run `insert-committee-members.sql` in Supabase
2. 📸 Upload photos for each member (via admin panel or Supabase Storage)
3. 🌐 Visit `/members?category=committee` to see all committees
4. ✏️ Edit any member details via Admin → Manage Members

The website will automatically display all committee members organized by their committee!
