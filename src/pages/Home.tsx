import { useOutletContext } from 'react-router';
import About from './home/About';
import Hero from './home/Hero';

export default function Home() {
  const dark = useOutletContext<boolean>();

  return (
    <>
      <Hero dark={dark} />
      <About />
    </>
  );
}
