import ChapterHeading from './ChapterHeading';
import { SKILLS } from '../lib/content';

const Dot = () => (
  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-primary" aria-hidden="true" />
);

const SkillsSection = () => (
  <section id="skills" className="relative scroll-mt-24 py-24 lg:py-32">
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
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-base font-medium text-text-primary"
                >
                  <Dot />
                  {item}
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-border-subtle pt-5">
              {group.more.map((item) => (
                <li
                  key={item}
                  className="rounded-md bg-background-tertiary px-2.5 py-1 font-mono text-xs text-text-secondary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-5 flex items-center gap-2 font-mono text-xs text-text-tertiary">
        <Dot />
        daily drivers
      </p>
    </div>
  </section>
);

export default SkillsSection;
