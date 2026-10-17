# Denys Herasymchuk, portfolio

Personal portfolio site built with React 19, TypeScript, Tailwind CSS 3 and React Router 7 (Create React App).

## Scripts

```bash
npm start       # dev server on http://localhost:3000
npm test        # tests in watch mode (CI=true npm test for a single run)
npm run build   # production build into build/
```

## Structure

```
src/
  App.tsx              mounts the router
  routes/routes.tsx    all routes
  layout/              Layout (navbar, theme), NavLinks, Footer, FooterName
  pages/               Home (Hero + About), NotFound
  components/          own UI: PrimaryButton, StackTile, ThemeToggle, Logo, LogoMenu, BackToTop
  components/reactbits/  components adapted from React Bits
  data/                site links (site.ts) and the tech stack logos (stack.ts)
  assets/  fonts/
```

Links, socials and footer columns live in `src/data/site.ts`. Theme colours are CSS variables at the top of `src/index.css`.

## Fonts

The display fonts are free demo versions licensed for personal use only:

- Historical Conditions by 177Studio (hero headline). The demo replaces digits, punctuation and ligatures with a watermark.
- Craze by Pian45 Studio (footer name).

Buy the full licences before using the site commercially.

Tech logos are from [Simple Icons](https://simpleicons.org) (CC0).
