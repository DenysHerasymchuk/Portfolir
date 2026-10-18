import { useEffect, useState } from 'react';
import { PrimaryButton } from '../../components/PrimaryButton';
import DecryptedText from '../../components/reactbits/DecryptedText';
import GradientASCII from '../../components/reactbits/GradientASCII';
import Ribbons from '../../components/reactbits/Ribbons';
import StackTile from '../../components/StackTile';
import { TILE_SETS } from '../../data/tech';

// Scroll hint at the bottom of the hero, shown only near the top of the page.
function ScrollCue() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const update = () => setAtTop(window.scrollY < window.innerHeight * 0.25);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const go = () => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('about')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div
      className={`absolute inset-x-0 bottom-8 flex justify-center transition-opacity duration-300 ${
        atTop ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <button
        type="button"
        onClick={go}
        tabIndex={atTop ? undefined : -1}
        className="flex flex-col items-center gap-2 rounded-full px-4 py-2 text-sm text-haze transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-haze"
      >
        More about me
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-4 w-4 motion-safe:animate-[cue-bob_1.8s_ease-in-out_infinite]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
    </div>
  );
}

export default function Hero({ dark }: { dark: boolean }) {
  return (
    <section className="group relative h-svh">
      <GradientASCII
        colors={dark ? ['#6b5236', '#f3e9d7', '#d9c3a0', '#b08d5f'] : ['#b39a74', '#ddcbaa', '#d6c29e', '#c4ab86']}
        shape="horizon"
        characters=" =+xX0S8#@"
        cellSize={18}
        // Glyphs are drawn lighter than the wash in both themes (lightMode off). Dark glyphs would
        // compete with the dark headline in light mode.
        density={0.8}
        glyphOpacity={dark ? 0.85 : 0.9}
        gradientOpacity={dark ? 0.9 : 0.75}
        // 1x resolution and no glow pass; glow costs three extra full-screen passes per frame.
        dpr={1}
        glow={0}
      />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <Ribbons
          colors={dark ? ['#c4ab86', '#e3d3b6', '#f3e9d7'] : ['#fbf7ef', '#efe4cf', '#e3d3b6']}
          thickness={6}
          spread={4}
          length={0.6}
          dpr={1}
        />
      </div>
      {/* Light theme: paper-coloured glow behind the text so it reads clearly over the pattern. */}
      {!dark && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_46%_at_50%_52%,rgb(var(--paper)/0.85),rgb(var(--paper)/0.4)_55%,transparent_80%)]"
        />
      )}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        {/* Size tracks viewport width so each line, tiles included, stays on one row. */}
        <h1 className="font-display text-[min(9.5vw,6rem)] font-normal leading-[1.05]">
          <span className="block whitespace-nowrap">
            I build <StackTile items={TILE_SETS[0]} /> things
          </span>
          <span className="block whitespace-nowrap">
            for the <StackTile items={TILE_SETS[1]} delay={2500} /> web
          </span>
        </h1>
        <p
          className={`pointer-events-auto mx-auto mt-5 hidden max-w-md text-lg sm:block sm:text-xl md:max-w-none md:whitespace-nowrap ${
            dark ? 'text-haze' : 'text-ink/75'
          }`}
        >
          <DecryptedText
            text="I care about the details people only notice when they're missing."
            animateOn="inViewHover"
            sequential
            revealDirection="start"
            speed={30}
            hoverRadius={100}
            scrambleColor="#c4ab86"
          />
        </p>
        <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3">
          <PrimaryButton to="/work" dark={dark}>
            See my work
          </PrimaryButton>
        </div>
      </div>
      <ScrollCue />
    </section>
  );
}
