import { Link, useSearchParams } from 'react-router';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import TechChip from '../components/TechChip';
import TechIcon from '../components/TechIcon';
import { ArrowIcon } from '../components/PrimaryButton';
import TiltCard from '../components/TiltCard';
import { PROJECTS, type Project } from '../data/projects';
import { brandColor, onStack } from '../data/tech';

const SORTS = { featured: 'Featured', newest: 'Newest', name: 'Name' };
type Sort = keyof typeof SORTS;

const techsOf = (p: Project) => p.stack.flatMap(g => g.items);

// Filter chips: every Stack page tool that a project uses, most used first.
const counts: Record<string, number> = {};
for (const tech of PROJECTS.flatMap(techsOf).filter(onStack)) counts[tech] = (counts[tech] ?? 0) + 1;
const FILTER_TECHS = Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b));

export default function Work() {
  // Search, tech filters and sort live in the URL (?q=&tech=&sort=), so a filtered view can be shared.
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const techs = params.getAll('tech');
  const sortParam = params.get('sort') ?? '';
  const sort: Sort = sortParam in SORTS ? (sortParam as Sort) : 'featured';
  const filtering = query !== '' || techs.length > 0;

  const update = (change: (next: URLSearchParams) => void) =>
    setParams(
      prev => {
        const next = new URLSearchParams(prev);
        change(next);
        return next;
      },
      { replace: true, preventScrollReset: true }
    );

  const toggleTech = (tech: string) =>
    update(next => {
      next.delete('tech');
      const chosen = techs.includes(tech) ? techs.filter(t => t !== tech) : [...techs, tech];
      chosen.forEach(t => next.append('tech', t));
    });

  const clear = () =>
    update(next => {
      next.delete('q');
      next.delete('tech');
    });

  // A project shows when it uses every chosen tool and the search matches its name, text or tools.
  const needle = query.trim().toLowerCase();
  const shown = PROJECTS.filter(
    p =>
      techs.every(t => techsOf(p).includes(t)) &&
      (!needle || [p.name, p.tagline, p.summary, ...techsOf(p)].join(' ').toLowerCase().includes(needle))
  );
  if (sort === 'newest') shown.sort((a, b) => b.year.localeCompare(a.year));
  if (sort === 'name') shown.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="mx-auto max-w-6xl px-6 pb-40 pt-36 sm:px-10">
      <header className="max-w-3xl">
        <h1 className="font-display text-7xl leading-none sm:text-8xl">Work</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/75 sm:text-xl">
          Systems I designed and built end to end, from sensors in the field to the screen. Each one has its own page
          with the architecture, the trade-offs I made and the problems I ran into along the way.
        </p>
      </header>

      <div className="mt-14 space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search projects</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-haze"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={e => update(next => (e.target.value ? next.set('q', e.target.value) : next.delete('q')))}
              placeholder="Search by name, idea or tool"
              className="w-full rounded-full border border-ink/15 bg-ink/[0.03] py-3 pl-11 pr-4 text-base placeholder:text-haze focus:border-ink/40 focus:outline-none"
            />
          </label>
          <div role="group" aria-label="Sort projects" className="flex shrink-0 rounded-full border border-ink/15 p-1">
            {(Object.keys(SORTS) as Sort[]).map(key => (
              <button
                key={key}
                type="button"
                aria-pressed={sort === key}
                onClick={() => update(next => (key === 'featured' ? next.delete('sort') : next.set('sort', key)))}
                className={`flex-1 rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-haze ${
                  sort === key ? 'bg-ink text-paper' : 'text-ink/70 hover:text-ink'
                }`}
              >
                {SORTS[key]}
              </button>
            ))}
          </div>
        </div>

        {/* One swipeable row on phones, wrapped lines from sm up. */}
        <div
          role="group"
          aria-label="Filter by technology"
          className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:mx-0 [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {FILTER_TECHS.map(tech => {
            const on = techs.includes(tech);
            return (
              <button
                key={tech}
                type="button"
                aria-pressed={on}
                onClick={() => toggleTech(tech)}
                style={{ '--brand': brandColor(tech) ?? 'rgb(var(--ink))' } as React.CSSProperties}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-haze ${
                  on
                    ? 'border-[var(--brand)] bg-[color-mix(in_srgb,var(--brand)_18%,transparent)] text-ink'
                    : 'border-ink/15 text-ink/70 hover:border-ink/35 hover:text-ink'
                }`}
              >
                <TechIcon name={tech} variant="mono" className="h-3.5 w-3.5 !bg-[var(--brand)]" />
                {tech}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="text-sm text-haze">
          {shown.length} of {PROJECTS.length} projects
          {filtering && (
            <button type="button" onClick={clear} className="link-underline ml-3 pb-0.5 text-ink">
              Clear filters
            </button>
          )}
        </p>
      </div>

      {shown.length === 0 && (
        <div className="mt-12 rounded-3xl border border-dashed border-ink/20 p-10 text-center">
          <p className="text-lg">No project matches that yet.</p>
          <button type="button" onClick={clear} className="link-underline mt-3 pb-0.5 text-haze hover:text-ink">
            Clear filters
          </button>
        </div>
      )}

      <ul className="mt-12 space-y-8">
        {shown.map(project => (
          <li key={project.slug}>
            <TiltCard className="rounded-3xl" max={4}>
              {/* The title link stretches over the whole card (after:inset-0); stack chips sit above it as their own links. */}
              <div className="group/btn relative grid gap-8 rounded-3xl border border-ink/10 bg-ink/[0.03] p-6 transition-colors hover:border-ink/25 has-[.card-link:focus-visible]:outline has-[.card-link:focus-visible]:outline-2 has-[.card-link:focus-visible]:outline-offset-4 has-[.card-link:focus-visible]:outline-haze sm:p-10 md:grid-cols-[1.1fr_1fr] md:items-center">
                <div>
                  <p className="text-sm text-haze">
                    {project.year}, {project.duration}
                  </p>
                  <h2 className="mt-2 font-craze text-5xl uppercase leading-none sm:text-6xl">
                    <Link
                      to={`/work/${project.slug}`}
                      viewTransition
                      className="card-link after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none"
                    >
                      {project.name}
                    </Link>
                  </h2>
                  <p className="mt-4 text-lg leading-snug sm:text-xl">{project.tagline}</p>
                  <p className="mt-3 leading-relaxed text-ink/70">{project.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.stack
                      .flatMap(group => group.items)
                      .slice(0, 6)
                      .map(item => (
                        <li key={item}>
                          <TechChip name={item} />
                        </li>
                      ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-2 font-medium" aria-hidden="true">
                    Read the case study
                    <ArrowIcon />
                  </span>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-paper p-4">
                  <ArchitectureDiagram
                    nodes={project.architecture.nodes}
                    edges={project.architecture.edges}
                    hue={project.hue}
                    compact
                  />
                </div>
              </div>
            </TiltCard>
          </li>
        ))}
      </ul>
    </section>
  );
}
