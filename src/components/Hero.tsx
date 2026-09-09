import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  const mapsUrl = "https://maps.app.goo.gl/GTNNgPRpdFnXWfBn6";

  return (
    <section className="relative min-h-screen flex items-end pb-16 sm:pb-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/gallery/parque-central-granada-07.jpg"
          alt={t('imgAlt')}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0" style={{ background: 'var(--hero-overlay)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 animate-fade-in-up">
            {t('title')}
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-8 animate-fade-in-up animation-delay-100 font-light">
            {t('subtitle')}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 mb-8 animate-fade-in-up animation-delay-200">
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#f0b429" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="text-white text-sm font-medium">{t('rating')}</span>
              <span className="text-white/60 text-xs">({t('reviewCount')})</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span className="text-white text-sm">{t('hours')}</span>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/25 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="text-white text-sm">{t('openMaps')}</span>
            </a>
            <a
              href="tel:+50585653285"
              className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/25 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span className="text-white text-sm">{t('call')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" opacity="0.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </section>
  );
}
