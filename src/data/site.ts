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
  { to: '/writing', label: 'Writing' },
  { to: '/contact', label: 'Contact' },
];

export const FOOTER_COLUMNS = [
  {
    title: 'Work',
    links: [
      { to: '/work', label: 'Projects' },
      { to: '/work/case-studies', label: 'Case studies' },
      { to: '/work/open-source', label: 'Open source' },
    ],
  },
  {
    title: 'About',
    links: [
      { to: '/about', label: 'About me' },
      { to: '/stack', label: 'Stack' },
      { to: '/writing', label: 'Writing' },
      { to: '/resume', label: 'Résumé' },
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
