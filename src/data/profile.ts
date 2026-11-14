// ─────────────────────────────────────────────────────────────
//  All site content lives here, in English (en), German (de) and French (fr).
//  A plain string is used as-is in every language.
// ─────────────────────────────────────────────────────────────
import type { Lang, Text } from '@/i18n'

export const profile = {
  name: 'Yann',
  headline: {
    en: 'Passionate about tech and building real-world solutions',
    de: 'Begeistert von Technik und von Lösungen für die echte Welt',
    fr: 'Passionné de tech et de solutions concrètes',
  } as Text,
  location: { en: 'Heidelberg, Germany', de: 'Heidelberg, Deutschland', fr: 'Heidelberg, Allemagne' } as Text,
  timeZone: 'Europe/Berlin',
  availability: {
    en: 'Open to IT internships and Werkstudent roles',
    de: 'Offen für IT-Praktika und Werkstudentenstellen',
    fr: 'Disponible pour un stage IT ou un poste de Werkstudent',
  } as Text,
  intro: {
    en: 'I build web apps with JavaScript, React and TypeScript, and I’m learning networking, security and AI on the side. Next step: a Bachelor in Informatik in Germany, and a team where I can learn by shipping.',
    de: 'Ich entwickle Web-Apps mit JavaScript, React und TypeScript und lerne nebenbei Netzwerke, IT-Sicherheit und KI. Mein nächster Schritt: ein Informatik-Bachelor in Deutschland und ein Team, in dem ich durch echte Projekte lerne.',
    fr: 'Je crée des applications web avec JavaScript, React et TypeScript, et j’apprends en parallèle les réseaux, la sécurité et l’IA. Prochaine étape : une licence en informatique (Informatik) en Allemagne, et une équipe où apprendre en livrant de vrais projets.',
  } as Text,
  contact: {
    email: 'choupomiguel@gmail.com',
    // Optional — leave '' to hide. Example: '+49 151 23456789'
    phone: '',
    github: 'https://github.com/yann27miguel',
    githubHandle: 'yann27miguel',
    credly: 'https://www.credly.com/users/choupo-miguel',
    // Optional — paste your current LinkedIn URL to show it.
    linkedin: '',
  },
  /** Spoken languages. `code` matches the site language it switches to. */
  languages: [
    { code: 'fr' as Lang, name: { en: 'French', de: 'Französisch', fr: 'Français' } as Text, level: { en: 'Native', de: 'Muttersprache', fr: 'Langue maternelle' } as Text, dots: 5 },
    { code: 'en' as Lang, name: { en: 'English', de: 'Englisch', fr: 'Anglais' } as Text, level: { en: 'Native', de: 'Muttersprache', fr: 'Langue maternelle' } as Text, dots: 5 },
    { code: 'de' as Lang, name: { en: 'German', de: 'Deutsch', fr: 'Allemand' } as Text, level: { en: 'Preparing for C1', de: 'C1 in Vorbereitung', fr: 'Préparation du C1' } as Text, dots: 3 },
  ],
}

/** CV files in public/cv. Replace them with your own PDFs any time (keep the names). */
export const cvFiles: Record<Lang, { href: string; filename: string }> = {
  en: { href: 'cv/Yann-CV-EN.pdf', filename: 'Yann-CV-EN.pdf' },
  de: { href: 'cv/Yann-Lebenslauf-DE.pdf', filename: 'Yann-Lebenslauf-DE.pdf' },
  fr: { href: 'cv/Yann-CV-FR.pdf', filename: 'Yann-CV-FR.pdf' },
}

export type Project = {
  id: string
  name: string
  repo: string
  tagline: Text
  language: 'JavaScript' | 'TypeScript' | 'HTML'
  stack: string[]
  features: Text[]
  year: string
  updated: string // ISO date of last push
  featured?: boolean
  highlight?: Text
}

/** Public repositories on github.com/yann27miguel (empty repos left out). */
export const projects: Project[] = [
  {
    id: 'expense-tracker',
    name: 'Expense Tracker',
    repo: 'https://github.com/yann27miguel/expense-tracker',
    tagline: {
      en: 'Record expenses, set monthly budgets and see where your money goes.',
      de: 'Ausgaben erfassen, Monatsbudgets festlegen und sehen, wohin das Geld geht.',
      fr: 'Enregistrez vos dépenses, fixez des budgets mensuels et voyez où part votre argent.',
    },
    language: 'JavaScript',
    stack: ['JavaScript', 'Tailwind CSS', 'Flowbite', 'ApexCharts', 'Vite', 'Vitest'],
    features: [
      { en: 'Dashboard with KPI cards, a daily spending chart and a clickable category donut', de: 'Dashboard mit KPI-Karten, täglichem Ausgabendiagramm und klickbarem Kategorien-Donut', fr: 'Tableau de bord avec indicateurs, graphique des dépenses quotidiennes et donut des catégories cliquable' },
      { en: 'Search, filter, edit and delete transactions, with Undo and CSV export', de: 'Transaktionen suchen, filtern, bearbeiten und löschen, mit Rückgängig und CSV-Export', fr: 'Rechercher, filtrer, modifier et supprimer des transactions, avec annulation et export CSV' },
      { en: 'Monthly budgets per category, custom categories and colours', de: 'Monatsbudgets pro Kategorie, eigene Kategorien und Farben', fr: 'Budgets mensuels par catégorie, catégories et couleurs personnalisées' },
      { en: 'English, German and French, plus light, dark and automatic themes', de: 'Englisch, Deutsch und Französisch sowie helles, dunkles und automatisches Design', fr: 'Anglais, allemand et français, avec thèmes clair, sombre et automatique' },
      { en: 'All data stays in the browser, with JSON backup and restore', de: 'Alle Daten bleiben im Browser, mit JSON-Sicherung und -Wiederherstellung', fr: 'Toutes les données restent dans le navigateur, avec sauvegarde et restauration JSON' },
      { en: '42 unit tests with Vitest', de: '42 Unit-Tests mit Vitest', fr: '42 tests unitaires avec Vitest' },
    ],
    year: '2026',
    updated: '2026-11-11',
    featured: true,
    highlight: { en: '42 unit tests, 3 languages', de: '42 Unit-Tests, 3 Sprachen', fr: '42 tests unitaires, 3 langues' },
  },
  {
    id: 'kinetix',
    name: 'KINETIX Athletic Club',
    repo: 'https://github.com/yann27miguel/KINETIX',
    tagline: {
      en: 'A responsive website and booking app for a fitness club.',
      de: 'Eine responsive Website mit Buchungs-App für einen Fitnessclub.',
      fr: 'Un site responsive avec application de réservation pour un club de fitness.',
    },
    language: 'TypeScript',
    stack: ['React', 'TypeScript', 'Bootstrap 5', 'Vite'],
    features: [
      { en: 'Weekly class schedule filtered by discipline and day', de: 'Wöchentlicher Kursplan, filterbar nach Disziplin und Tag', fr: 'Planning hebdomadaire des cours filtrable par discipline et par jour' },
      { en: 'Class booking with an instant digital confirmation pass', de: 'Kursbuchung mit sofortigem digitalem Bestätigungspass', fr: 'Réservation de cours avec pass de confirmation numérique instantané' },
      { en: 'Trainer profiles with certifications and assessment booking', de: 'Trainerprofile mit Zertifizierungen und Buchung von Einstufungen', fr: 'Profils des coachs avec certifications et réservation de bilan' },
      { en: 'Membership plans with monthly and annual price calculation', de: 'Mitgliedschaften mit monatlicher und jährlicher Preisberechnung', fr: 'Formules d’abonnement avec calcul du prix mensuel et annuel' },
      { en: 'Sign-up flow, testimonials and one-click contact', de: 'Anmeldeprozess, Kundenstimmen und Kontakt mit einem Klick', fr: 'Parcours d’inscription, témoignages et contact en un clic' },
      { en: 'Light and dark mode that remembers your choice', de: 'Heller und dunkler Modus, der die Auswahl speichert', fr: 'Modes clair et sombre qui mémorisent votre choix' },
    ],
    year: '2026',
    updated: '2026-09-23',
    highlight: 'React + TypeScript',
  },
  {
    id: 'restau',
    name: 'L’Étoile Fine Dining',
    repo: 'https://github.com/yann27miguel/restau',
    tagline: {
      en: 'A high-end, multilingual restaurant landing page built with HTML and Tailwind CSS, and zero JavaScript.',
      de: 'Eine hochwertige, mehrsprachige Restaurant-Landingpage aus HTML und Tailwind CSS, ganz ohne JavaScript.',
      fr: 'Une landing page de restaurant haut de gamme et multilingue, en HTML et Tailwind CSS, sans aucun JavaScript.',
    },
    language: 'HTML',
    stack: ['HTML', 'Tailwind CSS'],
    features: [
      { en: 'Language switcher for English, French and German that works without JavaScript, using radio inputs and sibling selectors', de: 'Sprachumschalter für Englisch, Französisch und Deutsch ohne JavaScript, mit Radio-Inputs und Geschwister-Selektoren', fr: 'Sélecteur de langue anglais, français, allemand sans JavaScript, grâce aux boutons radio et aux sélecteurs de frères' },
      { en: 'Custom luxury design tokens: obsidian charcoal and brushed gold through Tailwind arbitrary values', de: 'Eigene Luxus-Design-Tokens: Anthrazit und gebürstetes Gold über Tailwind Arbitrary Values', fr: 'Design tokens luxe sur mesure : anthracite et or brossé via les valeurs arbitraires de Tailwind' },
      { en: 'Responsive grids that go from one column on phones to three on desktop', de: 'Responsive Raster von einer Spalte auf dem Handy bis drei auf dem Desktop', fr: 'Grilles responsives d’une colonne sur mobile à trois sur ordinateur' },
      { en: 'Sticky navigation with a frosted-glass blur', de: 'Fixierte Navigation mit Milchglas-Effekt', fr: 'Navigation fixe avec effet verre dépoli' },
      { en: 'Hover micro-interactions on menu cards and gallery photos with group-hover', de: 'Hover-Mikrointeraktionen auf Menükarten und Galeriefotos mit group-hover', fr: 'Micro-interactions au survol des cartes du menu et de la galerie avec group-hover' },
      { en: 'Accessible focus states on the reservation form', de: 'Barrierefreie Fokuszustände im Reservierungsformular', fr: 'États de focus accessibles sur le formulaire de réservation' },
    ],
    year: '2026',
    updated: '2026-09-28',
    highlight: { en: 'Zero JavaScript, 3 languages', de: 'Null JavaScript, 3 Sprachen', fr: 'Zéro JavaScript, 3 langues' },
  },
  {
    id: 'html-portfolio',
    name: 'HTML Portfolio',
    repo: 'https://github.com/yann27miguel/html-portfolio',
    tagline: {
      en: 'My first multi-page website, where I show my steps in coding.',
      de: 'Meine erste mehrseitige Website, auf der ich meine ersten Schritte im Programmieren zeige.',
      fr: 'Mon premier site multipage, où je montre mes premiers pas en programmation.',
    },
    language: 'HTML',
    stack: ['HTML'],
    features: [
      { en: 'Home, about and contact pages linked together', de: 'Start-, Über-mich- und Kontaktseite, miteinander verlinkt', fr: 'Pages d’accueil, à propos et contact reliées entre elles' },
      { en: 'Practice pages: a movie ranking and a birthday invitation', de: 'Übungsseiten: ein Film-Ranking und eine Geburtstagseinladung', fr: 'Pages d’exercice : un classement de films et une invitation d’anniversaire' },
      { en: 'Built while learning HTML structure, lists, tables, images and links', de: 'Entstanden beim Lernen von HTML-Struktur, Listen, Tabellen, Bildern und Links', fr: 'Réalisé en apprenant la structure HTML, les listes, tableaux, images et liens' },
    ],
    year: '2026',
    updated: '2026-01-18',
    highlight: { en: 'Where it started', de: 'Wo alles begann', fr: 'Là où tout a commencé' },
  },
]

const THIS: Text = { en: 'This portfolio', de: 'Dieses Portfolio', fr: 'Ce portfolio' }

/** Skills, each linked to the projects and courses where Yann used them. */
export const skills: { name: Text; group: 'Build' | 'Know' | 'Tools'; usedIn: Text[] }[] = [
  { name: 'HTML', group: 'Build', usedIn: ['L’Étoile Fine Dining', 'HTML Portfolio', 'Expense Tracker', 'KINETIX Athletic Club'] },
  { name: 'CSS', group: 'Build', usedIn: [{ en: 'L’Étoile Fine Dining (sibling selectors, no JavaScript)', de: 'L’Étoile Fine Dining (Geschwister-Selektoren, ohne JavaScript)', fr: 'L’Étoile Fine Dining (sélecteurs de frères, sans JavaScript)' }, 'HTML Portfolio', 'KINETIX Athletic Club'] },
  { name: 'JavaScript', group: 'Build', usedIn: ['Expense Tracker'] },
  { name: 'TypeScript', group: 'Build', usedIn: ['KINETIX Athletic Club', THIS] },
  { name: 'React', group: 'Build', usedIn: ['KINETIX Athletic Club', THIS] },
  { name: 'Tailwind CSS', group: 'Build', usedIn: ['L’Étoile Fine Dining', 'Expense Tracker', THIS] },
  { name: 'Bootstrap', group: 'Build', usedIn: ['KINETIX Athletic Club'] },
  { name: { en: 'Unit testing', de: 'Unit-Tests', fr: 'Tests unitaires' }, group: 'Build', usedIn: [{ en: 'Expense Tracker (Vitest, 42 tests)', de: 'Expense Tracker (Vitest, 42 Tests)', fr: 'Expense Tracker (Vitest, 42 tests)' }] },
  { name: { en: 'Networking', de: 'Netzwerke', fr: 'Réseaux' }, group: 'Know', usedIn: [{ en: 'CompTIA Network+ course', de: 'CompTIA-Network+-Kurs', fr: 'Formation CompTIA Network+' }] },
  { name: { en: 'Security', de: 'IT-Sicherheit', fr: 'Sécurité' }, group: 'Know', usedIn: [{ en: 'CompTIA Security+ course', de: 'CompTIA-Security+-Kurs', fr: 'Formation CompTIA Security+' }] },
  { name: { en: 'AI fundamentals', de: 'KI-Grundlagen', fr: 'Bases de l’IA' }, group: 'Know', usedIn: ['Google AI Professional Certificate', 'IBM Introduction to AI'] },
  { name: { en: 'Software engineering', de: 'Softwareentwicklung', fr: 'Génie logiciel' }, group: 'Know', usedIn: ['IBM Introduction to Software Engineering'] },
  { name: { en: 'Git and GitHub', de: 'Git und GitHub', fr: 'Git et GitHub' }, group: 'Tools', usedIn: [{ en: 'All projects', de: 'Alle Projekte', fr: 'Tous les projets' }] },
  { name: 'Vite', group: 'Tools', usedIn: ['Expense Tracker', 'KINETIX Athletic Club', THIS] },
  { name: { en: 'Translation (i18n)', de: 'Mehrsprachigkeit (i18n)', fr: 'Multilingue (i18n)' }, group: 'Tools', usedIn: ['Expense Tracker (EN, DE, FR)', 'L’Étoile Fine Dining (EN, FR, DE)', { en: 'This portfolio (EN, DE, FR)', de: 'Dieses Portfolio (EN, DE, FR)', fr: 'Ce portfolio (EN, DE, FR)' }] },
]

export const certificates: { name: string; issuer: string; date: Text; detail?: Text }[] = [
  { name: 'Google AI Professional Certificate', issuer: 'Google, Coursera', date: { en: 'Sep 2026', de: 'Sep. 2026', fr: 'sept. 2026' }, detail: { en: '6 courses, from AI fundamentals to building apps with AI', de: '6 Kurse, von KI-Grundlagen bis zur App-Entwicklung mit KI', fr: '6 cours, des bases de l’IA à la création d’applications avec l’IA' } },
  { name: 'Introduction to Artificial Intelligence', issuer: 'IBM, Coursera', date: { en: 'Sep 2026', de: 'Sep. 2026', fr: 'sept. 2026' } },
  { name: 'Introduction to Software Engineering', issuer: 'IBM, Coursera', date: { en: 'Sep 2026', de: 'Sep. 2026', fr: 'sept. 2026' } },
  { name: 'CompTIA Security+', issuer: 'Udemy', date: { en: 'Mar 2026', de: 'März 2026', fr: 'mars 2026' }, detail: { en: 'Course', de: 'Kurs', fr: 'Formation' } },
  { name: 'CompTIA Network+', issuer: 'Udemy', date: { en: 'Dec 2025', de: 'Dez. 2025', fr: 'déc. 2025' }, detail: { en: 'Course', de: 'Kurs', fr: 'Formation' } },
]

export type JourneyStep = {
  when: Text
  title: Text
  body: Text
  /** Projects or courses from this step. Links open in a new tab. */
  items?: { label: Text; href?: string }[]
}

export const journey: JourneyStep[] = [
  {
    when: '2024',
    title: 'GCE A-Level, GBHS Nkol-Eton',
    body: {
      en: 'Finished secondary school in Yaoundé, Cameroon, and decided to study computer science in Germany.',
      de: 'Schulabschluss (GCE A-Level) in Yaoundé, Kamerun, und die Entscheidung, Informatik in Deutschland zu studieren.',
      fr: 'Fin du lycée à Yaoundé, au Cameroun, et décision d’étudier l’informatique en Allemagne.',
    },
  },
  {
    when: '2025',
    title: { en: 'How networks work', de: 'Wie Netzwerke funktionieren', fr: 'Comment fonctionnent les réseaux' },
    body: {
      en: 'Learned how data moves through a network, from cables and IP addressing to routing and troubleshooting.',
      de: 'Gelernt, wie Daten durch ein Netzwerk fließen: von Kabeln und IP-Adressen bis zu Routing und Fehlersuche.',
      fr: 'Appris comment les données circulent dans un réseau, des câbles et de l’adressage IP au routage et au dépannage.',
    },
    items: [{ label: { en: 'CompTIA Network+ course', de: 'CompTIA-Network+-Kurs', fr: 'Formation CompTIA Network+' } }],
  },
  {
    when: { en: 'Early 2026', de: 'Anfang 2026', fr: 'Début 2026' },
    title: { en: 'First websites and security basics', de: 'Erste Websites und IT-Sicherheit', fr: 'Premiers sites et bases de la sécurité' },
    body: {
      en: 'Built my first multi-page website in HTML, then studied threats, encryption and how to defend systems.',
      de: 'Meine erste mehrseitige Website in HTML gebaut, danach Bedrohungen, Verschlüsselung und Systemschutz gelernt.',
      fr: 'Créé mon premier site multipage en HTML, puis étudié les menaces, le chiffrement et la protection des systèmes.',
    },
    items: [
      { label: 'HTML Portfolio', href: 'https://github.com/yann27miguel/html-portfolio' },
      { label: { en: 'CompTIA Security+ course', de: 'CompTIA-Security+-Kurs', fr: 'Formation CompTIA Security+' } },
    ],
  },
  {
    when: { en: 'Sep 2026', de: 'Sep. 2026', fr: 'Sept. 2026' },
    title: { en: 'React, TypeScript, Tailwind and AI', de: 'React, TypeScript, Tailwind und KI', fr: 'React, TypeScript, Tailwind et IA' },
    body: {
      en: 'Shipped a React and TypeScript booking app and a multilingual Tailwind site with zero JavaScript. Completed the Google AI certificate and two IBM courses.',
      de: 'Eine Buchungs-App mit React und TypeScript sowie eine mehrsprachige Tailwind-Website ohne JavaScript veröffentlicht. Google-KI-Zertifikat und zwei IBM-Kurse abgeschlossen.',
      fr: 'Livré une application de réservation en React et TypeScript et un site Tailwind multilingue sans JavaScript. Obtenu le certificat Google IA et deux formations IBM.',
    },
    items: [
      { label: 'KINETIX Athletic Club', href: 'https://github.com/yann27miguel/KINETIX' },
      { label: 'L’Étoile Fine Dining', href: 'https://github.com/yann27miguel/restau' },
      { label: 'Google AI Professional Certificate' },
      { label: { en: 'IBM AI and Software Engineering', de: 'IBM KI und Softwareentwicklung', fr: 'IBM IA et génie logiciel' } },
    ],
  },
  {
    when: { en: 'Nov 2026', de: 'Nov. 2026', fr: 'Nov. 2026' },
    title: { en: 'A tested, real-world app', de: 'Eine getestete App für den Alltag', fr: 'Une application testée, pour la vraie vie' },
    body: {
      en: 'Built an expense tracker people can actually use every day: budgets, charts, three languages and 42 unit tests.',
      de: 'Einen Ausgaben-Tracker gebaut, den man wirklich täglich nutzen kann: Budgets, Diagramme, drei Sprachen und 42 Unit-Tests.',
      fr: 'Créé un suivi de dépenses utilisable au quotidien : budgets, graphiques, trois langues et 42 tests unitaires.',
    },
    items: [{ label: 'Expense Tracker', href: 'https://github.com/yann27miguel/expense-tracker' }],
  },
  {
    when: { en: 'Next', de: 'Als Nächstes', fr: 'Ensuite' },
    title: { en: 'Bachelor in Informatik', de: 'Bachelor Informatik', fr: 'Licence en informatique' },
    body: {
      en: 'Starting a computer science degree in Germany, with a focus on AI, and looking for an internship or Werkstudent role to learn alongside a real team.',
      de: 'Start eines Informatikstudiums in Deutschland mit Schwerpunkt KI, dazu die Suche nach einem Praktikum oder einer Werkstudentenstelle in einem echten Team.',
      fr: 'Début d’études d’informatique en Allemagne, avec un accent sur l’IA, et recherche d’un stage ou d’un poste de Werkstudent pour apprendre au sein d’une vraie équipe.',
    },
  },
]
