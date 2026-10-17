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
