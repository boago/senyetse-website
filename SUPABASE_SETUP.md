# Supabase Setup Guide for Senyetse Website

You've created a Supabase project. Here's exactly what you need to do to connect it to the website.

---

## 1. Get your Project URL and Anon Key

1. Go to [supabase.com](https://supabase.com) and open your project.
2. Click **Project Settings** (gear icon in the left sidebar).
3. Click **API** in the left menu.
4. Copy these two values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (long string under "Project API keys")

---

## 2. Add them to your website

1. In the `senyetse-website` folder, create a file named `.env.local`.
2. Add these lines (replace with your actual values):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. **Restart your dev server** (stop with Ctrl+C, then run `npm run dev` again). The app must restart to load the new env variables.

---

## 3. Run the database schema

1. In Supabase, go to **SQL Editor** (in the left sidebar).
2. Click **New query**.
3. Open the file `supabase-schema.sql` from this project.
4. Copy **all** its contents and paste into the SQL Editor.
5. Click **Run** (or press Cmd/Ctrl + Enter).

This creates the tables: `site_content`, `gallery`, `news`, `events`, `choir_members`.

---

## 4. Create the storage bucket (for images)

1. In Supabase, go to **Storage** (left sidebar).
2. Click **New bucket**.
3. Name: `gallery`
4. Check **Public bucket** (so images can be displayed on the site).
5. Click **Create bucket**.

### Add storage policies
1. Click on the `gallery` bucket.
2. Go to **Policies**.
3. Click **New policy** and add:
   - **Policy name:** Allow public read
   - **Allowed operation:** SELECT (read)
   - **Target roles:** Use "For full customization" and set: `true` for the expression
   - Or use the template: "Allow public read access"
4. Add another policy:
   - **Policy name:** Allow authenticated upload
   - **Allowed operation:** INSERT
   - **Target roles:** authenticated

---

## 5. Create an admin account

1. In Supabase, go to **Authentication** > **Users** (left sidebar).
2. Click **Add user** > **Create new user**.
3. Enter an email and password (remember these for admin login).
4. Click **Create user**.

You can now go to `/admin` on your website and sign in with that email and password.

---

## 6. Verify it works

After setup:
- Go to `http://localhost:3000/admin` and sign in.
- Go to **Manage Members** and add a test member (pick Committee, Artists, or Supporting Staff).
- Go to `http://localhost:3000/members` – you should see your member.
- Click **Members** in the nav, then **Committee** (or **Artists** or **Supporting Staff**) – the page should show "Viewing: Committee" and only committee members (if you added one in that category).

---

## Summary: What Supabase needs from you

| Step | What you do |
|------|-------------|
| 1 | Copy Project URL and anon key from Project Settings > API |
| 2 | Put them in `.env.local` and restart `npm run dev` |
| 3 | Run `supabase-schema.sql` in SQL Editor |
| 4 | Create `gallery` storage bucket (public) with read + upload policies |
| 5 | Create a user in Authentication > Users for admin login |

---

## If you get errors

- **"Failed to fetch" or "Invalid API key"** – Check that `.env.local` has the correct URL and key, and that you restarted the dev server.
- **"relation does not exist"** – The schema wasn’t run. Run `supabase-schema.sql` in the SQL Editor.
- **Upload fails in admin** – The `gallery` bucket may be missing or its policies may be wrong. Make sure it’s public and authenticated users can INSERT.
