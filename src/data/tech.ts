import angular from '../assets/stack/angular.svg';
import claude from '../assets/stack/claude.svg';
import caddy from '../assets/stack/caddy.svg';
import csharp from '../assets/stack/csharp.svg';
import css from '../assets/stack/css.svg';
import dotnet from '../assets/stack/dotnet.svg';
import gitlab from '../assets/stack/gitlab.svg';
import gnubash from '../assets/stack/gnubash.svg';
import github from '../assets/stack/github.svg';
import grafana from '../assets/stack/grafana.svg';
import html from '../assets/stack/html5.svg';
import javascript from '../assets/stack/javascript.svg';
import kafka from '../assets/stack/apachekafka.svg';
import kubernetes from '../assets/stack/kubernetes.svg';
import laravel from '../assets/stack/laravel.svg';
import mongodb from '../assets/stack/mongodb.svg';
import mysql from '../assets/stack/mysql.svg';
import playwright from '../assets/stack/playwright.svg';
import prometheus from '../assets/stack/prometheus.svg';
import redis from '../assets/stack/redis.svg';
import sqlite from '../assets/stack/sqlite.svg';
import { STACK, type Tech } from './stack';

// Logos for every technology named on the site, keyed by display name. Simple Icons (CC0), plus each project's own
// artwork for the `color` ones that Simple Icons doesn't carry.
// The headline tiles in STACK keep their curated colours; the rest use the brand colour.
const EXTRA: Record<string, { icon: string; hex: string; color?: boolean }> = {
  Redis: { icon: redis, hex: '#FF4438' },
  Kafka: { icon: kafka, hex: '#231F20' },
  Kubernetes: { icon: kubernetes, hex: '#326CE5' },
  Caddy: { icon: caddy, hex: '#1F88C0' },
  Prometheus: { icon: prometheus, hex: '#E6522C' },
  Grafana: { icon: grafana, hex: '#F46800' },
  Playwright: { icon: playwright, hex: '#ffffff', color: true },
  Angular: { icon: angular, hex: '#0F0F11' },
  HTML: { icon: html, hex: '#E34F26' },
  CSS: { icon: css, hex: '#663399' },
  JavaScript: { icon: javascript, hex: '#F7DF1E' },
  Bash: { icon: gnubash, hex: '#4EAA25' },
  '.NET': { icon: dotnet, hex: '#512BD4' },
  'C#': { icon: csharp, hex: '#239120' }, // Devicon (MIT); Simple Icons has none
  Laravel: { icon: laravel, hex: '#FF2D20' },
  'Claude Code': { icon: claude, hex: '#D97757' },
  SQLite: { icon: sqlite, hex: '#003B57' },
  MySQL: { icon: mysql, hex: '#4479A1' },
  MongoDB: { icon: mongodb, hex: '#47A248' },
  GitHub: { icon: github, hex: '#181717' },
  GitLab: { icon: gitlab, hex: '#FC6D26' },
};

const ALIASES: Record<string, string> = { Postgres: 'PostgreSQL', Tailwind: 'Tailwind CSS' };

// Dark text on light brand colours (JavaScript yellow), white on the rest.
const readableOn = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum > 0.6 ? '#1a1a1a' : '#ffffff';
};

const BY_NAME: Record<string, Tech> = Object.fromEntries([
  ...STACK.flat().map(t => [t.name, t]),
  ...Object.entries(EXTRA).map(([name, { icon, hex, color }]) => [
    name,
    { name, icon, bg: hex, fg: readableOn(hex), color },
  ]),
]);

// Undefined for technologies without a logo; callers show a lettered fallback.
export const techLogo = (name: string): Tech | undefined => BY_NAME[ALIASES[name] ?? name];

const saturation = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return Math.max(...c) - Math.min(...c);
};

// The logo's own colour: whichever of the tile's two colours is more vivid (React's cyan, not its dark tile).
// Undefined for greyscale logos such as Figma, so callers keep the text colour.
export const brandColor = (name: string): string | undefined => {
  const tech = techLogo(name);
  if (!tech || tech.color) return undefined;
  const hex = saturation(tech.fg) > saturation(tech.bg) ? tech.fg : tech.bg;
  return saturation(hex) > 40 ? hex : undefined;
};

// Everything on the Stack page, grouped. Also feeds the hero tiles and the footer's falling logos.
export const STACK_GROUPS = [
  { name: 'Frontend', items: ['TypeScript', 'React', 'Angular', 'Tailwind CSS'] },
  { name: 'Backend', items: ['Go', 'Node.js', 'Python', '.NET', 'Laravel'] },
  { name: 'Data', items: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Redis', 'Kafka'] },
  { name: 'Infrastructure', items: ['Docker', 'Kubernetes', 'Linux', 'Caddy', 'Prometheus', 'Grafana'] },
  { name: 'Tools', items: ['Git', 'Bash', 'Figma', 'Playwright'] },
  { name: 'AI Coding', items: ['Claude Code', 'Subagents', 'Skills', 'MCP'] },
  // Swaps its title for `alias` on hover; `wide` spans the full row with items three across.
  {
    name: 'Bonus',
    wide: true,
    alias: 'Goes without saying',
    items: ['HTML', 'CSS', 'JavaScript', 'C#', 'PHP', 'GitHub', 'GitLab'],
  },
];

const ON_STACK = new Set(STACK_GROUPS.flatMap(g => g.items));
export const onStack = (name: string) => ON_STACK.has(ALIASES[name] ?? name);

// The hero's two tiles, alternating through every listed tool that has a logo.
const withLogo = STACK_GROUPS.flatMap(g => g.items).flatMap(name => techLogo(name) ?? []);
export const TILE_SETS: Tech[][] = [withLogo.filter((_, i) => i % 2 === 0), withLogo.filter((_, i) => i % 2 === 1)];

// Official site or reference docs for every tool and concept named on the site.
const URLS: Record<string, string> = {
  // How I work (About page)
  StarUML: 'https://staruml.io',
  MoSCoW: 'https://en.wikipedia.org/wiki/MoSCoW_method',
  'weighted decision matrix': 'https://en.wikipedia.org/wiki/Decision_matrix',
  Photoshop: 'https://www.adobe.com/products/photoshop.html',
  WCAG: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
  Lighthouse: 'https://developer.chrome.com/docs/lighthouse/overview',
  Caddy: 'https://caddyserver.com',
  Docker: 'https://www.docker.com',
  Figma: 'https://www.figma.com',
  Git: 'https://git-scm.com',
  GitHub: 'https://github.com',
  GitLab: 'https://gitlab.com',
  Go: 'https://go.dev',
  Grafana: 'https://grafana.com',
  Angular: 'https://angular.dev',
  HTML: 'https://developer.mozilla.org/docs/Web/HTML',
  CSS: 'https://developer.mozilla.org/docs/Web/CSS',
  JavaScript: 'https://developer.mozilla.org/docs/Web/JavaScript',
  Laravel: 'https://laravel.com',
  '.NET': 'https://dotnet.microsoft.com',
  Bash: 'https://www.gnu.org/software/bash/',
  'C#': 'https://learn.microsoft.com/dotnet/csharp',
  MySQL: 'https://www.mysql.com',
  SQLite: 'https://sqlite.org',
  MongoDB: 'https://www.mongodb.com',
  'Claude Code': 'https://code.claude.com/docs/en/overview',
  Subagents: 'https://code.claude.com/docs/en/sub-agents',
  Skills: 'https://code.claude.com/docs/en/skills',
  MCP: 'https://modelcontextprotocol.io',
  Kafka: 'https://kafka.apache.org',
  Kubernetes: 'https://kubernetes.io',
  Linux: 'https://www.kernel.org',
  'Node.js': 'https://nodejs.org',
  PHP: 'https://www.php.net',
  Playwright: 'https://playwright.dev',
  PostgreSQL: 'https://www.postgresql.org',
  Prometheus: 'https://prometheus.io',
  Python: 'https://www.python.org',
  React: 'https://react.dev',
  Redis: 'https://redis.io',
  'Tailwind CSS': 'https://tailwindcss.com',
  TypeScript: 'https://www.typescriptlang.org',
  mediasoup: 'https://mediasoup.org',
};

export const techUrl = (name: string): string | undefined => URLS[ALIASES[name] ?? name];
