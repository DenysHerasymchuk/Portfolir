import { useState } from 'react';
import { ArrowIcon } from '../components/PrimaryButton';
import Magnet from '../components/Magnet';
import { SOCIALS } from '../data/site';

const EMAIL = SOCIALS.email.replace('mailto:', '');

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = SOCIALS.email;
    }
  };

  return (
    <section className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 pb-32 pt-36 sm:px-10">
      <h1 className="font-craze text-[clamp(3.5rem,13vw,10rem)] uppercase leading-[0.85]">
        Let&apos;s build
        <br />
        something
      </h1>
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl">
        I&apos;m looking for a junior developer role. Email is the quickest way to reach me, and I usually reply within a
        day.
      </p>

      <div className="mt-14 flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-16">
        <Magnet>
          <a
            href={SOCIALS.email}
            className="beige-flow group/btn inline-flex items-center gap-3 rounded-full px-8 py-5 text-lg font-medium text-white shadow-[0_8px_24px_rgb(92_74_54/0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-haze"
          >
            Write me an email
            <ArrowIcon />
          </a>
        </Magnet>

        <button
          type="button"
          onClick={copy}
          className="group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-haze"
          aria-live="polite"
        >
          <span className="block text-sm text-haze">{copied ? 'Copied to clipboard' : 'Or copy my address'}</span>
          <span className="link-underline mt-1 inline-block pb-0.5 text-xl sm:text-2xl">{EMAIL}</span>
        </button>
      </div>

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
