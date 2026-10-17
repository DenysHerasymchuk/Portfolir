import { useOutletContext } from 'react-router';
import ContactActions from '../components/ContactActions';
import Credentials from '../components/Credentials';
import About from './home/About';
import Hero from './home/Hero';
import SelectedWork from './home/SelectedWork';

export default function Home() {
  const dark = useOutletContext<boolean>();

  return (
    <>
      <Hero dark={dark} />
      <About />
      <SelectedWork />

      <section className="mx-auto max-w-6xl px-6 py-32 sm:px-10">
        <h2 className="font-display text-6xl leading-none sm:text-7xl">Studies</h2>
        <Credentials className="mt-14" />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-40 sm:px-10">
        <h2 className="font-craze text-[clamp(3rem,11vw,8rem)] uppercase leading-[0.85]">
          Let&apos;s build
          <br />
          something
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl">
          I&apos;m looking for a junior developer role. Email is the quickest way to reach me.
        </p>
        <ContactActions className="mt-12" />
      </section>
    </>
  );
}
