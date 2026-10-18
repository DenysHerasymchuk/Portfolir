import { techUrl } from '../data/tech';
import TechIcon from './TechIcon';

// Pill with a tech logo that opens the tool's site or docs in a new tab.
// `relative z-10` keeps it clickable above a card's full-size overlay link.
export default function TechChip({ name }: { name: string }) {
  const href = techUrl(name);
  const className =
    'relative z-10 inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1 text-sm text-ink/80';
  const content = (
    <>
      <TechIcon name={name} variant="mono" className="h-3.5 w-3.5" />
      {name}
    </>
  );
  if (!href) return <span className={className}>{content}</span>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} transition-colors hover:border-ink/40 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haze`}
    >
      {content}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
