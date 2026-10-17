import { useEffect, useRef, useState } from 'react';
import { LOGO_SVG } from './Logo';

const WIDTH = 190;

// Right-click menu for the logo (anything marked data-logo): copy the SVG or download it.
export default function LogoMenu() {
  const [at, setAt] = useState<{ x: number; y: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const open = (e: MouseEvent) => {
      // Also match the link around the logo, since its padding is bigger than the mark.
      const target = e.target as Element;
      if (!target.closest?.('[data-logo]') && !target.closest?.('a')?.querySelector('[data-logo]')) return;
      e.preventDefault();
      setCopied(false);
      setAt({
        x: Math.min(e.clientX, window.innerWidth - WIDTH - 8),
        y: Math.min(e.clientY, window.innerHeight - 110),
      });
    };
    document.addEventListener('contextmenu', open);
    return () => document.removeEventListener('contextmenu', open);
  }, []);

  useEffect(() => {
    if (!at) return;
    menuRef.current?.querySelector('button')?.focus();
    const close = () => setAt(null);
    const outside = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) close();
    };
    const keys = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const items = Array.from(menuRef.current?.querySelectorAll('button') ?? []);
        const i = items.indexOf(document.activeElement as HTMLButtonElement);
        items[(i + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length]?.focus();
      }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', keys);
    window.addEventListener('scroll', close, { passive: true });
    window.addEventListener('resize', close);
    window.addEventListener('blur', close);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', keys);
      window.removeEventListener('scroll', close);
      window.removeEventListener('resize', close);
      window.removeEventListener('blur', close);
    };
  }, [at]);

  if (!at) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LOGO_SVG);
      setCopied(true);
      setTimeout(() => setAt(null), 700);
    } catch {
      setAt(null);
    }
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([LOGO_SVG], { type: 'image/svg+xml' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'denys-logo.svg';
    a.click();
    URL.revokeObjectURL(url);
    setAt(null);
  };

  const item =
    'flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-ink/10 focus-visible:bg-ink/10 focus-visible:outline-none';

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Logo"
      className="liquid-glass fixed z-[60] rounded-2xl p-1.5"
      style={{ left: at.x, top: at.y, width: WIDTH }}
    >
      <button type="button" role="menuitem" onClick={copy} className={item}>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {copied ? (
            <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <>
              <rect x="5" y="5" width="8" height="8" rx="1.5" />
              <path d="M3 10.5V4a1 1 0 0 1 1-1h6.5" strokeLinecap="round" />
            </>
          )}
        </svg>
        {copied ? 'Copied' : 'Copy SVG'}
      </button>
      <button type="button" role="menuitem" onClick={download} className={item}>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
        </svg>
        Download SVG
      </button>
    </div>
  );
}
