import { useEffect, useRef, useState } from 'react';
import type { ArchEdge, ArchNode } from '../data/projects';

const W = 170; // node size in viewBox units
const H = 72;

// Cubic curve between node centres, bending horizontally or vertically depending on direction.
function edgePath(a: ArchNode, b: ArchNode) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (Math.abs(dx) >= Math.abs(dy)) {
    const c = dx / 2;
    return `M ${a.x} ${a.y} C ${a.x + c} ${a.y}, ${b.x - c} ${b.y}, ${b.x} ${b.y}`;
  }
  const c = dy / 2;
  return `M ${a.x} ${a.y} C ${a.x} ${a.y + c}, ${b.x} ${b.y - c}, ${b.x} ${b.y}`;
}

// System diagram: edges draw in when it scrolls into view, then packets keep flowing along them.
// `compact` drops the text for small previews on the Work list.
export default function ArchitectureDiagram({
  nodes,
  edges,
  hue,
  compact = false,
}: {
  nodes: ArchNode[];
  edges: ArchEdge[];
  hue: number;
  compact?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const svg = ref.current;
    if (!svg || typeof IntersectionObserver === 'undefined') return setDrawn(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setDrawn(true);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  const accent = `hsl(${hue} 55% 55%)`;

  return (
    <svg
      ref={ref}
      viewBox="0 80 1000 400"
      role="img"
      aria-label={compact ? undefined : `Architecture: ${nodes.map(n => n.label).join(', ')}`}
      aria-hidden={compact || undefined}
      className="h-auto w-full"
    >
      {edges.map((e, i) => {
        const a = byId[e.from];
        const b = byId[e.to];
        if (!a || !b) return null;
        const d = edgePath(a, b);
        const id = `edge-${e.from}-${e.to}`;
        return (
          <g key={id}>
            <path
              id={compact ? undefined : id}
              d={d}
              pathLength={1}
              fill="none"
              stroke="rgb(var(--ink) / 0.28)"
              strokeWidth={compact ? 4 : 2}
              strokeDasharray="1"
              style={{
                strokeDashoffset: drawn ? 0 : 1,
                transition: reduce ? 'none' : `stroke-dashoffset 900ms cubic-bezier(0.65,0,0.35,1) ${i * 120}ms`,
              }}
            />
            {drawn && !reduce && (
              <circle r={compact ? 7 : 5} fill={accent}>
                <animateMotion
                  dur={`${2.4 + (i % 3) * 0.5}s`}
                  begin={`${0.9 + i * 0.12}s`}
                  repeatCount="indefinite"
                  path={d}
                />
              </circle>
            )}
            {!compact && e.label && (
              <text
                x={(a.x + b.x) / 2}
                // Horizontal edges: label above the row, since the gap between boxes is too narrow for text.
                y={Math.abs(a.y - b.y) < 20 ? Math.min(a.y, b.y) - H / 2 - 10 : (a.y + b.y) / 2 - 10}
                textAnchor="middle"
                className="fill-haze text-[15px]"
                style={{ opacity: drawn ? 1 : 0, transition: 'opacity 400ms ease 900ms' }}
              >
                {e.label}
              </text>
            )}
          </g>
        );
      })}

      {nodes.map((n, i) => (
        <g
          key={n.id}
          transform={`translate(${n.x - W / 2} ${n.y - H / 2})`}
          style={{
            opacity: drawn ? 1 : 0,
            transition: reduce ? 'none' : `opacity 500ms ease ${i * 70}ms`,
          }}
        >
          <rect
            width={W}
            height={H}
            rx={16}
            fill="rgb(var(--paper))"
            stroke={n.kind === 'service' ? accent : 'rgb(var(--ink) / 0.22)'}
            strokeWidth={n.kind === 'service' ? 2 : 1.5}
          />
          {!compact && (
            <>
              <text x={16} y={30} className="fill-ink text-[18px] font-semibold">
                {n.label}
              </text>
              <text x={16} y={52} className="fill-haze text-[13px]">
                {n.detail}
              </text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
}
