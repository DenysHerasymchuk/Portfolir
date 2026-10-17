import { useState } from 'react';
import { SOCIALS } from '../data/site';
import Magnet from './Magnet';
import { ArrowIcon } from './PrimaryButton';

const EMAIL = SOCIALS.email.replace('mailto:', '');

// Email button with a magnet pull, plus a click-to-copy address. Used on the Contact page and the landing band.
export default function ContactActions({ className = '' }: { className?: string }) {
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
    <div className={`flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-16 ${className}`}>
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
  );
}
