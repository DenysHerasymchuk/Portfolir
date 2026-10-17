// Nav items, socials and footer columns.

export const SOCIALS = {
  linkedin: 'https://www.linkedin.com/in/denysherasymchuk/',
  github: 'https://github.com/DenysHerasymchuk',
  email: 'mailto:den.herasymchuk@gmail.com',
};

export const NAV_LINKS = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/stack', label: 'Stack' },
  { to: '/contact', label: 'Contact' },
];

export const FOOTER_COLUMNS = [
  {
    title: 'Site',
    links: [
      { to: '/work', label: 'Work' },
      { to: '/about', label: 'About' },
      { to: '/stack', label: 'Stack' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Elsewhere',
    links: [
      { to: SOCIALS.linkedin, label: 'LinkedIn' },
      { to: SOCIALS.github, label: 'GitHub' },
      { to: SOCIALS.email, label: 'Email' },
    ],
  },
];

// Real education and programmes, most recent first.
export const CREDENTIALS = [
  {
    date: 'Apr–May 2026',
    title: 'International BIP: Data Science & AI',
    place: 'Thomas More, with students from several European universities',
    body: 'A Blended Intensive Programme run with partner schools such as Breda University of Applied Sciences. Our international team built a product together and presented it at the final showcase.',
  },
  {
    date: 'Mar 2026',
    title: 'MORE Week Hackathon',
    place: 'Thomas More University of Applied Sciences',
    body: 'Three days to plan, build and demo a working product as a team.',
  },
  {
    date: 'Sep 2024 to now',
    title: 'Applied Computer Science',
    place: 'Thomas More University of Applied Sciences',
    body: 'Bachelor programme in Application & Software Development. This is where I started building for the web, and I have not stopped since.',
  },
];
