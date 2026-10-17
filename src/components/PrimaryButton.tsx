import { Link } from 'react-router';
import StarBorder from './reactbits/StarBorder';

// Nudges right when the nearest `group/btn` parent is hovered.
export function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-[1em] w-[1em] transition-transform duration-300 group-hover/btn:translate-x-1 motion-reduce:transition-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function PrimaryButton({ to, dark, children }: { to: string; dark: boolean; children: React.ReactNode }) {
  // Glass in dark mode; solid coffee in light mode so it stands out on the pale page.
  // StarBorder's theme follows the page because the star's glow spills onto it.
  return (
    <StarBorder
      as={Link}
      viewTransition
      to={to}
      theme={dark ? 'dark' : 'light'}
      radius={999}
      color="#f3e9d7"
      trailColor="#c4ab86"
      backgroundColor={dark ? 'transparent' : 'linear-gradient(110deg, #8f7451, #725c3e)'}
      textColor={dark ? 'rgb(var(--ink))' : '#ffffff'}
      borderColor={dark ? 'rgb(var(--haze) / 0.35)' : 'rgb(255 255 255 / 0.2)'}
      // Named group, because the hero section is also a `group`.
      className={`group/btn whitespace-nowrap px-8 py-4 text-lg transition-transform duration-300 ease-out motion-safe:hover:scale-105 ${
        dark ? 'liquid-glass' : 'shadow-[0_6px_20px_rgb(92_74_54/0.3)]'
      }`}
    >
      {children}
      <ArrowIcon />
    </StarBorder>
  );
}
