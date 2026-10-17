import { Link } from 'react-router';

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto grid min-h-[80svh] max-w-6xl scroll-mt-28 content-start gap-10 px-6 pb-60 pt-32 sm:px-10 md:grid-cols-[1fr_1.4fr]"
    >
      <h2 className="font-display text-6xl leading-none sm:text-7xl">About me</h2>
      <div className="max-w-prose space-y-5 text-lg leading-relaxed text-ink/80">
        <p>
          I&apos;m Denys, a junior full-stack developer. I like building things where data moves in real time: chat, live
          video, shared documents and dashboards that never need a refresh.
        </p>
        <p>
          I&apos;m looking for my first full-time role on a team that ships often. My projects show how I think about
          systems, from the database to the last animation.
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
          <Link to="/work" viewTransition className="link-underline inline-block pb-0.5 text-ink">
            See the projects
          </Link>
          <Link to="/about" viewTransition className="link-underline inline-block pb-0.5 text-ink">
            More about me
          </Link>
        </div>
      </div>
    </section>
  );
}
