-- Migration: Add password_hash to users table
-- Date: 2024-12-13
-- Description: Add password_hash for email/password authentication
-- Note: phone, region, and auth fields already exist in 01_initial_schema.sql

-- Add password_hash for email/password authentication
ALTER TABLE users 
ADD COLUMN password_hash VARCHAR(255) NULL AFTER email;

-- (Optional) Ensure region defaults to 'Global' if not set (User schema uses 'Unknown', we can update it)
-- UPDATE users SET region = 'Global' WHERE region = 'Unknown';
