import { useTranslations, useMessages } from 'next-intl';

export default function SourcesSection() {
  const t = useTranslations('sources');
  const messages = useMessages() as any;
  const items = (messages?.sources?.items || []) as Array<{
    name: string;
    type: string;
    url: string;
  }>;

  return (
    <section id="sources" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <li
              key={i}
              className="rounded-xl p-5 flex flex-col justify-between gap-3"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div>
                <p className="font-medium text-base" style={{ color: 'var(--text-primary)' }}>
                  {item.name}
                </p>
                <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>{item.type}</p>
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                {item.url.replace(/^https?:\/\//, '')}
              </a>
            </li>
          ))}
        </ul>

        <p
          className="mt-8 text-center text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('lastUpdated')}
        </p>
      </div>
    </section>
  );
}
