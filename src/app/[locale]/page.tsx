import { setRequestLocale, getMessages } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HistoryTimeline from '@/components/HistoryTimeline';
import RouteSection from '@/components/RouteSection';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FAQSection from '@/components/FAQSection';
import SourcesSection from '@/components/SourcesSection';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';

const baseUrl = 'https://parquecentralgranada.com';
const mapsUrl = 'https://maps.app.goo.gl/GTNNgPRpdFnXWfBn6';
const inturUrl = 'https://www.intur.gob.ni/';
const heroImage = '/gallery/parque-central-granada-07.jpg';

const schemaLangs: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en',
  es: 'es',
};

const alternateNames: Record<string, string[]> = {
  zh: ['Plaza Mayor de Granada', '格拉纳达中央公园'],
  en: ['Plaza Mayor de Granada', 'Granada Central Park'],
  es: ['Plaza Mayor de Granada'],
};

function buildJsonLd(locale: string, messages: any) {
  const selfUrl = `${baseUrl}/${locale}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'Parque Central de Granada',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/icons/icon.svg`,
        },
        sameAs: [mapsUrl, inturUrl],
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'Parque Central de Granada',
        description: messages.meta.description,
        publisher: { '@id': `${baseUrl}/#organization` },
        inLanguage: schemaLangs[locale] || 'zh-CN',
      },
      {
        '@type': 'WebPage',
        '@id': `${selfUrl}#webpage`,
        url: selfUrl,
        name: messages.meta.title,
        description: messages.meta.description,
        isPartOf: { '@id': `${baseUrl}/#website` },
        about: { '@id': `${baseUrl}/#attraction` },
        inLanguage: schemaLangs[locale] || 'zh-CN',
        dateModified: '2026-09-09',
      },
      {
        '@type': ['TouristAttraction', 'Park'],
        '@id': `${baseUrl}/#attraction`,
        name: 'Parque Central de Granada',
        alternateName: alternateNames[locale] || ['Plaza Mayor de Granada'],
        description: messages.meta.description,
        url: selfUrl,
        image: [`${baseUrl}${heroImage}`],
        isAccessibleForFree: true,
        address: {
          '@type': 'PostalAddress',
          name: 'Parque Central de Granada',
          streetAddress: 'Ave Vega',
          addressLocality: 'Granada',
          addressRegion: 'Granada',
          addressCountry: 'NI',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 11.9299331,
          longitude: -85.9539309,
        },
        hasMap: mapsUrl,
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.5',
          reviewCount: 8493,
          bestRating: 5,
        },
        touristType: ['City Park', 'Public Square'],
        sameAs: [mapsUrl, inturUrl],
      },
    ],
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const jsonLd = buildJsonLd(locale, messages);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Intro />
        <BasicInfo />
        <HistoryTimeline />
        <RouteSection />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <Gallery />
        <Reviews />
        <FAQSection />
        <SourcesSection />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
