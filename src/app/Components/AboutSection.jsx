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
            Most of what I build is backend: systems that keep working when things go wrong and,
            increasingly, the AI features that live inside them. My day-to-day is TypeScript and
            Python on Azure — Next.js and Flask services, Postgres and Snowflake underneath,
            Microsoft Graph and Entra ID everywhere, and Docker holding it together.
          </p>

          <p className="text-lg leading-relaxed text-text-secondary">
            The roots are in distributed systems — a fault-tolerant ten-node cluster built from
            scratch at UIUC, then message queues at quick-commerce scale. Since then I&rsquo;ve
            shipped a Microsoft 365 posture platform, document-AI tools that run in the cloud and
            on-device, data pipelines, and security tooling, usually as the engineer who owns the
            whole stack.
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
