import { useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { NAV_LINKS } from '../data/site';

// Padding gives each link a ~44px click target; NavLinks draws the hover pill behind it.
const navLink = ({ isActive }: { isActive: boolean }) =>
  `relative z-10 rounded-full px-4 py-2.5 text-base transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-haze ${
    isActive ? 'text-ink' : 'text-ink/65'
  }`;

// One pill slides to the hovered link and rests under the active one.
export default function NavLinks() {
  const { pathname } = useLocation();
  const [hovered, setHovered] = useState<number | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const active = NAV_LINKS.findIndex(link => pathname.startsWith(link.to));
  const target = hovered ?? (active >= 0 ? active : null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = target === null ? null : links.current[target];
      setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
    };
    measure();
    // Measure again on resize and after fonts load, since both change link widths.
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [target]);

  return (
    <div className="relative flex items-center" onMouseLeave={() => setHovered(null)}>
      <span
        aria-hidden="true"
        className="absolute inset-y-0 my-auto h-11 rounded-full bg-ink/10 transition-[left,width,opacity] duration-[250ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] motion-reduce:transition-none"
        style={{
          left: pill?.left ?? 0,
          width: pill?.width ?? 0,
          opacity: pill ? 1 : 0,
        }}
      />
      {NAV_LINKS.map((link, i) => (
        <NavLink
          key={link.to}
          ref={el => {
            links.current[i] = el;
          }}
          to={link.to}
          viewTransition
          className={navLink}
          onMouseEnter={() => setHovered(i)}
          onFocus={() => setHovered(i)}
          onBlur={() => setHovered(null)}
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}
