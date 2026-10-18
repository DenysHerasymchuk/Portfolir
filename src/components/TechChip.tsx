import { brandColor, techUrl } from '../data/tech';
import TechIcon from './TechIcon';

// Pill with a tech logo in its brand colour that opens the tool's site or docs in a new tab.
// `relative z-10` keeps it clickable above a card's full-size overlay link.
export default function TechChip({ name }: { name: string }) {
  const href = techUrl(name);
  // Greyscale logos have no brand colour and fall back to the text colour, so their chip stays neutral.
  const style = { '--brand': brandColor(name) ?? 'rgb(var(--ink))' } as React.CSSProperties;
  const className =
    'relative z-10 inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--brand)_35%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] px-3 py-1 text-sm text-ink/85';
  const content = (
    <>
      <TechIcon name={name} variant="mono" className="h-3.5 w-3.5 !bg-[var(--brand)]" />
      {name}
    </>
  );
  if (!href)
    return (
      <span className={className} style={style}>
        {content}
      </span>
    );
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      className={`${className} transition-colors hover:border-[var(--brand)] hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haze`}
    >
      {content}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
