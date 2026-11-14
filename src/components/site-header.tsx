import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { LanguageSwitcher } from '@/components/language-switcher'
import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler'
import { profile } from '@/data/profile'
import { useI18n, type UiKey } from '@/i18n'
import { cn } from '@/lib/utils'

export const NAV: { id: string; key: UiKey }[] = [
  { id: 'projects', key: 'nav.projects' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'journey', key: 'nav.journey' },
  { id: 'certificates', key: 'nav.certificates' },
  { id: 'contact', key: 'nav.contact' },
]

export function SiteHeader({
  active,
  isDark,
  onToggleTheme,
  onOpenPalette,
}: {
  active: string
  isDark: boolean
  onToggleTheme: () => void
  onOpenPalette: () => void
}) {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [mac, setMac] = useState(true)
  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent))
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-[background-color,border-color] duration-200',
        scrolled ? 'border-b bg-background/80 backdrop-blur-md' : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-2 px-4 sm:gap-3 md:px-8">
        <a href="#top" className="mr-auto text-lg font-bold tracking-tight">
          {profile.name}
        </a>
        <nav aria-label={t('nav.sections')} className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={cn(
                    'rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                    active === n.id && 'bg-secondary text-foreground',
                  )}
                >
                  {t(n.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          onClick={onOpenPalette}
          className="inline-flex h-10 items-center gap-2 rounded-full border bg-card px-3 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          aria-label={t('search.open')}
        >
          <Search className="size-4" />
          <kbd className="hidden rounded border bg-secondary px-1.5 font-sans text-[11px] font-semibold sm:inline">{mac ? '⌘K' : 'Ctrl K'}</kbd>
        </button>
        <LanguageSwitcher />
        <AnimatedThemeToggler
          isDark={isDark}
          onToggle={onToggleTheme}
          labels={{ day: t('theme.day'), night: t('theme.night'), toDay: t('theme.toDay'), toNight: t('theme.toNight') }}
        />
      </div>
    </header>
  )
}
