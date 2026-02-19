# Database Setup Instructions

## Quick Setup Steps

1. **Open Supabase Dashboard**
   - Go to https://supabase.com
   - Open your project: `vshmnncukcsrvzwsqvhe`

2. **Run the SQL Schema**
   - Click **SQL Editor** in the left sidebar
   - Click **New query**
   - Copy the entire contents of `supabase-schema.sql`
   - Paste into the SQL Editor
   - Click **Run** (or press Cmd/Ctrl + Enter)
   - You should see "Success. No rows returned"

3. **Create Storage Bucket**
   - Click **Storage** in the left sidebar
   - Click **New bucket**
   - Name: `gallery`
   - Check **Public bucket** ✅
   - Click **Create bucket**

4. **Set Storage Policies**
   - Click on the `gallery` bucket
   - Go to **Policies** tab
   - Click **New policy**
   - Choose **For full customization**
   - Policy name: `Allow public read`
   - Allowed operation: `SELECT`
   - Policy definition: `true` (or use template "Allow public read access")
   - Click **Save**
   
   - Create another policy:
   - Policy name: `Allow authenticated upload`
   - Allowed operation: `INSERT`
   - Target roles: `authenticated`
   - Policy definition: `true`
   - Click **Save**

5. **Create Admin User**
   - Click **Authentication** > **Users** in the left sidebar
   - Click **Add user** > **Create new user**
   - Enter email and password (remember these!)
   - Click **Create user**

## Verify Setup

After completing the above:
- Go to `http://localhost:3000/admin`
- Sign in with the email/password you created
- You should see the admin dashboard
- Try adding a member in **Manage Members**

## Troubleshooting

- **"relation does not exist"** → Run the SQL schema again
- **"bucket not found"** → Create the `gallery` bucket
- **Can't upload images** → Check storage policies are set correctly
- **Can't sign in** → Make sure you created a user in Authentication > Users
