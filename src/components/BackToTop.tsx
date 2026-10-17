import { useEffect, useState } from 'react';

// Visible from halfway down the hero until the footer starts to show. The footer sits under <main>,
// so it shows once main's bottom edge is on screen.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const main = document.querySelector('main');
    const update = () => {
      // Loose thresholds: on a short page, strict ones would never overlap.
      const pastHero = window.scrollY > window.innerHeight * 0.5;
      const footerShowing = !!main && main.getBoundingClientRect().bottom < window.innerHeight * 0.85;
      setVisible(pastHero && !footerShowing);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? undefined : -1}
      className={`group/btn liquid-glass fixed bottom-6 right-6 z-30 grid h-12 w-12 place-items-center rounded-full transition-[opacity,transform] duration-300 [view-transition-name:back-to-top] focus-visible:outline focus-visible:outline-2 focus-visible:outline-haze ${
        visible ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="h-5 w-5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 motion-reduce:transition-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 13V3M4 7l4-4 4 4" />
      </svg>
    </button>
  );
}
