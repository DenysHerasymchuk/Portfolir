# Denys Herasymchuk, portfolio

My personal site. There's a hero you can play with, case studies with animated architecture diagrams, a page for my stack, and a footer where clicking my name knocks tech logos out of it. Built with React, TypeScript and Tailwind, in a beige light theme and a dark one.

The projects on the Work page are sample case studies for this demo build. They live in `src/data/projects.ts` and get swapped for real work before the site goes public.

## Run it

You need Node 18 or newer and npm.

```bash
npm install
npm start          # http://localhost:3000
```

Other scripts:

```bash
npm test           # tests in watch mode, CI=true npm test for a single run
npm run build      # production build in build/
```

The build is a plain static site, so any static host will do. Point the host's fallback at `index.html`, or routes like `/work/floodline` will 404 on refresh.

## What's in here

| Page | Route | What it shows |
|---|---|---|
| Home | `/` | Hero, about me, selected work, experience, contact |
| Work | `/work` | All case studies |
| Case study | `/work/:slug` | Overview, results, architecture diagram, decisions, what went wrong |
| About | `/about` | How I work, experience |
| Stack | `/stack` | Every tool I use, grouped, with links |
| Contact | `/contact` | Email and socials |

Under the hood it's React 19 and TypeScript on Create React App, with React Router 7 doing view transitions between pages. Styling is Tailwind CSS 3, and the theme colours are CSS variables. GSAP drives the mobile menu and WebGL draws the hero background.

Light and dark mode follow your system until you pick one. If your device asks for reduced motion, the animations calm down.

## Project layout

```
src/
  routes/routes.tsx       every route in one place
  layout/                 navbar, theme toggle, footer and the falling-logo name
  pages/                  one file per page, home sections in pages/home/
  components/             shared UI: diagrams, chips, icons, timeline
  components/reactbits/   components adapted from React Bits
  data/                   all the content
  assets/  fonts/
```

## Changing the content

Almost everything you read on the site comes from `src/data/`, so editing content rarely means touching a component.

- `projects.ts`: the case studies, including diagram nodes, decisions and results
- `tech.ts`: the Stack page groups, tech logos, brand colours and doc links
- `site.ts`: nav links, socials, footer columns and the experience timeline
- `stack.ts`: tile colours for the main tech logos

Theme colours sit at the top of `src/index.css`.

## Credits

- The hero background, the mobile menu and a few effects are adapted from [React Bits](https://reactbits.dev).
- Tech logos come from [Simple Icons](https://simpleicons.org) (CC0), plus [Devicon](https://devicon.dev) for C#.
- Fonts are Historical Conditions by 177Studio and Craze by Pian45 Studio. Both are demo versions for personal use, so buy the full licences before using them anywhere commercial.

## License

The code is under the [PolyForm Noncommercial License 1.0.0](LICENSE). Take it apart, learn from it, reuse bits of it in your own stuff, as long as you're not making money from it. For anything commercial, ask me first.

My photo, the organisation logos, the fonts and the React Bits components aren't covered. [LICENSE](LICENSE) lists them.

Questions or ideas: den.herasymchuk@gmail.com
