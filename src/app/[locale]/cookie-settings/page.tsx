import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const baseUrl = 'https://parquecentralgranada.com';
  const zhUrl = `${baseUrl}/zh/cookie-settings`;
  const enUrl = `${baseUrl}/en/cookie-settings`;
  const esUrl = `${baseUrl}/es/cookie-settings`;
  const selfUrl = locale === 'zh' ? zhUrl : locale === 'en' ? enUrl : esUrl;

  return {
    title: `${messages.cookieSettings.title} | Parque Central de Granada (Granada, Nicaragua)`,
    description:
      messages.cookieSettings.analytics?.description ??
      'Cookie settings of the Parque Central de Granada visitor guide.',
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'es': esUrl,
        'x-default': zhUrl,
      },
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
