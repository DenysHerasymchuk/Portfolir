import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ArrowIcon } from '../../components/PrimaryButton';
import ProjectImage from '../../components/ProjectImage';
import TechIcon from '../../components/TechIcon';
import { PROJECTS } from '../../data/projects';

const FEATURED = PROJECTS.slice(0, 3);

// Featured projects as cards that pin and stack while scrolling; covered cards shrink and dim a little.
// Inspired by React Bits' ScrollStack.
export default function SelectedWork() {
  const cards = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      cards.current.forEach((card, i) => {
        const nextCard = cards.current[i + 1];
        if (!card || !nextCard) return;
        // How far the next card has slid over this one, from 0 to 1.
        const overlap = card.getBoundingClientRect().bottom - nextCard.getBoundingClientRect().top;
        const t = Math.min(Math.max(overlap / card.offsetHeight, 0), 1);
        card.style.transform = `scale(${1 - t * 0.06})`;
        card.style.filter = `brightness(${1 - t * 0.12})`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="selected-work" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-32 sm:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-6xl leading-none sm:text-7xl">Selected work</h2>
        <Link
          to="/work"
          viewTransition
          className="group/btn inline-flex items-center gap-2 link-underline pb-0.5 text-lg"
        >
          See all projects
          <ArrowIcon />
        </Link>
      </div>

      <div className="mt-14">
        {FEATURED.map((project, i) => (
          <div
            key={project.slug}
            ref={el => {
              cards.current[i] = el;
            }}
            className="sticky mb-10 origin-top rounded-[2rem] border border-ink/10 bg-paper shadow-[0_-8px_40px_rgb(92_74_54/0.12)] last:mb-0"
            style={{ top: `calc(7rem + ${i * 1.5}rem)` }}
          >
            <Link
              to={`/work/${project.slug}`}
              viewTransition
              className="group/btn grid gap-8 p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-haze sm:p-10 md:grid-cols-[1fr_1.15fr] md:items-center"
            >
              <div>
                <p className="text-sm text-haze">
                  {project.year}, {project.duration}
                </p>
                <h3 className="mt-2 font-craze text-5xl uppercase leading-none sm:text-6xl">{project.name}</h3>
                <p className="mt-4 text-lg leading-snug sm:text-xl">{project.tagline}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.stack
                    .flatMap(group => group.items)
                    .slice(0, 5)
                    .map(item => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1 text-sm text-ink/80"
                      >
                        <TechIcon name={item} variant="mono" className="h-3.5 w-3.5" />
                        {item}
                      </li>
                    ))}
                </ul>
                <span className="mt-8 inline-flex items-center gap-2 font-medium">
                  Read the case study
                  <ArrowIcon />
                </span>
              </div>
              <ProjectImage
                name={project.name}
                caption={project.images[0].caption}
                hue={project.hue}
                className="aspect-[16/10]"
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
