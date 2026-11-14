import { Button } from '@/components/ui/button'
import { certificates, profile } from '@/data/profile'
import { useI18n } from '@/i18n'

export function Certificates() {
  const { t, tx } = useI18n()
  return (
    <section id="certificates" className="scroll-mt-20 border-t py-20 md:py-28">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
        <div>
          <h2 className="text-4xl font-bold tracking-[-0.04em] md:text-6xl">{t('certs.title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('certs.intro')}</p>
          <Button variant="outline" className="mt-7" asChild>
            <a href={profile.contact.credly} target="_blank" rel="noreferrer">
              {t('certs.verify')}
            </a>
          </Button>

        </div>

        <ul className="divide-y self-start border-y">
          {certificates.map((c) => (
            <li key={c.name} className="group grid gap-1 py-6 sm:grid-cols-[1fr_auto] sm:gap-8">
              <div>
                <p className="text-xl font-bold tracking-tight transition-colors group-hover:text-primary">{c.name}</p>
                <p className="mt-1 text-muted-foreground">{c.issuer}</p>
                {c.detail && <p className="mt-1 text-sm text-muted-foreground">{tx(c.detail)}</p>}
              </div>
              <p className="text-sm font-medium tabular-nums text-muted-foreground sm:pt-1.5">{tx(c.date)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
