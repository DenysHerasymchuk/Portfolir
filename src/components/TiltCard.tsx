import { useRef } from 'react';

// Card that tilts toward the cursor and shows a soft spotlight where the pointer is.
// The spotlight position is passed to CSS as --mx / --my so no re-render happens on move.
export default function TiltCard({
  children,
  className = '',
  max = 6,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number; // tilt in degrees
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
    if (!reduce) el.style.transform = `perspective(1200px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg)`;
  };

  const leave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`group/tilt relative transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          background: 'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--ink) / 0.07), transparent 60%)',
        }}
      />
      {children}
    </div>
  );
}
