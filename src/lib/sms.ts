/**
 * Tencent Cloud SMS Service
 * 
 * Environment Variables Required:
 * - TENCENT_SMS_SECRET_ID: Tencent Cloud API SecretId
 * - TENCENT_SMS_SECRET_KEY: Tencent Cloud API SecretKey
 * - TENCENT_SMS_SDK_APP_ID: SMS SDK AppId
 * - TENCENT_SMS_SIGN_NAME: SMS signature name (e.g., "微棱科技")
 * - TENCENT_SMS_TEMPLATE_ID: Template ID for verification code
 */

import * as crypto from 'crypto';

interface SendSmsResult {
    success: boolean;
    error?: string;
    requestId?: string;
}

// In-memory storage for verification codes (use Redis in production)
const verificationCodes = new Map<string, { code: string; expires: number }>();

/**
 * Generate a 6-digit verification code
 */
export function generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Store verification code temporarily (5 minutes TTL)
 */
export function storeVerificationCode(phone: string, code: string): void {
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes
    verificationCodes.set(phone, { code, expires });
}

/**
 * Verify the code for a phone number
 */
export function verifyCode(phone: string, inputCode: string): boolean {
    const stored = verificationCodes.get(phone);
    if (!stored) return false;

    if (Date.now() > stored.expires) {
        verificationCodes.delete(phone);
        return false;
    }

    if (stored.code === inputCode) {
        verificationCodes.delete(phone); // One-time use
        return true;
    }

    return false;
}

/**
 * Generate Tencent Cloud API signature
 */
function generateSignature(
    secretId: string,
    secretKey: string,
    timestamp: number,
    service: string,
    payload: string
): { authorization: string; timestamp: number } {
    const date = new Date(timestamp * 1000).toISOString().slice(0, 10);
    const algorithm = 'TC3-HMAC-SHA256';

    // Step 1: Build canonical request
    const httpRequestMethod = 'POST';
    const canonicalUri = '/';
    const canonicalQueryString = '';
    const contentType = 'application/json; charset=utf-8';
    const canonicalHeaders = `content-type:${contentType}\nhost:sms.tencentcloudapi.com\n`;
    const signedHeaders = 'content-type;host';
    const hashedPayload = crypto.createHash('sha256').update(payload).digest('hex');
    const canonicalRequest = `${httpRequestMethod}\n${canonicalUri}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${hashedPayload}`;

    // Step 2: Build string to sign
    const credentialScope = `${date}/${service}/tc3_request`;
    const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest).digest('hex');
    const stringToSign = `${algorithm}\n${timestamp}\n${credentialScope}\n${hashedCanonicalRequest}`;

    // Step 3: Calculate signature
    const secretDate = crypto.createHmac('sha256', `TC3${secretKey}`).update(date).digest();
    const secretService = crypto.createHmac('sha256', secretDate).update(service).digest();
    const secretSigning = crypto.createHmac('sha256', secretService).update('tc3_request').digest();
    const signature = crypto.createHmac('sha256', secretSigning).update(stringToSign).digest('hex');

    // Step 4: Build authorization header
    const authorization = `${algorithm} Credential=${secretId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    return { authorization, timestamp };
}

/**
 * Send SMS verification code via Tencent Cloud
 */
export async function sendSmsCode(phone: string): Promise<SendSmsResult> {
    const secretId = process.env.TENCENT_SMS_SECRET_ID;
    const secretKey = process.env.TENCENT_SMS_SECRET_KEY;
    const sdkAppId = process.env.TENCENT_SMS_SDK_APP_ID;
    const signName = process.env.TENCENT_SMS_SIGN_NAME;
    const templateId = process.env.TENCENT_SMS_TEMPLATE_ID;

    if (!secretId || !secretKey || !sdkAppId || !signName || !templateId) {
        console.error('Missing Tencent SMS configuration');
        return { success: false, error: 'SMS service not configured' };
    }

    // Generate and store code
    const code = generateVerificationCode();
    storeVerificationCode(phone, code);

    // Prepare request payload
    const payload = JSON.stringify({
        PhoneNumberSet: [`+86${phone}`],
        SmsSdkAppId: sdkAppId,
        SignName: signName,
        TemplateId: templateId,
        TemplateParamSet: [code, '5'] // code, minutes
    });

    const timestamp = Math.floor(Date.now() / 1000);
    const { authorization } = generateSignature(secretId, secretKey, timestamp, 'sms', payload);

    try {
        const response = await fetch('https://sms.tencentcloudapi.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Host': 'sms.tencentcloudapi.com',
                'X-TC-Action': 'SendSms',
                'X-TC-Version': '2021-01-11',
                'X-TC-Timestamp': timestamp.toString(),
                'X-TC-Region': 'ap-guangzhou',
                'Authorization': authorization,
            },
            body: payload,
        });

        const result = await response.json();

        if (result.Response?.SendStatusSet?.[0]?.Code === 'Ok') {
            return { success: true, requestId: result.Response.RequestId };
        } else {
            console.error('SMS send failed:', result);
            return {
                success: false,
                error: result.Response?.SendStatusSet?.[0]?.Message || 'Unknown error'
            };
        }
    } catch (error) {
        console.error('SMS API error:', error);
        return { success: false, error: 'Failed to send SMS' };
    }
}
