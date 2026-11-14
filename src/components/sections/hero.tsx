import { motion } from 'motion/react'
import { Check, Copy, MapPin } from 'lucide-react'
import { CvButton } from '@/components/cv-button'
import { GitHubIcon } from '@/components/icons'
import { TextScramble } from '@/components/motion-primitives/text-scramble'
import { Portrait } from '@/components/portrait'
import { Terminal } from '@/components/terminal'
import { Button } from '@/components/ui/button'
import { profile } from '@/data/profile'
import { useCopy } from '@/hooks/use-copy'
import { useLocalTime } from '@/hooks/use-local-time'
import { useI18n, type UiKey } from '@/i18n'
import { cn } from '@/lib/utils'

export function Hero({ onTheme, onNavigate }: { onTheme: (t: 'light' | 'dark') => void; onNavigate: (id: string) => void }) {
  const { t, tx, lang, setLang } = useI18n()
  const { time, part } = useLocalTime(profile.timeZone)
  const { copy, copied, failed } = useCopy()

  return (
    <section id="top" className="grid items-center gap-12 pt-8 pb-20 md:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-28">
      <div>
        <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <MapPin className="size-4" />
          {t('hero.time', { time, greeting: t(`greet.${part}` as UiKey) })}
        </p>
        <h1 className="mt-5 flex items-end gap-[0.1em] text-[clamp(4.5rem,15vw,9.5rem)] leading-[0.85] font-bold tracking-[-0.055em]">
          <TextScramble>{profile.name}</TextScramble>
          <Portrait variant="capsule" className="mb-[0.02em]" />
        </h1>
        <p className="mt-7 max-w-[30ch] text-2xl leading-snug font-semibold tracking-tight md:text-3xl">{tx(profile.headline)}.</p>
        <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-muted-foreground">{tx(profile.intro)}</p>

        <div className="mt-8 flex flex-wrap items-start gap-3">
          <CvButton />
          <Button size="lg" variant="outline" onClick={() => copy(profile.contact.email)}>
            {copied ? <Check /> : <Copy />}
            {copied ? t('hero.copied') : t('hero.copyEmail')}
          </Button>
          <Button size="lg" variant="outline" className="w-12 px-0" asChild>
            <a href={profile.contact.github} target="_blank" rel="noreferrer" aria-label={t('hero.github')} title="GitHub">
              <GitHubIcon className="size-5" />
            </a>
          </Button>
        </div>
        {failed && <p className="mt-2 text-sm text-muted-foreground">{t('hero.copyBlocked', { email: profile.contact.email })}</p>}

        <div className="mt-9">
          <p className="mb-2.5 flex items-center gap-2.5 text-sm font-medium">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
            </span>
            {tx(profile.availability)}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm text-muted-foreground">{t('hero.speak')}</span>
            {profile.languages.map((l) => {
              const on = l.code === lang
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  aria-pressed={on}
                  className={cn(
                    'group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors',
                    on ? 'border-primary bg-primary/10' : 'bg-card hover:border-foreground/30',
                  )}
                >
                  <span className="font-semibold">{tx(l.name)}</span>
                  <span className="flex gap-0.5" aria-hidden>
                    {[1, 2, 3, 4, 5].map((d) => (
                      <span key={d} className={cn('size-1.5 rounded-full', d <= l.dots ? 'bg-primary' : 'bg-border')} />
                    ))}
                  </span>
                  <span className="text-muted-foreground">{tx(l.level)}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 1.5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <Terminal onTheme={onTheme} onNavigate={onNavigate} />
        <p className="mt-3 text-sm text-muted-foreground">
          {t('hero.terminalHint', { help: '\u0000' })
            .split('\u0000')
            .flatMap((part, i) => (i === 0 ? [part] : [<span key={i} className="font-semibold text-foreground">help</span>, part]))}
        </p>
      </motion.div>
    </section>
  )
}
