import Link from 'next/link';
import BackgroundFX from '../Components/BackgroundFX';
import NavBar from '../Components/NavBar';
import ReadingProgress from '../Components/ReadingProgress';
import { ARCHIVE, PROJECT_COUNT } from '../lib/content';

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
const pad = (n) => String(n).padStart(2, '0');

export default function ProjectsPage() {
  return (
    <>
      <BackgroundFX />
      <ReadingProgress />
      <NavBar />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-20 lg:px-12">
        <header className="mb-16">
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

        <div className="space-y-20">
          {ARCHIVE.map((group, groupIndex) => (
            <section
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-title`}
              className="grid scroll-mt-28 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12"
            >
              {/* Company spine */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <div className="border-l-2 border-accent-primary/40 pl-6">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-primary">
                    {pad(groupIndex + 1)} · {group.items.length} projects
                  </p>
                  <h2
                    id={`${group.id}-title`}
                    className="mt-2 font-display text-2xl font-semibold text-text-primary"
                  >
                    {group.title}
                  </h2>
                  <p className="mt-1 text-sm text-text-secondary">{group.role}</p>
                  <p className="mt-1 font-mono text-xs text-text-tertiary">{group.period}</p>
                  <p className="mt-4 font-display text-base italic leading-relaxed text-text-tertiary">
                    {group.blurb}
                  </p>
                </div>
              </div>

              {/* Entries — each `id` is a deep-link target from the home page */}
              <div className="space-y-5">
                {group.items.map((item, index) => (
                  <article
                    key={item.id}
                    id={item.id}
                    className="scroll-mt-28 rounded-xl border border-border-subtle bg-background-secondary p-6 transition-colors duration-300 hover:border-border-hover"
                  >
                    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-accent-primary">
                          {pad(groupIndex + 1)}.{pad(index + 1)}
                        </span>
                        <div>
                          <h3 className="font-display text-lg font-semibold text-text-primary">
                            {item.name}
                          </h3>
                          <p className="text-sm text-text-tertiary">{item.context}</p>
                        </div>
                      </div>
                      <ul className="flex flex-wrap gap-1.5 md:max-w-[50%] md:justify-end">
                        {item.stack.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-md border border-border-subtle bg-background-primary px-2 py-0.5 font-mono text-xs text-text-tertiary"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <ul className="space-y-2 text-sm leading-relaxed text-text-secondary">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="mt-0.5 shrink-0 text-accent-primary" aria-hidden="true">
                            ›
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

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
