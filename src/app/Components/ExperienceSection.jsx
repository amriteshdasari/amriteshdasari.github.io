"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import ChapterHeading from './ChapterHeading';
import { TIMELINE } from '../lib/content';

const TimelineCard = ({ entry }) => (
  <a
    href={entry.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group block rounded-xl border border-border-subtle bg-background-secondary p-6 transition-colors duration-300 hover:border-accent-primary/30"
  >
    <div className="mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-primary">
        {entry.kind}
      </span>
      {/* On desktop the period sits across the spine instead */}
      <span className="whitespace-nowrap font-mono text-xs text-text-tertiary lg:hidden">
        {entry.period}
      </span>
    </div>
    <h3 className="font-display text-xl font-semibold text-text-primary transition-colors duration-300 group-hover:text-accent-primary">
      {entry.title}
    </h3>
    <p className="mt-1 text-sm text-text-secondary">
      {entry.subtitle}
      {entry.note && <span className="text-text-tertiary"> · {entry.note}</span>}
    </p>
    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{entry.description}</p>
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {entry.stack.map((tech) => (
        <li
          key={tech}
          className="rounded-md bg-background-tertiary px-2.5 py-1 font-mono text-xs text-text-tertiary"
        >
          {tech}
        </li>
      ))}
    </ul>
  </a>
);

const ExperienceSection = () => {
  const timelineRef = useRef(null);

  // The spine draws itself as the reader scrolls through the timeline.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.75', 'end 0.45'],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <ChapterHeading
          number="03"
          kicker="Experience"
          title="From campus to production"
          lead="Four stops so far — each one a place that changed how I think about building software."
        />

        <div ref={timelineRef} className="relative">
          <div
            className="absolute left-4 top-0 h-full w-px bg-border-subtle lg:left-1/2 lg:-translate-x-1/2"
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-4 top-0 h-full w-px origin-top bg-linear-to-b from-accent-primary via-accent-primary to-accent-secondary lg:left-1/2 lg:-translate-x-1/2"
            style={{ scaleY: lineProgress }}
            aria-hidden="true"
          />

          <ol className="space-y-10 lg:space-y-16">
            {TIMELINE.map((entry, index) => {
              const side = index % 2 === 0 ? 'left' : 'right';
              return (
                <li
                  key={entry.title}
                  className="relative grid grid-cols-[2rem_1fr] gap-4 lg:grid-cols-[1fr_4rem_1fr] lg:gap-0"
                >
                  <span
                    className="absolute left-4 top-7 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center lg:left-1/2"
                    aria-hidden="true"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-accent-primary shadow-[0_0_14px_rgba(245,158,11,0.8)]" />
                  </span>

                  {/* Period across the spine (desktop) */}
                  <div
                    className={`hidden pt-5 lg:flex ${
                      side === 'left' ? 'order-3 justify-start pl-10' : 'order-1 justify-end pr-10'
                    }`}
                  >
                    <span className="font-display text-2xl italic text-text-tertiary">
                      {entry.period}
                    </span>
                  </div>

                  <div className="order-2 hidden lg:block" />

                  <div
                    className={`col-start-2 lg:col-auto ${
                      side === 'left' ? 'order-1 lg:pr-10' : 'order-3 lg:pl-10'
                    }`}
                  >
                    <TimelineCard entry={entry} />
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="relative mt-12 flex justify-start pl-10 lg:justify-center lg:pl-0">
            <span className="rounded-full border border-border-subtle bg-background-secondary px-5 py-2 font-mono text-xs uppercase tracking-[0.25em] text-text-tertiary">
              to be continued<span className="text-accent-primary">…</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
