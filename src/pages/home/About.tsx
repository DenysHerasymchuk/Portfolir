import { Link } from 'react-router';
import photo from '../../assets/denys.jpg';

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-6xl scroll-mt-28 items-center gap-12 px-6 pb-8 pt-32 sm:px-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-20"
    >
      <img
        src={photo}
        alt="Denys in front of the Eiffel Tower"
        width={698}
        height={800}
        loading="lazy"
        className="mx-auto aspect-[4/5] w-full max-w-sm rounded-[2rem] border border-ink/10 object-cover object-[50%_35%] md:mx-0"
      />

      <div>
        <h2 className="font-display text-5xl leading-none sm:text-7xl">About me</h2>
        <div className="mt-8 max-w-prose space-y-5 text-lg leading-relaxed text-ink/80">
          <p className="text-ink">
            I&apos;m Denys, a junior full-stack developer studying Applied Computer Science at Thomas More University of
            Applied Sciences in Belgium.
          </p>
          <p>
            Right now I&apos;m looking for my first junior role. I get up to speed in a new codebase and stack quickly, and
            I ask questions early. Code review is where I learn fastest. Give me a real ticket and I&apos;ll build and test
            it, and keep you posted while I do.
          </p>
        </div>
        <Link to="/about" viewTransition className="link-underline mt-8 inline-block pb-0.5 text-lg text-ink">
          More about me
        </Link>
      </div>
    </section>
  );
}
