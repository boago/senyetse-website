# Deploying Senyetse Choir Website

This guide walks you through making the website live using **Vercel** (recommended for Next.js) and **Supabase**.

---

## Prerequisites

- A [Supabase](https://supabase.com) account (free tier is fine)
- A [Vercel](https://vercel.com) account (free tier is fine)
- A [GitHub](https://github.com) account (to host your code)

---

## Step 1: Set Up Supabase (if not done)

1. Go to [supabase.com](https://supabase.com) and create a project
2. In **Project Settings → API**, copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Run the SQL scripts in **SQL Editor** in this order:
   - `supabase-schema.sql`
   - `insert-contact-settings.sql`
   - `insert-events.sql`
   - `insert-event-media.sql`
   - `insert-news.sql`
   - `insert-committee-members.sql` (optional)
   - `insert-artists.sql` (optional)
4. Create a **Storage** bucket named `gallery` and make it **public**
5. Add at least one admin user: **Authentication → Users → Invite User** (use email sign-up or magic link)

---

## Step 2: Push Code to GitHub

```bash
cd "/Users/boago/Downloads/Unesco Senyetse/senyetse-website"

# Initialize git (if not already)
git init

# Create .gitignore if needed (ensure .env.local is ignored)
echo ".env.local
.next
node_modules" >> .gitignore

# Add, commit, push
git add .
git commit -m "Senyetse Choir website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/senyetse-website.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username. Create the repository on GitHub first if it doesn’t exist.

---

## Step 3: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (use GitHub)
2. Click **Add New… → Project**
3. Import your `senyetse-website` repository
4. In **Environment Variables**, add:

   | Name | Value |
   |-----|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

5. Click **Deploy**

After a few minutes you’ll get a URL like `https://senyetse-website-xxx.vercel.app`.

---

## Step 4: Allow Supabase Auth for Your Domain

1. In Supabase: **Authentication → URL Configuration**
2. Under **Redirect URLs**, add:
   - `https://your-domain.vercel.app/**`
   - `https://your-domain.vercel.app/admin/**`
3. Save

---

## Step 5: Images and Static Assets

- **Events/News images**: SQL scripts use paths like `/events/christmas-2024/...`. Put images in `public/events/` and `public/` as expected by those paths.
- **Gallery**: New uploads go to Supabase Storage (bucket `gallery`); the app serves them from there.
- **Members**: Photos are uploaded via admin and stored in Supabase Storage.

If you use local paths for events/news, the `public/` folder structure must match what the SQL expects.

---

## Custom Domain (Optional)

1. In Vercel: **Project → Settings → Domains**
2. Add your domain (e.g. `www.senyetsechoir.org`)
3. Follow the DNS instructions (CNAME or A record to Vercel)
4. In Supabase **URL Configuration**, add `https://www.senyetsechoir.org/**` to Redirect URLs

---

## Admin Login

1. Visit `https://your-site.vercel.app/admin`
2. Use the Supabase auth method you set up (email + password, magic link, etc.)
3. Manage content at `/admin/dashboard`

---

## Checklist Before Going Live

- [ ] Supabase project created and schema run
- [ ] Storage bucket `gallery` created and public
- [ ] Admin user created in Supabase
- [ ] Code pushed to GitHub
- [ ] Vercel project deployed with env vars
- [ ] Supabase redirect URLs include your Vercel domain
- [ ] Events/news images in `public/` match the paths in your SQL
