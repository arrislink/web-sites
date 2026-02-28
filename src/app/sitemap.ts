import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arrislink.com';
    const lastModified = new Date();

    const routes = [
        '',
        '/about',
        '/case-studies',
        '/contact',
        '/pricing',
        '/privacy',
        '/products',
        '/products/star-points',
        '/products/kid-story',
        '/products/bio-prism',
        '/products/smart-read',
        '/products/smart-resume',
        '/solutions',
        '/solutions/private-ai',
        '/solutions/devops',
        '/technology',
    ];

    const locales = ['en', 'zh'];
    const sitemap: MetadataRoute.Sitemap = [];

    routes.forEach((route) => {
        locales.forEach((locale) => {
            sitemap.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified,
                changeFrequency: 'weekly',
                priority: route === '' ? 1 : 0.8,
            });
        });
    });

    return sitemap;
}
