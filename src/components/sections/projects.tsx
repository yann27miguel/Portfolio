import { useId, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Copy, Search } from 'lucide-react'
import { GitHubIcon } from '@/components/icons'
import { MagicCard } from '@/components/magicui/magic-card'
import { NumberTicker } from '@/components/magicui/number-ticker'
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTrigger,
} from '@/components/motion-primitives/morphing-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { profile, projects, type Project } from '@/data/profile'
import { useCopy } from '@/hooks/use-copy'
import { LOCALE, useI18n, type Lang } from '@/i18n'
import { cn } from '@/lib/utils'

const LANG_COLOR: Record<Project['language'], string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
}
const LANGS = ['All', 'JavaScript', 'TypeScript', 'HTML'] as const
const fmtDate = (iso: string, lang: Lang) => new Intl.DateTimeFormat(LOCALE[lang], { month: 'short', year: 'numeric' }).format(new Date(iso))

export function Projects() {
  const { t, tx } = useI18n()
  const [lang, setLang] = useState<(typeof LANGS)[number]>('All')
  const [sort, setSort] = useState<'recent' | 'name'>('recent')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return projects
      .filter((p) => lang === 'All' || p.language === lang)
      .filter((p) => !needle || [p.name, tx(p.tagline), ...p.stack, ...p.features.map(tx)].join(' ').toLowerCase().includes(needle))
      .sort((a, b) => (sort === 'name' ? a.name.localeCompare(b.name) : b.updated.localeCompare(a.updated)))
  }, [lang, sort, q, tx])

  const totalStack = new Set(projects.flatMap((p) => p.stack)).size

  return (
    <section id="projects" className="scroll-mt-20 border-t py-20 md:py-28">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h2 className="text-4xl font-bold tracking-[-0.04em] md:text-6xl">{t('projects.title')}</h2>
          <p className="mt-4 max-w-[38rem] text-lg text-muted-foreground">
            {t('projects.intro1')}{' '}
            <a href={profile.contact.github} target="_blank" rel="noreferrer" className="font-semibold text-foreground underline underline-offset-4 hover:text-primary">
              github.com/{profile.contact.githubHandle}
            </a>
            . {t('projects.intro2')}
          </p>
        </div>
        <dl className="flex gap-8">
          {[
            { n: projects.length, l: t('stats.projects') },
            { n: totalStack, l: t('stats.tools') },
            { n: 42, l: t('stats.tests') },
          ].map((s) => (
            <div key={s.l}>
              <dd className="text-3xl font-bold tracking-tight md:text-4xl">
                <NumberTicker value={s.n} />
              </dd>
              <dt className="text-sm text-muted-foreground">{s.l}</dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative md:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <label htmlFor="project-search" className="sr-only">
            {t('projects.search')}
          </label>
          <Input
            id="project-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('projects.searchPh')}
            className="rounded-full pl-10"
          />
        </div>
        <ToggleGroup type="single" value={lang} onValueChange={(v) => v && setLang(v as typeof lang)} aria-label={t('projects.filter')}>
          {LANGS.map((l) => (
            <ToggleGroupItem key={l} value={l}>
              {l !== 'All' && <span className="size-2 rounded-full" style={{ background: LANG_COLOR[l] }} />}
              {l === 'All' ? t('projects.all') : l}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <ToggleGroup type="single" value={sort} onValueChange={(v) => v && setSort(v as typeof sort)} aria-label={t('projects.sort')} className="md:ml-auto">
          <ToggleGroupItem value="recent">{t('projects.newest')}</ToggleGroupItem>
          <ToggleGroupItem value="name">{t('projects.az')}</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <motion.ul layout className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              className={cn(p.featured && list.length > 1 && 'md:col-span-2 lg:col-span-3')}
            >
              <ProjectCard project={p} wide={!!p.featured && list.length > 1} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {list.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed p-10 text-center">
          <p className="font-semibold">{t('projects.none', { q })}</p>
          <Button
            variant="link"
            className="mt-1"
            onClick={() => {
              setQ('')
              setLang('All')
            }}
          >
            {t('projects.clear')}
          </Button>
        </div>
      )}
    </section>
  )
}

function ProjectCard({ project: p, wide }: { project: Project; wide: boolean }) {
  const { t, tx, lang } = useI18n()
  const titleId = useId()
  const { copy, copied } = useCopy()

  return (
    <MorphingDialog>
      <MorphingDialogTrigger ariaLabel={t('projects.open', { name: p.name })} className="h-full rounded-2xl">
        <MagicCard className="h-full rounded-2xl">
          <div className={cn('flex h-full flex-col p-6 md:p-7', wide && 'md:grid md:grid-cols-[1.2fr_1fr] md:gap-10')}>
            <div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full" style={{ background: LANG_COLOR[p.language] }} />
                  {p.language}
                </span>
                <span>{t('projects.updated', { date: fmtDate(p.updated, lang) })}</span>
              </div>
              <h3 className={cn('mt-4 font-bold tracking-[-0.03em]', wide ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl')}>{p.name}</h3>
              <p className="mt-2 text-muted-foreground md:text-lg">{tx(p.tagline)}</p>
            </div>
            <div className={cn('mt-6 flex flex-col justify-between gap-5', wide && 'md:mt-0')}>
              {wide && (
                <ul className="hidden space-y-1.5 text-[15px] text-muted-foreground md:block">
                  {p.features.slice(0, 3).map((f) => (
                    <li key={tx(f)} className="flex gap-2.5">
                      <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
                      {tx(f)}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap items-center gap-1.5">
                {p.stack.slice(0, wide ? 6 : 4).map((s) => (
                  <Badge key={s} variant="secondary">
                    {s}
                  </Badge>
                ))}
                <span className="ml-auto text-sm font-semibold text-primary">{t('projects.details')}</span>
              </div>
            </div>
          </div>
        </MagicCard>
      </MorphingDialogTrigger>

      <MorphingDialogContainer>
        <MorphingDialogContent labelledBy={titleId} className="max-h-[88svh] w-full max-w-[660px] overflow-y-auto border bg-card text-card-foreground">
          <div className="p-7 md:p-10">
            <div className="flex flex-wrap items-center gap-3 pr-10 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-full" style={{ background: LANG_COLOR[p.language] }} />
                {p.language}
              </span>
              <span>{t('projects.updated', { date: fmtDate(p.updated, lang) })}</span>
              {p.highlight && <Badge variant="accent">{tx(p.highlight)}</Badge>}
            </div>
            <h3 id={titleId} className="mt-4 text-3xl font-bold tracking-[-0.035em] md:text-4xl">
              {p.name}
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.12 } }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
            >
              <p className="mt-3 text-lg text-muted-foreground">{tx(p.tagline)}</p>
              <h4 className="mt-8 font-bold">{t('projects.features')}</h4>
              <ul className="mt-3 space-y-2">
                {p.features.map((f) => (
                  <li key={tx(f)} className="flex gap-3 text-muted-foreground">
                    <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
                    {tx(f)}
                  </li>
                ))}
              </ul>
              <h4 className="mt-8 font-bold">{t('projects.builtWith')}</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <Badge key={s} variant="secondary">
                    {s}
                  </Badge>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild>
                  <a href={p.repo} target="_blank" rel="noreferrer">
                    <GitHubIcon /> {t('projects.openGithub')}
                  </a>
                </Button>
                <Button variant="outline" onClick={() => copy(p.repo)}>
                  {copied ? <Check /> : <Copy />} {copied ? t('projects.linkCopied') : t('projects.copyLink')}
                </Button>
              </div>
            </motion.div>
          </div>
          <MorphingDialogClose label={t('dialog.close')} />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}
