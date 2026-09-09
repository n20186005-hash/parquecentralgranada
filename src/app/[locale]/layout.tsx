import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

const baseUrl = 'https://parquecentralgranada.com';

const localeTags: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en',
  es: 'es',
};

const ogLocales: Record<string, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  es: 'es_NI',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const selfUrl = `${baseUrl}/${locale}`;
  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const esUrl = `${baseUrl}/es`;
  const heroImage = '/gallery/parque-central-granada-07.jpg';

  const description = messages.meta.description;
  const title = messages.meta.title;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'es': esUrl,
        'x-default': zhUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: selfUrl,
      siteName: 'Parque Central de Granada',
      locale: ogLocales[locale] || 'zh_CN',
      type: 'website',
      images: [
        {
          url: heroImage,
          alt: messages.hero.imgAlt || 'Parque Central de Granada',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [heroImage],
    },
    icons: {
      icon: '/icons/icon.svg',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={localeTags[locale] || 'zh-CN'} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#3a7a8d" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* GA4 (G-HXM22WWPKP) — consent-gated */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                window.dataLayer = window.dataLayer || [];
                window.gtag = function() { window.dataLayer.push(arguments); };
                var loaded = false;
                function loadGtag() {
                  if (loaded) return;
                  loaded = true;
                  var s = document.createElement('script');
                  s.async = true;
                  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-HXM22WWPKP';
                  document.head.appendChild(s);
                  window.gtag('js', new Date());
                  window.gtag('config', 'G-HXM22WWPKP', { anonymize_ip: true });
                }
                function checkConsent() {
                  try {
                    var prefs = JSON.parse(localStorage.getItem('cookiePrefs') || '{}');
                    if (prefs.analytics) loadGtag();
                  } catch(e) {}
                }
                checkConsent();
                window.addEventListener('consent-updated', checkConsent);
              })();
            `,
          }}
        />
        {/* Service worker registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && location.protocol === 'https:' && !location.hostname.startsWith('localhost')) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
