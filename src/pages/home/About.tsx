import { Link } from 'react-router';
import Logo from '../../components/Logo';

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-6xl scroll-mt-28 items-center gap-12 px-6 pb-8 pt-32 sm:px-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-20"
    >
      {/* Placeholder until a real photo is added. */}
      <div
        role="img"
        aria-label="Photo of Denys (placeholder)"
        className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-ink/10 md:mx-0"
        style={{
          background:
            'radial-gradient(90% 70% at 30% 20%, rgb(var(--haze) / 0.35), transparent 70%), linear-gradient(160deg, rgb(var(--ink) / 0.08), rgb(var(--ink) / 0.18))',
        }}
      >
        <Logo className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-ink/15" />
        <span className="absolute bottom-4 left-4 rounded-full bg-paper/70 px-3 py-1 text-xs text-ink/70 backdrop-blur">
          Photo coming soon
        </span>
      </div>

      <div>
        <h2 className="font-display text-6xl leading-none sm:text-7xl">About me</h2>
        <div className="mt-8 max-w-prose space-y-5 text-lg leading-relaxed text-ink/80">
          <p className="text-ink">
            I&apos;m Denys, a junior full-stack developer studying Applied Computer Science at Thomas More University of
            Applied Sciences in Belgium.
          </p>
          <p>
            I&apos;m drawn to software where things happen live: a message that lands the moment it&apos;s sent, a
            dashboard that moves while you watch it. I like working out how those systems hold up when a lot of people use
            them at once, and then making the screen in front of them feel calm.
          </p>
          <p>
            Right now I&apos;m looking for my first junior role on a team that ships often and reviews code with care. I
            learn fastest by building real things, and I&apos;m happy to start with the small tickets.
          </p>
        </div>
        <Link to="/about" viewTransition className="link-underline mt-8 inline-block pb-0.5 text-lg text-ink">
          More about me
        </Link>
      </div>
    </section>
  );
}
