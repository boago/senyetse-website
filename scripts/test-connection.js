// Test Supabase connection
// Run with: node scripts/test-connection.js
// Note: Make sure .env.local exists with your Supabase credentials

const fs = require('fs');
const path = require('path');

// Read .env.local manually
let supabaseUrl, supabaseKey;
try {
  const envFile = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
  envFile.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key === 'NEXT_PUBLIC_SUPABASE_URL') {
      supabaseUrl = valueParts.join('=').trim();
    } else if (key === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') {
      supabaseKey = valueParts.join('=').trim();
    }
  });
} catch (err) {
  console.error('❌ Could not read .env.local file');
  console.log('Make sure .env.local exists in the project root');
  process.exit(1);
}

const { createClient } = require('@supabase/supabase-js');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables!');
  console.log('Make sure .env.local exists with:');
  console.log('  NEXT_PUBLIC_SUPABASE_URL=...');
  console.log('  NEXT_PUBLIC_SUPABASE_ANON_KEY=...');
  process.exit(1);
}

console.log('🔗 Testing Supabase connection...');
console.log('URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  try {
    // Test 1: Check if we can query site_content table
    const { data, error } = await supabase.from('site_content').select('*').limit(1);
    
    if (error) {
      if (error.message.includes('relation') || error.message.includes('does not exist')) {
        console.error('❌ Tables not created yet!');
        console.log('👉 Run the SQL schema in Supabase SQL Editor (see setup-database.md)');
      } else {
        console.error('❌ Connection error:', error.message);
      }
      process.exit(1);
    }
    
    console.log('✅ Connection successful!');
    console.log('✅ Tables exist');
    
    // Test 2: Check storage bucket
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    
    if (bucketError) {
      console.warn('⚠️  Could not check storage buckets:', bucketError.message);
    } else {
      const galleryBucket = buckets?.find(b => b.name === 'gallery');
      if (galleryBucket) {
        console.log('✅ Gallery bucket exists');
      } else {
        console.warn('⚠️  Gallery bucket not found');
        console.log('👉 Create it in Supabase Dashboard > Storage');
      }
    }
    
    console.log('\n🎉 Setup looks good! You can now use the admin panel.');
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

test();
