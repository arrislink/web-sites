import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

interface ClientMetadata {
    userAgent?: string;
    language?: string;
    languages?: string;
    timezone?: string;
    timezoneOffset?: number;
    screenWidth?: number;
    screenHeight?: number;
    viewportWidth?: number;
    viewportHeight?: number;
    colorDepth?: number;
    devicePixelRatio?: number;
    referrer?: string | null;
    currentUrl?: string;
    platform?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    geoAccuracy?: number | null;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, message, interest, subject, metadata } = body as {
            name: string;
            email: string;
            message: string;
            interest?: string;
            subject?: string;
            metadata?: ClientMetadata;
        };

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Enhanced region detection - check multiple possible geo headers
        // Priority: Cloudflare > Vercel > CloudFront > Nginx GeoIP > Custom
        const geoHeaders = [
            'CF-IPCountry',           // Cloudflare
            'X-Vercel-IP-Country',    // Vercel
            'CloudFront-Viewer-Country', // AWS CloudFront
            'X-Country-Code',         // Common proxy header
            process.env.GEO_HEADER_NAME || 'X-IP-Country', // Custom/Nginx GeoIP
        ];

        let headerRegion = '';
        for (const header of geoHeaders) {
            const value = request.headers.get(header);
            if (value && value !== 'XX' && value !== 'Unknown') {
                headerRegion = value.toUpperCase();
                break;
            }
        }

        // Timezone-to-region mapping for fallback detection
        const timezoneToRegion: Record<string, string> = {
            // China
            'Asia/Shanghai': 'CN', 'Asia/Chongqing': 'CN', 'Asia/Harbin': 'CN', 'Asia/Urumqi': 'CN',
            // USA
            'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US',
            'America/Los_Angeles': 'US', 'America/Phoenix': 'US', 'America/Anchorage': 'US',
            // Japan
            'Asia/Tokyo': 'JP',
            // Korea
            'Asia/Seoul': 'KR',
            // Singapore
            'Asia/Singapore': 'SG',
            // Hong Kong
            'Asia/Hong_Kong': 'HK',
            // Taiwan
            'Asia/Taipei': 'TW',
            // UK
            'Europe/London': 'GB',
            // Germany
            'Europe/Berlin': 'DE',
            // France
            'Europe/Paris': 'FR',
            // Australia
            'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU', 'Australia/Brisbane': 'AU',
            // Canada
            'America/Toronto': 'CA', 'America/Vancouver': 'CA',
            // India
            'Asia/Kolkata': 'IN',
        };

        // Language-to-region mapping for additional inference
        const languageToRegion: Record<string, string> = {
            'zh-CN': 'CN', 'zh-TW': 'TW', 'zh-HK': 'HK', 'zh': 'CN',
            'ja': 'JP', 'ja-JP': 'JP',
            'ko': 'KR', 'ko-KR': 'KR',
            'en-US': 'US', 'en-GB': 'GB', 'en-AU': 'AU', 'en-CA': 'CA',
            'de': 'DE', 'de-DE': 'DE',
            'fr': 'FR', 'fr-FR': 'FR',
        };

        // Infer region from client metadata if header detection failed
        let inferredRegion = '';
        if (metadata?.timezone && timezoneToRegion[metadata.timezone]) {
            inferredRegion = timezoneToRegion[metadata.timezone];
        } else if (metadata?.language && languageToRegion[metadata.language]) {
            inferredRegion = languageToRegion[metadata.language];
        }

        // Final region: prefer header-based, fallback to inferred
        const region = headerRegion || inferredRegion || 'Unknown';
        const regionSource = headerRegion ? 'ip' : (inferredRegion ? 'inferred' : 'unknown');

        // Also capture city if available (for more precise analytics)
        const city = request.headers.get('CF-IPCity') ||
            request.headers.get('X-Vercel-IP-City') ||
            request.headers.get('X-IP-City') ||
            null;

        // Get IP address from various headers
        const ipAddress = request.headers.get('CF-Connecting-IP') ||
            request.headers.get('X-Real-IP') ||
            request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
            null;

        // Normalize interest value (default to 'general' if not provided)
        const interestValue = interest || 'general';
        const subjectValue = subject || null;

        // Extract metadata fields
        const userAgent = metadata?.userAgent || request.headers.get('User-Agent') || null;
        const browserLang = metadata?.language || request.headers.get('Accept-Language')?.split(',')[0] || null;
        const timezone = metadata?.timezone || null;
        const screenRes = metadata?.screenWidth && metadata?.screenHeight
            ? `${metadata.screenWidth}x${metadata.screenHeight}`
            : null;
        const referrer = metadata?.referrer || request.headers.get('Referer') || null;
        const latitude = metadata?.latitude || null;
        const longitude = metadata?.longitude || null;

        // Serialize full metadata as JSON for storage
        const metadataJson = metadata ? JSON.stringify(metadata) : null;

        // Insert into database
        try {
            await pool.execute(
                `INSERT INTO contact_submissions 
                (name, email, message, interest, subject, region, city, ip_address, user_agent, browser_lang, timezone, screen_res, referrer, latitude, longitude, metadata) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [name, email, message, interestValue, subjectValue, region, city, ipAddress, userAgent, browserLang, timezone, screenRes, referrer, latitude, longitude, metadataJson]
            );

            return NextResponse.json({
                success: true,
                message: 'Thank you for your message! We will get back to you soon.'
            });

        } catch (dbError) {
            console.error('Database connection or query error:', dbError);
            return NextResponse.json(
                { success: false, error: 'Failed to save message' },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
