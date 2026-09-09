import { useTranslations, useMessages } from 'next-intl';

export default function Intro() {
  const t = useTranslations('intro');
  const tOff = useTranslations('officialManagement');
  const messages = useMessages() as any;
  const items: string[] = messages?.intro?.visitGuide?.items || [];
  const alsoKnownAsItems: string[] = messages?.intro?.alsoKnownAs?.items || [];
  const mustDoItems: string[] = messages?.intro?.mustDo?.items || [];
  const hierarchy: string[] = messages?.intro?.hierarchy || [];

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center text-sm"
        >
          {hierarchy.map((item, i) => (
            <span key={i} className="flex items-center">
              {i > 0 && <span className="mx-2 opacity-50">›</span>}
              <span
                style={{
                  color: i === 0 ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontWeight: i === 0 ? 600 : 400,
                }}
              >
                {item}
              </span>
            </span>
          ))}
        </nav>

        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p
          className="text-lg leading-relaxed mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('visitGuide.title')}
            </h3>
            <ul className="space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('alsoKnownAs.title')}
            </h3>
            <ul className="space-y-3">
              {alsoKnownAsItems.map((keyword, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{keyword}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {mustDoItems.length > 0 && (
          <div className="mt-12 rounded-xl p-6 sm:p-8 border border-[var(--accent)]" style={{ background: 'var(--bg-tertiary)' }}>
            <h3
              className="font-display text-xl font-semibold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('mustDo.title')}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              {mustDoItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg p-4" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                  <span
                    className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{ background: 'var(--accent)' }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 p-6 sm:p-8 rounded-xl border border-[var(--accent)]" style={{ background: 'var(--bg-tertiary)' }}>
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            {tOff('title')}
          </h2>
          <div className="text-base leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
            {tOff('text')}
          </div>
        </div>
      </div>
    </section>
  );
}
