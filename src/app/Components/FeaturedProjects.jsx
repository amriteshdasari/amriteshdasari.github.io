import Link from 'next/link';
import ChapterHeading from './ChapterHeading';
import { FEATURED, PROJECT_COUNT } from '../lib/content';

// Editorial index of flagship projects. Each row opens the full entry in the archive.
const FeaturedProjects = () => (
  <section id="projects" className="relative scroll-mt-24 py-24 lg:py-32">
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
      <ChapterHeading
        number="04"
        kicker="Projects"
        title="Selected work"
        lead="Four projects that show how I work — client systems, production at scale, and what I build after hours."
      />

      <ol className="border-t border-border-subtle">
        {FEATURED.map((project, index) => (
          <li key={project.id} className="border-b border-border-subtle">
            <Link
              href={`/projects/#${project.id}`}
              className="group grid gap-6 py-10 transition-colors duration-300 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:py-12"
            >
              <div className="flex gap-5">
                <span className="pt-2 font-mono text-sm text-accent-primary">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-text-primary transition-colors duration-300 group-hover:text-accent-primary sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-base text-text-secondary">{project.kind}</p>
                  <p className="mt-1 font-mono text-xs text-text-tertiary">{project.org}</p>
                </div>
              </div>

              <div className="lg:pt-2">
                <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
                  {project.summary}
                </p>
                <p className="mt-4 flex items-center gap-2 font-mono text-sm text-accent-primary">
                  <span aria-hidden="true">→</span>
                  {project.highlight}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <ul className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md bg-background-tertiary px-2.5 py-1 font-mono text-xs text-text-tertiary"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <span className="font-mono text-xs text-text-tertiary transition-colors duration-300 group-hover:text-text-primary">
                    Full write-up <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-text-tertiary">
          {PROJECT_COUNT} projects, grouped by company
        </p>
        <Link
          href="/projects/"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-base font-semibold text-text-primary transition-colors duration-300 hover:border-accent-primary/40 hover:bg-background-hover"
        >
          Browse the full archive <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  </section>
);

export default FeaturedProjects;
