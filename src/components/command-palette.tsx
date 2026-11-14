import { useEffect } from 'react'
import { Award, Copy, Download, FolderGit2, Home, Languages, Mail, Monitor, Moon, Route, Sparkles, Sun, Terminal as TerminalIcon } from 'lucide-react'
import { GitHubIcon } from '@/components/icons'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from '@/components/ui/command'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { profile, projects } from '@/data/profile'
import { useCvDownload } from '@/hooks/use-cv-download'
import type { Theme } from '@/hooks/use-theme'
import { LANGS, useI18n } from '@/i18n'

export function CommandPalette({
  open,
  onOpenChange,
  onNavigate,
  onTheme,
  onCopyEmail,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  onNavigate: (id: string) => void
  onTheme: (t: Theme) => void
  onCopyEmail: () => void
}) {
  const { t, tx, lang, setLang } = useI18n()
  const { download } = useCvDownload()

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener('keydown', on)
    return () => document.removeEventListener('keydown', on)
  }, [open, onOpenChange])

  const act = (fn: () => void) => () => {
    onOpenChange(false)
    setTimeout(fn, 60)
  }
  const openUrl = (url: string) => () => {
    onOpenChange(false)
    const a = Object.assign(document.createElement('a'), { href: url, target: '_blank', rel: 'noreferrer' })
    a.click()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="sr-only">{t('palette.title')}</DialogTitle>
        <DialogDescription className="sr-only">{t('palette.desc')}</DialogDescription>
        <Command loop>
          <CommandInput placeholder={t('palette.ph')} />
          <CommandList>
            <CommandEmpty>{t('palette.empty')}</CommandEmpty>
            <CommandGroup heading={t('palette.goto')}>
              <CommandItem onSelect={act(() => onNavigate('top'))}>
                <Home /> {t('palette.home')}
              </CommandItem>
              <CommandItem onSelect={act(() => onNavigate('projects'))}>
                <FolderGit2 /> {t('nav.projects')}
              </CommandItem>
              <CommandItem onSelect={act(() => onNavigate('skills'))}>
                <Sparkles /> {t('nav.skills')}
              </CommandItem>
              <CommandItem onSelect={act(() => onNavigate('journey'))}>
                <Route /> {t('journey.title')}
              </CommandItem>
              <CommandItem onSelect={act(() => onNavigate('certificates'))}>
                <Award /> {t('nav.certificates')}
              </CommandItem>
              <CommandItem onSelect={act(() => onNavigate('contact'))}>
                <Mail /> {t('nav.contact')}
              </CommandItem>
              <CommandItem onSelect={act(() => document.getElementById('term-input')?.focus())}>
                <TerminalIcon /> {t('palette.terminal')}
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading={t('palette.actions')}>
              {LANGS.map((l) => (
                <CommandItem key={`cv-${l.code}`} value={`cv resume lebenslauf ${l.name}`} onSelect={act(() => download(l.code))}>
                  <Download /> {t('cv.download')} ({l.name})
                </CommandItem>
              ))}
              <CommandItem onSelect={act(onCopyEmail)}>
                <Copy /> {t('palette.copyEmail')}
                <CommandShortcut>{profile.contact.email}</CommandShortcut>
              </CommandItem>
              <CommandItem value="theme day light jour tag" onSelect={act(() => onTheme('light'))}>
                <Sun /> {t('theme.day')}
              </CommandItem>
              <CommandItem value="theme night dark nuit nacht" onSelect={act(() => onTheme('dark'))}>
                <Moon /> {t('theme.night')}
              </CommandItem>
              <CommandItem value="theme system device appareil gerät" onSelect={act(() => onTheme('system'))}>
                <Monitor /> {t('palette.device')}
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading={t('palette.language')}>
              {LANGS.map((l) => (
                <CommandItem key={l.code} value={`language langue sprache ${l.name} ${l.short}`} onSelect={act(() => setLang(l.code))}>
                  <Languages /> {l.name}
                  {l.code === lang && <CommandShortcut>✓</CommandShortcut>}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading={t('palette.projects')}>
              {projects.map((p) => (
                <CommandItem key={p.id} value={`${p.name} ${p.stack.join(' ')} ${tx(p.tagline)}`} onSelect={openUrl(p.repo)}>
                  <GitHubIcon className="size-4 text-muted-foreground" /> {p.name}
                  <CommandShortcut>{p.language}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <div className="flex items-center justify-between gap-4 border-t px-4 py-2.5 text-xs text-muted-foreground">
            <span>{t('palette.hintMove')}</span>
            <span>{t('palette.hintClose')}</span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
