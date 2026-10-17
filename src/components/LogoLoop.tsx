import { Link } from 'react-router';
import { STACK } from '../data/stack';

// Band of tech logos looping sideways; pauses on hover. Inspired by React Bits' LogoLoop.
export default function LogoLoop() {
  const logos = STACK.flat();
  const row = [...logos, ...logos]; // doubled so translateX(-50%) loops without a seam

  return (
    <Link
      to="/stack"
      viewTransition
      aria-label="See the full stack"
      className="logo-loop group block overflow-hidden py-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-haze"
      style={{
        maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <div className="logo-loop-track flex w-max gap-6">
        {row.map((tech, i) => {
          const mask = `url(${tech.icon}) center / contain no-repeat`;
          return (
            <span
              key={i}
              title={tech.name}
              className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl shadow-[0_6px_18px_rgb(92_74_54/0.22)]"
              style={{ background: tech.bg }}
            >
              <span className="h-8 w-8" style={{ backgroundColor: tech.fg, mask, WebkitMask: mask }} />
            </span>
          );
        })}
      </div>
    </Link>
  );
}
