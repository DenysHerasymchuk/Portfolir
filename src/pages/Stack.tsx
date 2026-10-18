import TechIcon from '../components/TechIcon';
import { PROJECTS } from '../data/projects';

const GROUPS = [
  { name: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'hls.js', 'WebRTC', 'D3'] },
  { name: 'Backend', items: ['Go', 'Node.js', 'Python', 'FastAPI', 'PHP', 'WebSockets', 'gRPC'] },
  { name: 'Data', items: ['PostgreSQL', 'Redis', 'Kafka', 'ClickHouse', 'pgvector'] },
  { name: 'Infrastructure', items: ['Docker', 'Kubernetes', 'Linux', 'Caddy', 'Prometheus', 'Grafana'] },
  { name: 'Tools', items: ['Git', 'Figma', 'Vitest', 'Playwright'] },
];

const usedIn = (tech: string) => PROJECTS.filter(p => p.stack.some(g => g.items.includes(tech)));

export default function Stack() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-40 pt-36 sm:px-10">
      <header className="max-w-3xl">
        <h1 className="font-display text-7xl leading-none sm:text-8xl">Stack</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/75 sm:text-xl">
          The tools I reach for, and the projects where I used them. I pick boring, well-documented tech by default and
          something newer when the problem needs it.
        </p>
      </header>

      <div className="mt-20 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {GROUPS.map(group => (
          <div key={group.name} className="border-t border-ink/15 pt-6">
            <h2 className="text-xl font-semibold">{group.name}</h2>
            <ul className="mt-5 space-y-3">
              {group.items.map(item => {
                const count = usedIn(item).length;
                return (
                  <li key={item} className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-3">
                      <TechIcon name={item} />
                      {item}
                    </span>
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
