# Yann — portfolio (v2, day and night)

An interactive one-page portfolio built with **React 19, TypeScript, Vite and Tailwind CSS v4**, assembled from open-source React component libraries.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Edit your content

All text, contact details, GitHub projects, skills and certificates live in **`src/data/profile.ts`**.

- `contact.phone` and `contact.linkedin` are empty, so they're hidden. Fill them in to show them.
- To add a GitHub project, add an entry to `projects`. To link a skill to it, add the project name to that skill's `usedIn`.
- Terminal commands are in `src/components/terminal.tsx` (the `COMMANDS` list and the `switch`).

## Where each component comes from

| Component | Library | File |
| --- | --- | --- |
| Button, Badge, Input, Textarea, Label, Toggle Group, Dialog, Command palette | shadcn/ui (Radix UI + cmdk) | `src/components/ui/` |
| Day/night toggle with circular reveal | Magic UI — Animated Theme Toggler | `src/components/magicui/animated-theme-toggler.tsx` |
| Cursor spotlight on project and contact cards | Magic UI — Magic Card | `src/components/magicui/magic-card.tsx` |
| Counting stats | Magic UI — Number Ticker | `src/components/magicui/number-ticker.tsx` |
| Interactive terminal | based on Magic UI — Terminal | `src/components/terminal.tsx` |
| Scrambling name (hover it) | Motion Primitives — Text Scramble | `src/components/motion-primitives/text-scramble.tsx` |
| Project cards that grow into a dialog | Motion Primitives — Morphing Dialog | `src/components/motion-primitives/morphing-dialog.tsx` |
| Message box with characters left | Origin UI | `src/components/originui/textarea-with-limit.tsx` |

## Interactive features

- **Day and night mode**: the button in the top right switches with a circular reveal; "Match my device" is in the command palette. The choice is remembered.
- **Terminal**: type `help`, `projects`, `contact`, `skills`, `certs`, `history`, `ping heidelberg`, `theme night`, `copy email`. Arrow keys go through history, Tab completes.
- **Command palette**: `Ctrl K` / `⌘K` to jump to sections, open repos, copy the email or change theme.
- **Projects**: search, filter by language, sort by newest or A to Z, click a card for details.
- **Skills**: click a skill to see which project or course it comes from.
- **Live Heidelberg clock** in the hero, **copy email** buttons, and a validated **contact form**.

The contact form opens the visitor's email app. To receive messages directly, replace the `mailto:` in `src/components/sections/contact.tsx` with a `fetch()` to Formspree, Resend or your own Express API.

## Deploy

`vite.config.ts` uses `base: './'`, so `dist/` works on Vercel, Netlify or GitHub Pages without changes.
