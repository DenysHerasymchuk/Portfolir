import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import github from '../assets/stack/github.svg';
import Logo from '../components/Logo';
import { FOOTER_COLUMNS, SOCIALS } from '../data/site';
import FooterName from './FooterName';

// Always-dark footer with the giant name along the bottom edge.
export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [fits, setFits] = useState(false);

  // Pinned under the page and revealed as the page scrolls away, but only when the whole footer fits in
  // the window, or its top could never be reached. The giant name makes its height depend on width.
  useEffect(() => {
    const check = () =>
      setFits(!!ref.current && window.innerWidth >= 768 && ref.current.offsetHeight <= window.innerHeight);
    check();
    document.fonts?.ready.then(check); // Craze loading changes the name's height
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <footer
      ref={ref}
      id="footer"
      className={`${fits ? 'sticky bottom-0' : 'relative'} overflow-hidden border-t border-white/5 bg-[#120f0c] text-[#efe8da]`}
    >
      <div className="mx-auto max-w-6xl px-6 pt-24 sm:px-10">
        <div className="grid gap-x-20 gap-y-12 md:grid-cols-[1fr_auto_auto]">
          <Link
            to="/"
            viewTransition
            aria-label="Home"
            className="h-fit w-fit text-[#efe8da]/50 transition-colors hover:text-[#efe8da]/80"
          >
            <Logo className="h-12 w-12" />
          </Link>
          {FOOTER_COLUMNS.map(column => (
            <div key={column.title}>
              <p className="text-base text-[#efe8da]/50">{column.title}</p>
              <ul className="mt-5 space-y-3 text-lg">
                {column.links.map(link => (
                  <li key={link.label}>
                    {/^(https?:|mailto:)/.test(link.to) ? (
                      <a href={link.to} className="link-underline pb-0.5">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to} viewTransition className="link-underline pb-0.5">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 text-base text-[#efe8da]/50">
          <span>© {new Date().getFullYear()} Denys Herasymchuk</span>
          <div className="flex items-center gap-6">
            <a href={SOCIALS.linkedin} aria-label="LinkedIn" className="transition-[color,transform] duration-200 hover:scale-125 hover:text-[#efe8da] motion-reduce:hover:scale-100">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V21h-4z" />
              </svg>
            </a>
            <a
              href={SOCIALS.github}
              aria-label="GitHub"
              className="h-6 w-6 bg-current transition-[color,transform] duration-200 hover:scale-125 hover:text-[#efe8da] motion-reduce:hover:scale-100"
              style={{
                mask: `url(${github}) center / contain no-repeat`,
                WebkitMask: `url(${github}) center / contain no-repeat`,
              }}
            />
            <a href={SOCIALS.email} aria-label="Email" className="transition-[color,transform] duration-200 hover:scale-125 hover:text-[#efe8da] motion-reduce:hover:scale-100">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3.5 6.5 12 13l8.5-6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <FooterName />
    </footer>
  );
}
