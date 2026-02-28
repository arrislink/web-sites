/**
 * WeChat OAuth Provider for NextAuth.js v5
 * 
 * Environment Variables Required:
 * - WECHAT_APP_ID: WeChat Open Platform App ID
 * - WECHAT_APP_SECRET: WeChat Open Platform App Secret
 * 
 * OAuth Flow:
 * 1. User scans QR code or clicks WeChat login on mobile
 * 2. Redirects to https://open.weixin.qq.com/connect/qrconnect
 * 3. User authorizes, redirects back with code
 * 4. Exchange code for access_token and openid
 * 5. Get user info with access_token and openid
 */

import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

export interface WeChatProfile {
    openid: string;
    nickname: string;
    sex: number;
    province: string;
    city: string;
    country: string;
    headimgurl: string;
    privilege: string[];
    unionid?: string;
}

export default function WeChat<P extends WeChatProfile>(
    options: OAuthUserConfig<P>
): OAuthConfig<P> {
    return {
        id: "wechat",
        name: "WeChat",
        type: "oauth",

        authorization: {
            url: "https://open.weixin.qq.com/connect/qrconnect",
            params: {
                appid: options.clientId,
                response_type: "code",
                scope: "snsapi_login",
                state: crypto.randomUUID(),
            },
        },

        token: {
            url: "https://api.weixin.qq.com/sns/oauth2/access_token",
            async request({ params, provider }: { params: Record<string, unknown>; provider: { clientId?: string; clientSecret?: string } }) {
                const response = await fetch(
                    `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${provider.clientId}&secret=${provider.clientSecret}&code=${params.code}&grant_type=authorization_code`
                );
                const tokens = await response.json();
                return { tokens };
            },
        },

        userinfo: {
            url: "https://api.weixin.qq.com/sns/userinfo",
            async request({ tokens }: { tokens: { access_token?: string; openid?: string } }) {
                const response = await fetch(
                    `https://api.weixin.qq.com/sns/userinfo?access_token=${tokens.access_token}&openid=${tokens.openid}&lang=zh_CN`
                );
                return response.json();
            },
        },

        profile(profile) {
            return {
                id: profile.unionid || profile.openid,
                name: profile.nickname,
                email: null, // WeChat doesn't provide email
                image: profile.headimgurl,
            };
        },

        style: {
            logo: "https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico",
            bg: "#07C160",
            text: "#fff",
        },

        options,
    };
}
