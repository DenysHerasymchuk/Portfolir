import { useOutletContext } from 'react-router';
import { PrimaryButton } from '../components/PrimaryButton';
import ScrollVelocity from '../components/ScrollVelocity';

const HOW_I_WORK = [
  {
    title: 'I draw the system before I write it',
    body: 'Boxes and arrows first. If I cannot explain where the data goes and what happens when a piece fails, I am not ready to write code yet.',
  },
  {
    title: 'I ship small and often',
    body: 'A rough version in front of people beats a perfect one on my laptop. I keep pull requests small so they are easy to review and easy to undo.',
  },
  {
    title: 'I measure before I optimise',
    body: 'Load tests and dashboards tell me where the time goes. Guessing usually points at the wrong place.',
  },
  {
    title: 'I sweat the small details',
    body: 'Empty states, error messages, focus rings, a loading state that does not jump. People notice when they are missing.',
  },
];

export default function About() {
  const dark = useOutletContext<boolean>();

  return (
    <div className="pb-40 pt-36">
      <section className="mx-auto max-w-6xl px-6 sm:px-10">
        <h1 className="font-display text-7xl leading-none sm:text-8xl">About</h1>
        <div className="mt-12 grid gap-12 md:grid-cols-[1.3fr_1fr]">
          <div className="max-w-prose space-y-6 text-lg leading-relaxed text-ink/80 sm:text-xl">
            <p className="text-ink">
              I&apos;m Denys, a junior full-stack developer. I like owning a feature from the database table to the
              button someone clicks.
            </p>
            <p>
              Most of what I build involves something happening in real time: chat, live video, collaborative editing,
              dashboards that update every second. I enjoy the parts that are hard to get right, like keeping data in sync
              between users or keeping a service up when a piece of it fails.
            </p>
            <p>
              On the frontend I care about how things feel. I use React and TypeScript day to day, and I spend more time
              than I should on animation timing. On the backend I mostly write Go, Node.js and Python, and I&apos;m at
              home with Postgres, Redis and Docker.
            </p>
          </div>
          <aside className="h-fit rounded-3xl border border-ink/10 bg-ink/[0.03] p-8">
            <h2 className="text-lg font-semibold">What I&apos;m looking for</h2>
            <p className="mt-3 leading-relaxed text-ink/80">
              A junior full-stack or frontend role on a team that ships often and reviews code properly. I learn fastest
              next to people who are better than me, and I&apos;m happy to start with the unglamorous tickets.
            </p>
            <div className="mt-8">
              <PrimaryButton to="/contact" dark={dark}>
                Get in touch
              </PrimaryButton>
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-32 space-y-4 border-y border-ink/10 py-10 font-craze text-5xl uppercase text-ink/80 sm:text-7xl">
        <ScrollVelocity items={['React', 'TypeScript', 'Go', 'Node.js', 'Python', 'Postgres', 'Redis']} speed={50} />
        <ScrollVelocity
          items={['Docker', 'Kubernetes', 'WebSockets', 'WebRTC', 'Kafka', 'ClickHouse', 'Tailwind']}
          speed={50}
          reverse
          className="text-haze"
        />
      </section>

      <section className="mx-auto mt-32 max-w-6xl px-6 sm:px-10">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How I work</h2>
        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {HOW_I_WORK.map(item => (
            <div key={item.title} className="border-t border-ink/15 pt-6">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/75">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
