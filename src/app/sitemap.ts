import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.parquecentralgranada.com';
  const routes = ['', '/privacy-policy', '/terms-of-service', '/cookie-settings'];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of ['es', 'en', 'zh'] as const) {
    for (const route of routes) {
      const url = `${baseUrl}/${locale}${route}`;
      const languages: Record<string, string> = { 'x-default': `${baseUrl}/es` };
      languages['es-NI'] = `${baseUrl}/es${route}`;
      languages['en'] = `${baseUrl}/en${route}`;
      languages['zh'] = `${baseUrl}/zh${route}`;

      sitemap.push({
        url,
        lastModified: new Date('2026-10-09'),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.5,
        alternates: {
          languages,
        },
      });
    }
  }

  return sitemap;
}
