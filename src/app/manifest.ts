import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Parque Central de Granada - Visitor Guide',
    short_name: 'Parque Central',
    description:
      'Visitor guide to Parque Central de Granada (Plaza Mayor de Granada) in Granada, Nicaragua.',
    start_url: '/zh',
    scope: '/',
    display: 'standalone',
    background_color: '#faf8f4',
    theme_color: '#3a7a8d',
    lang: 'zh-CN',
    icons: [
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
