import { Link } from 'react-router';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import TechChip from '../components/TechChip';
import { ArrowIcon } from '../components/PrimaryButton';
import TiltCard from '../components/TiltCard';
import { PROJECTS } from '../data/projects';

export default function Work() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-40 pt-36 sm:px-10">
      <header className="max-w-3xl">
        <h1 className="font-display text-7xl leading-none sm:text-8xl">Work</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/75 sm:text-xl">
          Systems I designed and built end to end, from sensors in the field to the screen. Each one has its own page
          with the architecture, the trade-offs I made and the problems I ran into along the way.
        </p>
      </header>

      <ul className="mt-20 space-y-8">
        {PROJECTS.map(project => (
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
