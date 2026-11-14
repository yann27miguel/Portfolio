// Three languages: English, German, French.
// UI strings live in `ui` below; site content (projects, journey…) lives in src/data/profile.ts.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export type Lang = 'en' | 'de' | 'fr'
export const LANGS: { code: Lang; short: string; name: string }[] = [
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'de', short: 'DE', name: 'Deutsch' },
  { code: 'fr', short: 'FR', name: 'Français' },
]
export const LOCALE: Record<Lang, string> = { en: 'en-GB', de: 'de-DE', fr: 'fr-FR' }

/** A piece of text that is either the same in every language or translated. */
export type Text = string | Record<Lang, string>

const ui = {
  // header
  'nav.projects': { en: 'Projects', de: 'Projekte', fr: 'Projets' },
  'nav.skills': { en: 'Skills', de: 'Skills', fr: 'Compétences' },
  'nav.journey': { en: 'Journey', de: 'Werdegang', fr: 'Parcours' },
  'nav.certificates': { en: 'Certificates', de: 'Zertifikate', fr: 'Certificats' },
  'nav.contact': { en: 'Contact', de: 'Kontakt', fr: 'Contact' },
  'nav.sections': { en: 'Sections', de: 'Bereiche', fr: 'Sections' },
  'search.open': { en: 'Open quick search', de: 'Schnellsuche öffnen', fr: 'Ouvrir la recherche rapide' },
  'search.label': { en: 'Search', de: 'Suche', fr: 'Rechercher' },
  'theme.day': { en: 'Day', de: 'Tag', fr: 'Jour' },
  'theme.night': { en: 'Night', de: 'Nacht', fr: 'Nuit' },
  'theme.toDay': { en: 'Switch to day mode', de: 'Zum Tagmodus wechseln', fr: 'Passer en mode jour' },
  'theme.toNight': { en: 'Switch to night mode', de: 'Zum Nachtmodus wechseln', fr: 'Passer en mode nuit' },
  'lang.label': { en: 'Language', de: 'Sprache', fr: 'Langue' },

  // hero
  'hero.time': { en: 'It’s {time} in Heidelberg. {greeting}.', de: 'Es ist {time} Uhr in Heidelberg. {greeting}.', fr: 'Il est {time} à Heidelberg. {greeting}.' },
  'greet.morning': { en: 'Good morning', de: 'Guten Morgen', fr: 'Bonjour' },
  'greet.afternoon': { en: 'Good afternoon', de: 'Guten Tag', fr: 'Bon après-midi' },
  'greet.evening': { en: 'Good evening', de: 'Guten Abend', fr: 'Bonsoir' },
  'greet.night': { en: 'Good night', de: 'Gute Nacht', fr: 'Bonne nuit' },
  'hero.copyEmail': { en: 'Copy my email', de: 'E-Mail kopieren', fr: 'Copier mon e-mail' },
  'hero.copied': { en: 'Email copied', de: 'E-Mail kopiert', fr: 'E-mail copié' },
  'hero.github': { en: 'See my GitHub', de: 'Mein GitHub', fr: 'Voir mon GitHub' },
  'hero.copyBlocked': { en: 'Copying is blocked here. My email is {email}', de: 'Kopieren ist hier blockiert. Meine E-Mail: {email}', fr: 'La copie est bloquée ici. Mon e-mail : {email}' },
  'hero.terminalHint': { en: 'This terminal works. Type {help} or tap a command.', de: 'Dieses Terminal funktioniert. Tippen Sie {help} oder wählen Sie einen Befehl.', fr: 'Ce terminal fonctionne. Tapez {help} ou touchez une commande.' },
  'hero.speak': { en: 'I speak', de: 'Ich spreche', fr: 'Je parle' },
  'portrait.alt': { en: 'Portrait of Yann', de: 'Porträt von Yann', fr: 'Portrait de Yann' },

  // CV
  'cv.download': { en: 'Download CV', de: 'Lebenslauf herunterladen', fr: 'Télécharger mon CV' },
  'cv.short': { en: 'CV', de: 'Lebenslauf', fr: 'CV' },
  'cv.otherLangs': { en: 'Also in', de: 'Auch auf', fr: 'Aussi en' },
  'cv.preparing': { en: 'Preparing…', de: 'Wird vorbereitet…', fr: 'Préparation…' },
  'cv.saved': { en: 'CV downloaded', de: 'Lebenslauf heruntergeladen', fr: 'CV téléchargé' },
  'cv.failed': { en: 'The download didn’t start. Try again, or ask me by email.', de: 'Der Download hat nicht begonnen. Bitte erneut versuchen oder per E-Mail anfragen.', fr: 'Le téléchargement n’a pas démarré. Réessayez ou demandez-le-moi par e-mail.' },

  // projects
  'projects.title': { en: 'Projects on GitHub', de: 'Projekte auf GitHub', fr: 'Projets sur GitHub' },
  'projects.intro1': { en: 'Everything here is public on', de: 'Alles hier ist öffentlich auf', fr: 'Tout est public sur' },
  'projects.intro2': { en: 'Open a project to see what it does.', de: 'Öffnen Sie ein Projekt, um mehr zu sehen.', fr: 'Ouvrez un projet pour voir ce qu’il fait.' },
  'stats.projects': { en: 'public projects', de: 'öffentliche Projekte', fr: 'projets publics' },
  'stats.tools': { en: 'tools and libraries', de: 'Tools und Bibliotheken', fr: 'outils et bibliothèques' },
  'stats.tests': { en: 'unit tests written', de: 'Unit-Tests geschrieben', fr: 'tests unitaires écrits' },
  'projects.search': { en: 'Search projects', de: 'Projekte durchsuchen', fr: 'Rechercher des projets' },
  'projects.searchPh': { en: 'Search, e.g. React or charts', de: 'Suche, z. B. React oder Charts', fr: 'Rechercher, ex. React ou graphiques' },
  'projects.filter': { en: 'Filter by language', de: 'Nach Sprache filtern', fr: 'Filtrer par langage' },
  'projects.sort': { en: 'Sort projects', de: 'Projekte sortieren', fr: 'Trier les projets' },
  'projects.all': { en: 'All', de: 'Alle', fr: 'Tous' },
  'projects.newest': { en: 'Newest', de: 'Neueste', fr: 'Récents' },
  'projects.az': { en: 'A to Z', de: 'A bis Z', fr: 'A à Z' },
  'projects.updated': { en: 'Updated {date}', de: 'Aktualisiert {date}', fr: 'Mis à jour {date}' },
  'projects.details': { en: 'Details', de: 'Details', fr: 'Détails' },
  'projects.open': { en: 'Open details for {name}', de: 'Details zu {name} öffnen', fr: 'Ouvrir les détails de {name}' },
  'projects.features': { en: 'Features', de: 'Funktionen', fr: 'Fonctionnalités' },
  'projects.builtWith': { en: 'Built with', de: 'Gebaut mit', fr: 'Réalisé avec' },
  'projects.openGithub': { en: 'Open on GitHub', de: 'Auf GitHub öffnen', fr: 'Ouvrir sur GitHub' },
  'projects.copyLink': { en: 'Copy link', de: 'Link kopieren', fr: 'Copier le lien' },
  'projects.linkCopied': { en: 'Link copied', de: 'Link kopiert', fr: 'Lien copié' },
  'projects.none': { en: 'No projects match “{q}”.', de: 'Keine Projekte zu „{q}“.', fr: 'Aucun projet ne correspond à « {q} ».' },
  'projects.clear': { en: 'Clear search and filters', de: 'Suche und Filter zurücksetzen', fr: 'Effacer la recherche et les filtres' },
  'dialog.close': { en: 'Close project details', de: 'Projektdetails schließen', fr: 'Fermer les détails du projet' },

  // skills
  'skills.title': { en: 'Skills', de: 'Skills', fr: 'Compétences' },
  'skills.intro': { en: 'Pick a skill to see where I’ve used it.', de: 'Wählen Sie einen Skill, um zu sehen, wo ich ihn eingesetzt habe.', fr: 'Choisissez une compétence pour voir où je l’ai utilisée.' },
  'skills.Build': { en: 'I build with', de: 'Ich entwickle mit', fr: 'Je développe avec' },
  'skills.Know': { en: 'I’ve studied', de: 'Ich habe gelernt', fr: 'J’ai étudié' },
  'skills.Tools': { en: 'I work with', de: 'Ich arbeite mit', fr: 'J’utilise' },
  'skills.usedIn': { en: 'Where I used', de: 'Eingesetzt bei', fr: 'Utilisé dans' },

  // journey
  'journey.title': { en: 'How I got here', de: 'Mein Weg bis hierher', fr: 'Mon parcours' },
  'journey.intro': { en: 'From Yaoundé to Heidelberg. Scroll to follow the path, one step at a time.', de: 'Von Yaoundé nach Heidelberg. Scrollen Sie, um dem Weg Schritt für Schritt zu folgen.', fr: 'De Yaoundé à Heidelberg. Faites défiler pour suivre le chemin, étape par étape.' },
  'journey.opensGithub': { en: '(opens GitHub)', de: '(öffnet GitHub)', fr: '(ouvre GitHub)' },

  // certificates
  'certs.title': { en: 'Certificates', de: 'Zertifikate', fr: 'Certificats' },
  'certs.intro': { en: 'Courses in AI, software engineering, networking and security.', de: 'Kurse in KI, Softwareentwicklung, Netzwerken und IT-Sicherheit.', fr: 'Formations en IA, génie logiciel, réseaux et sécurité.' },
  'certs.verify': { en: 'Verify on Credly', de: 'Auf Credly prüfen', fr: 'Vérifier sur Credly' },

  // contact
  'contact.title': { en: 'Let’s build something together.', de: 'Lassen Sie uns gemeinsam etwas bauen.', fr: 'Construisons quelque chose ensemble.' },
  'contact.intro': {
    en: 'I’m looking for an IT internship, a Werkstudent role or small freelance web projects in Heidelberg and the Rhein-Neckar area, or remote. Write to me in English, French or German.',
    de: 'Ich suche ein IT-Praktikum, eine Werkstudentenstelle oder kleine Freelance-Webprojekte in Heidelberg und der Rhein-Neckar-Region oder remote. Schreiben Sie mir gern auf Deutsch, Englisch oder Französisch.',
    fr: 'Je cherche un stage en informatique, un poste de Werkstudent ou de petites missions web en freelance à Heidelberg et dans la région Rhin-Neckar, ou à distance. Écrivez-moi en français, en anglais ou en allemand.',
  },
  'contact.fastest': { en: 'The fastest way to reach me', de: 'Am schnellsten erreichen Sie mich per', fr: 'Le moyen le plus rapide de me joindre' },
  'contact.copy': { en: 'Copy email', de: 'E-Mail kopieren', fr: 'Copier l’e-mail' },
  'contact.copied': { en: 'Copied', de: 'Kopiert', fr: 'Copié' },
  'contact.openMail': { en: 'Open in my email app', de: 'Im E-Mail-Programm öffnen', fr: 'Ouvrir dans ma messagerie' },
  'contact.email': { en: 'Email', de: 'E-Mail', fr: 'E-mail' },
  'contact.phone': { en: 'Phone', de: 'Telefon', fr: 'Téléphone' },
  'contact.certs': { en: 'Certificates', de: 'Zertifikate', fr: 'Certificats' },
  'contact.credly': { en: 'My Credly profile', de: 'Mein Credly-Profil', fr: 'Mon profil Credly' },
  'contact.location': { en: 'Location', de: 'Standort', fr: 'Localisation' },
  'contact.languages': { en: 'Languages', de: 'Sprachen', fr: 'Langues' },
  'contact.formTitle': { en: 'Or send a message', de: 'Oder schreiben Sie eine Nachricht', fr: 'Ou envoyez un message' },
  'contact.name': { en: 'Your name', de: 'Ihr Name', fr: 'Votre nom' },
  'contact.yourEmail': { en: 'Your email', de: 'Ihre E-Mail', fr: 'Votre e-mail' },
  'contact.message': { en: 'Message', de: 'Nachricht', fr: 'Message' },
  'contact.messagePh': { en: 'Tell me about the role or project.', de: 'Erzählen Sie mir von der Stelle oder dem Projekt.', fr: 'Parlez-moi du poste ou du projet.' },
  'contact.send': { en: 'Send message', de: 'Nachricht senden', fr: 'Envoyer le message' },
  'contact.errName': { en: 'Enter your name.', de: 'Bitte geben Sie Ihren Namen ein.', fr: 'Indiquez votre nom.' },
  'contact.errEmail': { en: 'Enter an email address like name@company.com.', de: 'Bitte geben Sie eine E-Mail-Adresse wie name@firma.de ein.', fr: 'Indiquez une adresse comme nom@entreprise.fr.' },
  'contact.errMessage': { en: 'Write at least 10 characters so I know how I can help.', de: 'Bitte schreiben Sie mindestens 10 Zeichen.', fr: 'Écrivez au moins 10 caractères pour que je sache comment vous aider.' },
  'contact.subject': { en: 'Hello from {name}', de: 'Nachricht von {name}', fr: 'Message de {name}' },
  'contact.sent': { en: 'Your email app should now open with this message.', de: 'Ihr E-Mail-Programm sollte sich jetzt mit dieser Nachricht öffnen.', fr: 'Votre messagerie devrait maintenant s’ouvrir avec ce message.' },
  'contact.sentFallback': { en: 'If it didn’t, copy the message and send it to {email}.', de: 'Falls nicht, kopieren Sie die Nachricht und senden Sie sie an {email}.', fr: 'Sinon, copiez le message et envoyez-le à {email}.' },
  'contact.copyMessage': { en: 'Copy message', de: 'Nachricht kopieren', fr: 'Copier le message' },
  'chars.left': { en: '{n} characters left', de: 'Noch {n} Zeichen', fr: '{n} caractères restants' },

  // footer, palette, toasts
  'footer.shortcut': { en: 'Press {key} to jump anywhere.', de: 'Mit {key} überall hinspringen.', fr: 'Appuyez sur {key} pour aller n’importe où.' },
  'palette.title': { en: 'Quick search', de: 'Schnellsuche', fr: 'Recherche rapide' },
  'palette.desc': { en: 'Jump to a section, open a project, download my CV or change the theme or language.', de: 'Zu einem Bereich springen, ein Projekt öffnen, den Lebenslauf laden oder Design und Sprache ändern.', fr: 'Aller à une section, ouvrir un projet, télécharger mon CV ou changer le thème ou la langue.' },
  'palette.ph': { en: 'Search sections, projects and actions', de: 'Bereiche, Projekte und Aktionen suchen', fr: 'Rechercher sections, projets et actions' },
  'palette.empty': { en: 'Nothing matches. Try “projects” or “CV”.', de: 'Keine Treffer. Versuchen Sie „Projekte“ oder „Lebenslauf“.', fr: 'Aucun résultat. Essayez « projets » ou « CV ».' },
  'palette.goto': { en: 'Go to', de: 'Gehe zu', fr: 'Aller à' },
  'palette.home': { en: 'Home', de: 'Start', fr: 'Accueil' },
  'palette.terminal': { en: 'Use the terminal', de: 'Terminal benutzen', fr: 'Utiliser le terminal' },
  'palette.projects': { en: 'Projects on GitHub', de: 'Projekte auf GitHub', fr: 'Projets sur GitHub' },
  'palette.actions': { en: 'Actions', de: 'Aktionen', fr: 'Actions' },
  'palette.copyEmail': { en: 'Copy email address', de: 'E-Mail-Adresse kopieren', fr: 'Copier l’adresse e-mail' },
  'palette.device': { en: 'Match my device', de: 'Wie mein Gerät', fr: 'Comme mon appareil' },
  'palette.language': { en: 'Language', de: 'Sprache', fr: 'Langue' },
  'palette.hintMove': { en: 'Use arrow keys to move, Enter to select', de: 'Pfeiltasten zum Bewegen, Enter zum Auswählen', fr: 'Flèches pour naviguer, Entrée pour choisir' },
  'palette.hintClose': { en: 'Esc to close', de: 'Esc zum Schließen', fr: 'Échap pour fermer' },
  'toast.copied': { en: 'Copied {email}', de: '{email} kopiert', fr: '{email} copié' },
  'toast.blocked': { en: 'Copying is blocked here. Email: {email}', de: 'Kopieren blockiert. E-Mail: {email}', fr: 'Copie bloquée. E-mail : {email}' },
  'skip': { en: 'Skip to content', de: 'Zum Inhalt springen', fr: 'Aller au contenu' },
} satisfies Record<string, Record<Lang, string>>

export type UiKey = keyof typeof ui

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: UiKey, vars?: Record<string, string | number>) => string
  tx: (text: Text) => string
}
const I18nContext = createContext<Ctx | null>(null)

function detect(): Lang {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'en' || saved === 'de' || saved === 'fr') return saved
  } catch {
    /* storage unavailable */
  }
  const nav = (navigator.languages?.[0] ?? navigator.language ?? 'en').slice(0, 2)
  return nav === 'de' || nav === 'fr' ? nav : 'en'
}

const fill = (s: string, vars?: Record<string, string | number>) =>
  vars ? s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`)) : s

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detect)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem('lang', l)
    } catch {
      /* remembered for this visit only */
    }
  }, [])

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (key, vars) => fill(ui[key][lang], vars),
      tx: (text) => (typeof text === 'string' ? text : text[lang]),
    }),
    [lang, setLang],
  )
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
