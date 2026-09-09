import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://parquecentralgranada.com';
  const locales = ['zh', 'en', 'es'] as const;
  const routes = ['', '/privacy-policy', '/terms-of-service', '/cookie-settings'];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      const url = `${baseUrl}/${locale}${route}`;
      const languages: Record<string, string> = { 'x-default': `${baseUrl}/zh` };
      for (const other of locales) {
        languages[other] = `${baseUrl}/${other}${route}`;
      }

      sitemap.push({
        url,
        lastModified: new Date('2026-09-09'),
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
