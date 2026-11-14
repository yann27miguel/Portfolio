import { motion } from 'motion/react'
import { LANGS, useI18n } from '@/i18n'
import { cn } from '@/lib/utils'

/** EN / DE / FR segmented switch. The whole site, CV included, follows the choice. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n()
  return (
    <div role="radiogroup" aria-label={t('lang.label')} className={cn('inline-flex h-10 items-center rounded-full border bg-card p-1', className)}>
      {LANGS.map((l) => {
        const on = l.code === lang
        return (
          <button
            key={l.code}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={l.name}
            lang={l.code}
            onClick={() => setLang(l.code)}
            className={cn(
              'relative h-8 rounded-full px-2.5 text-xs font-bold transition-colors',
              on ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {on && (
              <motion.span layoutId="lang-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }} />
            )}
            <span className="relative">{l.short}</span>
          </button>
        )
      })}
    </div>
  )
}
