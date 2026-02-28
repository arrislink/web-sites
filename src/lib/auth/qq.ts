/**
 * QQ OAuth Provider for NextAuth.js v5
 * 
 * Environment Variables Required:
 * - QQ_APP_ID: QQ Connect App ID
 * - QQ_APP_KEY: QQ Connect App Key
 * 
 * OAuth Flow:
 * 1. User clicks QQ login
 * 2. Redirects to https://graph.qq.com/oauth2.0/authorize
 * 3. User authorizes, redirects back with code
 * 4. Exchange code for access_token
 * 5. Get OpenID with access_token
 * 6. Get user info with access_token and OpenID
 */

import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

export interface QQProfile {
    ret: number;
    msg: string;
    nickname: string;
    figureurl: string;
    figureurl_1: string;
    figureurl_2: string;
    figureurl_qq_1: string;
    figureurl_qq_2: string;
    gender: string;
    openid?: string;
}

export default function QQ<P extends QQProfile>(
    options: OAuthUserConfig<P>
): OAuthConfig<P> {
    return {
        id: "qq",
        name: "QQ",
        type: "oauth",

        authorization: {
            url: "https://graph.qq.com/oauth2.0/authorize",
            params: {
                response_type: "code",
                scope: "get_user_info",
                state: crypto.randomUUID(),
            },
        },

        token: {
            url: "https://graph.qq.com/oauth2.0/token",
            async request({ params, provider }: { params: Record<string, unknown>; provider: { clientId?: string; clientSecret?: string } }) {
                const response = await fetch(
                    `https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=${provider.clientId}&client_secret=${provider.clientSecret}&code=${params.code}&redirect_uri=${encodeURIComponent(params.redirect_uri as string)}&fmt=json`
                );
                const tokens = await response.json();
                return { tokens };
            },
        },

        userinfo: {
            url: "https://graph.qq.com/user/get_user_info",
            async request({ tokens, provider }: { tokens: { access_token?: string }; provider: { clientId?: string } }) {
                // First get OpenID
                const meResponse = await fetch(
                    `https://graph.qq.com/oauth2.0/me?access_token=${tokens.access_token}&fmt=json`
                );
                const meData = await meResponse.json();
                const openid = meData.openid;

                // Then get user info
                const response = await fetch(
                    `https://graph.qq.com/user/get_user_info?access_token=${tokens.access_token}&oauth_consumer_key=${provider.clientId}&openid=${openid}`
                );
                const profile = await response.json();
                profile.openid = openid;
                return profile;
            },
        },

        profile(profile) {
            return {
                id: profile.openid!,
                name: profile.nickname,
                email: null, // QQ doesn't provide email by default
                image: profile.figureurl_qq_2 || profile.figureurl_2,
            };
        },

        style: {
            logo: "https://wiki.connect.qq.com/images/qq_logo.png",
            bg: "#12B7F5",
            text: "#fff",
        },

        options,
    };
}
