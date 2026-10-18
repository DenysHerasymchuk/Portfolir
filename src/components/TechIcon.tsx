import { techLogo } from '../data/tech';

// Technology logo. `tile` is the coloured app-icon look; `mono` draws the bare logo in the current text colour.
// Technologies without a logo get their initials instead.
export default function TechIcon({
  name,
  variant = 'tile',
  className = 'h-7 w-7',
}: {
  name: string;
  variant?: 'tile' | 'mono';
  className?: string;
}) {
  const tech = techLogo(name);
  const initials = name
    .replace(/[^A-Za-z0-9 ]/g, '')
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (variant === 'mono') {
    if (!tech) return null;
    const mask = `url(${tech.icon}) center / contain no-repeat`;
    return (
      <span
        aria-hidden="true"
        className={`inline-block shrink-0 bg-current ${className}`}
        style={{ mask, WebkitMask: mask }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-lg shadow-[0_2px_6px_rgb(92_74_54/0.2)] ${className}`}
      style={{ background: tech?.bg ?? 'rgb(var(--ink) / 0.1)' }}
    >
      {tech ? (
        <span
          className="h-[58%] w-[58%]"
          style={{
            backgroundColor: tech.fg,
            mask: `url(${tech.icon}) center / contain no-repeat`,
            WebkitMask: `url(${tech.icon}) center / contain no-repeat`,
          }}
        />
      ) : (
        <span className="text-[0.6em] font-semibold leading-none text-ink/70">{initials}</span>
      )}
    </span>
  );
}
