import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

export default function proxy(request: NextRequest) {
    const handleI18nRouting = createMiddleware(routing);
    return handleI18nRouting(request);
}

export const config = {
    matcher: ['/', '/(zh|en)/:path*']
};
