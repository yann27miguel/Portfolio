import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { CommandPalette } from '@/components/command-palette'
import { Certificates } from '@/components/sections/certificates'
import { Contact } from '@/components/sections/contact'
import { Hero } from '@/components/sections/hero'
import { Journey } from '@/components/sections/journey'
import { Projects } from '@/components/sections/projects'
import { Skills } from '@/components/sections/skills'
import { SiteHeader } from '@/components/site-header'
import { profile } from '@/data/profile'
import { useTheme } from '@/hooks/use-theme'
import { I18nProvider, useI18n } from '@/i18n'

const SECTIONS = ['top', 'projects', 'skills', 'journey', 'certificates', 'contact']

function useActiveSection() {
  const [active, setActive] = useState('top')
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return active
}

export default function App() {
  return (
    <I18nProvider>
      <Site />
    </I18nProvider>
  )
}

function Site() {
  const { t, tx, lang } = useI18n()
  const { resolved, setTheme } = useTheme()
  const active = useActiveSection()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2400)
  }, [])

  const navigate = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.contact.email)
      showToast(t('toast.copied', { email: profile.contact.email }))
    } catch {
      showToast(t('toast.blocked', { email: profile.contact.email }))
    }
  }, [showToast, t])

  useEffect(() => {
    document.title = `${profile.name} | ${tx(profile.headline)}`
  }, [lang, tx])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-primary px-4 py-2 font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t('skip')}
      </a>
      <SiteHeader
        active={active}
        isDark={resolved === 'dark'}
        onToggleTheme={() => setTheme(resolved === 'dark' ? 'light' : 'dark')}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main id="main" className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Hero onTheme={setTheme} onNavigate={navigate} />
        <Projects />
        <Skills />
        <Journey />
        <Certificates />
        <Contact />
      </main>

      <footer className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 border-t px-5 py-10 text-sm text-muted-foreground md:px-8">
        <p>
          {profile.name}, {tx(profile.location)}
        </p>
        <p className="hidden md:block">{t('footer.shortcut', { key: 'Ctrl K' })}</p>
      </footer>

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onNavigate={navigate}
        onTheme={setTheme}
        onCopyEmail={copyEmail}
      />

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        <AnimatePresence>
          {toast && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background shadow-lg"
            >
              {toast}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}
