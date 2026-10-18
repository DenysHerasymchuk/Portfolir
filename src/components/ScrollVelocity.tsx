import { useEffect, useRef } from 'react';
import { techUrl } from '../data/tech';
import TechIcon from './TechIcon';

// A row of text that drifts sideways forever and speeds up while the page is being scrolled.
// Inspired by React Bits' ScrollVelocity. Static under reduced motion. With `withIcons`, items are tech links
// and the row pauses while hovered so they can be clicked.
export default function ScrollVelocity({
  items,
  speed = 40, // px per second at rest
  reverse = false,
  withIcons = false,
  className = '',
}: {
  items: string[];
  withIcons?: boolean; // show each item's tech logo before it
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let x = 0;
    let boost = 0;
    let lastY = window.scrollY;
    let last = performance.now();
    let raf = 0;

    const onScroll = () => {
      boost = Math.min(boost + Math.abs(window.scrollY - lastY) * 4, 1500);
      lastY = window.scrollY;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      boost *= 0.92;
      if (!paused.current) x -= (speed + boost) * dt * (reverse ? -1 : 1);
      // The track holds the items twice, so wrapping at half its width is seamless.
      const half = el.scrollWidth / 2;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed, reverse]);

  // Items appear twice so the loop is seamless; the second copy is hidden from screen readers and the tab order.
  const row = [...items, ...items];
  return (
    <div
      className={`overflow-hidden ${className}`}
      aria-hidden={withIcons ? undefined : true}
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
    >
      <div ref={track} className="flex w-max gap-10 whitespace-nowrap will-change-transform">
        {row.map((item, i) => {
          const copy = i >= items.length;
          const href = withIcons ? techUrl(item) : undefined;
          const label = (
            <>
              {withIcons && <TechIcon name={item} variant="mono" className="h-[0.75em] w-[0.75em]" />}
              {item}
            </>
          );
          return (
            <span key={i} className="flex items-center gap-10" aria-hidden={copy || undefined}>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={copy ? -1 : undefined}
                  className="flex items-center gap-[0.3em] transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-haze"
                >
                  {label}
                </a>
              ) : (
                <span className="flex items-center gap-[0.3em]">{label}</span>
              )}
              <span className="inline-block h-[0.18em] w-[0.18em] rounded-full bg-current opacity-40" />
            </span>
          );
        })}
      </div>
    </div>
  );
}
