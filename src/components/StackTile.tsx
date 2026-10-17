import { useEffect, useRef, useState } from 'react';
import type { Tech } from '../data/stack';

// Logo tile in the headline, cap height and on the baseline. Advances every 5s or on click;
// `delay` offsets the first swap so the two tiles don't change together.
export default function StackTile({ items, delay = 0 }: { items: Tech[]; delay?: number }) {
  const [index, setIndex] = useState(0);
  const firstSwap = useRef(true);
  const tech = items[index];

  // Depends on index, so a click also restarts the timer.
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setTimeout(
      () => {
        firstSwap.current = false;
        setIndex(i => (i + 1) % items.length);
      },
      5000 + (firstSwap.current ? delay : 0)
    );
    return () => clearTimeout(timer);
  }, [index, items.length, delay]);

  const mask = `url(${tech.icon}) center / contain no-repeat`;
  return (
    <button
      type="button"
      onClick={() => setIndex(i => (i + 1) % items.length)}
      title={tech.name}
      aria-label={`${tech.name}. Show another technology`}
      className="pointer-events-auto relative mx-[0.04em] inline-block h-[1cap] w-[1cap] rounded-[0.2em] align-baseline transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-haze active:scale-95"
    >
      {/* The button keeps the tile's space in the line. The square remounts on each swap (key) to replay
          the pop, and since it's a transform the words around it don't move. */}
      <span
        key={tech.name}
        className="absolute inset-0 rounded-[inherit] shadow-[0_0.05em_0.18em_rgb(92_74_54/0.3)] motion-safe:animate-[tile-pop_420ms_cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ background: tech.bg }}
      >
        <span className="absolute inset-[22%]" style={{ backgroundColor: tech.fg, mask, WebkitMask: mask }} />
      </span>
    </button>
  );
}
