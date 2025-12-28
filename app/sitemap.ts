import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://asad.org.tr';

    // Static routes
    const staticRoutes = [
        '',
        '/hakkimizda/baskan',
        '/hakkimizda/yonetim-kurulu',
        '/hakkimizda/denetim-kurulu',
        '/hakkimizda/tuzuk',
        '/hakkimizda/gep-plani',
        '/hakkimizda/onemli-linkler',
        '/iletisim',
        '/haberler',
        '/makaleler',
        '/projeler',
        '/hizmetler',
        '/duyurular',
        '/galeri/foto',
        '/galeri/video',
    ];

    const routes = staticRoutes.flatMap((route) => [
        {
            url: `${baseUrl}/tr${route}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/en${route}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
    ]);

    // Dynamic routes
    const news = await prisma.news.findMany({ select: { slug: true, updatedAt: true } });
    const articles = await prisma.article.findMany({ select: { slug: true, updatedAt: true } });
    const projects = await prisma.project.findMany({ select: { slug: true, updatedAt: true } });
    const services = await prisma.service.findMany({ select: { slug: true, updatedAt: true } });
    const notices = await prisma.notice.findMany({ select: { slug: true, updatedAt: true } });

    const dynamicRoutes = [
        ...news.map((item) => ({ url: `/haberler/${item.slug}`, date: item.updatedAt })),
        ...articles.map((item) => ({ url: `/makaleler/${item.slug}`, date: item.updatedAt })),
        ...projects.map((item) => ({ url: `/projeler/${item.slug}`, date: item.updatedAt })),
        ...services.map((item) => ({ url: `/hizmetler/${item.slug}`, date: item.updatedAt })),
        ...notices.map((item) => ({ url: `/duyurular/${item.slug}`, date: item.updatedAt })),
    ].flatMap((item) => [
        {
            url: `${baseUrl}/tr${item.url}`,
            lastModified: item.date,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/en${item.url}`,
            lastModified: item.date,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
    ]);

    return [...routes, ...dynamicRoutes];
}
