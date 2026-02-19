# Senyetse Choir Website

A website for Senyetse Choir with admin login to manage content and gallery. Built with Next.js, Tailwind CSS, and Supabase. **100% free hosting** on Vercel + Supabase.

## Features

- **Public pages**: Home, About, Gallery, Contact
- **Admin login**: Sign up/sign in to manage content
- **Content management**: Edit Home, About, and Contact page text
- **Gallery**: Upload, add titles/descriptions, remove images
- **Free hosting**: Deploy to Vercel (free) + Supabase (free tier)

---

## Quick Start (Local)

### 1. Install dependencies

```bash
cd senyetse-website
npm install
```

### 2. Set up Supabase (free)

1. Go to [supabase.com](https://supabase.com) and create a free account.
2. Create a new project (e.g. "senyetse-website").
3. In **Project Settings > API**, copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. In **SQL Editor**, run the contents of `supabase-schema.sql` in your project.
5. In **Storage**, create a new bucket:
   - Name: `gallery`
   - Public: **Yes**
   - Add policy: allow `authenticated` users to upload (or make it public for uploads during setup).

### 3. Environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and paste your Supabase URL and anon key.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Go to **Admin** to sign up and sign in.

---

## Free Hosting (Vercel)

### Deploy steps

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New Project** and import your `senyetse-website` repo.
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
5. Click **Deploy**.

Your site will be live at `https://your-project.vercel.app`. You can add a custom domain in Vercel (free).

---

## Free Hosting (Supabase)

Supabase free tier includes:

- 500 MB database
- 1 GB file storage
- 50,000 monthly active users (auth)
- 2 GB bandwidth

No credit card required for the free tier.

---

## Folder structure

```
senyetse-website/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home
│   │   ├── about/            # About page
│   │   ├── gallery/          # Gallery page
│   │   ├── contact/          # Contact page
│   │   └── admin/            # Admin login + dashboard
│   └── lib/
│       └── supabase.ts       # Supabase client
├── supabase-schema.sql       # Run in Supabase SQL Editor
└── README.md
```

---

## Admin usage

1. Visit `/admin`
2. Sign up with your email (you’ll receive a confirmation link).
3. After confirming, sign in.
4. Use **Edit Content** to update Home, About, Contact.
5. Use **Manage Gallery** to add images (title, description, file) and remove old ones.
