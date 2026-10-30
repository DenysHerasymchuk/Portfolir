import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import { TopicIcon, type Glyph } from '../components/Icon';
import { ArrowIcon } from '../components/PrimaryButton';
import ProjectImage from '../components/ProjectImage';
import RichText from '../components/RichText';
import TechChip from '../components/TechChip';
import { PROJECTS, projectBySlug } from '../data/projects';
import NotFound from './NotFound';

// Counts the numeric part of a value like "2.1s" or "100k" up from zero when it scrolls into view.
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  const [shown, setShown] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    const [, prefix, num, suffix] = match;
    const target = parseFloat(num);
    const decimals = num.includes('.') ? num.split('.')[1].length : 0;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') return setShown(value);
    let raf = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1200);
        const eased = 1 - (1 - t) ** 3;
        setShown(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span ref={ref}>{shown}</span>;
}

// A titled block with a keyword icon beside it; the body text comes alive on scroll.
function Topic({
  title,
  body,
  fallback,
  mentions,
}: {
  title: string;
  body: string;
  fallback: Glyph;
  mentions: string[];
}) {
  return (
    <div className="flex gap-4">
      <TopicIcon title={title} fallback={fallback} />
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 leading-relaxed text-ink/75">
          <RichText text={body} mentions={mentions} />
        </p>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{children}</h2>;
}

export default function Project() {
  const { slug } = useParams();
  const project = projectBySlug(slug);
  if (!project) return <NotFound />;

  const index = PROJECTS.indexOf(project);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const [cover, ...gallery] = project.images;
  const mentions = project.stack.flatMap(g => g.items);

  return (
    <article className="mx-auto max-w-6xl px-6 pb-40 pt-32 sm:px-10">
      <Link to="/work" viewTransition className="link-underline inline-block pb-0.5 text-haze hover:text-ink">
        All work
      </Link>

      <header className="mt-10">
        <h1 className="font-craze text-[clamp(4rem,14vw,10rem)] uppercase leading-[0.85]">{project.name}</h1>
        <p className="mt-6 max-w-3xl text-xl leading-snug sm:text-2xl">{project.tagline}</p>
        <dl className="mt-10 grid gap-6 border-t border-ink/10 pt-6 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-haze">Role</dt>
            <dd className="mt-1 text-base">{project.role}</dd>
          </div>
          <div>
            <dt className="text-haze">Year</dt>
            <dd className="mt-1 text-base">{project.year}</dd>
          </div>
          {project.duration && (
            <div>
              <dt className="text-haze">Time spent</dt>
              <dd className="mt-1 text-base">{project.duration}</dd>
            </div>
          )}
        </dl>
      </header>

      {cover && <ProjectImage image={cover} className="mt-14 aspect-[16/9]" />}

      <section className="mt-28 grid gap-12 md:grid-cols-[1.5fr_1fr]">
        <div>
          <SectionTitle>Overview</SectionTitle>
          <div className="mt-6 max-w-prose space-y-5 text-lg leading-relaxed text-ink/80">
            {project.overview.map(p => (
              <p key={p.slice(0, 24)}>
                <RichText text={p} mentions={mentions} />
              </p>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">What I did</h3>
          <ul className="mt-4 space-y-3 text-ink/80">
            {project.responsibilities.map(r => (
              <li key={r} className="border-l-2 border-ink/15 pl-4 leading-relaxed">
                <RichText text={r} mentions={mentions} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {project.results.length > 0 && (
        <section className="mt-28">
          <SectionTitle>Results</SectionTitle>
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-4">
            {project.results.map(r => (
              <div key={r.label} className="flex flex-col-reverse bg-paper p-6 sm:p-8">
                <dt className="mt-3 text-sm text-haze">{r.label}</dt>
                <dd className="font-craze text-5xl leading-none sm:text-6xl">
                  <CountUp value={r.value} />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="mt-28">
        <SectionTitle>Architecture</SectionTitle>
        <p className="mt-4 max-w-2xl text-lg text-ink/75">
          How the pieces connect. Highlighted boxes are services I wrote; the dots show data moving through the system.
        </p>
        {/* On phones the diagram keeps a readable width and scrolls sideways inside its box. */}
        <div className="mt-8 overflow-x-auto rounded-3xl border border-ink/10 bg-ink/[0.03] p-4 sm:p-8">
          <div className="min-w-[680px] md:min-w-0">
            <ArchitectureDiagram
              nodes={project.architecture.nodes}
              edges={project.architecture.edges}
              hue={project.hue}
            />
          </div>
        </div>
        <p className="mt-3 text-sm text-haze md:hidden">Swipe the diagram to see all of it.</p>
        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {project.architecture.notes.map(note => (
            <Topic key={note.title} {...note} fallback="server" mentions={mentions} />
          ))}
        </div>
      </section>

      {(project.decisions.length > 0 || project.challenges.length > 0) && (
        <section className="mt-28 grid gap-16 md:grid-cols-2">
          {project.decisions.length > 0 && (
            <div>
              <SectionTitle>Decisions</SectionTitle>
              <div className="mt-8 space-y-8">
                {project.decisions.map(d => (
                  <Topic key={d.title} {...d} fallback="check" mentions={mentions} />
                ))}
              </div>
            </div>
          )}
          {project.challenges.length > 0 && (
            <div>
              <SectionTitle>What went wrong</SectionTitle>
              <div className="mt-8 space-y-8">
                {project.challenges.map(c => (
                  <Topic key={c.title} {...c} fallback="alert" mentions={mentions} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      <section className="mt-28">
        <SectionTitle>Stack</SectionTitle>
        <dl className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {project.stack.map(group => (
            <div key={group.layer}>
              <dt className="flex items-center gap-3 font-semibold">
                <TopicIcon title={group.layer} fallback="spark" size="h-9 w-9" />
                {group.layer}
              </dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {group.items.map(item => (
                  <TechChip key={item} name={item} />
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {gallery.length > 0 && (
        <section className="mt-28 grid gap-6 md:grid-cols-2">
          {gallery.map(img => (
            <ProjectImage key={img.caption} image={img} className="aspect-[16/9]" />
          ))}
        </section>
      )}

      {(project.live || project.source) && (
        <div className="mt-16 flex flex-wrap gap-3">
          {[
            { href: project.live, label: 'Live site' },
            { href: project.source, label: 'Source code' },
          ].map(
            link =>
              link.href && (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-ink/15 px-5 py-2.5 transition-colors hover:border-ink/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haze"
                >
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )
          )}
        </div>
      )}

      <nav aria-label="More projects" className="mt-28 grid gap-6 border-t border-ink/10 pt-10 sm:grid-cols-2">
        <Link to={`/work/${prev.slug}`} viewTransition className="group/btn">
          <span className="text-sm text-haze">Previous</span>
          <span className="mt-1 block font-craze text-4xl uppercase">{prev.name}</span>
        </Link>
        <Link to={`/work/${next.slug}`} viewTransition className="group/btn sm:text-right">
          <span className="text-sm text-haze">Next</span>
          <span className="mt-1 flex items-center gap-3 font-craze text-4xl uppercase sm:justify-end">
            {next.name}
            <ArrowIcon />
          </span>
        </Link>
      </nav>
    </article>
  );
}
