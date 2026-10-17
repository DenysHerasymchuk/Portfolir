import { useEffect, useState } from 'react';
import { Link, Outlet, ScrollRestoration } from 'react-router';
import BackToTop from '../components/BackToTop';
import Logo from '../components/Logo';
import LogoMenu from '../components/LogoMenu';
import { ArrowIcon } from '../components/PrimaryButton';
import StaggeredMenu from '../components/reactbits/StaggeredMenu';
import ThemeToggle from '../components/ThemeToggle';
import { NAV_LINKS, SOCIALS } from '../data/site';
import Footer from './Footer';
import NavLinks from './NavLinks';

export default function Layout() {
  // index.html sets the initial class before paint; React just takes it from there.
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {}
  }, [dark]);

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollRestoration />
      <LogoMenu />
      <div className="md:hidden">
        <StaggeredMenu
          isFixed
          position="right"
          logo={<Logo className="h-8 w-8" />}
          items={[{ to: '/', label: 'Home' }, ...NAV_LINKS].map(link => ({
            label: link.label,
            ariaLabel: `Go to ${link.label}`,
            link: link.to,
          }))}
          socialItems={[
            { label: 'LinkedIn', link: SOCIALS.linkedin },
            { label: 'GitHub', link: SOCIALS.github },
            { label: 'Email', link: SOCIALS.email },
          ]}
          colors={['#c4ab86', '#8c7355']}
          accentColor="#8c7355"
          menuButtonColor={dark ? '#efe8da' : '#261f18'}
          openMenuButtonColor={dark ? '#efe8da' : '#261f18'}
          changeMenuColorOnOpen={false}
        >
          <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
        </StaggeredMenu>
      </div>
      {/* Phones use the StaggeredMenu above; this navbar starts at md. */}
      <header className="fixed inset-x-0 top-4 z-20 hidden justify-center px-3 [view-transition-name:site-header] md:flex">
        <nav className="liquid-glass nav-glass flex h-[4.5rem] items-center gap-4 rounded-full pl-3 pr-3">
          <Link
            to="/"
            viewTransition
            aria-label="Home"
            className="ml-2 grid h-12 w-12 place-items-center rounded-full text-ink transition-colors hover:text-ink/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-haze"
          >
            <Logo className="h-8 w-8" />
          </Link>
          <NavLinks />
          <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
          <Link
            to="/contact"
            viewTransition
            className="beige-flow group/btn flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-base font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_2px_8px_rgb(0_0_0/0.2)] transition-[filter] hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-haze"
          >
            Get in touch
            <ArrowIcon />
          </Link>
        </nav>
      </header>
      {/* Opaque and above the footer, which is revealed from underneath it. */}
      <main className="relative z-10 flex-1 bg-paper">
        <Outlet context={dark} />
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
}
