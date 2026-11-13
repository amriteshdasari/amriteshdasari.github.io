"use client";
import React, { Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ARCHIVE, PROJECT_COUNT, STACK_COUNTS } from '../lib/content';

const pad = (n) => String(n).padStart(2, '0');

// Technologies used by at least two projects, most used first.
const FILTERS = Object.entries(STACK_COUNTS)
  .filter(([, count]) => count >= 2)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([tech]) => tech);

const chipClass = (active) =>
  `inline-flex min-h-9 items-center gap-1.5 rounded-md border px-3 font-mono text-xs transition-colors duration-300 ${
    active
      ? 'border-accent-primary bg-accent-primary text-background-primary'
      : 'border-border-subtle bg-background-secondary text-text-secondary hover:border-accent-primary/40 hover:text-text-primary'
  }`;

// `stack` is the active technology filter (or null); `onStack` is absent in
// the static fallback, where the chips render but do nothing yet.
const ArchiveBody = ({ stack, onStack }) => {
  const active = stack && STACK_COUNTS[stack] ? stack : null;
  const toggle = (tech) => onStack?.(tech === active ? null : tech);
  const filters = active && !FILTERS.includes(active) ? [active, ...FILTERS] : FILTERS;

  // Numbering stays tied to the full archive, so a filtered entry keeps its number.
  const groups = ARCHIVE.map((group, groupIndex) => ({
    ...group,
    groupIndex,
    items: group.items
      .map((item, index) => ({ ...item, index }))
      .filter((item) => !active || item.stack.includes(active)),
  })).filter((group) => group.items.length > 0);

  const shown = groups.reduce((total, group) => total + group.items.length, 0);

  return (
    <>
      <div className="mb-14 border-y border-border-subtle py-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-mono text-xs uppercase tracking-[0.25em] text-text-tertiary">
          <h2>
            <span className="text-accent-primary">//</span> filter by technology
          </h2>
          <p aria-live="polite" className="normal-case tracking-normal">
            {active ? (
              <>
                {shown} of {PROJECT_COUNT} projects use{' '}
                <span className="text-text-primary">{active}</span>
              </>
            ) : (
              <>showing all {PROJECT_COUNT}</>
            )}
          </p>
        </div>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          <li>
            <button type="button" onClick={() => onStack?.(null)} aria-pressed={!active} className={chipClass(!active)}>
              All
            </button>
          </li>
          {filters.map((tech) => (
            <li key={tech}>
              <button
                type="button"
                onClick={() => toggle(tech)}
                aria-pressed={tech === active}
                className={chipClass(tech === active)}
              >
                {tech}
                <span className={tech === active ? 'opacity-70' : 'text-text-tertiary'}>
                  {STACK_COUNTS[tech]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-20">
        {groups.map((group) => (
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
                  {pad(group.groupIndex + 1)} · {group.items.length}{' '}
                  {group.items.length === 1 ? 'project' : 'projects'}
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
              {group.items.map((item) => (
                <article
                  key={item.id}
                  id={item.id}
                  className="scroll-mt-28 rounded-xl border border-border-subtle bg-background-secondary p-5 transition-colors duration-300 target:border-accent-primary/50 hover:border-border-hover sm:p-6"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-accent-primary">
                      {pad(group.groupIndex + 1)}.{pad(item.index + 1)}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-text-primary sm:text-xl">
                        {item.name}
                      </h3>
                      <p className="mt-0.5 text-sm text-text-tertiary">
                        {item.context}
                        {item.period && (
                          <span className="whitespace-nowrap font-mono"> · {item.period}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Each tag filters the archive to the projects that share it */}
                  <ul className="mt-4 mb-5 flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <li key={tech}>
                        <button
                          type="button"
                          onClick={() => toggle(tech)}
                          aria-pressed={tech === active}
                          title={tech === active ? 'Clear filter' : `Show projects using ${tech}`}
                          className={`rounded-md border px-2 py-1 font-mono text-xs transition-colors duration-300 ${
                            tech === active
                              ? 'border-accent-primary/60 bg-accent-subtle text-accent-primary'
                              : 'border-border-subtle bg-background-primary text-text-tertiary hover:border-accent-primary/40 hover:text-text-primary'
                          }`}
                        >
                          {tech}
                        </button>
                      </li>
                    ))}
                  </ul>

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

                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex min-h-11 items-center gap-2 font-mono text-sm text-accent-primary transition-colors duration-300 hover:text-text-primary"
                    >
                      Visit {new URL(item.url).hostname.replace(/^www\./, '')}
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

// Keeps the filter in the URL (?stack=Python) so a filtered view can be shared.
const FilteredArchive = () => {
  const router = useRouter();
  const pathname = usePathname();
  const stack = useSearchParams().get('stack');

  const setStack = (tech) => {
    const query = tech ? `?stack=${encodeURIComponent(tech)}` : '';
    router.replace(`${pathname}${query}`, { scroll: false });
  };

  return <ArchiveBody stack={stack} onStack={setStack} />;
};

// The Suspense fallback is what the static export prerenders: the full,
// unfiltered archive, so the page reads the same before JavaScript arrives.
const ArchiveList = () => (
  <Suspense fallback={<ArchiveBody stack={null} />}>
    <FilteredArchive />
  </Suspense>
);

export default ArchiveList;
