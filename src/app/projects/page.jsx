import Link from 'next/link';
import BackgroundFX from '../Components/BackgroundFX';
import NavBar from '../Components/NavBar';
import ReadingProgress from '../Components/ReadingProgress';
import ArchiveList from '../Components/ArchiveList';
import { PROJECT_COUNT } from '../lib/content';

const TITLE = 'Project archive';
const DESCRIPTION = `All ${PROJECT_COUNT} professional and personal projects by Mohan Amritesh Dasari, newest first.`;

// Nested `openGraph` replaces the root one entirely, so it is restated here.
export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    url: '/projects/',
    siteName: 'Amritesh Dasari',
    title: `${TITLE} | Amritesh Dasari`,
    description: DESCRIPTION,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Mohan Amritesh Dasari — Software Engineer' }],
  },
};

const delay = (ms) => ({ '--delay': `${ms}ms` });

export default function ProjectsPage() {
  return (
    <>
      <BackgroundFX />
      <ReadingProgress />
      <NavBar />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-20 lg:px-12">
        <header className="mb-12">
          <p
            className="enter-rise mb-4 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em]"
            style={delay(0)}
          >
            <span className="text-accent-primary">Archive</span>
            <span className="h-px w-16 bg-linear-to-r from-accent-primary/60 to-transparent" aria-hidden="true" />
            <span className="text-text-tertiary">{PROJECT_COUNT} projects</span>
          </p>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            <span className="block overflow-hidden pb-[0.1em] mb-[-0.1em]">
              <span className="enter-mask" style={delay(80)}>
                Every project, in one place.
              </span>
            </span>
          </h1>

          <p className="enter-rise mt-5 max-w-2xl text-lg text-text-secondary" style={delay(240)}>
            Professional and personal work, grouped by where it happened — newest first.
          </p>

          <p className="enter-rise mt-6" style={delay(320)}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-sm text-text-tertiary transition-colors duration-300 hover:text-accent-primary"
            >
              <span aria-hidden="true">←</span> Back to home
            </Link>
          </p>
        </header>

        <ArchiveList />

        <footer className="mt-24 border-t border-border-subtle pt-8 text-center">
          <p className="font-mono text-xs text-text-tertiary">
            — end of archive ·{' '}
            <Link href="/#contact" className="text-accent-primary hover:underline">
              get in touch
            </Link>{' '}
            —
          </p>
        </footer>
      </main>
    </>
  );
}
