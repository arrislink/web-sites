-- Initial Schema for ArrisLink Website
-- Created: 2025-12-12
-- Updated: 2025-12-12 (Auth Fields)

-- 1. Contact Submissions Table (with region)
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    region VARCHAR(50) DEFAULT 'Unknown',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Users Table
-- Updated to match NextAuth usage in auth.ts
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) UNIQUE, -- Added for Phone Login (CN)
    region VARCHAR(50) DEFAULT 'Unknown',
    role VARCHAR(20) DEFAULT 'user',
    auth_provider VARCHAR(50) DEFAULT 'email', -- Supported: email, google, github, wechat, qq, phone
    auth_id VARCHAR(255), -- providerAccountId (openid for wechat/qq, sub for google/github)
    avatar_url VARCHAR(255),
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_auth (auth_provider, auth_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
