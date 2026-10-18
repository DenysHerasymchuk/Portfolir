import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { projectBySlug } from '../data/projects';
import { CREDENTIALS } from '../data/site';
import { ArrowIcon } from './PrimaryButton';
import ProjectImage from './ProjectImage';

// Dated timeline of work, team programmes and studies, each with a card for the project it produced.
// The line draws down and the entries fade up in turn the first time the list scrolls into view.
export default function Credentials({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return setShown(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={ref} className={`relative ${className}`}>
      <span
        aria-hidden="true"
        className="absolute left-[7px] top-2 w-px origin-top bg-ink/20 transition-transform duration-1000 ease-out motion-reduce:transition-none sm:left-[calc(9rem+7px)]"
        style={{ bottom: '0.5rem', transform: shown ? 'scaleY(1)' : 'scaleY(0)' }}
      />
      {CREDENTIALS.map((item, i) => {
        const project = projectBySlug(item.project);
        return (
          <li
            key={item.title}
            className="relative grid gap-2 pb-12 pl-10 transition-[opacity,transform] duration-700 ease-out last:pb-0 motion-reduce:transition-none sm:grid-cols-[9rem_1fr] sm:gap-10 sm:pl-0"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? 'none' : 'translateY(16px)',
              transitionDelay: shown ? `${200 + i * 180}ms` : '0ms',
            }}
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-ink/40 bg-paper sm:left-[9rem]"
            />
            <p className="text-sm text-haze sm:pt-0.5">{item.date}</p>
            <div className="sm:pl-10">
              <h3 className="flex items-center gap-3 text-xl font-semibold">
                <img src={item.logo} alt="" className="h-9 w-9 shrink-0 object-contain" />
                {item.title}
              </h3>
              <p className="mt-1 text-haze">{item.place}</p>
              <p className="mt-3 max-w-prose leading-relaxed text-ink/80">{item.body}</p>
              {project && (
                <Link
                  to={`/work/${project.slug}`}
                  viewTransition
                  className="group/btn mt-5 block max-w-md rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-haze"
                >
                  <div className="overflow-hidden rounded-2xl">
                    <ProjectImage
                      name={project.name}
                      caption={project.images[0].caption}
                      hue={project.hue}
                      className="aspect-[16/9] transition-transform duration-500 ease-out group-hover/btn:scale-[1.03] motion-reduce:transition-none"
                    />
                  </div>
                  <span className="mt-3 inline-flex items-center gap-2 font-medium">
                    <span className="link-underline pb-0.5">See the project: {project.name}</span>
                    <ArrowIcon />
                  </span>
                </Link>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
