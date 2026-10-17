import { Link } from 'react-router';

// Placeholder copy.
export default function About() {
  return (
    <section
      id="about"
      className="mx-auto grid min-h-[80svh] max-w-6xl scroll-mt-28 content-start gap-10 px-6 pb-60 pt-32 sm:px-10 md:grid-cols-[1fr_1.4fr]"
    >
      <h2 className="font-display text-6xl leading-none sm:text-7xl">About me</h2>
      <div className="max-w-prose space-y-5 text-lg leading-relaxed text-haze">
        <p>Placeholder: a short intro. Who you are, what you build, and what you care about when you build it.</p>
        <p>
          Placeholder: a second paragraph. Where you are based, what you are working on now, and what kind of work you
          are looking for.
        </p>
        <Link to="/about" viewTransition className="link-underline inline-block pb-0.5 text-ink">
          More about me
        </Link>
      </div>
    </section>
  );
}
