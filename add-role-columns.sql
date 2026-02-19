-- Quick migration: Add role and committee_name columns to choir_members
-- Run this if you already ran the main schema and just need to add the new fields
-- Safe to run multiple times

ALTER TABLE choir_members ADD COLUMN IF NOT EXISTS role TEXT;
ALTER TABLE choir_members ADD COLUMN IF NOT EXISTS committee_name TEXT;

-- That's it! Now you can run insert-committee-members.sql
