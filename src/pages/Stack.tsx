import { useState } from 'react';
import { Link } from 'react-router';
import { PROJECTS } from '../data/projects';
import { STACK, type Tech } from '../data/stack';

const GROUPS = [
  { name: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'hls.js', 'WebRTC', 'D3'] },
  { name: 'Backend', items: ['Go', 'Node.js', 'Python', 'FastAPI', 'PHP', 'WebSockets', 'gRPC'] },
  { name: 'Data', items: ['PostgreSQL', 'Redis', 'Kafka', 'ClickHouse', 'pgvector'] },
  { name: 'Infrastructure', items: ['Docker', 'Kubernetes', 'Linux', 'Caddy', 'Prometheus', 'Grafana'] },
  { name: 'Tools', items: ['Git', 'Figma', 'Vitest', 'Playwright'] },
];

const usedIn = (tech: string) => PROJECTS.filter(p => p.stack.some(g => g.items.includes(tech)));

// Logos circling on two rings. Hovering or focusing one pauses the orbit and shows where it was used.
function Orbit() {
  const [selected, setSelected] = useState<Tech | null>(null);
  const [inner, outer] = STACK;
  const projects = selected ? usedIn(selected.name) : [];

  // radius is a percentage of the orbit's width.
  const ring = (items: Tech[], radius: number, reverse: boolean) => (
    <div className={`orbit-ring absolute inset-0 ${reverse ? 'orbit-reverse' : ''}`}>
      {items.map((tech, i) => {
        const angle = ((2 * Math.PI) / items.length) * i - Math.PI / 2;
        const mask = `url(${tech.icon}) center / contain no-repeat`;
        return (
          <div
            key={tech.name}
            className="absolute"
            style={{ left: `${50 + radius * Math.cos(angle)}%`, top: `${50 + radius * Math.sin(angle)}%` }}
          >
            {/* Counter-spins so the logo stays upright while the ring turns. */}
            <div className={`orbit-ring ${reverse ? '' : 'orbit-reverse'}`}>
              <button
                type="button"
                onMouseEnter={() => setSelected(tech)}
                onFocus={() => setSelected(tech)}
                aria-label={tech.name}
                className={`-ml-7 -mt-7 grid h-14 w-14 place-items-center rounded-2xl shadow-[0_6px_18px_rgb(92_74_54/0.25)] transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-haze sm:h-16 sm:w-16 ${
                  selected?.name === tech.name ? 'scale-110' : ''
                }`}
                style={{ background: tech.bg }}
              >
                <span className="h-7 w-7 sm:h-8 sm:w-8" style={{ backgroundColor: tech.fg, mask, WebkitMask: mask }} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="orbit relative mx-auto aspect-square w-[78%] max-w-[560px] sm:w-full" onMouseLeave={() => setSelected(null)}>
      <div className="absolute inset-[18%] rounded-full border border-dashed border-ink/15" />
      <div className="absolute inset-[2%] rounded-full border border-dashed border-ink/10" />
      {ring(inner, 32, false)}
      {ring(outer, 48, true)}
      <div className="absolute inset-[30%] grid place-items-center text-center" aria-live="polite">
        {selected ? (
          <div>
            <p className="text-2xl font-semibold">{selected.name}</p>
            {projects.length > 0 ? (
              <p className="mt-2 text-sm text-ink/70">
                Used in{' '}
                {projects.map((p, i) => (
                  <span key={p.slug}>
                    {i > 0 && ', '}
                    <Link to={`/work/${p.slug}`} viewTransition className="link-underline text-ink">
                      {p.name}
                    </Link>
                  </span>
                ))}
              </p>
            ) : (
              <p className="mt-2 text-sm text-ink/70">Part of my everyday workflow</p>
            )}
          </div>
        ) : (
          <p className="max-w-[12rem] text-sm text-haze">Hover a logo to see where I used it</p>
        )}
      </div>
    </div>
  );
}

export default function Stack() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-40 pt-36 sm:px-10">
      <div className="grid items-center gap-16 md:grid-cols-[1fr_1.2fr]">
        <header>
          <h1 className="font-display text-7xl leading-none sm:text-8xl">Stack</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75 sm:text-xl">
            The tools I reach for, and the projects where I used them. I pick boring, well-documented tech by default and
            something newer when the problem needs it.
          </p>
        </header>
        <Orbit />
      </div>

      <div className="mt-32 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {GROUPS.map(group => (
          <div key={group.name} className="border-t border-ink/15 pt-6">
            <h2 className="text-xl font-semibold">{group.name}</h2>
            <ul className="mt-5 space-y-3">
              {group.items.map(item => {
                const count = usedIn(item).length;
                return (
                  <li key={item} className="flex items-baseline justify-between gap-4">
                    <span>{item}</span>
                    {count > 0 && (
                      <span className="text-sm text-haze">
                        {count} {count === 1 ? 'project' : 'projects'}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
