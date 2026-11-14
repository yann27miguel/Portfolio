import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { skills } from '@/data/profile'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'

const GROUPS = ['Build', 'Know', 'Tools'] as const

export function Skills() {
  const { t, tx } = useI18n()
  const [selected, setSelected] = useState(skills.findIndex((s) => s.name === 'React'))
  const skill = skills[selected]

  return (
    <section id="skills" className="scroll-mt-20 border-t py-20 md:py-28">
      <h2 className="text-4xl font-bold tracking-[-0.04em] md:text-6xl">{t('skills.title')}</h2>
      <p className="mt-4 max-w-[36rem] text-lg text-muted-foreground">{t('skills.intro')}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <div className="space-y-7">
          {GROUPS.map((g) => (
            <fieldset key={g}>
              <legend className="mb-3 text-sm font-semibold text-muted-foreground">{t(`skills.${g}`)}</legend>
              <div className="flex flex-wrap gap-2">
                {skills
                  .map((s, i) => ({ s, i }))
                  .filter(({ s }) => s.group === g)
                  .map(({ s, i }) => {
                    const on = i === selected
                    return (
                      <button
                        key={i}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setSelected(i)}
                        className={cn(
                          'relative rounded-full border px-4 py-2 text-[15px] font-semibold transition-colors',
                          on ? 'border-transparent text-primary-foreground' : 'bg-card hover:border-foreground/30',
                        )}
                      >
                        {on && (
                          <motion.span
                            layoutId="skill-pill"
                            className="absolute inset-0 rounded-full bg-primary"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                          />
                        )}
                        <span className="relative">{tx(s.name)}</span>
                      </button>
                    )
                  })}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="order-first lg:order-none lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border bg-card p-7 md:p-8" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <p className="text-sm text-muted-foreground">{t('skills.usedIn')}</p>
                <p className="mt-1 text-3xl font-bold tracking-tight">{tx(skill.name)}</p>
                <ul className="mt-6 space-y-3">
                  {skill.usedIn.map((u) => (
                    <li key={tx(u)} className="flex items-start gap-3 text-lg">
                      <span aria-hidden className="mt-[0.55em] size-2 shrink-0 rounded-full bg-accent" />
                      {tx(u)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
