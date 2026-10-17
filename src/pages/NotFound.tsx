import { Link } from 'react-router';

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col items-start justify-center px-6 sm:px-10">
      <h1 className="text-3xl font-semibold tracking-tight">This page isn't ready yet.</h1>
      <Link to="/" viewTransition className="mt-4 text-haze underline underline-offset-4 hover:text-ink">
        Back to home
      </Link>
    </section>
  );
}
