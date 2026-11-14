"""
Builds Yann's one-page CV in English, German and French as PDFs in public/cv/.

    pip install playwright && python -m playwright install chromium
    python cv-source/build_cv.py
    (or CHROME_PATH=/path/to/chrome python cv-source/build_cv.py to use your installed Chrome)

Edit the CONTENT dictionary below, then run the script again.
The HTML of each version is also written to cv-source/ so you can open it in a browser.
"""
import base64
import os
import pathlib

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'cv'
SRC = ROOT / 'cv-source'
FONT = ROOT / 'node_modules/@fontsource-variable/familjen-grotesk/files/familjen-grotesk-latin-wght-normal.woff2'
FONT_EXT = ROOT / 'node_modules/@fontsource-variable/familjen-grotesk/files/familjen-grotesk-latin-ext-wght-normal.woff2'

EMAIL = 'choupomiguel@gmail.com'
GITHUB = 'github.com/yann27miguel'
CREDLY = 'credly.com/users/choupo-miguel'

CONTENT = {
    'en': {
        'file': 'Yann-CV-EN.pdf',
        'doc': 'Curriculum Vitae',
        'headline': 'Passionate about tech and building real-world solutions',
        'availability': 'Open to IT internships and Werkstudent roles',
        'h': {'profile': 'Profile', 'projects': 'Projects', 'education': 'Education', 'courses': 'Courses and certificates',
              'skills': 'Skills', 'languages': 'Languages', 'contact': 'Contact', 'location': 'Location', 'email': 'Email'},
        'location': 'Heidelberg, Germany',
        'profile': 'Future computer science student who builds web apps with JavaScript, React and TypeScript. '
                   'I learn by shipping real projects, from a tested expense tracker to a multilingual website without JavaScript, '
                   'and I study networking, security and AI alongside. I’m looking for a team where I can contribute and grow.',
        'projects': [
            ('Expense Tracker', 'JavaScript, Tailwind CSS, Flowbite, ApexCharts, Vitest', 'Budget app with dashboard, charts, CSV export, 3 languages and 42 unit tests.', 'github.com/yann27miguel/expense-tracker', 'Nov 2026'),
            ('L’Étoile Fine Dining', 'HTML, Tailwind CSS', 'Multilingual restaurant landing page (EN, FR, DE) with a language switcher built without JavaScript.', 'github.com/yann27miguel/restau', 'Sep 2026'),
            ('KINETIX Athletic Club', 'React, TypeScript, Bootstrap 5, Vite', 'Fitness club website with class schedule, booking, membership pricing and dark mode.', 'github.com/yann27miguel/KINETIX', 'Sep 2026'),
            ('Interactive portfolio', 'React, TypeScript, Tailwind CSS, Motion', 'Personal site in 3 languages with day/night mode, a working terminal and command palette.', '', 'Nov 2026'),
        ],
        'education': [
            ('Next', 'Bachelor in Computer Science (Informatik)', 'Applying to German universities, focus on AI'),
            ('2024', 'GCE Advanced Level', 'GBHS Nkol-Eton, Yaoundé, Cameroon'),
        ],
        'courses': [
            ('Sep 2026', 'Google AI Professional Certificate', 'Google, Coursera (6 courses)'),
            ('Sep 2026', 'Introduction to Artificial Intelligence', 'IBM, Coursera'),
            ('Sep 2026', 'Introduction to Software Engineering', 'IBM, Coursera'),
            ('Mar 2026', 'CompTIA Security+ course', 'Udemy'),
            ('Dec 2025', 'CompTIA Network+ course', 'Udemy'),
        ],
        'skills': [
            ('Web', 'HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS, Bootstrap'),
            ('Quality', 'Unit testing (Vitest), accessibility, responsive design, i18n'),
            ('Foundations', 'Networking, IT security, AI fundamentals, software engineering'),
            ('Tools', 'Git, GitHub, Vite, VS Code, AI tools'),
        ],
        'languages': [('French', 'Native', 5), ('English', 'Native', 5), ('German', 'Preparing for C1 (DSH, telc C1 Hochschule)', 3)],
        'signed': 'Heidelberg, November 2026',
    },
    'de': {
        'file': 'Yann-Lebenslauf-DE.pdf',
        'doc': 'Lebenslauf',
        'headline': 'Begeistert von Technik und von Lösungen für die echte Welt',
        'availability': 'Offen für IT-Praktika und Werkstudentenstellen',
        'h': {'profile': 'Profil', 'projects': 'Projekte', 'education': 'Ausbildung', 'courses': 'Weiterbildung und Zertifikate',
              'skills': 'Kenntnisse', 'languages': 'Sprachen', 'contact': 'Kontakt', 'location': 'Wohnort', 'email': 'E-Mail'},
        'location': 'Heidelberg, Deutschland',
        'profile': 'Angehender Informatikstudent, der Web-Apps mit JavaScript, React und TypeScript entwickelt. '
                   'Ich lerne durch echte Projekte, vom getesteten Ausgaben-Tracker bis zur mehrsprachigen Website ohne JavaScript, '
                   'und beschäftige mich parallel mit Netzwerken, IT-Sicherheit und KI. Ich suche ein Team, in dem ich mitarbeiten und wachsen kann.',
        'projects': [
            ('Expense Tracker', 'JavaScript, Tailwind CSS, Flowbite, ApexCharts, Vitest', 'Budget-App mit Dashboard, Diagrammen, CSV-Export, 3 Sprachen und 42 Unit-Tests.', 'github.com/yann27miguel/expense-tracker', 'Nov. 2026'),
            ('L’Étoile Fine Dining', 'HTML, Tailwind CSS', 'Mehrsprachige Restaurant-Landingpage (EN, FR, DE) mit Sprachumschalter ganz ohne JavaScript.', 'github.com/yann27miguel/restau', 'Sep. 2026'),
            ('KINETIX Athletic Club', 'React, TypeScript, Bootstrap 5, Vite', 'Website für einen Fitnessclub mit Kursplan, Buchung, Preisrechner und Dark Mode.', 'github.com/yann27miguel/KINETIX', 'Sep. 2026'),
            ('Interaktives Portfolio', 'React, TypeScript, Tailwind CSS, Motion', 'Persönliche Website in 3 Sprachen mit Tag-/Nachtmodus, funktionierendem Terminal und Befehlspalette.', '', 'Nov. 2026'),
        ],
        'education': [
            ('Geplant', 'Bachelor Informatik', 'Bewerbung an deutschen Hochschulen, Schwerpunkt KI'),
            ('2024', 'GCE Advanced Level (Schulabschluss)', 'GBHS Nkol-Eton, Yaoundé, Kamerun'),
        ],
        'courses': [
            ('09/2026', 'Google AI Professional Certificate', 'Google, Coursera (6 Kurse)'),
            ('09/2026', 'Introduction to Artificial Intelligence', 'IBM, Coursera'),
            ('09/2026', 'Introduction to Software Engineering', 'IBM, Coursera'),
            ('03/2026', 'CompTIA-Security+-Kurs', 'Udemy'),
            ('12/2025', 'CompTIA-Network+-Kurs', 'Udemy'),
        ],
        'skills': [
            ('Web', 'HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS, Bootstrap'),
            ('Qualität', 'Unit-Tests (Vitest), Barrierefreiheit, Responsive Design, Mehrsprachigkeit'),
            ('Grundlagen', 'Netzwerke, IT-Sicherheit, KI-Grundlagen, Softwareentwicklung'),
            ('Tools', 'Git, GitHub, Vite, VS Code, KI-Tools'),
        ],
        'languages': [('Französisch', 'Muttersprache', 5), ('Englisch', 'Muttersprache', 5), ('Deutsch', 'C1 in Vorbereitung (DSH, telc C1 Hochschule)', 3)],
        'signed': 'Heidelberg, November 2026',
    },
    'fr': {
        'file': 'Yann-CV-FR.pdf',
        'doc': 'Curriculum Vitae',
        'headline': 'Passionné de tech et de solutions concrètes',
        'availability': 'Disponible pour un stage IT ou un poste de Werkstudent',
        'h': {'profile': 'Profil', 'projects': 'Projets', 'education': 'Formation', 'courses': 'Formations et certificats',
              'skills': 'Compétences', 'languages': 'Langues', 'contact': 'Contact', 'location': 'Ville', 'email': 'E-mail'},
        'location': 'Heidelberg, Allemagne',
        'profile': 'Futur étudiant en informatique, je crée des applications web avec JavaScript, React et TypeScript. '
                   'J’apprends en réalisant de vrais projets, d’un suivi de dépenses testé à un site multilingue sans JavaScript, '
                   'et j’étudie en parallèle les réseaux, la sécurité et l’IA. Je cherche une équipe où contribuer et progresser.',
        'projects': [
            ('Expense Tracker', 'JavaScript, Tailwind CSS, Flowbite, ApexCharts, Vitest', 'Application de budget avec tableau de bord, graphiques, export CSV, 3 langues et 42 tests unitaires.', 'github.com/yann27miguel/expense-tracker', 'nov. 2026'),
            ('L’Étoile Fine Dining', 'HTML, Tailwind CSS', 'Landing page de restaurant multilingue (EN, FR, DE) avec sélecteur de langue sans JavaScript.', 'github.com/yann27miguel/restau', 'sept. 2026'),
            ('KINETIX Athletic Club', 'React, TypeScript, Bootstrap 5, Vite', 'Site de club de fitness avec planning, réservation, calcul des abonnements et mode sombre.', 'github.com/yann27miguel/KINETIX', 'sept. 2026'),
            ('Portfolio interactif', 'React, TypeScript, Tailwind CSS, Motion', 'Site personnel en 3 langues avec mode jour/nuit, terminal fonctionnel et palette de commandes.', '', 'nov. 2026'),
        ],
        'education': [
            ('À venir', 'Licence en informatique (Bachelor Informatik)', 'Candidatures en cours dans des universités allemandes, spécialité IA'),
            ('2024', 'GCE Advanced Level', 'GBHS Nkol-Eton, Yaoundé, Cameroun'),
        ],
        'courses': [
            ('sept. 2026', 'Google AI Professional Certificate', 'Google, Coursera (6 cours)'),
            ('sept. 2026', 'Introduction to Artificial Intelligence', 'IBM, Coursera'),
            ('sept. 2026', 'Introduction to Software Engineering', 'IBM, Coursera'),
            ('mars 2026', 'Formation CompTIA Security+', 'Udemy'),
            ('déc. 2025', 'Formation CompTIA Network+', 'Udemy'),
        ],
        'skills': [
            ('Web', 'HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS, Bootstrap'),
            ('Qualité', 'Tests unitaires (Vitest), accessibilité, responsive design, multilingue'),
            ('Fondamentaux', 'Réseaux, sécurité informatique, bases de l’IA, génie logiciel'),
            ('Outils', 'Git, GitHub, Vite, VS Code, outils d’IA'),
        ],
        'languages': [('Français', 'Langue maternelle', 5), ('Anglais', 'Langue maternelle', 5), ('Allemand', 'Préparation du C1 (DSH, telc C1 Hochschule)', 3)],
        'signed': 'Heidelberg, novembre 2026',
    },
}


def b64(path: pathlib.Path) -> str:
    return base64.b64encode(path.read_bytes()).decode()


def render(lang: str, c: dict) -> str:
    dots = lambda n: ''.join(f'<i class="{"on" if i < n else ""}"></i>' for i in range(5))
    projects = ''.join(
        f'''<div class="item"><div class="row"><b>{n}</b><span class="date">{d}</span></div>
        <p class="stack">{s}</p><p>{desc}</p>{f'<p class="link">{l}</p>' if l else ''}</div>'''
        for n, s, desc, l, d in c['projects'])
    edu = ''.join(f'<div class="item"><div class="row"><b>{t}</b><span class="date">{w}</span></div><p>{p}</p></div>' for w, t, p in c['education'])
    courses = ''.join(f'<div class="crow"><span class="date">{w}</span><span><b>{t}</b><br><span class="muted">{p}</span></span></div>' for w, t, p in c['courses'])
    skills = ''.join(f'<p class="sk"><b>{k}</b><br>{v}</p>' for k, v in c['skills'])
    langs = ''.join(f'<div class="lang"><div class="row"><b>{n}</b><span class="dots">{dots(d)}</span></div><p class="muted">{lvl}</p></div>' for n, lvl, d in c['languages'])
    h = c['h']
    return f'''<!DOCTYPE html><html lang="{lang}"><head><meta charset="utf-8"><title>Yann | {c['doc']}</title>
<style>
@font-face {{ font-family: 'Familjen'; src: url(data:font/woff2;base64,{b64(FONT)}) format('woff2'); font-weight: 400 700; unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2212; }}
@font-face {{ font-family: 'Familjen'; src: url(data:font/woff2;base64,{b64(FONT_EXT)}) format('woff2'); font-weight: 400 700; unicode-range: U+0100-024F, U+1E00-1EFF, U+2C60-2C7F; }}
@page {{ size: A4; margin: 0; }}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
html {{ height: 296mm; overflow: hidden; }}
body {{ font-family: 'Familjen', sans-serif; color: #1d1a3b; font-size: 9.4pt; line-height: 1.4; width: 210mm; height: 296mm; overflow: hidden; display: grid; grid-template-columns: 66mm 1fr; }}
aside {{ background: #f3f1fa; padding: 12mm 8mm 10mm 11mm; display: flex; flex-direction: column; gap: 6.5mm; }}
main {{ padding: 12mm 12mm 9mm 10mm; display: flex; flex-direction: column; gap: 4mm; }}
.photo {{ width: 34mm; height: 45mm; border-radius: 17mm 17mm 4mm 4mm; overflow: hidden; background: #e8e4f6; }}
.photo img {{ width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }}
h1 {{ font-size: 30pt; line-height: .95; letter-spacing: -.035em; font-weight: 700; }}
.headline {{ font-size: 12.5pt; font-weight: 600; margin-top: 2mm; letter-spacing: -.01em; max-width: 120mm; }}
.avail {{ display: inline-block; margin-top: 3mm; background: #5b3df5; color: #fff; border-radius: 99px; padding: 1mm 3.2mm; font-size: 8.6pt; font-weight: 600; }}
h2 {{ font-size: 10.5pt; font-weight: 700; color: #5b3df5; margin-bottom: 2.2mm; padding-bottom: 1.2mm; border-bottom: 1.2px solid #dcd7ee; }}
aside h2 {{ border-color: #d4cfe8; }}
.item {{ margin-bottom: 2.2mm; }}
.row {{ display: flex; justify-content: space-between; gap: 3mm; align-items: baseline; }}
.date {{ color: #5f5a80; font-size: 8.6pt; white-space: nowrap; font-variant-numeric: tabular-nums; }}
.stack {{ color: #5b3df5; font-size: 8.6pt; font-weight: 600; }}
.link {{ color: #5f5a80; font-size: 8.4pt; }}
.muted {{ color: #5f5a80; }}
.crow {{ display: grid; grid-template-columns: 20mm 1fr; gap: 3mm; margin-bottom: 1.3mm; }}
.contact p {{ margin-bottom: 1.6mm; word-break: break-word; }}
.contact span {{ display: block; color: #5f5a80; font-size: 8.2pt; }}
.sk {{ margin-bottom: 2mm; }}
.lang {{ margin-bottom: 2.2mm; }}
.dots {{ display: inline-flex; gap: 1.1mm; }}
.dots i {{ width: 2.1mm; height: 2.1mm; border-radius: 50%; background: #d4cfe8; display: inline-block; }}
.dots i.on {{ background: #5b3df5; }}
.signed {{ margin-top: auto; color: #5f5a80; font-size: 8.6pt; }}
</style></head><body>
<aside>
  <div class="photo"><img src="data:image/jpeg;base64,{b64(SRC / 'photo.jpg')}" alt="Yann"></div>
  <section class="contact"><h2>{h['contact']}</h2>
    <p><span>{h['email']}</span>{EMAIL}</p>
    <p><span>GitHub</span>{GITHUB}</p>
    <p><span>Credly</span>{CREDLY}</p>
    <p><span>{h['location']}</span>{c['location']}</p>
  </section>
  <section><h2>{h['languages']}</h2>{langs}</section>
  <section><h2>{h['skills']}</h2>{skills}</section>
</aside>
<main>
  <header><h1>Yann</h1><p class="headline">{c['headline']}</p><span class="avail">{c['availability']}</span></header>
  <section><h2>{h['profile']}</h2><p>{c['profile']}</p></section>
  <section><h2>{h['projects']}</h2>{projects}</section>
  <section><h2>{h['education']}</h2>{edu}</section>
  <section><h2>{h['courses']}</h2>{courses}</section>
  <p class="signed">{c['signed']}</p>
</main>
</body></html>'''


if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=os.environ.get('CHROME_PATH') or None)
        for lang, c in CONTENT.items():
            html = render(lang, c)
            html_path = SRC / f'cv-{lang}.html'
            html_path.write_text(html, encoding='utf-8')
            page = browser.new_page()
            page.goto(html_path.as_uri())
            page.wait_for_timeout(300)
            page.pdf(path=str(OUT / c['file']), format='A4', print_background=True, prefer_css_page_size=True)
            page.close()
            print('wrote', OUT / c['file'])
        browser.close()
