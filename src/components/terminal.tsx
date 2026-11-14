// Interactive terminal, styled after Magic UI's Terminal (https://magicui.design/docs/components/terminal)
// but you can type in it. Commands read from src/data/profile.ts.
import { useEffect, useRef, useState } from 'react'
import { certificates, journey, profile, projects, skills } from '@/data/profile'
import { useCvDownload } from '@/hooks/use-cv-download'
import { useI18n, type Lang } from '@/i18n'
import { cn } from '@/lib/utils'

type Line = { id: number; kind: 'in' | 'out'; node: React.ReactNode }

// Command names stay in English (like a real shell); descriptions and replies follow the site language.
type L3 = Record<Lang, string>
const COMMANDS: Record<string, L3> = {
  help: { en: 'list commands', de: 'Befehle anzeigen', fr: 'lister les commandes' },
  whoami: { en: 'who I am', de: 'wer ich bin', fr: 'qui je suis' },
  projects: { en: 'my GitHub projects', de: 'meine GitHub-Projekte', fr: 'mes projets GitHub' },
  skills: { en: 'what I work with', de: 'womit ich arbeite', fr: 'mes compétences' },
  certs: { en: 'courses and certificates', de: 'Kurse und Zertifikate', fr: 'formations et certificats' },
  history: { en: 'how I got here', de: 'mein Werdegang', fr: 'mon parcours' },
  contact: { en: 'how to reach me', de: 'so erreichen Sie mich', fr: 'me contacter' },
  cv: { en: 'download my CV', de: 'Lebenslauf herunterladen', fr: 'télécharger mon CV' },
  'copy email': { en: 'copy my email address', de: 'E-Mail-Adresse kopieren', fr: 'copier mon e-mail' },
  'lang de': { en: 'site in German (also: lang en, lang fr)', de: 'Seite auf Deutsch (auch: lang en, lang fr)', fr: 'site en allemand (aussi : lang en, lang fr)' },
  'ping heidelberg': { en: 'check the connection', de: 'Verbindung prüfen', fr: 'tester la connexion' },
  'theme night': { en: 'night mode (or: theme day)', de: 'Nachtmodus (oder: theme day)', fr: 'mode nuit (ou : theme day)' },
  clear: { en: 'clear the screen', de: 'Bildschirm leeren', fr: 'effacer l’écran' },
}
const MSG: Record<string, L3> = {
  notFound: { en: 'command not found: {cmd}. Try ', de: 'Befehl nicht gefunden: {cmd}. Versuchen Sie ', fr: 'commande introuvable : {cmd}. Essayez ' },
  copied: { en: 'Copied {email} to your clipboard.', de: '{email} in die Zwischenablage kopiert.', fr: '{email} copié dans le presse-papiers.' },
  copyBlocked: { en: 'Your browser blocked the clipboard. My email is {email}', de: 'Der Browser blockiert die Zwischenablage. Meine E-Mail: {email}', fr: 'Le navigateur bloque le presse-papiers. Mon e-mail : {email}' },
  orCopy: { en: 'or type “copy email”', de: 'oder „copy email“ eingeben', fr: 'ou tapez « copy email »' },
  pingOk: { en: '3 packets sent, 3 received. Yann is online and replies fast.', de: '3 Pakete gesendet, 3 empfangen. Yann ist online und antwortet schnell.', fr: '3 paquets envoyés, 3 reçus. Yann est en ligne et répond vite.' },
  day: { en: 'Good morning. Switched to day mode.', de: 'Guten Morgen. Tagmodus ist an.', fr: 'Bonjour. Mode jour activé.' },
  night: { en: 'Good evening. Switched to night mode.', de: 'Guten Abend. Nachtmodus ist an.', fr: 'Bonsoir. Mode nuit activé.' },
  hire: { en: 'Permission granted. Taking you to the contact form…', de: 'Zugriff gewährt. Weiter zum Kontaktformular…', fr: 'Autorisation accordée. Direction le formulaire de contact…' },
  cv: { en: 'Starting the download of my CV ({lang})…', de: 'Download meines Lebenslaufs ({lang}) startet…', fr: 'Téléchargement de mon CV ({lang})…' },
  langSet: { en: 'Language set to English.', de: 'Sprache auf Deutsch umgestellt.', fr: 'Langue réglée sur le français.' },
  langUsage: { en: 'usage: lang en | lang de | lang fr', de: 'Verwendung: lang en | lang de | lang fr', fr: 'usage : lang en | lang de | lang fr' },
  placeholder: { en: 'type help and press Enter', de: 'help eingeben und Enter drücken', fr: 'tapez help puis Entrée' },
  inputLabel: { en: 'Type a command, for example help', de: 'Befehl eingeben, zum Beispiel help', fr: 'Tapez une commande, par exemple help' },
  output: { en: 'Terminal output', de: 'Terminal-Ausgabe', fr: 'Sortie du terminal' },
}

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" className="text-term-hi underline underline-offset-2 hover:no-underline">
    {children}
  </a>
)

export function Terminal({
  onTheme,
  onNavigate,
  className,
}: {
  onTheme: (t: 'light' | 'dark') => void
  onNavigate: (id: string) => void
  className?: string
}) {
  const { lang, setLang, tx } = useI18n()
  const { download } = useCvDownload()
  const langRef = useRef(lang)
  langRef.current = lang
  const m = (k: keyof typeof MSG, vars: Record<string, string> = {}) =>
    MSG[k][langRef.current].replace(/\{(\w+)\}/g, (_, v) => vars[v] ?? '')
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [booted, setBooted] = useState(false)
  const history = useRef<string[]>([])
  const hIndex = useRef(-1)
  const idRef = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const push = (kind: Line['kind'], node: React.ReactNode) =>
    setLines((l) => [...l, { id: idRef.current++, kind, node }])

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase().replace(/\s+/g, ' ')
    push('in', raw)
    if (!cmd) return
    history.current = [raw, ...history.current].slice(0, 30)
    hIndex.current = -1

    switch (cmd) {
      case 'help':
      case '?':
        push(
          'out',
          <div className="grid grid-cols-[auto_1fr] gap-x-4">
            {Object.entries(COMMANDS).map(([c, d]) => (
              <div key={c} className="contents">
                <button type="button" onClick={() => run(c)} className="text-left text-term-hi hover:underline">
                  {c}
                </button>
                <span className="text-term-dim">{d[langRef.current]}</span>
              </div>
            ))}
          </div>,
        )
        break
      case 'whoami':
        push(
          'out',
          <div>
            <p>
              {profile.name}, {tx(profile.location)}
            </p>
            <p className="text-term-dim">{tx(profile.headline)}.</p>
            <p className="text-term-dim">{tx(profile.availability)}.</p>
          </div>,
        )
        break
      case 'projects':
      case 'ls':
      case 'ls projects':
        push(
          'out',
          <div className="space-y-1">
            {projects.map((p) => (
              <p key={p.id}>
                <A href={p.repo}>{p.repo.split('/').pop()}</A> <span className="text-term-dim">{p.language}. {tx(p.tagline)}</span>
              </p>
            ))}
          </div>,
        )
        break
      case 'skills':
        push(
          'out',
          <div>
            {(['Build', 'Know', 'Tools'] as const).map((g) => (
              <p key={g}>
                <span className="text-term-hi">{g.toLowerCase()}:</span>{' '}
                <span className="text-term-dim">{skills.filter((s) => s.group === g).map((s) => tx(s.name)).join(', ')}</span>
              </p>
            ))}
          </div>,
        )
        break
      case 'certs':
      case 'certificates':
        push(
          'out',
          <div>
            {certificates.map((c) => (
              <p key={c.name}>
                {c.name} <span className="text-term-dim">{c.issuer}, {tx(c.date)}</span>
              </p>
            ))}
          </div>,
        )
        break
      case 'history':
        push(
          'out',
          <div>
            {journey.map((j) => (
              <p key={tx(j.when)}>
                <span className="text-term-hi">{tx(j.when)}</span> <span className="text-term-dim">{tx(j.title)}</span>
              </p>
            ))}
          </div>,
        )
        break
      case 'contact':
        push(
          'out',
          <div>
            <p>
              email <A href={`mailto:${profile.contact.email}`}>{profile.contact.email}</A>
            </p>
            {profile.contact.phone && (
              <p>
                phone <A href={`tel:${profile.contact.phone.replace(/\s/g, '')}`}>{profile.contact.phone}</A>
              </p>
            )}
            <p>
              github <A href={profile.contact.github}>github.com/{profile.contact.githubHandle}</A>
            </p>
            {profile.contact.linkedin && (
              <p>
                linkedin <A href={profile.contact.linkedin}>{profile.contact.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</A>
              </p>
            )}
            <p className="text-term-dim">{m('orCopy')}</p>
          </div>,
        )
        break
      case 'copy email':
      case 'email':
        navigator.clipboard
          ?.writeText(profile.contact.email)
          .then(() => push('out', <p>{m('copied', { email: profile.contact.email })}</p>))
          .catch(() => push('out', <p>{m('copyBlocked', { email: profile.contact.email })}</p>))
        break
      case 'ping heidelberg':
      case 'ping yann': {
        const t = () => (8 + Math.random() * 12).toFixed(1)
        push(
          'out',
          <div>
            <p className="text-term-dim">PING heidelberg (49.40°N, 8.67°E): 56 data bytes</p>
            {[0, 1, 2].map((i) => (
              <p key={i}>
                64 bytes from yann: icmp_seq={i} ttl=64 time={t()} ms
              </p>
            ))}
            <p className="text-term-hi">{m('pingOk')}</p>
          </div>,
        )
        break
      }
      case 'theme day':
      case 'theme light':
        onTheme('light')
        push('out', <p>{m('day')}</p>)
        break
      case 'theme night':
      case 'theme dark':
        onTheme('dark')
        push('out', <p>{m('night')}</p>)
        break
      case 'sudo hire yann':
      case 'hire yann':
        push('out', <p className="text-term-hi">{m('hire')}</p>)
        setTimeout(() => onNavigate('contact'), 600)
        break
      case 'cv':
      case 'resume':
      case 'lebenslauf':
        push('out', <p>{m('cv', { lang: langRef.current.toUpperCase() })}</p>)
        download(langRef.current)
        break
      case 'lang en':
      case 'lang de':
      case 'lang fr': {
        const next = cmd.slice(5) as Lang
        langRef.current = next
        setLang(next)
        push('out', <p>{m('langSet')}</p>)
        break
      }
      case 'lang':
        push('out', <p className="text-term-dim">{m('langUsage')}</p>)
        break
      case 'clear':
        setLines([])
        break
      default:
        push(
          'out',
          <p>
            <span className="text-term-dim">{m('notFound', { cmd })}</span>
            <button type="button" className="text-term-hi hover:underline" onClick={() => run('help')}>
              help
            </button>
          </p>,
        )
    }
  }

  // Boot: type "whoami" once, then hand the prompt to the visitor.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const word = 'whoami'
    if (reduce) {
      run(word)
      setBooted(true)
      return
    }
    let i = 0
    const id = window.setInterval(() => {
      i++
      setInput(word.slice(0, i))
      if (i === word.length) {
        window.clearInterval(id)
        setTimeout(() => {
          setInput('')
          run(word)
          setBooted(true)
        }, 350)
      }
    }, 90)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(hIndex.current + 1, history.current.length - 1)
      if (next >= 0) {
        hIndex.current = next
        setInput(history.current[next])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = hIndex.current - 1
      hIndex.current = Math.max(next, -1)
      setInput(next >= 0 ? history.current[next] : '')
    } else if (e.key === 'Tab') {
      const match = Object.keys(COMMANDS).find((c) => input && c.startsWith(input.toLowerCase()))
      if (match) {
        e.preventDefault()
        setInput(match)
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <div
      className={cn('flex flex-col overflow-hidden rounded-2xl bg-term-bg font-mono text-[13px] leading-relaxed text-term-fg shadow-2xl shadow-[#1d1a3b]/25', className)}
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-term-dim">yann@heidelberg: ~</span>
      </div>
      <div ref={scrollRef} className="h-[300px] overflow-y-auto px-4 py-4 sm:h-[340px]" role="log" aria-live="polite" aria-label={m('output')}>
        {lines.map((l) =>
          l.kind === 'in' ? (
            <p key={l.id} className="mt-3 first:mt-0">
              <span className="text-term-hi">❯</span> {l.node}
            </p>
          ) : (
            <div key={l.id} className="mt-1 break-words">
              {l.node}
            </div>
          ),
        )}
        <form
          className="mt-3 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            if (!booted) return
            run(input)
            setInput('')
          }}
        >
          <span className="text-term-hi" aria-hidden>
            ❯
          </span>
          <label htmlFor="term-input" className="sr-only">
            {m('inputLabel')}
          </label>
          <input
            ref={inputRef}
            id="term-input"
            value={input}
            onChange={(e) => booted && setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent caret-term-hi outline-none placeholder:text-term-dim/60"
            placeholder={booted ? m('placeholder') : ''}
          />
        </form>
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-white/10 px-3 py-2.5">
        {['help', 'projects', 'cv', 'contact', 'ping heidelberg'].map((c) => (
          <button
            key={c}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              if (booted) run(c)
            }}
            className="rounded-md bg-white/8 px-2.5 py-1 text-xs text-term-fg/90 transition-colors hover:bg-white/15"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
