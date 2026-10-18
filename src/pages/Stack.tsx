import TechIcon from '../components/TechIcon';
import { STACK_GROUPS, techUrl } from '../data/tech';
import { PROJECTS } from '../data/projects';

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
        {STACK_GROUPS.map(group => (
          <div key={group.name} className="group/area border-t border-ink/15 pt-6">
            <h2 className="text-xl font-semibold">
              {'alias' in group ? (
                // Both titles stacked in a one-line window; hovering the group rolls the alias up into view.
                <span className="block h-7 overflow-hidden">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-focus-within/area:-translate-y-1/2 group-hover/area:-translate-y-1/2 motion-reduce:transition-none">
                    <span className="block">{group.name}</span>
                    <span className="block" aria-hidden="true">
                      {group.alias}
                    </span>
                  </span>
                </span>
              ) : (
                group.name
              )}
            </h2>
            <ul className="mt-5 space-y-3">
              {group.items.map(item => {
                const count = usedIn(item).length;
                return (
                  <li key={item} className="flex items-center justify-between gap-4">
                    <a
                      href={techUrl(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/tech flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-haze"
                    >
                      <TechIcon name={item} />
                      <span className="link-underline pb-0.5">{item}</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
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
