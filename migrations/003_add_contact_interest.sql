-- Migration: Add enhanced tracking fields to contact_submissions
-- Created: 2025-12-14
-- Purpose: Store browser info, geo data, and full client metadata

-- Add interest field (maps to product/service interest dropdown)
ALTER TABLE contact_submissions 
ADD COLUMN interest VARCHAR(50) DEFAULT 'general' AFTER message;

-- Add subject field (custom subject line)
ALTER TABLE contact_submissions 
ADD COLUMN subject VARCHAR(255) DEFAULT NULL AFTER interest;

-- Add city for more precise geo tracking
ALTER TABLE contact_submissions 
ADD COLUMN city VARCHAR(100) DEFAULT NULL AFTER region;

-- Add IP address
ALTER TABLE contact_submissions 
ADD COLUMN ip_address VARCHAR(45) DEFAULT NULL AFTER city;

-- Add user agent string
ALTER TABLE contact_submissions 
ADD COLUMN user_agent TEXT DEFAULT NULL AFTER ip_address;

-- Add browser language
ALTER TABLE contact_submissions 
ADD COLUMN browser_lang VARCHAR(20) DEFAULT NULL AFTER user_agent;

-- Add timezone
ALTER TABLE contact_submissions 
ADD COLUMN timezone VARCHAR(50) DEFAULT NULL AFTER browser_lang;

-- Add screen resolution
ALTER TABLE contact_submissions 
ADD COLUMN screen_res VARCHAR(20) DEFAULT NULL AFTER timezone;

-- Add referrer URL
ALTER TABLE contact_submissions 
ADD COLUMN referrer VARCHAR(500) DEFAULT NULL AFTER screen_res;

-- Add latitude (from browser geolocation if permitted)
ALTER TABLE contact_submissions 
ADD COLUMN latitude DECIMAL(10, 8) DEFAULT NULL AFTER referrer;

-- Add longitude (from browser geolocation if permitted)
ALTER TABLE contact_submissions 
ADD COLUMN longitude DECIMAL(11, 8) DEFAULT NULL AFTER latitude;

-- Add full metadata JSON for future extensibility
ALTER TABLE contact_submissions 
ADD COLUMN metadata JSON DEFAULT NULL AFTER longitude;

-- Add indexes for analytics queries
CREATE INDEX idx_interest ON contact_submissions(interest);
CREATE INDEX idx_created_at ON contact_submissions(created_at);
CREATE INDEX idx_region ON contact_submissions(region);
CREATE INDEX idx_timezone ON contact_submissions(timezone);
