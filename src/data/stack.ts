import docker from '../assets/stack/docker.svg';
import figma from '../assets/stack/figma.svg';
import git from '../assets/stack/git.svg';
import go from '../assets/stack/go.svg';
import linux from '../assets/stack/linux.svg';
import node from '../assets/stack/nodedotjs.svg';
import php from '../assets/stack/php.svg';
import postgres from '../assets/stack/postgresql.svg';
import python from '../assets/stack/python.svg';
import react from '../assets/stack/react.svg';
import tailwind from '../assets/stack/tailwindcss.svg';
import typescript from '../assets/stack/typescript.svg';

export type Tech = { name: string; icon: string; bg: string; fg: string };

// One group per headline tile. Logos from Simple Icons (CC0).
export const STACK: Tech[][] = [
  [
    { name: 'React', icon: react, bg: '#20232a', fg: '#61dafb' },
    { name: 'TypeScript', icon: typescript, bg: '#3178c6', fg: '#ffffff' },
    { name: 'Node.js', icon: node, bg: '#5fa04e', fg: '#ffffff' },
    { name: 'Tailwind CSS', icon: tailwind, bg: '#0f172a', fg: '#38bdf8' },
    { name: 'Python', icon: python, bg: '#3776ab', fg: '#ffd43b' },
    { name: 'Figma', icon: figma, bg: '#1e1e1e', fg: '#ffffff' },
  ],
  [
    { name: 'Docker', icon: docker, bg: '#2496ed', fg: '#ffffff' },
    { name: 'PostgreSQL', icon: postgres, bg: '#4169e1', fg: '#ffffff' },
    { name: 'Go', icon: go, bg: '#00add8', fg: '#ffffff' },
    { name: 'Git', icon: git, bg: '#f05032', fg: '#ffffff' },
    { name: 'PHP', icon: php, bg: '#777bb4', fg: '#ffffff' },
    { name: 'Linux', icon: linux, bg: '#fcc624', fg: '#000000' },
  ],
];
