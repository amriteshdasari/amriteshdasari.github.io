import Link from 'next/link';
import ChapterHeading from './ChapterHeading';
import { SKILLS, STACK_COUNTS, stackHref } from '../lib/content';

const Dot = () => (
  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-primary" aria-hidden="true" />
);

// A skill that appears in the archive links to the projects built with it.
const projectsLabel = (item) =>
  `${item}: ${STACK_COUNTS[item]} ${STACK_COUNTS[item] === 1 ? 'project' : 'projects'} in the archive`;

const Count = ({ item }) => (
  <span className="font-mono text-[11px] text-text-tertiary transition-colors duration-300 group-hover:text-accent-primary" aria-hidden="true">
    ×{STACK_COUNTS[item]}
  </span>
);

const SkillsSection = () => (
  <section id="skills" className="relative scroll-mt-24 py-20 lg:py-28">
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
      <ChapterHeading
        number="02"
        kicker="Skills"
        title="Tools I build with"
        lead="The languages, frameworks, and infrastructure behind the work — daily drivers first."
      />

      {/* Hairline grid: 1px gaps over a border-coloured backdrop act as dividers */}
      <div className="grid gap-px overflow-hidden rounded-xl border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((group) => (
          <div key={group.label} className="bg-background-secondary p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              {group.label}
            </h3>

            <ul className="mt-5 space-y-2.5">
              {group.core.map((item) => (
                <li key={item} className="text-base font-medium text-text-primary">
                  {STACK_COUNTS[item] ? (
                    <Link
                      href={stackHref(item)}
                      aria-label={projectsLabel(item)}
                      className="group -my-1 flex items-center gap-2.5 py-1 transition-colors duration-300 hover:text-accent-primary"
                    >
                      <Dot />
                      {item}
                      <Count item={item} />
                    </Link>
                  ) : (
                    <span className="flex items-center gap-2.5">
                      <Dot />
                      {item}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-border-subtle pt-5">
              {group.more.map((item) => (
                <li key={item}>
                  {STACK_COUNTS[item] ? (
                    <Link
                      href={stackHref(item)}
                      aria-label={projectsLabel(item)}
                      className="block rounded-md border border-transparent bg-background-tertiary px-2.5 py-1 font-mono text-xs text-text-secondary transition-colors duration-300 hover:border-accent-primary/40 hover:text-accent-primary"
                    >
                      {item}
                    </Link>
                  ) : (
                    <span className="block rounded-md border border-transparent bg-background-tertiary px-2.5 py-1 font-mono text-xs text-text-tertiary">
                      {item}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-text-tertiary">
        <span className="flex items-center gap-2">
          <Dot />
          daily drivers
        </span>
        <span>
          <span className="text-accent-primary">×n</span> pick a skill to see the projects built with it
        </span>
      </p>
    </div>
  </section>
);

export default SkillsSection;
