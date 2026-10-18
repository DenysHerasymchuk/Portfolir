import { useEffect, useRef, useState } from 'react';
import { TILE_SETS } from '../data/tech';

const TILE = 56;
const GRAVITY = 2200; // px/s²
const MAX_TILES = 12; // above this the oldest tile is removed early

type FallingTile = {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  resting: boolean;
};

// Giant footer name. Clicking a letter squashes it and throws out tech tiles, which fall with simple
// 2D physics, settle on the floor and then disappear in a puff of smoke.
// Tiles don't collide with each other and can overlap; stacking would need something like matter.js.
export default function FooterName() {
  const layerRef = useRef<HTMLDivElement>(null);
  const tiles = useRef<FallingTile[]>([]);
  const raf = useRef(0);

  const nameRef = useRef<HTMLDivElement>(null);
  const [played, setPlayed] = useState(false);
  const playedRef = useRef(false);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // Letters rise in when the name is uncovered, and reset once the footer is fully covered again,
  // so every new reveal replays it.
  useEffect(() => {
    const name = nameRef.current;
    if (!name) return;
    const play = () => {
      if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        Array.from(name.children).forEach((letter, i) =>
          letter.animate?.(
            [
              { translate: '0 70%', opacity: 0 },
              { translate: '0 0', opacity: 1 },
            ],
            { duration: 800, delay: i * 80, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'backwards' }
          )
        );
      }
      playedRef.current = true;
      setPlayed(true);
    };
    // The footer is in the viewport from page load, just hidden behind <main>, and IntersectionObserver
    // can't see that. So measure how much of the name is actually uncovered.
    const main = document.querySelector('main');
    const check = () => {
      const box = name.getBoundingClientRect();
      const coveredTo = Math.max(box.top, main ? main.getBoundingClientRect().bottom : -Infinity);
      const uncovered = Math.min(box.bottom, window.innerHeight) - coveredTo;
      if (playedRef.current && uncovered <= 0) {
        playedRef.current = false;
        setPlayed(false);
      } else if (!playedRef.current && uncovered >= box.height * 0.6) {
        play();
      }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  const run = () => {
    let last = performance.now();
    const tick = (now: number) => {
      const layer = layerRef.current;
      if (!layer) return;
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const floor = layer.clientHeight - TILE;
      const wall = layer.clientWidth - TILE;
      let moving = false;
      for (const t of tiles.current) {
        if (t.resting) continue;
        t.vy += GRAVITY * dt;
        t.x += t.vx * dt;
        t.y += t.vy * dt;
        t.rot += t.vr * dt;
        if (t.x < 0 || t.x > wall) {
          t.x = Math.min(Math.max(t.x, 0), wall);
          t.vx *= -0.5;
        }
        if (t.y > floor) {
          t.y = floor;
          t.vy = Math.abs(t.vy) < 120 ? 0 : -t.vy * 0.35;
          t.vx *= 0.8;
          t.vr *= 0.6;
          if (t.vy === 0 && Math.abs(t.vx) < 8) {
            t.resting = true;
            setTimeout(() => poof(t), 3500 + Math.random() * 2500);
          }
        }
        t.el.style.transform = `translate(${t.x}px, ${t.y}px) rotate(${t.rot}deg)`;
        moving ||= !t.resting;
      }
      raf.current = moving ? requestAnimationFrame(tick) : 0;
    };
    if (!raf.current) raf.current = requestAnimationFrame(tick);
  };

  // Removes a tile with a quick scale-up and a puff of smoke.
  const poof = (t: FallingTile) => {
    const layer = layerRef.current;
    if (!layer || !t.el.isConnected) return;
    tiles.current = tiles.current.filter(other => other !== t);
    const cx = t.x + TILE / 2;
    const cy = t.y + TILE / 2;
    for (let i = 0; i < 9; i++) {
      const size = 26 + Math.random() * 26;
      const angle = (i / 9) * Math.PI * 2 + Math.random() * 0.5;
      const dist = 18 + Math.random() * 22;
      const puff = document.createElement('div');
      puff.className = 'absolute rounded-full bg-[#efe8da] blur-[1px]';
      Object.assign(puff.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${cx - size / 2}px`,
        top: `${cy - size / 2}px`,
      });
      layer.append(puff);
      puff.animate(
        [
          { transform: 'translate(0, 0) scale(0.3)', opacity: 0.95 },
          {
            transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - 10}px) scale(1.3)`,
            opacity: 0,
          },
        ],
        {
          duration: 550 + Math.random() * 200,
          easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)',
        }
      ).onfinish = () => puff.remove();
    }
    // `scale` composes with the tile's rotate transform instead of replacing it.
    t.el.animate(
      [
        { opacity: 1, scale: '1' },
        { opacity: 0, scale: '1.3' },
      ],
      {
        duration: 180,
        easing: 'ease-out',
        fill: 'forwards',
      }
    ).onfinish = () => t.el.remove();
  };

  const burst = (letter: HTMLElement) => {
    const layer = layerRef.current;
    if (!layer || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    // Squash toward the baseline, overshoot, settle.
    letter.animate(
      [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(1.12, 0.8)' },
        { transform: 'scale(0.94, 1.07)' },
        { transform: 'scale(1.02, 0.98)' },
        { transform: 'scale(1, 1)' },
      ],
      { duration: 600, easing: 'cubic-bezier(0.3, 0.7, 0.4, 1)' }
    );

    const box = layer.getBoundingClientRect();
    const from = letter.getBoundingClientRect();
    const techs = TILE_SETS.flat();
    for (let i = 0; i < 4; i++) {
      const tech = techs[Math.floor(Math.random() * techs.length)];
      const el = document.createElement('div');
      el.className = 'absolute left-0 top-0 rounded-[14px] shadow-[0_6px_16px_rgb(0_0_0/0.4)]';
      el.style.width = el.style.height = `${TILE}px`;
      el.style.background = tech.bg;
      const logo = document.createElement('div');
      logo.className = 'absolute inset-[22%]';
      if (tech.color) logo.style.background = `url(${tech.icon}) center / contain no-repeat`;
      else {
        logo.style.backgroundColor = tech.fg;
        logo.style.mask = logo.style.webkitMask = `url(${tech.icon}) center / contain no-repeat`;
      }
      el.append(logo);
      layer.append(el);
      tiles.current.push({
        el,
        x: from.left - box.left + from.width / 2 - TILE / 2,
        y: Math.max(0, from.top - box.top + from.height * 0.15),
        vx: (Math.random() - 0.5) * 900,
        vy: -(700 + Math.random() * 600),
        rot: Math.random() * 40 - 20,
        vr: (Math.random() - 0.5) * 900,
        resting: false,
      });
    }
    while (tiles.current.length > MAX_TILES) poof(tiles.current[0]);
    run();
  };

  return (
    <>
      {/* Decorative, so hidden from screen readers and the tab order. Sized by viewport width to span the
          screen; the box is shorter than the letters, so they sink off the bottom edge. Phones show more of
          each letter, so it sits clear of the home bar and is easy to tap. touch-manipulation stops quick
          repeat taps from zooming the page instead of popping tiles. */}
      <div
        ref={nameRef}
        aria-hidden="true"
        className="mt-28 flex h-[0.62em] select-none justify-center whitespace-nowrap font-craze text-[30vw] leading-[0.8] sm:h-[0.48em]"
      >
        {'DENYS'.split('').map((letter, i) => (
          <button
            key={i}
            type="button"
            tabIndex={-1}
            onClick={e => burst(e.currentTarget)}
            className="origin-bottom touch-manipulation text-[#efe8da]/[0.08] transition-colors [-webkit-tap-highlight-color:transparent] hover:text-[#efe8da]/[0.14]"
            // Below the edge until the rise plays. Uses `translate` so the squash animation, which
            // sets transform, doesn't override it.
            style={played ? undefined : { translate: '0 70%', opacity: 0 }}
          >
            {letter}
          </button>
        ))}
      </div>
      <div ref={layerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10" />
    </>
  );
}
