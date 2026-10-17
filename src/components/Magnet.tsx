import { useRef } from 'react';

// Pulls its child toward the cursor while the cursor is nearby. Inspired by React Bits' Magnet.
export default function Magnet({
  children,
  strength = 0.25,
  padding = 80, // px around the element where the pull starts
}: {
  children: React.ReactNode;
  strength?: number;
  padding?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse' || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const leave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div onPointerMove={move} onPointerLeave={leave} style={{ padding, margin: -padding }} className="inline-block">
      <div ref={ref} className="transition-transform duration-300 ease-out">
        {children}
      </div>
    </div>
  );
}
