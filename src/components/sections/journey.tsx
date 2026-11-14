import { ArrowUpRight } from 'lucide-react'
import { Timeline } from '@/components/aceternity/timeline'
import { journey } from '@/data/profile'
import { useI18n } from '@/i18n'

export function Journey() {
  const { t, tx } = useI18n()
  return (
    <section id="journey" className="scroll-mt-20 border-t py-20 md:py-28">
      <h2 className="text-4xl font-bold tracking-[-0.04em] md:text-6xl">{t('journey.title')}</h2>
      <p className="mt-4 max-w-[38rem] text-lg text-muted-foreground">
        {t('journey.intro')}
      </p>
      <div className="mt-14">
        <Timeline
          data={journey.map((j) => ({
            title: tx(j.when),
            content: (
              <div>
                <h3 className="text-xl font-bold tracking-tight md:text-3xl">{tx(j.title)}</h3>
                <p className="mt-2 max-w-[40rem] text-muted-foreground md:text-lg">{tx(j.body)}</p>
                {j.items && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {j.items.map((it) => (
                      <li key={tx(it.label)}>
                        {it.href ? (
                          <a
                            href={it.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-full border bg-card px-3 py-1.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                          >
                            {tx(it.label)}
                            <ArrowUpRight className="size-3.5" aria-hidden />
                            <span className="sr-only">{t('journey.opensGithub')}</span>
                          </a>
                        ) : (
                          <span className="inline-flex rounded-full bg-secondary px-3 py-1.5 text-sm font-medium">{tx(it.label)}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ),
          }))}
        />
      </div>
    </section>
  )
}
