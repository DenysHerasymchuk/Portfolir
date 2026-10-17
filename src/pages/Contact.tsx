import { ArrowIcon } from '../components/PrimaryButton';
import ContactActions from '../components/ContactActions';
import { SOCIALS } from '../data/site';

export default function Contact() {
  return (
    <section className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 pb-32 pt-36 sm:px-10">
      <h1 className="font-craze text-[clamp(3.5rem,13vw,10rem)] uppercase leading-[0.85]">
        Let&apos;s build
        <br />
        something
      </h1>
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl">
        I&apos;m looking for a junior developer role. Email is the quickest way to reach me, and I usually reply within
        a day.
      </p>

      <ContactActions className="mt-14" />

      <ul className="mt-24 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink/10 pt-8 text-lg">
        <li>
          <a href={SOCIALS.linkedin} className="group/btn inline-flex items-center gap-2 link-underline pb-0.5">
            LinkedIn
            <ArrowIcon />
          </a>
        </li>
        <li>
          <a href={SOCIALS.github} className="group/btn inline-flex items-center gap-2 link-underline pb-0.5">
            GitHub
            <ArrowIcon />
          </a>
        </li>
      </ul>
    </section>
  );
}
