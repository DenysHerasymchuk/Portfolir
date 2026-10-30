import hale1 from '../assets/projects/hale-1.webp';
import hale2 from '../assets/projects/hale-2.webp';
import hale3 from '../assets/projects/hale-3.webp';
import esnForms1 from '../assets/projects/esn-forms-1.webp';
import esnForms2 from '../assets/projects/esn-forms-2.webp';
import zhralovka1 from '../assets/projects/zhralovka-1.webp';
import zhralovka2 from '../assets/projects/zhralovka-2.webp';
import zhralovka3 from '../assets/projects/zhralovka-3.webp';
import esnGeel1 from '../assets/projects/esn-geel-1.webp';
import esnGeel2 from '../assets/projects/esn-geel-2.webp';
import esnGeel3 from '../assets/projects/esn-geel-3.webp';
import jouwPlekje1 from '../assets/projects/jouw-plekje-1.webp';
import farmpoint1 from '../assets/projects/farmpoint-1.webp';
import dayn1 from '../assets/projects/dayn-1.webp';
import uchtem1 from '../assets/projects/uchtem-1.webp';
import uchtem2 from '../assets/projects/uchtem-2.webp';
import uchtem3 from '../assets/projects/uchtem-3.webp';
import portfolio1 from '../assets/projects/portfolio-1.webp';
import portfolio2 from '../assets/projects/portfolio-2.webp';
import riyCharity1 from '../assets/projects/riy-charity-1.webp';

export type ArchNode = {
  id: string;
  label: string;
  detail: string;
  x: number; // diagram coordinates: x 0 to 1000, y roughly 120 to 440
  y: number;
  kind: 'client' | 'service' | 'store' | 'queue' | 'edge';
};

export type ArchEdge = { from: string; to: string; label?: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  year: string;
  role: string;
  duration?: string; // left out when the real time spent isn't known
  live?: string;
  source?: string;
  overview: string[];
  responsibilities: string[];
  stack: { layer: string; items: string[] }[];
  architecture: {
    nodes: ArchNode[];
    edges: ArchEdge[];
    notes: { title: string; body: string }[];
  };
  decisions: { title: string; body: string }[];
  challenges: { title: string; body: string }[];
  results: { value: string; label: string }[];
  images: { src: string; alt: string; caption: string; fit?: 'contain'; bg?: string }[]; // empty when no image exists
  hue: number; // diagram tint
};

export const PROJECTS: Project[] = [
  {
    slug: 'hale-and-grain',
    name: 'Hale & Grain',
    tagline: 'A furniture shop where you can spin, zoom and inspect every piece in 3D before buying it.',
    summary:
      'A full webshop with a 3D product viewer, real orders, accounts and an admin area, built with React Three Fiber on the front and ASP.NET Core with PostgreSQL behind it.',
    year: '2026',
    role: 'Solo project. Frontend, 3D viewer, backend, admin area, CI.',
    live: 'https://hg.denysherasymchuk.com',
    source: 'https://github.com/DenysHerasymchuk/hale-and-grain',
    overview: [
      'Hale & Grain is a furniture webshop built around one idea: you should be able to walk around a piece before it arrives. Every product page has a 3D viewer, and picking a finish re-tints the model on the spot.',
      'Around the viewer sits a complete shop: search, filters and sorting, a wishlist, a cart that survives a refresh, guest checkout with a private order link, and accounts with saved addresses, order history and self-service deletion.',
      'The admin area covers products, finishes, photos, 3D settings with a live preview, categories, stock, orders, customers and store settings. Payments are simulated on purpose: orders are marked as development orders and never as paid.',
    ],
    responsibilities: [
      'Built the React storefront and the 3D viewer with React Three Fiber.',
      'Built the ASP.NET Core API in C# with EF Core and PostgreSQL.',
      'Wrote the checkout, which recalculates every price on the server and reserves stock in one transaction.',
      'Set up CI with xUnit, Vitest, Docker image builds, a Semgrep scan and a merge gate.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['.NET', 'C#'] },
      { layer: 'Data', items: ['PostgreSQL'] },
      { layer: 'Infra', items: ['Docker', 'GitHub'] },
    ],
    architecture: {
      nodes: [
        { id: 'shop', label: 'Shop', detail: 'React, 3D viewer', x: 110, y: 150, kind: 'client' },
        { id: 'admin', label: 'Admin area', detail: 'React, /admin', x: 110, y: 410, kind: 'client' },
        { id: 'api', label: 'API', detail: 'ASP.NET Core', x: 390, y: 280, kind: 'service' },
        { id: 'app', label: 'Application', detail: 'Pricing, checkout', x: 640, y: 150, kind: 'service' },
        { id: 'infra', label: 'Infrastructure', detail: 'EF Core, email', x: 640, y: 410, kind: 'service' },
        { id: 'db', label: 'Postgres', detail: 'Products, orders', x: 890, y: 280, kind: 'store' },
      ],
      edges: [
        { from: 'shop', to: 'api', label: 'REST' },
        { from: 'admin', to: 'api', label: 'REST' },
        { from: 'api', to: 'app' },
        { from: 'api', to: 'infra' },
        { from: 'app', to: 'db' },
        { from: 'infra', to: 'db', label: 'migrations' },
      ],
      notes: [
        {
          title: '3D viewer',
          body: 'Product pages render the model with React Three Fiber, and choosing a finish re-tints it. The five models are CC0 from Poly Haven, and the product photos are my own Blender renders of them.',
        },
        {
          title: 'Backend layers',
          body: 'The backend is five projects: Domain, Contracts, Application, Infrastructure and Api. Dependencies only point inwards, and architecture tests fail the build if one leaks.',
        },
        {
          title: 'Checkout',
          body: 'The server recalculates every price and the delivery charge, and reserves stock in the same transaction. Two people can never both buy the last cabinet, because the database decides who gets it.',
        },
        {
          title: 'Admin',
          body: 'The API checks the Admin role on every request, so hiding the menu is not what keeps the admin area safe.',
        },
      ],
    },
    decisions: [
      {
        title: 'Prices are decided on the server',
        body: 'The browser never gets to say what something costs. Checkout works out every price and delivery charge again before an order is created.',
      },
      {
        title: 'Payments behind an interface',
        body: 'Checkout is clearly labelled as a development checkout. A real provider can later slot in behind IPaymentProvider without touching the order flow.',
      },
    ],
    challenges: [],
    results: [
      { value: '5', label: '3D models in the shop' },
      { value: '5', label: 'Backend projects, inward dependencies only' },
      { value: '3', label: 'Backend test projects' },
    ],
    images: [
      { src: hale1, alt: 'Hale & Grain home page with a shelving cabinet', caption: 'Home page' },
      { src: hale2, alt: 'Render of a timber joint', caption: 'Joinery' },
      { src: hale3, alt: 'Close-up of the Atelier drawer cabinet', caption: 'Product render' },
    ],
    hue: 32,
  },
  {
    slug: 'esn-forms',
    name: 'ESN Forms',
    tagline: 'A form builder of our own, so ESN Geel members stop making a new Google Form for every event.',
    summary:
      'A form-building and event registration platform for ESN Geel: members build a form, publish a public link and track responses, while admins manage accounts and every form.',
    year: '2026',
    role: 'Main developer. It started from a static page a fellow developer made, and I built the platform on top.',
    duration: '4 months',
    live: 'https://esn-forms.vercel.app',
    source: 'https://github.com/DenysHerasymchuk/ESN-Forms',
    overview: [
      'ESN Geel runs a lot of events, and each one used to need its own Google Form. ESN Forms gives the section one place to create, publish and manage registrations.',
      'After signing in, a member builds a form from field types such as short answer, email, dropdowns, checkboxes and acknowledgements, publishes it to a shareable link, and follows responses in the built-in submissions view.',
      'Admins can oversee every form and manage accounts from a dedicated area. There is no public sign-up, so accounts are only created by an admin.',
    ],
    responsibilities: [
      'Built the React app, including the form builder and the schema-driven form renderer.',
      'Designed the PostgreSQL schema, row level security policies and triggers on Supabase.',
      'Wrote the Edge Functions for public submissions and admin account management.',
      'Added Cloudflare Turnstile verification on the public submission path.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Supabase'] },
      { layer: 'Data', items: ['PostgreSQL'] },
      { layer: 'Infra', items: ['GitHub'] },
    ],
    architecture: {
      nodes: [
        { id: 'public', label: 'Public form', detail: 'Shareable link', x: 110, y: 150, kind: 'client' },
        { id: 'dash', label: 'Dashboard', detail: 'React builder', x: 110, y: 410, kind: 'client' },
        { id: 'submit', label: 'submit-form', detail: 'Edge Function', x: 420, y: 150, kind: 'service' },
        { id: 'admin', label: 'Admin functions', detail: 'Users, force delete', x: 420, y: 410, kind: 'service' },
        { id: 'turnstile', label: 'Turnstile', detail: 'Bot check', x: 700, y: 150, kind: 'edge' },
        { id: 'db', label: 'Postgres', detail: 'RLS, triggers', x: 760, y: 410, kind: 'store' },
      ],
      edges: [
        { from: 'public', to: 'submit', label: 'answers' },
        { from: 'submit', to: 'turnstile', label: 'verify' },
        { from: 'submit', to: 'db', label: 'write' },
        { from: 'dash', to: 'db', label: 'RLS' },
        { from: 'dash', to: 'admin' },
        { from: 'admin', to: 'db' },
      ],
      notes: [
        {
          title: 'Form schema',
          body: 'Forms are stored as a field schema. One shared validator is used by both the frontend renderer and the submit-form function, so what counts as a valid answer is defined once.',
        },
        {
          title: 'Public submissions',
          body: 'The submit-form Edge Function is the only public way to write a submission. It verifies a Cloudflare Turnstile token before it accepts anything.',
        },
        {
          title: 'Database rules',
          body: 'Row level security, Postgres functions and triggers handle the form lifecycle, submission validation and roles, so the rules hold no matter which client is calling.',
        },
        {
          title: 'Admin functions',
          body: 'Creating, editing and deleting accounts, and force-deleting a form with responses, need the service-role key. Those actions live in admin-only Edge Functions instead of the browser.',
        },
      ],
    },
    decisions: [
      {
        title: 'No public sign-up',
        body: 'This is an internal tool for a volunteer section, so accounts are created by an admin. That removes a whole class of abuse.',
      },
      {
        title: 'One write path for submissions',
        body: 'Sending every public answer through one Edge Function gives a single place for bot checks and validation.',
      },
    ],
    challenges: [],
    results: [
      { value: '10', label: 'Field types in the builder' },
      { value: '5', label: 'Edge Functions' },
      { value: '17', label: 'Schema migrations' },
    ],
    images: [
      { src: esnForms1, alt: 'ESN Forms banner reading From sign-up to show-up', caption: 'ESN Forms' },
      { src: esnForms2, alt: 'ESN Forms login page', caption: 'Login' },
    ],
    hue: 200,
  },
  {
    slug: 'zhralovka',
    name: 'Zhralovka',
    tagline: 'The Thomas More cafeteria menu in Telegram, with a daily reminder before lunch.',
    summary:
      "A Telegram bot where you pick your campus once and get today's menu, the week, prices and a daily reminder, in English, Dutch or Ukrainian.",
    year: '2026',
    role: 'Solo project. Bot, data storage, translations, deployment.',
    duration: '4 days',
    live: 'https://t.me/zhralovkabot',
    source: 'https://github.com/DenysHerasymchuk/zhralovka',
    overview: [
      'Zhralovka answers one question for Thomas More students: what is for lunch? You pick your campus once, then ask for today, the week or the price board, or have the menu sent to you every day at 11:00.',
      'It works in groups too. Group admins set the campus and the daily menu, and everyone can ask for the menu.',
      'Menus come from the cafeteria API, which only has English and Dutch dish names. Each dish is translated to Ukrainian once with DeepL and stored, so a dish never has to be translated twice.',
    ],
    responsibilities: [
      'Built the bot in Python with aiogram, including commands, settings and group support.',
      'Wrote the menu client with a weekly cache, plus retries when the new week is not out yet.',
      'Added translations for dish names and the bot text in three languages.',
      'Set up GitHub Actions to test, build the Docker image and redeploy through Coolify.',
    ],
    stack: [
      { layer: 'Backend', items: ['Python', 'aiogram'] },
      { layer: 'Data', items: ['SQLite'] },
      { layer: 'Infra', items: ['Docker', 'GitHub', 'Coolify'] },
    ],
    architecture: {
      nodes: [
        { id: 'users', label: 'Telegram', detail: 'Chats and groups', x: 110, y: 280, kind: 'client' },
        { id: 'bot', label: 'Bot', detail: 'Python, aiogram', x: 370, y: 280, kind: 'service' },
        { id: 'menu', label: 'Menu client', detail: 'Weekly cache', x: 620, y: 150, kind: 'service' },
        { id: 'notifier', label: 'Notifier', detail: 'Daily menu', x: 620, y: 410, kind: 'service' },
        { id: 'api', label: 'Menu API', detail: 'Thomas More', x: 880, y: 150, kind: 'edge' },
        { id: 'db', label: 'SQLite', detail: 'Users, translations', x: 880, y: 410, kind: 'store' },
      ],
      edges: [
        { from: 'users', to: 'bot', label: 'commands' },
        { from: 'bot', to: 'menu' },
        { from: 'menu', to: 'api', label: 'fetch' },
        { from: 'bot', to: 'notifier' },
        { from: 'notifier', to: 'db' },
        { from: 'bot', to: 'db' },
      ],
      notes: [
        {
          title: 'Menu cache',
          body: "Each campus's week is fetched once and cached until Monday 07:00. If the new week is not published yet, the bot retries every 30 minutes.",
        },
        {
          title: 'Translations',
          body: 'The menu API has no Ukrainian, so dish names go through DeepL once and are stored in SQLite. New weeks are translated on Monday morning, and without a key dishes simply stay in English.',
        },
        {
          title: 'Prices',
          body: 'Prices are not in the API. They live in one file, copied from the printed price board in cents.',
        },
        {
          title: 'Daily menu',
          body: 'The notifier skips days without dishes and days when the service is down, and users who block the bot are unsubscribed.',
        },
      ],
    },
    decisions: [
      {
        title: 'Cache the whole week',
        body: 'Menus rarely change, so one fetch per campus per week keeps the bot fast and light on the API. The trade-off is that mid-week kitchen changes are not picked up.',
      },
    ],
    challenges: [],
    results: [
      { value: '7', label: 'Campuses' },
      { value: '3', label: 'Languages' },
      { value: '9', label: 'Commands' },
      { value: '11:00', label: 'Default daily menu' },
    ],
    images: [
      { src: zhralovka1, alt: 'Zhralovka banner with a cat on a burger', caption: 'Bot banner' },
      { src: zhralovka2, alt: 'Zhralovka Today card with a plate of food', caption: 'Today' },
      { src: zhralovka3, alt: 'Zhralovka This Week card with several dishes', caption: 'This week' },
    ],
    hue: 48,
  },
  {
    slug: 'esn-geel',
    name: 'ESN Geel',
    tagline: 'A from-scratch rebuild of the ESN Geel website, with events that board members publish themselves.',
    summary:
      'The new website for the Erasmus Student Network section of Geel, Turnhout and Vorselaar, in progress: a React site with its events served from a Drupal CMS.',
    year: '2026',
    role: 'Solo project as IT Manager of ESN Geel. Still in progress.',
    duration: 'Since Aug 2026',
    live: 'https://esngeel.org',
    overview: [
      'ESN Geel is the local Erasmus Student Network section for Geel, Turnhout and Vorselaar. As its IT Manager I am rebuilding the website from scratch, and this page will grow as the work continues.',
      'The site is a Vite and React frontend. Besides the home page it has pages for events, the team, partners, the ESNcard and the legal texts.',
      'Events come from a Drupal CMS over JSON:API. Board members get an event editor role, so they can publish events themselves without touching the code.',
    ],
    responsibilities: [
      'Built the React site and its visual style, following the ESN brand.',
      'Set up Drupal with an event content type and a role for board members.',
      'Connected the Events page to Drupal over JSON:API.',
      'Set up the deployment to Hostinger through GitHub Actions.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'JavaScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Drupal', 'PHP'] },
      { layer: 'Data', items: ['MySQL'] },
      { layer: 'Infra', items: ['Docker', 'GitHub'] },
    ],
    architecture: {
      nodes: [
        { id: 'visitor', label: 'Visitors', detail: 'Browser', x: 110, y: 150, kind: 'client' },
        { id: 'site', label: 'Website', detail: 'React, Vite', x: 400, y: 150, kind: 'service' },
        { id: 'drupal', label: 'Drupal', detail: 'JSON:API', x: 680, y: 150, kind: 'service' },
        { id: 'db', label: 'MySQL', detail: 'Content', x: 890, y: 280, kind: 'store' },
        { id: 'board', label: 'Board members', detail: 'Event editors', x: 680, y: 410, kind: 'client' },
      ],
      edges: [
        { from: 'visitor', to: 'site', label: 'HTTPS' },
        { from: 'site', to: 'drupal', label: 'events' },
        { from: 'drupal', to: 'db' },
        { from: 'board', to: 'drupal', label: 'publish' },
      ],
      notes: [
        {
          title: 'Website',
          body: 'A static React build, deployed to Hostinger by GitHub Actions. Design tokens for colours, fonts, spacing and motion are written down in a style guide that the whole site follows.',
        },
        {
          title: 'Events',
          body: 'The Events page fetches published event nodes from JSON:API at runtime, so a new event appears without a rebuild. CORS is limited to the website origins and to GET requests.',
        },
      ],
    },
    decisions: [
      {
        title: 'Drupal only for events',
        body: 'Board members change every year and should not need a developer to post an event. A small CMS behind a static site gives them that, while the site itself stays simple to host.',
      },
    ],
    challenges: [],
    results: [
      { value: '3', label: 'Towns covered by the section' },
      { value: '8', label: 'Pages so far' },
    ],
    images: [
      { src: esnGeel1, alt: 'ESN Geel home page reading Your Erasmus starts in Geel', caption: 'Home page' },
      { src: esnGeel2, alt: 'Large group of ESN volunteers holding ESN banners', caption: 'ESN community' },
      { src: esnGeel3, alt: 'Sample ESNcard with a cartoon cow', caption: 'ESNcard page', fit: 'contain', bg: '#ffffff' },
    ],
    hue: 190,
  },
  {
    slug: 'jouw-plekje',
    name: 'Jouw Plekje',
    tagline: 'Matchmaking that connects brands with local cafés for advertising partnerships.',
    summary:
      'A matchmaking platform built during an international Blended Intensive Programme on data science and AI. I owned the backend CRUD and the admin panel.',
    year: '2026',
    role: 'Team project. I owned the backend CRUD and the admin panel.',
    duration: '2 months',
    overview: [
      'Jouw Plekje connects brands with local cafés for advertising partnerships. Brands and cafés each get a profile, send each other match requests, and form a match when the other side accepts.',
      'We built it during an international Blended Intensive Programme on data science and AI at Breda University of Applied Sciences, and presented it as a working concept at the final showcase.',
    ],
    responsibilities: [
      'Designed the PostgreSQL schema and built the backend CRUD.',
      'Built the admin panel and the validation and image uploads behind the profiles.',
      'Wrote the matching logic, from request to accepted match.',
      'Set up role-based access for admins, brands and cafés.',
    ],
    stack: [
      { layer: 'Frontend', items: ['Livewire', 'Alpine.js', 'Tailwind CSS', 'Vite'] },
      { layer: 'Backend', items: ['Laravel', 'PHP'] },
      { layer: 'Data', items: ['PostgreSQL'] },
      { layer: 'Infra', items: ['Docker'] },
    ],
    architecture: {
      nodes: [
        { id: 'brand', label: 'Brands', detail: 'Dashboard', x: 110, y: 150, kind: 'client' },
        { id: 'cafe', label: 'Cafés', detail: 'Dashboard', x: 110, y: 410, kind: 'client' },
        { id: 'app', label: 'Laravel app', detail: 'Livewire, roles', x: 400, y: 280, kind: 'service' },
        { id: 'match', label: 'Matching', detail: 'Requests, matches', x: 660, y: 150, kind: 'service' },
        { id: 'admin', label: 'Admin panel', detail: 'Livewire', x: 660, y: 410, kind: 'service' },
        { id: 'db', label: 'Postgres', detail: 'Profiles, matches', x: 890, y: 280, kind: 'store' },
      ],
      edges: [
        { from: 'brand', to: 'app' },
        { from: 'cafe', to: 'app' },
        { from: 'app', to: 'match' },
        { from: 'app', to: 'admin' },
        { from: 'match', to: 'db' },
        { from: 'admin', to: 'db' },
      ],
      notes: [
        {
          title: 'Matching',
          body: 'Either side can send a match request, which stays pending until it is accepted or declined. An accepted request becomes a match, and both sides are notified.',
        },
        {
          title: 'Roles',
          body: 'Route middleware checks the role of every user, and a second check keeps people out of the dashboard until their profile is complete.',
        },
      ],
    },
    decisions: [],
    challenges: [],
    results: [
      { value: '3', label: 'Types of account' },
      { value: '2', label: 'Months in an international team' },
    ],
    images: [
      { src: jouwPlekje1, alt: 'Jouw Plekje logo', caption: 'Logo', fit: 'contain', bg: '#ffffff' },
    ],
    hue: 340,
  },
  {
    slug: 'farmpoint',
    name: 'FarmPoint',
    tagline: 'African farmers buy and sell crops through Telegram, with a Laravel admin panel behind it.',
    summary:
      "Built in three days at Thomas More's MORE Week hackathon. I worked on the backend: the database design, CRUD and the admin dashboard.",
    year: '2026',
    role: 'Team project. I worked on the backend and the admin dashboard.',
    duration: '3 days',
    overview: [
      "FarmPoint helps African farmers buy and sell crops through Telegram, so they can trade from a phone without learning a new app. It was built in three days at Thomas More's MORE Week hackathon.",
      'Behind the bot is a Laravel admin panel where governments and agronomists can monitor activity. The team demoed the MVP to the jury at the final.',
    ],
    responsibilities: [
      'Designed the database for farmers, crops and transactions.',
      'Built the CRUD screens and the live-search tables with Livewire.',
      'Built the admin dashboard for governments and agronomists.',
    ],
    stack: [
      { layer: 'Frontend', items: ['Livewire', 'Alpine.js', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Laravel', 'PHP'] },
      { layer: 'Data', items: ['SQLite'] },
    ],
    architecture: {
      nodes: [
        { id: 'farmers', label: 'Farmers', detail: 'Telegram', x: 110, y: 150, kind: 'client' },
        { id: 'bot', label: 'Bot endpoint', detail: 'Laravel API', x: 400, y: 150, kind: 'edge' },
        { id: 'app', label: 'Laravel app', detail: 'Models, CRUD', x: 660, y: 280, kind: 'service' },
        { id: 'db', label: 'Database', detail: 'Crops, transactions', x: 890, y: 280, kind: 'store' },
        { id: 'admin', label: 'Admin panel', detail: 'Livewire', x: 400, y: 410, kind: 'service' },
        { id: 'gov', label: 'Governments', detail: 'And agronomists', x: 110, y: 410, kind: 'client' },
      ],
      edges: [
        { from: 'farmers', to: 'bot', label: 'chat' },
        { from: 'bot', to: 'app' },
        { from: 'app', to: 'db' },
        { from: 'gov', to: 'admin' },
        { from: 'admin', to: 'app' },
      ],
      notes: [
        {
          title: 'Admin panel',
          body: 'Livewire screens cover farms, products, users and warehouses, with live-search tables and a dashboard for monitoring activity.',
        },
        {
          title: 'Telegram',
          body: 'The bot talks to the Laravel app through a dedicated API endpoint, so chat orders end up in the same database as everything else.',
        },
      ],
    },
    decisions: [],
    challenges: [],
    results: [
      { value: '3', label: 'Days from idea to demo' },
      { value: '4', label: 'Admin CRUD areas' },
      { value: '3', label: 'Account roles' },
    ],
    images: [
      { src: farmpoint1, alt: 'FarmPoint banner reading Fresh from the farm, straight to your table', caption: 'FarmPoint', fit: 'contain', bg: '#0b2a20' },
    ],
    hue: 110,
  },
  {
    slug: 'dayn',
    name: 'DAYN',
    tagline: 'Send a link to a Telegram bot and get the video, audio or slideshow back in your chat.',
    summary:
      "A Telegram bot that downloads from YouTube and TikTok, with quality menus, live progress, and a direct link for files over Telegram's 50 MB limit.",
    year: '2026',
    role: 'Solo project. Bot, downloaders, file server, monitoring.',
    duration: '3 months',
    overview: [
      'DAYN, short for Download All Your Needs, makes downloading from YouTube and TikTok as simple as sending a link. It handles videos, audio and photo slideshows.',
      'Users pick the quality from inline menus and see live progress updates while the file downloads. Private or geo-restricted videos are handled, and temporary files are cleaned up after sending.',
      "Telegram bots can only upload files up to 50 MB. Bigger files are served by a small built-in HTTP server instead, and the user gets a direct download link that expires after a set time.",
    ],
    responsibilities: [
      'Built the bot in Python with aiogram, with separate handlers for YouTube and TikTok.',
      'Wrote the downloaders on top of yt-dlp, including quality selection and audio extraction.',
      'Built the file server for large files.',
      'Added Prometheus metrics and Grafana dashboards, all run with Docker Compose.',
    ],
    stack: [
      { layer: 'Backend', items: ['Python', 'aiogram', 'yt-dlp'] },
      { layer: 'Infra', items: ['Docker', 'Prometheus', 'Grafana'] },
    ],
    architecture: {
      nodes: [
        { id: 'user', label: 'Telegram', detail: 'Sends a link', x: 110, y: 150, kind: 'client' },
        { id: 'bot', label: 'Bot', detail: 'aiogram handlers', x: 370, y: 150, kind: 'service' },
        { id: 'dl', label: 'Downloaders', detail: 'yt-dlp', x: 630, y: 150, kind: 'service' },
        { id: 'src', label: 'Sources', detail: 'YouTube, TikTok', x: 890, y: 150, kind: 'edge' },
        { id: 'web', label: 'File server', detail: 'Over 50 MB', x: 370, y: 410, kind: 'service' },
        { id: 'prom', label: 'Prometheus', detail: 'Metrics', x: 630, y: 410, kind: 'store' },
        { id: 'graf', label: 'Grafana', detail: 'Dashboards', x: 890, y: 410, kind: 'client' },
      ],
      edges: [
        { from: 'user', to: 'bot', label: 'link' },
        { from: 'bot', to: 'dl' },
        { from: 'dl', to: 'src', label: 'fetch' },
        { from: 'bot', to: 'web', label: 'large files' },
        { from: 'bot', to: 'prom', label: 'metrics' },
        { from: 'prom', to: 'graf' },
      ],
      notes: [
        {
          title: 'Handlers',
          body: 'A router sends each link to the YouTube or TikTok handlers, which track the session through quality choice, download and delivery.',
        },
        {
          title: 'Large files',
          body: 'Files over the limit are hosted on the built-in web server behind a private link. The link lasts 30 minutes by default, and the file is deleted afterwards.',
        },
        {
          title: 'Monitoring',
          body: 'Docker Compose runs the bot next to Prometheus, Grafana and Node Exporter, so downloads, success rates and errors are visible on a dashboard.',
        },
      ],
    },
    decisions: [],
    challenges: [
      {
        title: "Telegram's 50 MB upload limit",
        body: 'Long videos in high quality could not be sent through the Bot API at all. The file server gets around that, and large qualities are marked in the menu so users know they will get a link.',
      },
    ],
    results: [
      { value: '2', label: 'Platforms' },
      { value: '50MB', label: 'Telegram limit worked around' },
      { value: '30min', label: 'Default link lifetime' },
      { value: '4', label: 'Docker services' },
    ],
    images: [
      { src: dayn1, alt: 'DAYN logo', caption: 'Logo', fit: 'contain', bg: '#ffffff' },
    ],
    hue: 268,
  },
  {
    slug: 'uchtem',
    name: 'Uchtem',
    tagline: 'A bilingual brand website for financial management that reads like a private institution.',
    summary:
      'A premium marketing site for a financial management and business consulting brand, in Ukrainian first and English second, built to avoid the look of a generic accounting firm.',
    year: '2026',
    role: 'Solo project. Design and build.',
    live: 'https://uchtem.vercel.app',
    source: 'https://github.com/DenysHerasymchuk/uchtem',
    overview: [
      'Uchtem is a financial management and business consulting brand. The site had to read like a private institution, not like another accounting firm.',
      'Every page is fully built in both languages: home, services, the two service pillars, about and contact. Ukrainian is the default, and each page has a mirror under /en with matching hreflang and canonical tags.',
    ],
    responsibilities: [
      'Designed and built the React site with a section-based component system.',
      'Set up the two-language routing and translations with i18next.',
      'Added SEO tags per language, a sitemap and robots file.',
      'Wrote the Vitest test suite.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'i18next'] },
      { layer: 'Testing', items: ['Vitest'] },
    ],
    architecture: {
      nodes: [
        { id: 'visitor', label: 'Visitors', detail: 'UA or EN', x: 110, y: 280, kind: 'client' },
        { id: 'routes', label: 'Routes', detail: '/ and /en mirror', x: 390, y: 280, kind: 'service' },
        { id: 'i18n', label: 'i18next', detail: 'Language sync', x: 660, y: 150, kind: 'service' },
        { id: 'seo', label: 'Seo', detail: 'hreflang, canonical', x: 660, y: 410, kind: 'service' },
        { id: 'copy', label: 'Translations', detail: 'JSON per page', x: 890, y: 150, kind: 'store' },
      ],
      edges: [
        { from: 'visitor', to: 'routes' },
        { from: 'routes', to: 'i18n', label: 'locale' },
        { from: 'routes', to: 'seo' },
        { from: 'i18n', to: 'copy' },
      ],
      notes: [
        {
          title: 'Routing',
          body: 'The same route tree is mounted at the root in Ukrainian and under /en in English. The URL decides the language, and every internal link stays in the current one.',
        },
        {
          title: 'SEO',
          body: 'One component writes the hreflang alternates and the right canonical URL for each language, so every route only has to pass its own path.',
        },
      ],
    },
    decisions: [
      {
        title: 'The URL decides the language',
        body: 'Keeping the language in the path gives both versions their own indexable address, and a shared link always opens in the language it was sent in.',
      },
    ],
    challenges: [],
    results: [
      { value: '2', label: 'Languages, both complete' },
      { value: '6', label: 'Main pages' },
    ],
    images: [
      { src: uchtem1, alt: 'Uchtem home page in Ukrainian', caption: 'Home page' },
      { src: uchtem2, alt: 'Uchtem home page in English', caption: 'English version' },
      { src: uchtem3, alt: 'Uchtem contact form', caption: 'Contact' },
    ],
    hue: 225,
  },
  {
    slug: 'portfolio',
    name: 'This website',
    tagline: 'The site you are on: a playable hero, animated architecture diagrams and a footer you can knock apart.',
    summary:
      'My personal site, built with React, TypeScript and Tailwind, with a beige light theme and a dark one.',
    year: '2026',
    role: 'Solo project. Design and build.',
    live: 'https://denysherasymchuk.com',
    source: 'https://github.com/DenysHerasymchuk/Portfolir',
    overview: [
      'This site has a hero you can play with, a page per project with an animated architecture diagram, a page for my stack, and a footer where clicking my name knocks tech logos out of it.',
      'Almost all of the content lives in plain data files, so changing the text rarely means touching a component. The Work page has search, tech filters and sorting, all stored in the URL so a filtered view can be shared.',
      'Light and dark mode follow your system until you pick one, and if your device asks for reduced motion the animations calm down.',
    ],
    responsibilities: [
      'Designed and built every page.',
      'Built the architecture diagrams and the theme system.',
      'Adapted the hero background and mobile menu from React Bits.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP'] },
    ],
    architecture: {
      nodes: [
        { id: 'data', label: 'Data files', detail: 'Projects, stack', x: 110, y: 280, kind: 'store' },
        { id: 'pages', label: 'Pages', detail: 'React Router', x: 400, y: 280, kind: 'service' },
        { id: 'parts', label: 'Components', detail: 'Diagrams, chips', x: 660, y: 150, kind: 'service' },
        { id: 'theme', label: 'Theme', detail: 'CSS variables', x: 660, y: 410, kind: 'service' },
        { id: 'visitor', label: 'Visitors', detail: 'Browser', x: 890, y: 280, kind: 'client' },
      ],
      edges: [
        { from: 'data', to: 'pages' },
        { from: 'pages', to: 'parts' },
        { from: 'pages', to: 'theme' },
        { from: 'parts', to: 'visitor' },
        { from: 'theme', to: 'visitor' },
      ],
      notes: [
        {
          title: 'Content',
          body: 'Projects, the stack and the experience timeline are data files, including the nodes of the diagram above.',
        },
        {
          title: 'Motion',
          body: 'React Router handles view transitions between pages, GSAP drives the mobile menu and WebGL draws the hero background.',
        },
      ],
    },
    decisions: [],
    challenges: [],
    results: [
      { value: '6', label: 'Page types' },
      { value: '2', label: 'Themes' },
    ],
    images: [
      { src: portfolio1, alt: 'Home page of this website', caption: 'Home page' },
      { src: portfolio2, alt: 'Work page of this website with search and filters', caption: 'Work page' },
    ],
    hue: 28,
  },
  {
    slug: 'riy-charity',
    name: 'RIY Charity',
    tagline: 'A donation platform for Ukraine aid, with a live dashboard of what the donations do.',
    summary:
      "A donation platform supporting Ukraine aid initiatives. I focused on the live dashboard and an archive of the foundation's expenses.",
    year: '2025',
    role: 'Team project. I focused on the dashboard and the expense archive.',
    live: 'https://riycharity.netlify.app/',
    overview: [
      'RIY Charity is a donation platform that supports Ukraine aid initiatives. People can see where their money goes: a live dashboard shows donation counts and families supported.',
      "I also built an archive of the foundation's expenses, running from 2016 to the present.",
    ],
    responsibilities: [
      'Built the live dashboard with donation counts and families supported.',
      "Built the archive of the foundation's expenses.",
      'Added scroll-triggered counter animations in vanilla JavaScript.',
      "Reviewed and merged teammates' work through Git.",
    ],
    stack: [{ layer: 'Frontend', items: ['HTML', 'CSS', 'JavaScript'] }],
    architecture: {
      nodes: [
        { id: 'visitor', label: 'Visitors', detail: 'Browser', x: 130, y: 280, kind: 'client' },
        { id: 'site', label: 'Website', detail: 'HTML, CSS', x: 420, y: 280, kind: 'edge' },
        { id: 'dash', label: 'Dashboard', detail: 'Live counters', x: 720, y: 150, kind: 'service' },
        { id: 'archive', label: 'Expense archive', detail: '2016 to now', x: 720, y: 410, kind: 'service' },
      ],
      edges: [
        { from: 'visitor', to: 'site' },
        { from: 'site', to: 'dash' },
        { from: 'site', to: 'archive' },
      ],
      notes: [
        {
          title: 'Counters',
          body: 'The dashboard numbers count up when they scroll into view, written in vanilla JavaScript without any library.',
        },
      ],
    },
    decisions: [],
    challenges: [],
    results: [{ value: '2016', label: 'Expense archive goes back to' }],
    images: [
      { src: riyCharity1, alt: 'RIY home page reading Making a Difference Together', caption: 'Home page' },
    ],
    hue: 215,
  },
  {
    slug: 'first-portfolio',
    name: 'First Portfolio',
    tagline: 'My first portfolio, built for the Web-Design course.',
    summary:
      'Where I practised semantic HTML, the Bootstrap grid, flexbox and responsive layouts, hosted on Netlify with automatic deploys and a custom domain.',
    year: '2025',
    role: 'Solo project for the Web-Design course.',
    overview: [
      'This was my first portfolio, built for the Web-Design course. It is where I practised semantic HTML, the Bootstrap grid, flexbox and responsive layouts.',
      'It is hosted on Netlify with automatic deploys and a custom domain.',
    ],
    responsibilities: [
      'Designed and built the whole site.',
      'Set up Netlify with automatic deploys and a custom domain.',
    ],
    stack: [
      { layer: 'Frontend', items: ['HTML', 'CSS', 'Bootstrap'] },
      { layer: 'Infra', items: ['Netlify'] },
    ],
    architecture: {
      nodes: [
        { id: 'repo', label: 'Git', detail: 'Source', x: 150, y: 280, kind: 'client' },
        { id: 'netlify', label: 'Netlify', detail: 'Automatic deploys', x: 500, y: 280, kind: 'edge' },
        { id: 'visitor', label: 'Visitors', detail: 'Custom domain', x: 850, y: 280, kind: 'client' },
      ],
      edges: [
        { from: 'repo', to: 'netlify', label: 'push' },
        { from: 'netlify', to: 'visitor', label: 'HTTPS' },
      ],
      notes: [
        {
          title: 'Hosting',
          body: 'Every push to the repository deploys through Netlify to the custom domain.',
        },
      ],
    },
    decisions: [],
    challenges: [],
    results: [],
    images: [],
    hue: 165,
  },
];

/* Sample case studies from the demo build, none of them real. Not used by the site.
[
  {
    slug: 'floodline',
    name: 'Floodline',
    tagline: 'River sensors and a forecast that warn a street hours before the water reaches it.',
    summary:
      'Flood early warning for the Vesdre and Meuse valleys: low-power sensors measure river levels and rain, a model forecasts the next six hours, and residents get alerts for their own street.',
    year: '2026',
    role: 'Solo project. Sensor network, data pipeline, forecasting model, alert app.',
    duration: '6 months',
    overview: [
      'In July 2021 the Vesdre rose faster than anyone expected, and many people in Pepinster and Verviers had minutes of warning instead of hours. Floodline is my attempt at the part of that problem software can help with: knowing early, per street, how high the water will get.',
      'Battery-powered sensors along the river measure water level and rainfall every five minutes and send them over LoRaWAN, a radio network that reaches kilometres on very little power. The readings flow through Kafka into a forecasting model that predicts the level at each river section six hours ahead, updated every time new data arrives.',
      'Residents pick their street once. When the forecast for their section crosses a threshold, they get a push notification and an SMS with the expected peak time and height. A Grafana board gives the crisis team the same picture for the whole valley.',
    ],
    responsibilities: [
      'Chose the sensors, set up the LoRaWAN gateways and wrote the Go service that turns radio messages into clean readings.',
      'Built the forecasting model in Python and the backtests against historical river data.',
      'Built the alert service and the React app where residents follow their street.',
      'Ran the system on Kubernetes with Prometheus and Grafana watching every sensor and job.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Go', 'Python'] },
      { layer: 'Data', items: ['PostgreSQL', 'SQLite', 'Kafka', 'Redis'] },
      { layer: 'Infra', items: ['Docker', 'Kubernetes', 'Prometheus', 'Grafana'] },
    ],
    architecture: {
      nodes: [
        { id: 'sensors', label: 'River sensors', detail: 'Level + rain', x: 90, y: 150, kind: 'client' },
        { id: 'gateway', label: 'LoRa gateways', detail: 'MQTT, SQLite buffer', x: 300, y: 150, kind: 'edge' },
        { id: 'ingest', label: 'Ingest', detail: 'Go, cleaning', x: 510, y: 150, kind: 'service' },
        { id: 'kafka', label: 'Kafka', detail: 'Readings', x: 720, y: 150, kind: 'queue' },
        { id: 'model', label: 'Forecast', detail: 'Python, 6h ahead', x: 910, y: 280, kind: 'service' },
        { id: 'db', label: 'Postgres', detail: 'Readings, forecasts', x: 720, y: 410, kind: 'store' },
        { id: 'alerts', label: 'Alerts', detail: 'Go, push + SMS', x: 510, y: 410, kind: 'service' },
        { id: 'app', label: 'Resident app', detail: 'React', x: 300, y: 410, kind: 'client' },
      ],
      edges: [
        { from: 'sensors', to: 'gateway', label: 'LoRaWAN' },
        { from: 'gateway', to: 'ingest', label: 'MQTT' },
        { from: 'ingest', to: 'kafka', label: 'readings' },
        { from: 'kafka', to: 'model' },
        { from: 'model', to: 'db', label: 'forecasts' },
        { from: 'db', to: 'alerts', label: 'thresholds' },
        { from: 'alerts', to: 'app', label: 'push' },
      ],
      notes: [
        {
          title: 'Gateways',
          body: 'Sensors send a reading every five minutes. Gateways on rooftops forward them over MQTT and keep up to 48 hours of readings in SQLite if their uplink drops, so a storm that knocks out the mobile network does not leave holes in the data.',
        },
        {
          title: 'Ingest',
          body: 'A Go service checks each reading against the calibration of its sensor, drops obvious glitches such as a level jumping two metres in five minutes, and publishes clean readings to Kafka. Every sensor has a health score, and Prometheus warns me when one goes quiet.',
        },
        {
          title: 'Forecast model',
          body: 'A gradient boosted model in Python predicts the level at each river section from 15 minutes to 6 hours ahead, using upstream levels, rainfall and soil moisture. It is retrained weekly and backtested on the 2021 flood and other high-water events before a new version goes live.',
        },
        {
          title: 'Alerts',
          body: 'Each street has its own threshold, based on the height of its lowest doorways. Alerts include the expected peak time and height, and they are only sent again when the forecast changes by more than 20 centimetres, so people do not learn to ignore them.',
        },
      ],
    },
    decisions: [
      {
        title: 'LoRaWAN instead of mobile data',
        body: 'Sensors along a river sit in valleys with poor coverage and no power. LoRaWAN reaches several kilometres, and a sensor runs about three years on one battery.',
      },
      {
        title: 'Forecast per street, not per river',
        body: 'A single warning level for a whole river is what people learned to ignore. Mapping each river section to the streets it floods made alerts rarer and much more specific.',
      },
      {
        title: 'Kafka between sensors and the model',
        body: 'During a storm, readings arrive in bursts after gateways reconnect. Kafka absorbs the burst and lets me replay a whole night of data through a new model version.',
      },
    ],
    challenges: [
      {
        title: 'Gateways going offline in storms',
        body: 'The first gateway lost power during heavy rain, exactly when the data mattered most. Each gateway now has a small battery and the SQLite buffer, and readings are backfilled in order when it comes back.',
      },
      {
        title: 'Too many false alarms',
        body: 'Early versions warned on every rainy afternoon. Per-street thresholds and a minimum forecast confidence cut false alarms by about 80% in the backtests.',
      },
    ],
    results: [
      { value: '6h', label: 'Forecast horizon' },
      { value: '92%', label: 'Floods caught 2h+ ahead in backtests' },
      { value: '3y', label: 'Sensor battery life' },
      { value: '5min', label: 'Reading interval' },
    ],
    images: [
      { alt: 'Floodline resident app with a street forecast', caption: 'Street forecast' },
      { alt: 'Map of sensors along the Vesdre', caption: 'Sensor map' },
      { alt: 'Grafana board for the crisis team', caption: 'Crisis board' },
    ],
    hue: 175,
  },
  {
    slug: 'spoorzicht',
    name: 'Spoorzicht',
    tagline: 'Know if your train will be late before the board does, and whether you will make your connection.',
    summary:
      'Delay predictions for every Belgian train and station, trained on years of iRail open data and live weather, with a map that shows delays spreading through the network.',
    year: '2026',
    role: 'Solo project. Data pipeline, models, map and API.',
    duration: '4 months',
    overview: [
      'Belgian trains share a dense network, so one late train in Brussels can delay others an hour later in Ghent or Liège. Spoorzicht predicts those delays per train and per station, and answers the question people have on the platform: will I make my connection?',
      'iRail publishes live departures and delays for the whole NMBS/SNCB network as open data. I poll it every 30 seconds, store years of history, and combine it with weather and calendar data such as school holidays and strikes. Python models trained on that history predict the delay at each upcoming stop.',
      'The web app shows a live map where delays spread along the lines in real time. Pick two trains and it gives the chance of catching the connection, with the reason in plain words, such as "this train usually loses three minutes before Brussels-North".',
    ],
    responsibilities: [
      'Wrote the Node.js poller that keeps a clean live feed from iRail and publishes it to Kafka.',
      'Built the feature pipeline and the delay models in Python, with nightly retraining.',
      'Built the React map that animates delays across the network.',
      'Wrote the connection checker API and a backtest that compares predictions with what really happened.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Python', 'Node.js'] },
      { layer: 'Data', items: ['PostgreSQL', 'Kafka', 'Redis'] },
      { layer: 'Infra', items: ['Docker', 'Kubernetes', 'Prometheus', 'Grafana'] },
    ],
    architecture: {
      nodes: [
        { id: 'irail', label: 'iRail', detail: 'Open train data', x: 90, y: 150, kind: 'client' },
        { id: 'poller', label: 'Poller', detail: 'Node.js, every 30s', x: 300, y: 150, kind: 'service' },
        { id: 'kafka', label: 'Kafka', detail: 'Live events', x: 510, y: 150, kind: 'queue' },
        { id: 'features', label: 'Features', detail: 'Python, weather', x: 720, y: 150, kind: 'service' },
        { id: 'model', label: 'Delay model', detail: 'Python, nightly', x: 910, y: 280, kind: 'service' },
        { id: 'db', label: 'Postgres', detail: 'History, predictions', x: 720, y: 410, kind: 'store' },
        { id: 'api', label: 'API', detail: 'Node.js, Redis', x: 510, y: 410, kind: 'service' },
        { id: 'map', label: 'Live map', detail: 'React', x: 300, y: 410, kind: 'client' },
      ],
      edges: [
        { from: 'irail', to: 'poller', label: 'poll' },
        { from: 'poller', to: 'kafka', label: 'events' },
        { from: 'kafka', to: 'features' },
        { from: 'features', to: 'model' },
        { from: 'model', to: 'db', label: 'predictions' },
        { from: 'db', to: 'api' },
        { from: 'api', to: 'map', label: 'live' },
      ],
      notes: [
        {
          title: 'Collection',
          body: 'The poller asks iRail for every departure board every 30 seconds, removes duplicates and turns the boards into events such as "IC 1832 left Leuven 4 minutes late". Those events go to Kafka, so the models, the map and the history all read the same stream.',
        },
        {
          title: 'Training data',
          body: 'Each prediction uses the current delay, the delay this train usually builds up on each stretch, how busy the line is, the weather and the calendar. Five years of history in Postgres gives about 40 million stops to learn from.',
        },
        {
          title: 'Delay model',
          body: 'A gradient boosted model predicts the delay at every upcoming stop. It is retrained every night on the latest data and only replaces the live version if it beats it on the last two weeks.',
        },
        {
          title: 'Live map',
          body: 'Redis holds the live position and delay of every train, and the React map redraws from it once a second. The connection checker combines two delay predictions into one chance and shows which stretch of the journey is the risk.',
        },
      ],
    },
    decisions: [
      {
        title: 'Predict per stop, not per train',
        body: 'A train can be on time in Antwerp and ten minutes late in Brussels. Predicting each stop separately made the connection checker possible and was more accurate than one number per journey.',
      },
      {
        title: 'Simple models over deep learning',
        body: 'Gradient boosted trees trained in minutes, were easy to explain and beat my neural network attempts on this data. Being able to say why a prediction is high matters to people on a platform.',
      },
    ],
    challenges: [
      {
        title: 'Gaps in the live feed',
        body: 'Sometimes a train disappears from the boards for a few stations. The pipeline now fills short gaps from the timetable and marks them, so the model does not learn from made-up delays.',
      },
      {
        title: 'Strike days skewing the model',
        body: 'Strike days look like extreme delays and confused the model. They are now flagged from the calendar and handled separately, which cut the average error on normal days by 18%.',
      },
    ],
    results: [
      { value: '1.8min', label: 'Average error at the next stop' },
      { value: '86%', label: 'Connections called right' },
      { value: '40M', label: 'Stops in the training data' },
      { value: '30s', label: 'Live update interval' },
    ],
    images: [
      { alt: 'Spoorzicht live map of delays across Belgium', caption: 'Live delay map' },
      { alt: 'Connection checker for two trains', caption: 'Connection checker' },
      { alt: 'Backtest report comparing predictions and real delays', caption: 'Model backtest' },
    ],
    hue: 55,
  },
  {
    slug: 'gridflex',
    name: 'Gridflex',
    tagline:
      'Keeps your monthly power peak low by moving the car, the heat pump and the battery to the right quarter hour.',
    summary:
      'A home energy agent built for the Flemish capacity tariff: it watches the meter, forecasts solar and household use, and shifts flexible loads so the monthly peak stays low.',
    year: '2025',
    role: 'Solo project. Device agent, forecasting, backend, app.',
    duration: '5 months',
    overview: [
      'Since 2023, households in Flanders pay part of their electricity bill based on their highest 15-minute peak of the month. Charging the car while the oven and heat pump are on can set an expensive peak in one evening. Gridflex is an agent that sits in the house and stops that from happening.',
      'A small Go program on a Raspberry Pi reads the digital meter every second through its P1 port and talks to the EV charger, heat pump and home battery over the local network. It forecasts solar output and household use for the next day, plans when each flexible device should run, and adjusts the plan live if someone turns on the oven.',
      'The Angular app shows the house live, including the current quarter hour, and how much the agent saved this month. A .NET backend keeps accounts and history and pushes new forecast models to every house.',
    ],
    responsibilities: [
      'Wrote the Go agent that reads the meter and controls the charger, heat pump and battery.',
      'Built the solar and load forecasts in Python and the planner that schedules flexible devices.',
      'Built the .NET backend in C# for accounts, history and model updates.',
      'Built the Angular app with a live view of the house.',
    ],
    stack: [
      { layer: 'Frontend', items: ['Angular', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Go', '.NET', 'C#', 'Python'] },
      { layer: 'Data', items: ['PostgreSQL', 'SQLite', 'Redis'] },
      { layer: 'Infra', items: ['Docker', 'Linux', 'Caddy', 'Grafana'] },
    ],
    architecture: {
      nodes: [
        { id: 'meter', label: 'Digital meter', detail: 'P1, every second', x: 90, y: 150, kind: 'client' },
        { id: 'devices', label: 'Devices', detail: 'Charger, heat pump', x: 90, y: 410, kind: 'client' },
        { id: 'agent', label: 'Home agent', detail: 'Go, Raspberry Pi', x: 330, y: 280, kind: 'service' },
        { id: 'local', label: 'Local history', detail: 'SQLite', x: 560, y: 410, kind: 'store' },
        { id: 'backend', label: 'Backend', detail: '.NET, C#', x: 560, y: 150, kind: 'service' },
        { id: 'forecast', label: 'Forecasts', detail: 'Python models', x: 800, y: 150, kind: 'service' },
        { id: 'db', label: 'Postgres', detail: 'History, accounts', x: 800, y: 410, kind: 'store' },
        { id: 'app', label: 'App', detail: 'Angular', x: 930, y: 280, kind: 'client' },
      ],
      edges: [
        { from: 'meter', to: 'agent', label: 'P1' },
        { from: 'agent', to: 'devices', label: 'control' },
        { from: 'agent', to: 'local' },
        { from: 'agent', to: 'backend', label: 'sync' },
        { from: 'backend', to: 'forecast', label: 'train' },
        { from: 'backend', to: 'db' },
        { from: 'forecast', to: 'app' },
      ],
      notes: [
        {
          title: 'Collection',
          body: 'The agent reads the P1 port of the digital meter every second and keeps a running estimate of the current quarter hour. By minute 7 it knows whether the quarter is heading for a new peak, which leaves time to react.',
        },
        {
          title: 'Planning',
          body: 'Every night the agent builds a plan for the next day from the solar and usage forecasts: when to charge the car, when to preheat the house, when the battery should charge or help out. During the day it corrects the plan every minute when reality differs from the forecast.',
        },
        {
          title: 'Device control',
          body: 'Chargers, heat pumps and batteries speak different protocols, mostly Modbus and OCPP. The agent wraps each one in the same small interface: what it draws now, how much it can shift, and how to tell it to change. Adding a new brand is one Go file.',
        },
        {
          title: 'Forecasts',
          body: 'Python models forecast solar output from the weather forecast and the panel layout, and household use from the past weeks. The backend trains them per house and pushes new versions to the agent, which keeps working offline with the last one it received.',
        },
      ],
    },
    decisions: [
      {
        title: 'Run the planner in the house',
        body: 'If the internet drops, the peak still counts. Putting the planner on the Raspberry Pi with a local SQLite history means the house keeps optimising without a connection.',
      },
      {
        title: 'Plan ahead, correct live',
        body: 'Pure live control reacts too late within a 15-minute window. A day plan plus a correction every minute kept peaks low without constantly switching devices on and off.',
      },
    ],
    challenges: [
      {
        title: 'Heat pumps that ignored commands',
        body: 'One heat pump brand accepted commands and then went back to its own schedule. The agent now reads back the state after every change and marks devices that do not follow, so the planner stops relying on them.',
      },
      {
        title: 'Comfort complaints',
        body: 'Early plans saved money but left the house cold in the morning. Each house now has comfort limits the planner may never cross. Savings dropped a little and the complaints stopped.',
      },
    ],
    results: [
      { value: '31%', label: 'Lower monthly peak' },
      { value: '€180', label: 'Saved per year in the test house' },
      { value: '1s', label: 'Meter reading interval' },
      { value: '4', label: 'Device brands supported' },
    ],
    images: [
      { alt: 'Gridflex live view of the house', caption: 'Live house' },
      { alt: 'Day plan for car, heat pump and battery', caption: 'Day plan' },
      { alt: 'Monthly peak and savings report', caption: 'Monthly report' },
    ],
    hue: 85,
  },
  {
    slug: 'railwatch',
    name: 'Railwatch',
    tagline: 'Sensors on rail switches that spot wear days before a switch fails.',
    summary:
      'Predictive maintenance for railway switches: sensors run an anomaly model on the device, send only what matters, and every switch gets a risk score for the maintenance crews.',
    year: '2025',
    role: 'Solo project. Edge model, data pipeline, fleet dashboard.',
    duration: '5 months',
    overview: [
      'A railway switch that fails can stop a whole line, and most failures give small warnings first: a motor that draws a bit more current, a blade that vibrates differently when it moves. Railwatch puts sensors on switches to catch those warnings early, so crews can fix a switch during a planned night shift instead of during rush hour.',
      'Each sensor box records vibration and motor current every time the switch moves, plus the temperature. A small model runs on the box itself and compares each movement with what is normal for that switch. Normal movements are summarised and unusual ones are sent in full, which keeps data costs low across thousands of switches.',
      'In the backend, Kafka collects events from every switch, a Python model turns them into a risk score, and a dashboard ranks switches by how likely they are to fail in the coming week. Each score comes with the movements that caused it, so crews can check it before they go out.',
    ],
    responsibilities: [
      'Built the Go service on the sensor box that records each switch movement and runs the edge model.',
      'Trained the anomaly and risk models in Python on recorded movements.',
      'Built the Kafka pipeline and the storage for raw movements and risk scores.',
      'Built the React fleet dashboard that crews use to plan maintenance.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Go', 'Python'] },
      { layer: 'Data', items: ['MongoDB', 'Kafka', 'PostgreSQL'] },
      { layer: 'Infra', items: ['Docker', 'Kubernetes', 'Linux', 'Grafana'] },
    ],
    architecture: {
      nodes: [
        { id: 'switch', label: 'Switch sensors', detail: 'Vibration, current', x: 90, y: 150, kind: 'client' },
        { id: 'box', label: 'Edge box', detail: 'Go + model', x: 300, y: 150, kind: 'service' },
        { id: 'kafka', label: 'Kafka', detail: 'Movement events', x: 510, y: 150, kind: 'queue' },
        { id: 'raw', label: 'MongoDB', detail: 'Raw movements', x: 720, y: 150, kind: 'store' },
        { id: 'risk', label: 'Risk model', detail: 'Python, hourly', x: 510, y: 410, kind: 'service' },
        { id: 'scores', label: 'Postgres', detail: 'Scores, work orders', x: 720, y: 410, kind: 'store' },
        { id: 'dash', label: 'Fleet dashboard', detail: 'React', x: 910, y: 280, kind: 'client' },
      ],
      edges: [
        { from: 'switch', to: 'box', label: 'signals' },
        { from: 'box', to: 'kafka', label: 'anomalies' },
        { from: 'kafka', to: 'raw', label: 'store' },
        { from: 'kafka', to: 'risk' },
        { from: 'risk', to: 'scores', label: 'scores' },
        { from: 'scores', to: 'dash' },
        { from: 'raw', to: 'dash', label: 'evidence' },
      ],
      notes: [
        {
          title: 'On-device model',
          body: 'Every movement of the switch produces a short vibration and current signal. The box compares it with the normal pattern for that switch, learned in its first two weeks, and only sends movements that look unusual. That cuts the data sent by about 95%.',
        },
        {
          title: 'Ingest',
          body: 'Boxes send events over the mobile network to Kafka. If a box loses its connection it keeps events on disk and sends them later, in order, with the original timestamps.',
        },
        {
          title: 'Storage',
          body: 'Raw movement signals go to MongoDB, where each document holds one movement with its signal and metadata. Risk scores and work orders live in Postgres, because crews query them by line, region and date.',
        },
        {
          title: 'Risk scoring',
          body: 'A Python model combines recent anomalies, temperature, how often the switch moves and its repair history into a risk score for the next seven days. Scores are recalculated every hour, and the dashboard shows the movements that pushed a score up.',
        },
      ],
    },
    decisions: [
      {
        title: 'Model on the device',
        body: 'Sending every movement from thousands of switches would be expensive and mostly noise. Deciding on the box what is unusual kept data costs low and still kept the full signal of every movement that matters.',
      },
      {
        title: 'MongoDB for raw signals',
        body: 'Signals differ in length and in which sensors a box has. Storing each movement as a document fit that better than a fixed table, while scores stay in Postgres where reporting is easy.',
      },
    ],
    challenges: [
      {
        title: 'Cold mornings looked like failures',
        body: 'Switches move stiffer on frosty mornings, and early versions flagged half the fleet in January. Temperature is now part of what normal means for each switch.',
      },
      {
        title: 'Too few real failures to learn from',
        body: 'Failures are rare, which makes training hard. I combined the few recorded failures with simulated wear on a test switch to give the model enough examples.',
      },
    ],
    results: [
      { value: '4.5d', label: 'Average warning before a failure' },
      { value: '95%', label: 'Less data sent' },
      { value: '81%', label: 'Failures flagged in advance' },
      { value: '1h', label: 'Risk score refresh' },
    ],
    images: [
      { alt: 'Railwatch fleet dashboard ranked by risk', caption: 'Fleet risk' },
      { alt: 'Movement signal of one switch over a week', caption: 'Switch signals' },
      { alt: 'Work order planner for night shifts', caption: 'Work orders' },
    ],
    hue: 310,
  },
  {
    slug: 'streamline',
    name: 'Streamline',
    tagline: 'Live streaming with about two seconds of delay, and a chat that keeps up with big channels.',
    summary:
      'A Twitch-style platform: streamers go live from OBS, viewers watch in the browser, and chat fans out to every viewer in real time.',
    year: '2026',
    role: 'Solo project. Architecture, backend services, player and infrastructure.',
    duration: '5 months',
    overview: [
      'Streamline lets anyone go live from OBS and watch from a browser with about two seconds between the camera and the screen. Most hobby streaming setups sit at ten seconds or more, which kills the back and forth between a streamer and their chat. Getting that number down, while still serving thousands of viewers per stream, was the goal of the whole project.',
      'The platform has four moving parts. An ingest service accepts RTMP from the streamer, transcoding workers turn one stream into several qualities, the video is delivered as low-latency HLS through a CDN, and a separate chat system pushes messages to every viewer over WebSockets. Viewer counts, follows and chat activity flow through Kafka into a live dashboard for streamers.',
      'I built it to understand how real video platforms work under load, so every piece is something I could explain in an interview: why the segments are small, why chat is sharded by channel, and what happens when a transcoding worker dies in the middle of a stream.',
    ],
    responsibilities: [
      'Designed the system and wrote the architecture docs before writing code.',
      'Built the Go ingest and chat services, and the React watch page with a low-latency HLS player.',
      'Set up the Kubernetes cluster, autoscaling for transcoders, and the CI pipeline.',
      'Load tested chat with a custom Go client that opens thousands of sockets.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Go', 'Node.js'] },
      { layer: 'Data', items: ['PostgreSQL', 'Redis', 'Kafka'] },
      { layer: 'Infra', items: ['Kubernetes', 'Docker', 'Caddy', 'Prometheus', 'Grafana'] },
    ],
    architecture: {
      nodes: [
        { id: 'obs', label: 'OBS', detail: 'Streamer sends RTMP', x: 90, y: 150, kind: 'client' },
        { id: 'ingest', label: 'Ingest', detail: 'Go, RTMP, stream keys', x: 290, y: 150, kind: 'service' },
        { id: 'transcode', label: 'Transcoders', detail: 'FFmpeg on Kubernetes', x: 500, y: 150, kind: 'service' },
        { id: 'cdn', label: 'Origin + CDN', detail: 'LL-HLS via Caddy', x: 710, y: 150, kind: 'edge' },
        { id: 'player', label: 'Watch page', detail: 'React player', x: 910, y: 280, kind: 'client' },
        { id: 'chat', label: 'Chat gateway', detail: 'Go WebSockets', x: 710, y: 410, kind: 'service' },
        { id: 'redis', label: 'Redis', detail: 'Pub/sub per channel', x: 500, y: 410, kind: 'store' },
        { id: 'kafka', label: 'Kafka', detail: 'Events', x: 290, y: 410, kind: 'queue' },
        { id: 'stats', label: 'Postgres', detail: 'Stats rollups', x: 90, y: 410, kind: 'store' },
      ],
      edges: [
        { from: 'obs', to: 'ingest', label: 'RTMP' },
        { from: 'ingest', to: 'transcode', label: 'raw stream' },
        { from: 'transcode', to: 'cdn', label: '3 renditions' },
        { from: 'cdn', to: 'player', label: 'LL-HLS' },
        { from: 'player', to: 'chat', label: 'WebSocket' },
        { from: 'chat', to: 'redis', label: 'fan-out' },
        { from: 'ingest', to: 'kafka', label: 'events' },
        { from: 'kafka', to: 'stats' },
      ],
      notes: [
        {
          title: 'Ingest',
          body: 'A Go service accepts RTMP connections, checks the stream key against Postgres, and hands the stream to a transcoding worker. It holds no video on disk, so it can restart without dropping anyone for more than a second.',
        },
        {
          title: 'Transcoding',
          body: 'Each live stream gets its own FFmpeg worker pod that produces 1080p, 720p and 480p. A small scheduler watches queue depth and adds pods before the cluster runs out of room. If a worker dies, ingest notices the broken pipe and reattaches the stream to a fresh worker.',
        },
        {
          title: 'Delivery',
          body: 'Workers write one-second LL-HLS parts to shared storage. Caddy serves them as the origin behind a CDN, with short cache times on playlists and long ones on segments. The player starts close to the live edge and catches up by playing slightly faster when it falls behind.',
        },
        {
          title: 'Chat',
          body: 'Chat gateways hold the WebSocket connections. Every channel maps to a Redis pub/sub topic, so a message is published once and each gateway forwards it only to its own viewers. Slow mode, bans and a toxicity check run before a message is published.',
        },
        {
          title: 'Analytics',
          body: 'Gateways and ingest emit events to Kafka. A Node.js consumer keeps live counters in Redis for "viewers right now" and writes per-minute rollups to Postgres for history, so the streamer dashboard refreshes every second.',
        },
      ],
    },
    decisions: [
      {
        title: 'LL-HLS for video, WebRTC left out',
        body: 'WebRTC gets under one second of delay, but every viewer needs its own connection to a media server, which gets expensive fast. LL-HLS is plain HTTP, so a CDN does the heavy lifting and two seconds is close enough for chat to feel live.',
      },
      {
        title: 'Chat sharded by channel',
        body: 'Most channels are small and a few are huge. Routing by channel keeps a big stream from slowing everyone else down, and Redis pub/sub means gateways never talk to each other directly.',
      },
      {
        title: 'Kafka between services and analytics',
        body: 'Writing stats straight to the database would tie chat latency to database latency. With Kafka in between, chat stays fast even if the stats database is slow or down for maintenance.',
      },
    ],
    challenges: [
      {
        title: 'Players drifting behind the live edge',
        body: 'On weak connections the player kept buffering and ending up 15 seconds behind. I added a catch-up rule: if the buffer grows past three seconds, playback speeds up to 1.1x until it is back near the edge.',
      },
      {
        title: 'Chat bursts during raids',
        body: 'When a big channel raids a small one, thousands of viewers arrive in seconds. The gateway now batches outgoing messages every 100ms, which cut CPU use during bursts by more than half.',
      },
    ],
    results: [
      { value: '2.1s', label: 'Camera-to-screen delay' },
      { value: '100k', label: 'Chat sockets in load tests' },
      { value: '180ms', label: 'p99 chat delivery' },
      { value: '3', label: 'Qualities per stream' },
    ],
    images: [
      { alt: 'Streamline watch page with player and chat', caption: 'Watch page' },
      { alt: 'Streamer dashboard with live viewer graph', caption: 'Streamer dashboard' },
      { alt: 'Grafana board for ingest and chat', caption: 'Monitoring' },
    ],
    hue: 268,
  },
  {
    slug: 'hatch',
    name: 'Hatch',
    tagline: 'Push to Git and get a live preview URL in under a minute, on your own servers.',
    summary:
      'A self-hosted deployment platform in the spirit of Vercel: every branch gets its own preview, builds run in locked-down containers, and logs stream into the browser as they happen.',
    year: '2026',
    role: 'Solo project. Platform design, build system, dashboard.',
    duration: '4 months',
    overview: [
      'Hatch is a deployment platform you run yourself. Connect a GitHub repository, and every push builds the project and publishes it at its own URL, like feature-login.hatch.example.com. Merging to main promotes the build to production with no downtime.',
      'The hard part is running untrusted build scripts safely and quickly. Hatch runs each build in a fresh Docker container with no network access beyond a package mirror, strict CPU and memory limits, and no way back into the host. It is thrown away afterwards. A layer cache keyed on the lockfile makes repeat builds much faster.',
      'The dashboard shows every deployment, streams build logs live, and lets you roll production back to any earlier build with one click.',
    ],
    responsibilities: [
      'Designed the build pipeline, isolation model and routing layer.',
      'Wrote the Go control plane and the Docker build runner, with Bash scripts for each build step.',
      'Built the React dashboard with live log streaming over server-sent events.',
      'Wrote the GitHub App integration for webhooks and commit status checks.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Go', 'GitHub', 'Bash'] },
      { layer: 'Data', items: ['PostgreSQL', 'Redis'] },
      { layer: 'Infra', items: ['Docker', 'Caddy', 'Linux', 'Prometheus'] },
    ],
    architecture: {
      nodes: [
        { id: 'github', label: 'GitHub', detail: 'Push webhook', x: 90, y: 140, kind: 'client' },
        { id: 'api', label: 'Control plane', detail: 'Go API', x: 300, y: 140, kind: 'service' },
        { id: 'queue', label: 'Build queue', detail: 'Redis streams', x: 500, y: 140, kind: 'queue' },
        { id: 'runner', label: 'Build runners', detail: 'Docker containers', x: 700, y: 140, kind: 'service' },
        { id: 'artifacts', label: 'Artifacts', detail: 'Shared volume', x: 900, y: 140, kind: 'store' },
        { id: 'db', label: 'Postgres', detail: 'Projects, deploys', x: 300, y: 400, kind: 'store' },
        { id: 'dash', label: 'Dashboard', detail: 'React, SSE logs', x: 90, y: 400, kind: 'client' },
        { id: 'router', label: 'Edge router', detail: 'Caddy, TLS', x: 700, y: 400, kind: 'edge' },
        { id: 'visitor', label: 'Visitors', detail: 'branch.hatch.app', x: 900, y: 400, kind: 'client' },
      ],
      edges: [
        { from: 'github', to: 'api', label: 'webhook' },
        { from: 'api', to: 'queue', label: 'job' },
        { from: 'queue', to: 'runner' },
        { from: 'runner', to: 'artifacts', label: 'output' },
        { from: 'api', to: 'db' },
        { from: 'dash', to: 'api', label: 'SSE' },
        { from: 'artifacts', to: 'router' },
        { from: 'router', to: 'visitor', label: 'HTTPS' },
      ],
      notes: [
        {
          title: 'Control plane',
          body: 'A Go API receives GitHub webhooks, checks the signature, records the deployment in Postgres and puts a build job on a Redis stream. It also updates the commit status on GitHub so pull requests show the preview link.',
        },
        {
          title: 'Build runners',
          body: 'Runners pull jobs and start a container from a prepared build image. The project is built inside it by a Bash script, with no outside network except a package mirror. Logs are piped back line by line so the dashboard can show them live.',
        },
        {
          title: 'Caching',
          body: 'Dependency folders are cached by a hash of the lockfile. A repeat build with the same dependencies skips the install step entirely, which is where most build time goes.',
        },
        {
          title: 'Routing',
          body: 'Caddy handles TLS with automatic certificates and maps each subdomain to a build output on the artifact volume. Promoting to production only changes which build the main domain points at, so it is instant and easy to undo.',
        },
      ],
    },
    decisions: [
      {
        title: 'Throwaway containers for builds',
        body: 'Build scripts are untrusted code. Each one runs in a new container as a non-root user, with dropped capabilities, a read-only base image and no outside network, and the container is deleted when the build ends.',
      },
      {
        title: 'Server-sent events for logs',
        body: 'Logs only flow one way, from server to browser. SSE is plain HTTP, reconnects on its own and was far less code than a WebSocket setup.',
      },
      {
        title: 'Immutable deploys',
        body: 'A build is never changed after it finishes. Rollback is a pointer change instead of a rebuild, which is why it takes under a second.',
      },
    ],
    challenges: [
      {
        title: 'Slow cold builds',
        body: 'The first builds took over three minutes, mostly installing packages. The lockfile cache and a local package mirror brought a typical repeat build down to about 40 seconds.',
      },
      {
        title: 'Lost logs on reconnect',
        body: 'Refreshing the page during a build lost earlier output. Every log line now gets an ID, and the browser sends the last ID it saw so the server replays what was missed.',
      },
    ],
    results: [
      { value: '40s', label: 'Typical repeat build' },
      { value: '<1s', label: 'Rollback to any build' },
      { value: '1.2s', label: 'Build container start' },
      { value: '0', label: 'Downtime per deploy' },
    ],
    images: [
      { alt: 'Hatch deployment list with branch previews', caption: 'Deployments' },
      { alt: 'Live build log streaming in the dashboard', caption: 'Live build logs' },
      { alt: 'Project settings with domains and environment variables', caption: 'Project settings' },
    ],
    hue: 152,
  },
  {
    slug: 'ledgerline',
    name: 'Ledgerline',
    tagline: 'A shared finance workspace where several people edit the same books at once, even offline.',
    summary:
      'Real-time collaborative bookkeeping for small teams: edits merge without conflicts, every change is kept in an audit trail, and the books always balance.',
    year: '2025',
    role: 'Team project in a Scrum team of four. I built the sync engine and the ledger rules.',
    duration: '3 months',
    overview: [
      'Small companies often keep their books in a shared spreadsheet, which breaks the moment two people edit the same cell or someone works on a train with no signal. Ledgerline is a finance workspace built for that: several people can work on the same ledger at once, offline edits merge when the connection comes back, and nothing is ever silently overwritten.',
      'Underneath, every change is an event. The current state of the books is built from the event history, so you can see who changed what and when, and rebuild the books as they were on any past date.',
      'Accounting rules are enforced in one place. Every transaction is double entry, so debits always equal credits, and a period can be locked once it has been reported.',
    ],
    responsibilities: [
      'Designed the event model and the double-entry rules.',
      'Built the CRDT sync layer and the .NET relay server in C#.',
      'Wrote the Angular app, including offline storage in IndexedDB.',
      'Wrote tests that apply thousands of random edits and check the books still balance, plus Playwright tests for the main flows.',
    ],
    stack: [
      { layer: 'Frontend', items: ['Angular', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['.NET', 'C#'] },
      { layer: 'Data', items: ['PostgreSQL'] },
      { layer: 'Testing', items: ['Playwright', 'GitHub'] },
    ],
    architecture: {
      nodes: [
        { id: 'clientA', label: 'Browser A', detail: 'CRDT doc + IndexedDB', x: 100, y: 140, kind: 'client' },
        { id: 'clientB', label: 'Browser B', detail: 'Offline edits', x: 100, y: 400, kind: 'client' },
        { id: 'relay', label: 'Sync relay', detail: '.NET WebSockets', x: 360, y: 270, kind: 'service' },
        { id: 'rules', label: 'Ledger rules', detail: 'Double entry checks', x: 600, y: 140, kind: 'service' },
        { id: 'events', label: 'Event store', detail: 'Postgres, append only', x: 600, y: 400, kind: 'store' },
        { id: 'views', label: 'Projections', detail: 'Balances, reports', x: 860, y: 270, kind: 'store' },
      ],
      edges: [
        { from: 'clientA', to: 'relay', label: 'updates' },
        { from: 'clientB', to: 'relay', label: 'sync on reconnect' },
        { from: 'relay', to: 'rules', label: 'validate' },
        { from: 'relay', to: 'events', label: 'append' },
        { from: 'events', to: 'views', label: 'rebuild' },
        { from: 'rules', to: 'views' },
      ],
      notes: [
        {
          title: 'Local first',
          body: 'Each browser keeps its own copy of the ledger as a CRDT document stored in IndexedDB. The app reads and writes locally, so it is instant and works with no connection at all.',
        },
        {
          title: 'Sync relay',
          body: 'A .NET server relays CRDT updates between everyone in the same workspace. Because CRDT updates merge in any order, two people editing different lines offline end up with the same result when they reconnect.',
        },
        {
          title: 'Ledger rules',
          body: 'Before an update is accepted it goes through the rules service: the transaction must balance, accounts must exist and the period must not be locked. Rejected changes are sent back with a reason the UI shows next to the row.',
        },
        {
          title: 'Event store',
          body: 'Accepted changes are appended to an event table in Postgres and never edited. Balances and reports are projections built from those events, so any past state can be recreated for an audit.',
        },
      ],
    },
    decisions: [
      {
        title: 'CRDTs instead of locking rows',
        body: 'Locking would block people who are offline. CRDTs let everyone keep working and merge later, and the rules service catches the rare case where a merge would break the books.',
      },
      {
        title: 'Event sourcing for the books',
        body: 'Accounting needs a full history anyway. Storing events first made the audit trail free and made "show me March as it was in April" a simple query.',
      },
    ],
    challenges: [
      {
        title: 'Merges that broke the balance',
        body: 'Two offline users could each edit one side of the same transaction. The rules service now treats a transaction as one unit and flags it for review instead of accepting half of it.',
      },
      {
        title: 'Large workspaces loading slowly',
        body: 'Replaying years of events on every load was too slow. Snapshots every thousand events cut the initial load from seconds to under 300ms.',
      },
    ],
    results: [
      { value: '0', label: 'Lost edits in sync tests' },
      { value: '<300ms', label: 'Workspace load' },
      { value: '10k', label: 'Random edit sequences tested' },
      { value: '100%', label: 'Changes in the audit trail' },
    ],
    images: [
      { alt: 'Ledger view with two collaborators editing', caption: 'Shared ledger' },
      { alt: 'Audit trail showing who changed each row', caption: 'Audit trail' },
      { alt: 'Monthly report built from events', caption: 'Reports' },
    ],
    hue: 32,
  },
  {
    slug: 'courier',
    name: 'Courier',
    tagline: 'Chat, voice rooms and encrypted messages for communities, in the spirit of Discord.',
    summary:
      'A community chat app with servers, channels, live voice rooms through a WebRTC media server, presence for thousands of members, and end-to-end encrypted direct messages.',
    year: '2025',
    role: 'Solo project. Realtime backend, voice, web client.',
    duration: '4 months',
    overview: [
      'Courier is a chat app for communities. People join servers, talk in text channels, hop into voice rooms, and send each other private messages. It covers the parts of Discord that are hard to build: thousands of people online at once, voice with many speakers, and messages that only the sender and receiver can read.',
      'Voice runs through a selective forwarding unit. Each person sends one audio stream to the server, and the server forwards it to everyone else in the room, so a phone in a ten-person room is not uploading ten copies of its audio.',
      'Direct messages are end-to-end encrypted. Keys are created on the device and the server only ever stores encrypted messages it cannot read.',
    ],
    responsibilities: [
      'Built the realtime gateway and presence service in Go.',
      'Set up the Node.js voice server (mediasoup) and wrote the signaling.',
      'Implemented end-to-end encryption for DMs with the Web Crypto API.',
      'Built the React client, including notifications and message history.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Go', 'Node.js'] },
      { layer: 'Data', items: ['PostgreSQL', 'MongoDB', 'Redis'] },
      { layer: 'Infra', items: ['Docker', 'Kubernetes', 'Linux'] },
    ],
    architecture: {
      nodes: [
        { id: 'client', label: 'Client', detail: 'React, WebRTC', x: 100, y: 270, kind: 'client' },
        { id: 'gateway', label: 'Gateway', detail: 'Go WebSockets', x: 340, y: 140, kind: 'service' },
        { id: 'presence', label: 'Presence', detail: 'Who is online', x: 580, y: 140, kind: 'service' },
        { id: 'redis', label: 'Redis', detail: 'Pub/sub, presence', x: 820, y: 140, kind: 'store' },
        { id: 'sfu', label: 'Voice SFU', detail: 'mediasoup', x: 340, y: 410, kind: 'service' },
        { id: 'turn', label: 'TURN', detail: 'coturn relay', x: 580, y: 410, kind: 'edge' },
        { id: 'db', label: 'MongoDB', detail: 'Message history', x: 820, y: 410, kind: 'store' },
      ],
      edges: [
        { from: 'client', to: 'gateway', label: 'events' },
        { from: 'gateway', to: 'presence' },
        { from: 'presence', to: 'redis' },
        { from: 'gateway', to: 'db', label: 'messages' },
        { from: 'client', to: 'sfu', label: 'audio' },
        { from: 'sfu', to: 'turn', label: 'fallback' },
      ],
      notes: [
        {
          title: 'Gateway',
          body: 'Each client keeps one WebSocket open to a gateway. Messages, typing indicators and member updates all travel over it. Gateways publish to Redis so a message reaches members connected to any gateway, and store it in MongoDB. Accounts and servers live in Postgres.',
        },
        {
          title: 'Presence',
          body: 'Online status is stored in Redis with short expiry times that the client refreshes. Large servers only receive presence for members visible on screen, which keeps traffic flat as servers grow.',
        },
        {
          title: 'Voice',
          body: 'A Node.js media server built on mediasoup runs the voice rooms. The gateway handles signaling, and the client connects straight to the SFU. When a network blocks direct connections, traffic goes through a coturn TURN server.',
        },
        {
          title: 'Encrypted DMs',
          body: 'Each device creates a key pair with the Web Crypto API. Messages are encrypted on the sender device for each of the receiver devices, and the server stores only the encrypted text.',
        },
      ],
    },
    decisions: [
      {
        title: 'SFU instead of peer to peer',
        body: 'Peer to peer works for two or three people, but each extra person multiplies upload traffic. An SFU keeps upload at one stream per person no matter how big the room gets.',
      },
      {
        title: 'Presence only for what is on screen',
        body: 'Sending every status change for a 10,000 member server would flood clients. Subscribing to visible members only made large servers feel as light as small ones.',
      },
    ],
    challenges: [
      {
        title: 'Voice failing on school and office networks',
        body: 'Strict firewalls blocked the UDP traffic WebRTC prefers. Adding a TURN server on port 443 got those users connected, at the cost of a little extra delay.',
      },
      {
        title: 'Key changes on new devices',
        body: 'Logging in on a new phone meant old messages could not be decrypted there. Devices now share message keys with each other through an encrypted device link step.',
      },
    ],
    results: [
      { value: '25', label: 'Speakers in one voice room' },
      { value: '10k', label: 'Members per server tested' },
      { value: '90ms', label: 'Median message delivery' },
      { value: 'E2E', label: 'Encrypted direct messages' },
    ],
    images: [
      { alt: 'Courier server with channels and members list', caption: 'Server view' },
      { alt: 'Voice room with several speakers', caption: 'Voice room' },
      { alt: 'Encrypted direct message conversation', caption: 'Direct messages' },
    ],
    hue: 210,
  },
  {
    slug: 'pulse',
    name: 'Pulse',
    tagline: 'Logs, metrics and traces from every service in one place, with alerts that point at the cause.',
    summary:
      'A self-hosted tracing and logging platform: services send OpenTelemetry data, it lands in Postgres, and it links up with Prometheus metrics and Grafana dashboards.',
    year: '2025',
    role: 'Solo project. Ingest pipeline, storage schema, UI.',
    duration: '3 months',
    overview: [
      'When something breaks in a system with many services, you need to answer two questions fast: what is broken, and why. Pulse collects logs and traces from every service through OpenTelemetry and links them to the Prometheus metrics you already have, so one click takes you from a red Grafana graph to the exact slow request and the log lines it produced.',
      'The storage is PostgreSQL with tables partitioned by day. Recent days stay fast to query, and dropping an old partition deletes a whole day at once. Data is kept at full detail for a week and rolled up into summaries after that.',
      'Alerts are written as queries with thresholds. When one fires, the alert links straight to the traces from the same time window, so the person on call starts with evidence instead of a guess.',
    ],
    responsibilities: [
      'Designed the partitioned Postgres schema and the retention rules.',
      'Built the Go ingest service and the alert evaluator.',
      'Built the React UI, including the trace waterfall view, and Grafana links into it.',
      'Wrote a demo app with several services to generate realistic traffic.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Go'] },
      { layer: 'Data', items: ['PostgreSQL', 'Kafka'] },
      { layer: 'Infra', items: ['Docker', 'Kubernetes', 'Prometheus', 'Grafana'] },
    ],
    architecture: {
      nodes: [
        { id: 'apps', label: 'Your services', detail: 'OTel SDKs', x: 90, y: 270, kind: 'client' },
        { id: 'collector', label: 'Collector', detail: 'OTel Collector', x: 290, y: 270, kind: 'edge' },
        { id: 'ingest', label: 'Ingest', detail: 'Go, batching', x: 480, y: 140, kind: 'service' },
        { id: 'kafka', label: 'Kafka', detail: 'Buffer', x: 480, y: 400, kind: 'queue' },
        { id: 'ch', label: 'Postgres', detail: 'Logs, traces', x: 690, y: 270, kind: 'store' },
        { id: 'alerts', label: 'Alerts', detail: 'Rule evaluator', x: 900, y: 140, kind: 'service' },
        { id: 'ui', label: 'Pulse UI', detail: 'React, Grafana', x: 900, y: 400, kind: 'client' },
      ],
      edges: [
        { from: 'apps', to: 'collector', label: 'OTLP' },
        { from: 'collector', to: 'ingest' },
        { from: 'ingest', to: 'kafka', label: 'batches' },
        { from: 'kafka', to: 'ch', label: 'insert' },
        { from: 'ch', to: 'alerts', label: 'queries' },
        { from: 'ch', to: 'ui' },
      ],
      notes: [
        {
          title: 'Collection',
          body: 'Services use the standard OpenTelemetry SDKs, so no custom code is needed. A collector next to them adds metadata such as service name and region, and forwards everything over OTLP.',
        },
        {
          title: 'Ingest',
          body: 'The Go ingest service groups incoming data into large batches and writes them with COPY, which is far faster than one insert per row. Kafka sits in between so a database restart never loses data.',
        },
        {
          title: 'Storage',
          body: 'Logs and traces live in separate Postgres tables that share a trace ID and timestamp, and Prometheus metrics carry the same service labels. That shared key is what makes jumping from a graph to a trace to its logs possible.',
        },
        {
          title: 'Alerts',
          body: 'Alert rules are SQL queries with a threshold and a time window. The evaluator runs them every 30 seconds and sends notifications to Slack or email, each with a link to the matching traces.',
        },
      ],
    },
    decisions: [
      {
        title: 'Postgres instead of a specialised store',
        body: 'A dedicated log database would be faster at huge scale, but Postgres with daily partitions handled my load fine, and it was one less system to learn and run.',
      },
      {
        title: 'OpenTelemetry instead of a custom agent',
        body: 'Writing my own agent would have locked users in. OpenTelemetry already has SDKs for most languages, so any service can send data to Pulse.',
      },
    ],
    challenges: [
      {
        title: 'Too many small inserts',
        body: 'Early on, every request became its own insert and Postgres fell behind. Batching for one second or 10,000 rows, whichever came first, and writing with COPY fixed it.',
      },
      {
        title: 'Rendering huge traces',
        body: 'Some traces had thousands of spans and froze the browser. The waterfall now only renders the rows on screen and collapses repeated spans into groups.',
      },
    ],
    results: [
      { value: '20k', label: 'Spans per second ingested' },
      { value: '120ms', label: 'p95 dashboard query' },
      { value: '7d', label: 'Kept at full detail' },
      { value: '30s', label: 'Alert check interval' },
    ],
    images: [
      { alt: 'Pulse trace waterfall for a slow request', caption: 'Trace waterfall' },
      { alt: 'Service dashboard with latency and error graphs', caption: 'Service dashboard' },
      { alt: 'Alert rule editor with a SQL query', caption: 'Alert rules' },
    ],
    hue: 350,
  },
  {
    slug: 'atlas',
    name: 'Atlas',
    tagline: 'Ask a question about your company docs and get an answer with links to the exact pages.',
    summary:
      'Search over Notion, Google Drive and GitHub: documents are indexed with both keyword and vector search, and answers are written by an LLM that cites its sources.',
    year: '2026',
    role: 'Solo project. Indexing pipeline, ranking, chat UI.',
    duration: '3 months',
    overview: [
      'Every company has answers spread across Notion pages, Google Docs and READMEs that nobody can find. Atlas connects to those sources, keeps an up-to-date index, and lets people ask questions in plain language. Each answer comes with links to the paragraphs it was built from, so people can check it instead of trusting it blindly.',
      'Search combines two methods. Keyword search is good at exact names and error codes, and vector search is good at meaning. Atlas runs both and merges the results, which beat either one alone in my tests.',
      'Permissions carry over from the source. If you cannot open a document in Google Drive, Atlas will not use it to answer your question.',
    ],
    responsibilities: [
      'Built the connectors and the incremental sync jobs as Python workers.',
      'Designed the chunking, embedding and hybrid ranking.',
      'Wrote the answer step with citations and a check for unsupported claims.',
      'Built the React chat UI and an evaluation set to measure answer quality.',
    ],
    stack: [
      { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Python'] },
      { layer: 'Data', items: ['PostgreSQL', 'Redis'] },
      { layer: 'Infra', items: ['Docker', 'Linux', 'Caddy'] },
    ],
    architecture: {
      nodes: [
        { id: 'sources', label: 'Sources', detail: 'Notion, Drive, GitHub', x: 90, y: 140, kind: 'client' },
        { id: 'sync', label: 'Sync workers', detail: 'Python, Redis queue', x: 300, y: 140, kind: 'service' },
        { id: 'chunk', label: 'Chunk + embed', detail: 'Python', x: 510, y: 140, kind: 'service' },
        { id: 'pg', label: 'Postgres', detail: 'pgvector + full text', x: 720, y: 140, kind: 'store' },
        { id: 'ui', label: 'Chat UI', detail: 'React', x: 90, y: 400, kind: 'client' },
        { id: 'api', label: 'Query API', detail: 'Python', x: 300, y: 400, kind: 'service' },
        { id: 'rank', label: 'Hybrid ranking', detail: 'Full text + vectors', x: 510, y: 400, kind: 'service' },
        { id: 'llm', label: 'Answer', detail: 'LLM with citations', x: 720, y: 400, kind: 'edge' },
      ],
      edges: [
        { from: 'sources', to: 'sync', label: 'changes' },
        { from: 'sync', to: 'chunk' },
        { from: 'chunk', to: 'pg', label: 'vectors' },
        { from: 'ui', to: 'api', label: 'question' },
        { from: 'api', to: 'rank' },
        { from: 'rank', to: 'pg', label: 'search' },
        { from: 'rank', to: 'llm', label: 'top passages' },
      ],
      notes: [
        {
          title: 'Sync',
          body: 'Python workers, fed by a Redis queue, pull changes from each source on a schedule and through webhooks where available. Only changed documents are processed again, so keeping the index fresh stays cheap.',
        },
        {
          title: 'Chunking',
          body: 'Documents are split along their headings into passages of a few hundred words, each with its title path attached. Passages that keep their heading context rank much better than blind fixed-size chunks.',
        },
        {
          title: 'Hybrid ranking',
          body: 'A question runs as a full-text search and a vector search in Postgres at the same time. The two result lists are merged with reciprocal rank fusion, then filtered by what the user is allowed to see.',
        },
        {
          title: 'Answers',
          body: 'The top passages go to the LLM with instructions to answer only from them and cite each claim. A final check drops any sentence without a citation before the answer is shown.',
        },
      ],
    },
    decisions: [
      {
        title: 'pgvector instead of a separate vector database',
        body: 'Keeping vectors, text and permissions in one Postgres made filtering by access rights a normal SQL join and meant one less system to run.',
      },
      {
        title: 'Citations required for every claim',
        body: 'An answer people cannot check is not useful at work. Requiring citations made answers a little shorter and a lot more trustworthy.',
      },
    ],
    challenges: [
      {
        title: 'Good answers from the wrong version',
        body: 'Old copies of documents kept showing up. Each passage now carries the document revision, and old revisions are deleted when a newer one is indexed.',
      },
      {
        title: 'Measuring quality',
        body: 'It was hard to tell if a change made answers better. I wrote 150 real questions with known source pages and track how often the right page appears in the top results.',
      },
    ],
    results: [
      { value: '87%', label: 'Right page in top 5' },
      { value: '1.4s', label: 'Median answer time' },
      { value: '3', label: 'Connected sources' },
      { value: '100%', label: 'Answers with citations' },
    ],
    images: [
      { alt: 'Atlas chat answer with cited sources', caption: 'Answer with citations' },
      { alt: 'Connected sources and sync status', caption: 'Sources' },
      { alt: 'Search quality report over the test questions', caption: 'Quality report' },
    ],
    hue: 190,
  },
  {
    slug: 'roster',
    name: 'Roster',
    tagline: 'Event sign-ups, member cards and board exports for a student association, in one place.',
    summary:
      'A member and event platform for a student association with hundreds of international members: sign-ups with waitlists, member cards and the exports the board needs every month.',
    year: '2026',
    role: 'Solo project for my student association. Design, backend, admin and hand-over.',
    duration: '2 months',
    overview: [
      'A student association runs on lists: who signed up for the trip, who paid, who is on the waitlist, who is a member this year. Before Roster those lists lived in forms and spreadsheets that volunteers copied between by hand, and every new board had to learn the whole setup again.',
      'Roster puts members and events in one Laravel app. Students sign up with their member card, see their place on the waitlist and get an email when a spot opens. The board sees payments and attendance per event and exports what partners or the university ask for in one click.',
      'Boards change every year, so the admin has a short hand-over guide next to each feature, and every setting a new board needs is on one screen.',
    ],
    responsibilities: [
      'Mapped how the board ran sign-ups and memberships before writing any code.',
      'Built the Laravel app, the MySQL schema and the admin screens.',
      'Wrote the waitlist logic and the email queue on Redis.',
      'Wrote the hand-over guide and walked the next board through it.',
    ],
    stack: [
      { layer: 'Frontend', items: ['JavaScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Laravel', 'PHP'] },
      { layer: 'Data', items: ['MySQL', 'Redis'] },
      { layer: 'Infra', items: ['Docker', 'GitHub'] },
    ],
    architecture: {
      nodes: [
        { id: 'students', label: 'Students', detail: 'Sign-up pages', x: 90, y: 150, kind: 'client' },
        { id: 'app', label: 'Roster app', detail: 'Laravel', x: 330, y: 150, kind: 'service' },
        { id: 'mysql', label: 'MySQL', detail: 'Members, events', x: 570, y: 150, kind: 'store' },
        { id: 'queue', label: 'Queue', detail: 'Redis', x: 330, y: 410, kind: 'queue' },
        { id: 'mail', label: 'Email', detail: 'Waitlist, receipts', x: 570, y: 410, kind: 'edge' },
        { id: 'board', label: 'Board admin', detail: 'Exports, settings', x: 820, y: 280, kind: 'client' },
      ],
      edges: [
        { from: 'students', to: 'app', label: 'sign up' },
        { from: 'app', to: 'mysql' },
        { from: 'app', to: 'queue', label: 'jobs' },
        { from: 'queue', to: 'mail', label: 'send' },
        { from: 'mysql', to: 'board', label: 'exports' },
      ],
      notes: [
        {
          title: 'Sign-ups and waitlists',
          body: 'Each event has a capacity and a waitlist. When someone cancels, the first person in line gets an email with 24 hours to confirm, and the spot moves on if they do not. Students see their place in line on the event page.',
        },
        {
          title: 'Member cards',
          body: 'Every member gets a card with a QR code. Scanning it at the door checks the membership and marks attendance, which also tells the board which events people come to.',
        },
        {
          title: 'Data exports',
          body: 'Partners and the university ask for the same lists every month. The board picks an event or a period and downloads a clean CSV, without copying anything by hand.',
        },
        {
          title: 'Deploys and hand-over',
          body: 'Roster runs in Docker, and every push to main on GitHub deploys it. The admin has a short guide next to each feature, so a new board can run it from day one.',
        },
      ],
    },
    decisions: [
      {
        title: 'Laravel and MySQL on cheap hosting',
        body: 'Most student associations already rent simple PHP hosting. Laravel with MySQL runs there, so the next board does not have to look after a server I set up.',
      },
      {
        title: 'One app for members and events',
        body: 'Members, sign-ups and payments all point at the same person. Keeping them in one database ended the double bookkeeping between forms and spreadsheets.',
      },
    ],
    challenges: [
      {
        title: 'Duplicate members',
        body: 'Students signed up with a different email each semester, so one person could have three accounts. Sign-up now matches on student number and offers to merge accounts that look like the same person.',
      },
      {
        title: 'Waitlist offers going to everyone',
        body: 'A cancellation at midnight once offered the same spot to everyone on the waitlist. Offers now go out one at a time, in order, and expire after 24 hours.',
      },
    ],
    results: [
      { value: '400+', label: 'Members managed' },
      { value: '6h', label: 'Volunteer time saved per week' },
      { value: '24h', label: 'Waitlist offer window' },
      { value: '0', label: 'Spreadsheets left' },
    ],
    images: [
      { alt: 'Roster event page with sign-up and waitlist', caption: 'Event page' },
      { alt: 'Member card with QR code', caption: 'Member card' },
      { alt: 'Board admin with exports', caption: 'Board admin' },
    ],
    hue: 240,
  },
  {
    slug: 'hubcast',
    name: 'Hubcast',
    tagline: 'Shows cafés and community hubs when they will be quiet, and what could fill those hours.',
    summary:
      'Built in an international team: a platform that forecasts busy and quiet hours for cafés and community hubs, and matches quiet slots with events and partner brands.',
    year: '2026',
    role: 'Team of five in an international programme. I built the Laravel platform and the data pipeline.',
    duration: '2 months',
    overview: [
      'Cafés and community hubs are full at some hours and empty at others, and the quiet hours cost them money. Our brief in the programme was to help these "third places" stay open and lively. Hubcast tells a venue when it will be quiet next week and suggests what could fill those hours.',
      'Venues share check-ins from their till or a simple door counter. A Python model learns the weekly rhythm of each venue and adjusts it with the weather forecast and local events. The result is a week view with the quiet slots marked.',
      'For each quiet slot, Hubcast suggests ideas that worked elsewhere, such as a study hour, a quiz or a partner brand looking for a local spot for a tasting. We presented it as a working platform at the final showcase.',
    ],
    responsibilities: [
      'Built the Laravel platform, the venue dashboard and the PostgreSQL schema.',
      'Wrote the import that cleans check-in data from different tills and counters.',
      'Connected the Python forecast to the platform through a small internal API.',
      'Set up Docker so the whole team ran the same environment, and presented the demo at the showcase.',
    ],
    stack: [
      { layer: 'Frontend', items: ['JavaScript', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Laravel', 'PHP', 'Python'] },
      { layer: 'Data', items: ['PostgreSQL'] },
      { layer: 'Infra', items: ['Docker', 'GitHub'] },
    ],
    architecture: {
      nodes: [
        { id: 'venues', label: 'Venues', detail: 'Tills, door counters', x: 90, y: 150, kind: 'client' },
        { id: 'import', label: 'Import', detail: 'Laravel jobs', x: 300, y: 150, kind: 'service' },
        { id: 'db', label: 'Postgres', detail: 'Check-ins, venues', x: 510, y: 150, kind: 'store' },
        { id: 'model', label: 'Forecast', detail: 'Python', x: 720, y: 150, kind: 'service' },
        { id: 'partners', label: 'Partner brands', detail: 'Event offers', x: 510, y: 410, kind: 'client' },
        { id: 'match', label: 'Suggestions', detail: 'Laravel', x: 720, y: 410, kind: 'service' },
        { id: 'dash', label: 'Venue dashboard', detail: 'Week view', x: 910, y: 280, kind: 'client' },
      ],
      edges: [
        { from: 'venues', to: 'import', label: 'check-ins' },
        { from: 'import', to: 'db' },
        { from: 'db', to: 'model', label: 'history' },
        { from: 'model', to: 'match', label: 'quiet slots' },
        { from: 'partners', to: 'match', label: 'offers' },
        { from: 'match', to: 'dash' },
      ],
      notes: [
        {
          title: 'Collection',
          body: 'Each till exports check-ins in its own format. The import reads the common ones, removes test transactions and turns everything into visits per 15 minutes, which is what the model needs.',
        },
        {
          title: 'Forecast model',
          body: 'A Python model learns the weekly pattern of each venue and corrects it with the weather forecast and local events. Venues with only a few weeks of data borrow the pattern of similar venues until they have enough of their own.',
        },
        {
          title: 'Suggestions',
          body: 'Ideas come from what filled similar slots at other venues and from partner brands looking for a place to host. Venues accept or skip each idea, and those choices shape the next suggestions.',
        },
        {
          title: 'Builds and team setup',
          body: 'Five people on different laptops needed the same setup. Docker Compose starts the app, the database and the model with one command, and the same images ran the demo server.',
        },
      ],
    },
    decisions: [
      {
        title: 'Laravel for the platform, Python for the model',
        body: 'Most of the team knew PHP, and the forecast needed Python libraries. Keeping the model behind a small API let each part use the right tool without everyone having to learn both.',
      },
      {
        title: 'A week view over live numbers',
        body: 'Café owners plan staff and events a week ahead. A clear week with quiet slots marked was more useful to them than a live chart.',
      },
    ],
    challenges: [
      {
        title: 'Messy till data',
        body: 'One till logged refunds as new sales, which made a quiet Tuesday look busy. The import now pairs refunds with their sales before counting visits.',
      },
      {
        title: 'New venues with no history',
        body: 'A venue that joined last week has nothing to learn from. Borrowing the pattern of similar venues gave usable forecasts from the first day.',
      },
    ],
    results: [
      { value: '78%', label: 'Quiet slots predicted right' },
      { value: '5', label: 'Pilot venues' },
      { value: '15min', label: 'Forecast resolution' },
      { value: '1', label: 'Command to run the whole stack' },
    ],
    images: [
      { alt: 'Hubcast week view with quiet slots marked', caption: 'Week view' },
      { alt: 'Suggestions for a quiet afternoon', caption: 'Suggestions' },
      { alt: 'Team presenting Hubcast at the showcase', caption: 'Final showcase' },
    ],
    hue: 15,
  },
  {
    slug: 'pantry',
    name: 'Pantry',
    tagline: 'Stock, donations and pickup slots for a local food bank, built in three days.',
    summary:
      'A hackathon build for a food bank: volunteers log donations and see what is running low, and families book a pickup slot from their phone.',
    year: '2026',
    role: 'Team of four at a three-day hackathon. I owned the backend CRUD and the admin panel.',
    duration: '3 days',
    overview: [
      'A local food bank told us its biggest problems at the start of the hackathon: nobody knew exactly what was on the shelves, and families waited outside for an hour on pickup days. We had three days to build something they could try the week after.',
      'Pantry logs every donation as it comes in, keeps stock per product and expiry date, and warns when something runs low. Families book a 15-minute pickup slot from their phone, and volunteers see who is coming and what to pack.',
      'I owned the backend: every create, read, update and delete path for products, donations, families and slots, plus the full admin panel the volunteers use. The rest of the team built the booking pages and the pitch.',
    ],
    responsibilities: [
      'Designed the MySQL schema with the team on the first evening.',
      'Built all CRUD operations in Laravel for products, donations, families and slots.',
      'Built the admin panel with stock warnings and the daily packing list.',
      'Wrote the seed data and the demo script for the final pitch.',
    ],
    stack: [
      { layer: 'Frontend', items: ['Alpine.js', 'Tailwind CSS'] },
      { layer: 'Backend', items: ['Laravel', 'PHP'] },
      { layer: 'Data', items: ['MySQL'] },
      { layer: 'Infra', items: ['Docker'] },
    ],
    architecture: {
      nodes: [
        { id: 'donors', label: 'Donations', detail: 'Logged at the door', x: 90, y: 150, kind: 'client' },
        { id: 'admin', label: 'Admin panel', detail: 'Volunteers', x: 90, y: 410, kind: 'client' },
        { id: 'app', label: 'Pantry app', detail: 'Laravel', x: 360, y: 280, kind: 'service' },
        { id: 'db', label: 'MySQL', detail: 'Stock, slots', x: 620, y: 280, kind: 'store' },
        { id: 'families', label: 'Families', detail: 'Book a slot', x: 880, y: 150, kind: 'client' },
        { id: 'packing', label: 'Packing list', detail: 'Per pickup day', x: 880, y: 410, kind: 'edge' },
      ],
      edges: [
        { from: 'donors', to: 'app', label: 'log' },
        { from: 'admin', to: 'app', label: 'manage' },
        { from: 'app', to: 'db' },
        { from: 'db', to: 'families', label: 'slots' },
        { from: 'db', to: 'packing', label: 'daily' },
      ],
      notes: [
        {
          title: 'Stock data',
          body: 'Every donation becomes stock lines per product and expiry date. The oldest items are packed first, and the admin marks a product orange when it drops below the level the food bank set.',
        },
        {
          title: 'Pickup planning',
          body: 'Families pick a 15-minute slot on their phone. Each slot holds four families, so the line outside disappears and volunteers know how many bags to pack per hour.',
        },
        {
          title: 'Admin panel',
          body: 'The panel covers what volunteers do in a day: log donations, fix stock, check families in and print the packing list. Every screen does one task, so a new volunteer can use it without training.',
        },
      ],
    },
    decisions: [
      {
        title: 'Laravel for a three-day build',
        body: 'Laravel gave us login, migrations and an admin layout on the first evening, so the three days went into the parts the food bank needed.',
      },
      {
        title: 'Pickup slots first',
        body: 'The line outside was the problem families felt most. We built booking first and left reports for after the hackathon.',
      },
    ],
    challenges: [
      {
        title: 'Changing requirements on day two',
        body: 'Halfway through, the food bank asked us to track expiry dates, which changed the stock tables. Because every model had its CRUD in one place, the change took an afternoon.',
      },
      {
        title: 'An empty demo',
        body: 'An app with no data is hard to pitch. I wrote seed data for a realistic week of donations and bookings, which made the demo easy to follow.',
      },
    ],
    results: [
      { value: '3d', label: 'From idea to working demo' },
      { value: '15min', label: 'Pickup slots' },
      { value: '40', label: 'Families in the demo week' },
      { value: '0', label: 'Paper lists on pickup day' },
    ],
    images: [
      { alt: 'Pantry admin panel with stock warnings', caption: 'Admin panel' },
      { alt: 'Pickup slot booking on a phone', caption: 'Slot booking' },
      { alt: 'Daily packing list', caption: 'Packing list' },
    ],
    hue: 130,
  },
]
*/

export const projectBySlug = (slug: string | undefined) => PROJECTS.find(p => p.slug === slug);
