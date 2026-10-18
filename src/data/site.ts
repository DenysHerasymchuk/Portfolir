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
    date: 'Jun 2026 to now',
    title: 'IT Manager',
    project: 'roster',
    place: 'Erasmus Student Network Geel, volunteer, hybrid',
    body: 'I run the IT for the section: the website, member accounts and internal tools used by hundreds of international students. I work with the board to keep event and member information correct, automated event sign-ups and member data exports so volunteers spend less time on lists, and wrote hand-over guides so the tools survive each new board.',
  },
  {
    date: 'Apr–May 2026',
    title: 'Data Science & AI team, International BIP',
    project: 'hubcast',
    place: 'Breda University of Applied Sciences, Netherlands',
    body: 'Two months in an international team with students from several European universities, on a brief about supporting cafés and community hubs. We built a working platform with Laravel, PostgreSQL and Docker and presented it at the final showcase.',
  },
  {
    date: 'Mar 2026',
    title: 'MORE Week Hackathon',
    project: 'pantry',
    place: 'Thomas More University of Applied Sciences',
    body: 'Three days to plan, build and demo a working product as a team. I owned the backend CRUD and the full admin panel.',
  },
  {
    date: 'Sep 2024 to now',
    title: 'Scrum team projects',
    project: 'ledgerline',
    place: 'Applied Computer Science, Thomas More University of Applied Sciences (with KU Leuven)',
    body: 'Projects built in Scrum teams, with Jira for sprint planning, issue tracking and code review. Along the way I work with Linux and shell scripting, Docker, CI/CD in GitHub Actions, SQL databases, C# and .NET, and REST APIs.',
  },
];
