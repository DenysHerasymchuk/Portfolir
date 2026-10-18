import { useOutletContext } from 'react-router';
import Credentials from '../components/Credentials';
import { Icon } from '../components/Icon';
import { PrimaryButton } from '../components/PrimaryButton';
import ScrollVelocity from '../components/ScrollVelocity';

const HOW_I_WORK = [
  {
    icon: (
      <>
        <rect x="3" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="8.5" y="16" width="7" height="5" rx="1.5" />
        <path d="M6.5 8v3.5h11V8M12 11.5V16" />
      </>
    ),
    title: 'I draw the system before I write it',
    body: 'I model a project in StarUML before any code: a use case diagram for what people can do, a class diagram for the structure, and sequence diagrams for how the parts talk at runtime. I rank features with MoSCoW, write the main flows out step by step, and settle close calls with a weighted decision matrix.',
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="3.5" />
        <path d="M3 12h5.5M15.5 12H21" />
      </>
    ),
    title: 'I ship small and often',
    body: 'I prototype screens in Figma, prepare images in Photoshop, and click through the flow before building it. The first release is an MVP with only the must-haves, so people can try it early. Pull requests stay small, which makes them easy to review and easy to undo.',
  },
  {
    icon: <path d="M4 20V10M10 20V4M16 20v-7M21 20H3" />,
    title: 'I measure before I optimise',
    body: 'Load tests and dashboards tell me where the time goes. Guessing usually points at the wrong place.',
  },
  {
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="6" />
        <path d="m15 15 5.5 5.5M8 10.5h5" />
      </>
    ),
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
              dashboards that update every second. I enjoy the parts that are hard to get right, like keeping data in
              sync between users or keeping a service up when a piece of it fails.
            </p>
            <p>
              On the frontend I care about how things feel. I use React and TypeScript day to day, and I spend more time
              than I should on animation timing. On the backend I mostly write Go, Node.js and Python, and I&apos;m at
              home with Postgres, Redis and Docker.
            </p>
          </div>
          <aside className="h-fit rounded-3xl border border-ink/10 bg-ink/[0.03] p-8">
            <div className="flex items-center gap-4">
              <Icon>
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M8.5 7V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2M3 13h18" />
              </Icon>
              <h2 className="text-lg font-semibold">What I&apos;m looking for</h2>
            </div>
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
        <ScrollVelocity
          items={['React', 'TypeScript', 'Go', 'Node.js', 'Python', 'Postgres', 'Redis']}
          speed={50}
          withIcons
        />
        <ScrollVelocity
          items={['Docker', 'Kubernetes', 'Kafka', 'MySQL', 'Laravel', '.NET', 'Tailwind']}
          speed={50}
          reverse
          withIcons
          className="text-haze"
        />
      </section>

      <section className="mx-auto mt-32 max-w-6xl px-6 sm:px-10">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How I work</h2>
        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {HOW_I_WORK.map(item => (
            <div key={item.title} className="flex gap-5 border-t border-ink/15 pt-6">
              <Icon>{item.icon}</Icon>
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/75">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-6xl px-6 sm:px-10">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Studies</h2>
        <Credentials className="mt-10" />
      </section>
    </div>
  );
}
