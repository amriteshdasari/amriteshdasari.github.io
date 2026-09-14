import ChapterHeading from './ChapterHeading';
import { FOCUS_AREAS } from '../lib/content';

const AboutSection = () => (
  <section id="about" className="relative scroll-mt-24 py-24 lg:py-32">
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
      <ChapterHeading number="01" kicker="About" title="Systems that survive the real world." />

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        {/* Bio */}
        <div className="space-y-7">
          <p className="drop-cap text-lg leading-relaxed text-text-secondary">
            Specializing in distributed systems, backend development, and full-stack engineering,
            I build software that keeps working when things go wrong. My day-to-day spans Python,
            Kafka, Docker, Kubernetes, PostgreSQL, Flask, React, and the cloud-native tooling that
            holds it all together.
          </p>

          <p className="text-lg leading-relaxed text-text-secondary">
            I&rsquo;ve built everything from a distributed machine learning cluster to
            production-ready chatbots, data extraction pipelines, and DNS security tools. I&rsquo;m
            a continuous learner who enjoys tackling complex problems, improving data workflows,
            and delivering reliable, well-engineered systems as part of collaborative teams.
          </p>

          <blockquote className="border-l-2 border-accent-primary pl-6">
            <p className="font-display text-xl italic leading-relaxed text-text-primary sm:text-2xl">
              &ldquo;Ingesting new knowledge and leveling up — one message at a time from the Kafka
              queue of experience.&rdquo;
            </p>
            <footer className="mt-3 font-mono text-xs uppercase tracking-widest text-text-tertiary">
              — a personal motto
            </footer>
          </blockquote>
        </div>

        {/* Focus areas */}
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-text-tertiary">
            <span className="text-accent-primary">//</span> what I focus on
          </h3>
          <ol className="mt-5 divide-y divide-border-subtle border-y border-border-subtle">
            {FOCUS_AREAS.map((area, index) => (
              <li key={area.title} className="flex gap-5 py-6">
                <span className="pt-1.5 font-mono text-xs text-accent-primary">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-display text-xl font-semibold text-text-primary">{area.title}</p>
                  <p className="mt-2 text-base leading-relaxed text-text-secondary">{area.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
