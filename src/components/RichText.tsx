import { Fragment, useEffect, useRef, useState } from 'react';
import { techUrl } from '../data/tech';

const NUM = '(?:one|two|three|four|five|ten|fifteen|thirty|a few)';
const UNIT = '(?:seconds?|minutes?|hours?|days?|weeks?|months?|times)';
// Figures worth noticing: "2.1s", "100ms", "1.1x", "1080p", "15 seconds", "two seconds", "more than half".
const FIGURE = `\\d+(?:[.,]\\d+)*(?:ms|s|x|%|k|p|MB|GB)?(?:\\s${UNIT})?(?!\\w|\\.\\d)|\\b${NUM}\\s${UNIT}\\b|more than half`;

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Body copy that comes alive on scroll: figures get a marker underline that draws in, and the tools named in
// `mentions` become inline links.
export default function RichText({ text, mentions = [] }: { text: string; mentions?: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return setSeen(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        observer.disconnect();
      },
      { rootMargin: '0px 0px -15% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Longest names first so "Tailwind CSS" wins over "CSS"; \b keeps "Go" out of "good".
  const names = mentions.filter(techUrl).sort((a, b) => b.length - a.length);
  const tech = names.length ? `|(?<![\\w.])(?:${names.map(escape).join('|')})(?![\\w])` : '';
  const parts = text.split(new RegExp(`(${FIGURE}${tech})`, 'g'));

  return (
    <span ref={ref} className={seen ? 'is-seen' : undefined}>
      {parts.map((part, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
        if (names.includes(part))
          return (
            <a
              key={i}
              href={techUrl(part)}
              target="_blank"
              rel="noopener noreferrer"
              className="mention font-medium text-ink"
            >
              {part}
            </a>
          );
        return (
          <mark
            key={i}
            className="figure bg-transparent font-medium text-ink"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {part}
          </mark>
        );
      })}
    </span>
  );
}
